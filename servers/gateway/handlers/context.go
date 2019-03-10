package handlers

import (
	"github.com/KOMA-UW/ahod/servers/gateway/indexes"
	"github.com/KOMA-UW/ahod/servers/gateway/models/users"
	"github.com/KOMA-UW/ahod/servers/gateway/sessions"
)

//HandlerContext represents ...
type HandlerContext struct {
	SigningKey   string
	SessionStore sessions.Store
	UsersStore   users.Store
	Trie         *indexes.Trie
}
