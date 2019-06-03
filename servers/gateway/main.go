package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/go-redis/redis"
	_ "github.com/go-sql-driver/mysql"
	"github.com/KOMA-UW/ahod/servers/gateway/handlers"
	"github.com/KOMA-UW/ahod/servers/gateway/indexes"
	"github.com/KOMA-UW/ahod/servers/gateway/models/users"
	"github.com/KOMA-UW/ahod/servers/gateway/sessions"

	"log"
	"net/http"
	"net/http/httputil"
	"os"
	"strings"
	"sync"
	"time"
)

const headerUser = "X-User"

//User represents an authenticated user
type User struct {
	ID       int64
	UserName string
}

//GetUser returns the currently-authenticated user,
//or an error if the user is not authenticated. For
//this demo, this function just returns a hard-coded
//test user. In a real gateway, you should use your
//sessions library to get the current session state,
//which contains the currently-authenticated user.
func GetUser(r *http.Request) (*User, error) {
	authHeader := r.Header.Get("Authorization")
	if len(authHeader) == 0 {
		return nil, fmt.Errorf("not authenticated")
	}
	return &User{
		ID:       1,
		UserName: "TestUser",
	}, nil
}

//RootHandler handles requests for the root resource
func RootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from the gateway!")
}

func reqEnv(name string) string {
	val := os.Getenv(name)
	if len(val) == 0 {
		log.Fatalf("please set the %s environment variable", name)
	}
	return val
}

//NewServiceProxy returns a new ReverseProxy
//for a microservice given a comma-delimited
//list of network addresses
func NewServiceProxy(addrs string, ctx handlers.HandlerContext) *httputil.ReverseProxy {
	splitAddrs := strings.Split(addrs, ",")
	nextAddr := 0
	mx := sync.Mutex{}

	return &httputil.ReverseProxy{
		Director: func(r *http.Request) {
			r.URL.Scheme = "http"
			mx.Lock()
			r.URL.Host = splitAddrs[nextAddr]
			nextAddr = (nextAddr + 1) % len(splitAddrs)
			mx.Unlock()

			sessionState := &handlers.SessionState{}
			_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, sessionState)
			if err != nil {
				fmt.Printf("Unable to get session state: %v", err)
				return
			}

			user := sessionState.User

			if user != nil {
				userJSON, err := json.Marshal(user)
				if err != nil {
					fmt.Printf("error encoding user to JSON %v", err)
					return
				}
				r.Header.Add(headerUser, string(userJSON))
			} else {
				r.Header.Del(headerUser)
			}
		},
	}
}

//HelloHandler handles requests for the `/hello` resource
func HomeHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Hello, Web!\n"))
}

//main is the main entry point for the server
func main() {
	/* TODO: add code to do the following
	- Read the ADDR environment variable to get the address
	  the server should listen on. If empty, default to ":80"
	- Create a new mux for the web server.
	- Tell the mux to call your handlers.SummaryHandler function
	  when the "/v1/summary" URL path is requested.
	- Start a web server listening on the address you read from
	  the environment variable, using the mux you created as
	  the root handler. Use log.Fatal() to report any errors
	  that occur when trying to start the web server.
	*/

	addr := os.Getenv("ADDR")

	if len(addr) == 0 {
		addr = ":443"
	}
	tlsKeyPath := os.Getenv("TLSKEY")
	tlsCertPath := os.Getenv("TLSCERT")

	if len(tlsKeyPath) == 0 || len(tlsCertPath) == 0 {
		fmt.Println("Either TLSKEY or TLSCERT environment variables are not set!")
		os.Exit(1)
	}

	sessionKey := os.Getenv("SESSIONKEY")

	if len(sessionKey) == 0 {
		sessionKey = "default"
	}

	radisAddr := os.Getenv("REDISADDR")

	if len(radisAddr) == 0 {
		radisAddr = "localhost:6379"
	}

	redisClient := redis.NewClient(&redis.Options{
		Addr: radisAddr,
	})

	dsn := os.Getenv("DSN")

	messagingServiceAddr := reqEnv("MESSAGESADDR")

	if len(dsn) == 0 {
		log.Fatal("DSN not set")
	}

	db, err := sql.Open("mysql", dsn)

	if err != nil {
		log.Fatalf("error opening connection to mysql %v", err)
	}

	sessionStore := sessions.NewRedisStore(redisClient, time.Hour)
	userStore := users.NewMySQLStore(db)

	trieTree := indexes.NewTrie() //userStore.Trie() //setUpTrie(userStore) 

	defer db.Close()

	if err != nil {
		log.Fatalf("error constructing user trie tree: %v", err)
	}

	hctx := handlers.HandlerContext{

		SigningKey:   sessionKey,
		SessionStore: sessionStore,
		UsersStore:   userStore,
		Trie:         trieTree,
	} //*handlers.NewHandlerContext(sessionKey, sessionStore, userStore, trieTree)


	messagingProxy := NewServiceProxy(messagingServiceAddr, hctx)

	groupsAddr := reqEnv("GROUPADDR")
	groupsProxy := NewServiceProxy(groupsAddr, hctx)


	mux := http.NewServeMux()

	// mux.HandleFunc("/", HomeHandler)
	
	mux.Handle("/v1/channels", messagingProxy)
	mux.Handle("/v1/channels/", messagingProxy)

	mux.Handle("v1/groups/", groupsProxy)
	mux.Handle("v1/members/", groupsProxy)

	mux.Handle("/v1/messages/", messagingProxy)

	mux.HandleFunc("/v1/users", hctx.UsersHandler)
	mux.HandleFunc("/v1/users/", hctx.SpecificUserHandler)
	mux.HandleFunc("/v1/sessions", hctx.SessionsHandler)
	mux.HandleFunc("/v1/sessions/", hctx.SpecificSessionHandler)


	corsMux := handlers.NewCorsHandler(mux)

	log.Printf("server is listening at %s...", addr)
	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, corsMux))
}

