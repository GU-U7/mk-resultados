package main

import (
	"log"
	"net/http"
	"os"
	"text/template"
)

var port string = ":" + os.Getenv("PORT")

func main() {
	tIndex, err := template.ParseFiles("./index.html")
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/archivos/", http.StripPrefix("/archivos/", http.FileServer(http.Dir("./"))))
	http.HandleFunc("/", func(wr http.ResponseWriter, r *http.Request) {
		tIndex.Execute(wr, nil)
	})
	_ = http.ListenAndServe(port, nil)
}
