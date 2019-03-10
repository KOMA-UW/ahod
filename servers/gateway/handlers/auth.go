package handlers

import (
	"encoding/json" //JSON package from the standard library
	"fmt"
	"github.com/KOMA-UW/ahod/servers/gateway/models/users"
	"github.com/KOMA-UW/ahod/servers/gateway/sessions"
	"net/http"
	"path"
	"sort"
	"strconv"
	"strings"
	"time"
)

const defaultUsersSearched = 15

//TODO: define HTTP handler functions as described in the
//assignment description. Remember to use your handler context
//struct as the receiver on these functions so that you have
//access to things like the session store and user store.

//UserHandler creates a new user account
func (ctx *HandlerContext) UsersHandler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "GET":
		sessionState := &SessionState{}
		_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, sessionState)
		if err != nil {
			http.Error(w, fmt.Sprintf("error user not authenticated: %v", err), http.StatusUnauthorized)
			return
		}

		query := r.URL.Query().Get("q")
		if len(query) == 0 {
			http.Error(w, "error in searching; query should not be empty ", http.StatusBadRequest)
			return
		}

		userSet := ctx.Trie.Find(query, 20)

		results := []*users.User{}

		for _, id := range userSet {
			userRet, _ := ctx.UsersStore.GetByID(id)
			results = append(results, userRet)
		}

		sort.Slice(results, func(i, j int) bool {
			return results[i].UserName < results[j].UserName
		})

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		encoder := json.NewEncoder(w)

		if err := encoder.Encode(results); err != nil {
			http.Error(w, fmt.Sprintf("error encoding search results to JSON: %v", err), http.StatusInternalServerError)
			return
		}
		return

	case "POST":

		ctype := r.Header.Get("Content-Type")

		// check whether the request's content-type is not application/json
		if !strings.HasPrefix(ctype, "application/json") {
			http.Error(w, "The request body must be in JSON.", http.StatusUnsupportedMediaType)
			return
		}

		newUser := &users.NewUser{}

		dec := json.NewDecoder(r.Body)

		if err := dec.Decode(newUser); err != nil {
			http.Error(w, "error in decoding json", http.StatusBadRequest)
			return
		}

		//validate user
		err := newUser.Validate()
		if err != nil {
			http.Error(w, fmt.Sprintf("error validating the user: %s", err), http.StatusBadRequest)
			return
		}

		user, err := newUser.ToUser()
		if err != nil {
			http.Error(w, fmt.Sprintf("error converting this user to a user: %s", err), http.StatusBadRequest)
			return
		}

		//check if there is a user with the same email
		_, err = ctx.UsersStore.GetByEmail(newUser.Email)
		//no error means we have a user in the db with the same email
		if err == nil {
			http.Error(w, "There is already user with the same email.", http.StatusBadRequest)
			return
		}

		// check if there is a user with the same username
		_, err = ctx.UsersStore.GetByUserName(newUser.UserName)
		//no error means we have a user in the db with the same username
		if err == nil {
			http.Error(w, "There is already a user with the same username.", http.StatusBadRequest)
			return
		}

		// else, insert the user to the database
		user, err = ctx.UsersStore.Insert(user)
		if err != nil {
			http.Error(w, fmt.Sprintf("error inserting this new user: %s", err), http.StatusInternalServerError)
			return
		}

		ctx.Trie.Add(user.UserName, user.ID)
		ctx.Trie.Add(user.FirstName, user.ID)
		ctx.Trie.Add(user.LastName, user.ID)

		sessionState := SessionState{
			StartTime: time.Now(),
			User:      user,
		}

		_, err = sessions.BeginSession(ctx.SigningKey, ctx.SessionStore, sessionState, w)
		if err != nil {
			http.Error(w, fmt.Sprintf("error beginning session: %s", err), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			http.Error(w, "error encoding user to json", http.StatusInternalServerError)
			return
		}

	// For any other HTTP method, respond with an http.StatusMethodNotAllowed (405) error.
	default:
		http.Error(w, "only POST/GET methods allowed", http.StatusMethodNotAllowed)
		return
	}

}

func (ctx *HandlerContext) SpecificUserHandler(w http.ResponseWriter, r *http.Request) {

	sessionState := &SessionState{}

	sessionId, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, fmt.Sprintf("error getting the session state: %v", err), http.StatusUnauthorized)
		return
	}

	path := path.Base(r.URL.Path)
	var idFromPath int64

	if path != "me" {
		idFromPath, err = strconv.ParseInt(path, 10, 64)
	}

	if err != nil {
		http.Error(w, fmt.Sprintf("error parsing the given id: %v", err), http.StatusInternalServerError)
		return
	}

	switch r.Method {

	case "GET":
		var user *users.User

		if path == "me" {
			user, err = sessionState.User, nil
		} else {
			user, err = ctx.UsersStore.GetByID(idFromPath)
		}

		if err != nil {
			http.Error(w, fmt.Sprintf("there is no user with this id: %v", err), http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			http.Error(w, "error encoding the session state into JSON", http.StatusInternalServerError)
			return
		}

	case "PATCH":

		if path != "me" && idFromPath != sessionState.User.ID {
			http.Error(w, "user id is not valid or the user is not authenticated", http.StatusForbidden)
			return
		}

		ctype := r.Header.Get("Content-Type")
		if !strings.HasPrefix(ctype, "application/json") {
			http.Error(w, "the request body must be in JSON", http.StatusUnsupportedMediaType)
			return
		}

		ctx.Trie.Remove(sessionState.User.FirstName, sessionState.User.ID)
		ctx.Trie.Remove(sessionState.User.LastName, sessionState.User.ID)

		userUpdates := &users.Updates{}
		err := json.NewDecoder(r.Body).Decode(userUpdates)
		if err != nil {
			http.Error(w, "error decoding the request body to JSON", http.StatusBadRequest)
			return
		}

		if err := sessionState.User.ApplyUpdates(userUpdates); err != nil {
			http.Error(w, fmt.Sprintf("error updating the user %s", err), http.StatusBadRequest)
			return
		}

		err = ctx.SessionStore.Save(sessionId, sessionState)
		if err != nil {
			http.Error(w, fmt.Sprintf("error saving the new update to the session: %s", err), http.StatusInternalServerError)
			return
		}

		ctx.Trie.Add(sessionState.User.FirstName, sessionState.User.ID)
		ctx.Trie.Add(sessionState.User.LastName, sessionState.User.ID)

		user, err := ctx.UsersStore.Update(sessionState.User.ID, userUpdates)

		if err != nil {
			http.Error(w, fmt.Sprintf("error updating the user store: %s", err), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			http.Error(w, "error encoding the session state into JSON", http.StatusInternalServerError)
			return
		}

	default:
		http.Error(w, "only GET or PATCH method allowed", http.StatusMethodNotAllowed)
		return
	}

}

func (ctx *HandlerContext) SessionsHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "only POST method allowed", http.StatusMethodNotAllowed) //405
		return
	}

	ctype := r.Header.Get("Content-Type")
	if !strings.HasPrefix(ctype, "application/json") {
		http.Error(w, "the request body must be in JSON", http.StatusUnsupportedMediaType)
		return
	}

	userCredentials := &users.Credentials{}
	err := json.NewDecoder(r.Body).Decode(userCredentials)

	if err != nil {
		http.Error(w, "error decoding the request body", http.StatusBadRequest)
		return
	}

	user, err := ctx.UsersStore.GetByEmail(userCredentials.Email)

	// If user does exist, we are not going to receive an error

	if err != nil {
		// User does not exist, let's do something
		// that still takes time
		user.AuthenticateFake(userCredentials.Password)
	} else {
		err = user.Authenticate(userCredentials.Password)
	}

	// If the user exists, are we ever checking their credentials?

	// err = user.Authenticate()

	if err != nil {
		http.Error(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	sessionState := SessionState{
		StartTime: time.Now(),
		User:      user,
	}

	_, err = sessions.BeginSession(ctx.SigningKey, ctx.SessionStore, sessionState, w)
	if err != nil {
		http.Error(w, fmt.Sprintf("error beginning session: %s", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		http.Error(w, "error encoding user to json", http.StatusInternalServerError)
		return
	}

}

func (ctx *HandlerContext) SpecificSessionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "DELETE" {
		http.Error(w, "only DELETE method allowed", http.StatusMethodNotAllowed)
		return
	}

	path := path.Base(r.URL.Path)

	if path != "mine" {
		http.Error(w, "the path is not valid", http.StatusForbidden) //403
		return
	}

	_, err := sessions.EndSession(r, ctx.SigningKey, ctx.SessionStore)
	if err != nil {
		http.Error(w, fmt.Sprintf("err ending this session: %s", err), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("signed out"))
}

// begineNewSession starts a new session
func beginNewSession(ctx *HandlerContext, user *users.User, w http.ResponseWriter) {
	sessionState := SessionState{
		StartTime: time.Now(),
		User:      user,
	}

	// begin new session and save seesion state to the store
	_, err := sessions.BeginSession(ctx.SigningKey, ctx.SessionStore, sessionState, w)
	if err != nil {
		http.Error(w, fmt.Sprintf("error beginning session: %s", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		http.Error(w, "error encoding User struct to JSON", http.StatusInternalServerError)
		return
	}
}
