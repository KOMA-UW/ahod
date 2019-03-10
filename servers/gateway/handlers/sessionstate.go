package handlers

import (
	"github.com/KOMA-UW/ahod/servers/gateway/models/users"
	"time"
)

//SessionState represents ...
type SessionState struct {
	StartTime time.Time   `json:"startTime"`
	User      *users.User `json:"users"`
}

//TODO: define a session state struct for this web server
//see the assignment description for the fields you should include
//remember that other packages can only see exported fields!
