package sessions

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
)

const headerAuthorization = "Authorization"
const paramAuthorization = "auth"
const schemeBearer = "Bearer "

//ErrNoSessionID is used when no session ID was found in the Authorization header
var ErrNoSessionID = errors.New("no session ID found in " + headerAuthorization + " header")

//ErrInvalidScheme is used when the authorization scheme is not supported
var ErrInvalidScheme = errors.New("authorization scheme not supported")

//BeginSession creates a new SessionID, saves the `sessionState` to the store, adds an
//Authorization header to the response with the SessionID, and returns the new SessionID
func BeginSession(signingKey string, store Store, sessionState interface{}, w http.ResponseWriter) (SessionID, error) {

	//create a new SessionID
	sessionID, err := NewSessionID(signingKey)
	if err != nil {
		return InvalidSessionID, fmt.Errorf("error creating a new session id: %v\n", err)
	}

	//save the sessionState to the store
	if err = store.Save(sessionID, sessionState); err != nil {
		return InvalidSessionID, fmt.Errorf("error saving the session state to the store: %v", err)
	}
	//add this header to the ResponseWriter:
	// "Authorization: Bearer <sessionID>"
	w.Header().Add(headerAuthorization, schemeBearer+sessionID.String())

	return sessionID, nil
}

//GetSessionID extracts and validates the SessionID from the request headers
func GetSessionID(r *http.Request, signingKey string) (SessionID, error) {

	//get the value of the Authorization header,
	value := r.Header.Get(headerAuthorization)

	//if no Authorization header is present, set value from "auth" query string parameter
	if len(value) == 0 {
		value = r.URL.Query().Get(paramAuthorization)
		if len(value) == 0 {
			return InvalidSessionID, ErrNoSessionID
		}
	}
	if !strings.HasPrefix(value, schemeBearer) {
		return InvalidSessionID, ErrInvalidScheme
	}

	sessionIDString := value[len(schemeBearer):]

	//validate and if it's valid, return the SessionID. If not
	//return the validation error.
	sessionID, err := ValidateID(sessionIDString, signingKey)
	if err != nil {
		return InvalidSessionID, fmt.Errorf("error validing sessioon id: %v", err)
	}
	return sessionID, nil
}

//GetState extracts the SessionID from the request,
//gets the associated state from the provided store into
//the `sessionState` parameter, and returns the SessionID
func GetState(r *http.Request, signingKey string, store Store, sessionState interface{}) (SessionID, error) {

	//get the SessionID from the request, and get the data
	//associated with that SessionID from the store.
	sessionID, err := GetSessionID(r, signingKey)

	if err != nil {
		return InvalidSessionID, fmt.Errorf("error getting the session id from the request: %v", err)
	}

	if err = store.Get(sessionID, sessionState); err != nil {
		return InvalidSessionID, ErrStateNotFound
	}
	return sessionID, nil
}

//EndSession extracts the SessionID from the request,
//and deletes the associated data in the provided store, returning
//the extracted SessionID.
func EndSession(r *http.Request, signingKey string, store Store) (SessionID, error) {

	//get the SessionID from the request
	sessionID, err := GetSessionID(r, signingKey)

	if err != nil {
		return InvalidSessionID, fmt.Errorf("error getting the session id from the request: %v", err)
	}
	// delete the data associated with it in the store.
	if err = store.Delete(sessionID); err != nil {
		return sessionID, fmt.Errorf("error deleting the session state: %v", err)
	}
	return sessionID, nil
}
