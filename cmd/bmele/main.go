package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/siuyin/dflt"
)

func main() {
	fmt.Println("Blind Men and the Elephant")

	// root handler
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/static/", http.StatusFound)
	})

	// static content handler
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	// start serving
	certPath := dflt.EnvString("CERT_PATH", "/h/certbot/rasp.beyondbroadcast.com/fullchain.pem")
	keyPath := dflt.EnvString("KEY_PATH", "/h/certbot/rasp.beyondbroadcast.com/privkey.pem")
	port := dflt.EnvString("PORT", ":8080")
	log.Fatal(http.ListenAndServeTLS(port, certPath, keyPath, nil))
}
