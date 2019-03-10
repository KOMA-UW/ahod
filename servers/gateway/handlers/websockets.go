package handlers

import (
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/KOMA-UW/ahod/servers/gateway/sessions"
	"log"
	"net/http"
	"sync"
)

// WebSocketsHandler is a handler for WebSocket upgrade requests.
type WebSocketsHandler struct {
	notifier *Notifier
	upgrader *websocket.Upgrader
	ctx      *HandlerContext
}

// NewWebSocketsHandler constructs a new WebSocketsHandler.
func (ctx *HandlerContext) NewWebSocketsHandler(notifier *Notifier) *WebSocketsHandler {
	return &WebSocketsHandler{
		notifier: notifier,
		upgrader: &websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin:     func(r *http.Request) bool { return true },
		},
		ctx: ctx,
	}
}

// ServeHTTP implements the http.Handler interface for the WebSocketsHandler.
func (wsh *WebSocketsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	sessionState := &SessionState{}
	_, err := sessions.GetState(r, wsh.ctx.SigningKey, wsh.ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, fmt.Sprintf("error getting session state: %v", err), http.StatusUnauthorized)
		return
	}

	conn, err := wsh.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	wsh.notifier.AddClient(conn)
}

type Notifier struct {
	clients []*websocket.Conn
	eventQ  chan []byte

	mx sync.Mutex
}

// NewNotifier constructs a new Notifier.
func NewNotifier() *Notifier {

	notifier := &Notifier{
		eventQ: make(chan []byte),
	}
	go notifier.start()
	return notifier
}

// AddClient adds a new client to the Notifier.
func (n *Notifier) AddClient(client *websocket.Conn) {

	n.mx.Lock()
	n.clients = append(n.clients, client)
	n.mx.Unlock()

	for {
		if _, _, err := client.NextReader(); err != nil {
			client.Close()

			n.mx.Lock()
			for i, c := range n.clients {
				if c == client {
					n.clients = append(n.clients[:i], n.clients[i+1:]...)
				}
			}
			n.mx.Unlock()
			break
		}
	}
}

// Notify broadcasts the event to all WebSocket clients
func (n *Notifier) Notify(event []byte) {
	n.eventQ <- event
}

// Start starts the notification loop
func (n *Notifier) start() {

	for msg := range n.eventQ {
		n.mx.Lock()

		for i, c := range n.clients {

			if err := c.WriteMessage(websocket.TextMessage, msg); err != nil {
				c.Close()
				n.clients = append(n.clients[:i], n.clients[i+1:]...)
				log.Println(err)
			}
		}
		n.mx.Unlock()
	}
}
