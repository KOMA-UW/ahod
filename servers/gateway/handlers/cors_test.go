package handlers

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestNewCorsHandler(t *testing.T) {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	})
	corsMiddleare := NewCorsHandler(handler)
	req, err := http.NewRequest("OPTIONS", "/", nil)
	if err != nil {
		fmt.Printf("error making a new request :%v", err)
	}
	respRec := httptest.NewRecorder()
	corsMiddleare.ServeHTTP(respRec, req)
	if respRec.Code != http.StatusOK {
		t.Errorf("status code not correct: expected 200 but got %d instead", respRec.Code)
	}

	req, _ = http.NewRequest("GET", "/", nil)
	corsMiddleare.ServeHTTP(respRec, req)
}
