package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"time"

	"github.com/KOMA-UW/ahod/servers/gateway/handlers"
	"github.com/KOMA-UW/ahod/servers/gateway/indexes"
	"github.com/KOMA-UW/ahod/servers/gateway/models/users"
	"github.com/KOMA-UW/ahod/servers/gateway/sessions"
	"github.com/go-redis/redis"
	_ "github.com/go-sql-driver/mysql"
	"github.com/pusher/pusher-http-go"
)

// Director is a specific function which returns a http request
type Director func(r *http.Request)

// GroupsDirector is a director function that redirects a url to the messages
// microservice
func GroupsDirector(target *url.URL, ctx *handlers.HandlerContext) Director {
	return func(r *http.Request) {
		r.Header.Set("X-Forwarded-Host", r.Host)
		ss := &handlers.SessionState{}
		_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, ss)
		if err == nil {
			userBytes, err := json.Marshal(ss.User)
			if err == nil {
				r.Header.Set("X-User", string(userBytes))
			} else {
				r.Header.Del("X-User")
			}
		} else {
			r.Header.Del("X-User")
		}
		r.Host = target.Host
		r.URL.Host = target.Host
		r.URL.Scheme = target.Scheme
	}
}

//main is the main entry point for the server
func main() {
	// get all env variables
	groupAddr := os.Getenv("GROUPADDR")

	DSN := os.Getenv("DSN")
	radisAddr := os.Getenv("REDISADDR")
	tlsKeyPath := os.Getenv("TLSKEY")
	tlsCertPath := os.Getenv("TLSCERT")
	sessionKey := os.Getenv("SESSIONKEY")
	addr := os.Getenv("ADDR")

	// setup redisstore
	// redisStore := setUpRedis(redisAddr)
	redisClient := redis.NewClient(&redis.Options{
		Addr: radisAddr,
	})

	// set up mysqlstore
	db := setUpMySQL(DSN)
	// store := users.NewMySQLStore(db)
	// defer db.Close()

	// setup trie
	// searchIndex := setUpTrie(store)
	sessionStore := sessions.NewRedisStore(redisClient, time.Hour)
	userStore := users.NewMySQLStore(db)
	trieTree := indexes.NewTrie() //userStore.Trie() //setUpTrie(userStore)

	// setup websocketstore
	// socketStore := setUpWebsocket(groupAddr)

	// setup rabbit

	// forever := make(chan []byte)

	// // start two go routines:
	// // 1. read from rabbit
	// // 2. read and write to socket
	// go func() {
	// 	for d := range msgs {
	// 		log.Printf("Received a message: %s", d.Body)
	// 		forever <- d.Body
	// 		log.Printf("Done")
	// 		d.Ack(false)
	// 	}
	// }()

	// go socketStore.ReadAndWrite(forever)

	// Make ContextHandler

	ctx := &handlers.HandlerContext{
		SigningKey:   sessionKey,
		SessionStore: sessionStore,
		UsersStore:   userStore,
		Trie:         trieTree,
	}

	// message proxy to redirect requests to message microservice
	groupProxy := &httputil.ReverseProxy{
		Director: GroupsDirector(&url.URL{
			Scheme: "http",
			Host:   groupAddr,
		}, ctx),
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/v1/users", ctx.UsersHandler)
	mux.HandleFunc("/v1/users/", ctx.SpecificUserHandler)
	mux.HandleFunc("/v1/sessions", ctx.SessionsHandler)
	mux.HandleFunc("/v1/sessions/", ctx.SpecificSessionHandler)

	mux.Handle("/v1/groups", groupProxy)
	mux.Handle("/v1/groups/", groupProxy)

	wrappedMux := handlers.NewCorsMiddleware(mux)

	if len(addr) == 0 {
		addr = ":443"
	}

	client := pusher.Client{
		AppId:   "665946",
		Key:     "c451dcc9dc05cae5a9c0",
		Secret:  "622ae2f1c890236d1dec",
		Cluster: "mt1",
		Secure:  true,
	}

	data := map[string]string{"message": "hello world"}
	client.Trigger("my-channel", "my-event", data)

	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
	log.Printf("server is listening at %s...", addr)
}

func setUpMySQL(DSN string) *sql.DB {
	db, err := sql.Open("mysql", DSN)

	if err != nil {
		fmt.Printf("error opening database: %v\n", err)
		os.Exit(1)
	}

	err = db.Ping()
	if err != nil {
		log.Printf("could not open mysql database at dsn %s", DSN)
		fmt.Println(err)
	}

	return db
}

func setUpRedis(redisAddr string) *sessions.RedisStore {
	client := redis.NewClient(&redis.Options{
		Addr: redisAddr,
	})
	redisStore := sessions.NewRedisStore(client, time.Hour)
	return redisStore
}

func setUpTrie(userstore *users.MySQLStore) *indexes.Trie {
	trie := indexes.NewTrie()
	return trie
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
