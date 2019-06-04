package handlers

import (
	"net/http"
)

//CorsMiddleware is a middleware handler that responds with the following header to all requests
type CorsMiddleware struct {
	MyHandler http.Handler
}

func (c *CorsMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Expose-Headers", "Authorization")
	w.Header().Set("Access-Control-Max-Age", "600")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
	} else {
		c.MyHandler.ServeHTTP(w, r)
	}
}

//NewCorsMiddleware constructs a new CorsMiddleware handler
func NewCorsMiddleware(handlerToWrap http.Handler) *CorsMiddleware {
	return &CorsMiddleware{handlerToWrap}
}
