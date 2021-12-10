package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Printf("Uruchamianie serwera na porcie :8080\n")
	http.Handle("/", http.FileServer(http.Dir("./static")))

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
