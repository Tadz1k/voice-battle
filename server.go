package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os/exec"
	"voice_battle/voice_battle/myutils"
)

var hash = ""

func testGameHandler(w http.ResponseWriter, r *http.Request) {
	files, err := ioutil.ReadDir("static/sounds")
	var filesCount = 0
	fileNames := []string{}
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range files {
		filesCount++
		fileNames = append(fileNames, file.Name())
	}
	var randomNumber = rand.Intn(filesCount)
	var musicToPlay = fileNames[randomNumber]
	var spectogramFileName = myutils.RandomString(10)
	hash = spectogramFileName
	cmd := exec.Command("python", "main.py", musicToPlay, spectogramFileName)
	out, err := cmd.Output()

	if err != nil {
		println(err.Error())
	}
	var baseSoundSpectogram = string(out)
	//fmt.Println(baseSoundSpectogram)
	fmt.Println("Koniec przekazu")
	//Teraz czas na odtworzenie piosenki użytkownikowi i poproszenie o nagranie
	cmd2 := exec.Command("python", "main.py", musicToPlay, "duration")
	out2, err2 := cmd2.Output()

	if err2 != nil {
		println(err.Error())
	}
	var duration = string(out2)
	fmt.Println(duration)
	dataToSend := map[string]interface{}{"ImageFilename": spectogramFileName, "SoundFileName": musicToPlay, "Duration": duration, "SoundProbes": baseSoundSpectogram}
	gameHTML(w, "static/game.html", dataToSend)
}

func processBlob(w http.ResponseWriter, r *http.Request) {
	var data = ""
	if r.Method == "POST" {
		data = r.FormValue("data")
	}
	fmt.Println(data)
	cmd := exec.Command("python", "music.py", data, hash)
	out, err := cmd.Output()
	if err != nil {
		println(err.Error())
	}
	fmt.Println(out)
}

func gameHTML(w http.ResponseWriter, filename string, data interface{}) {
	t, err := template.ParseFiles(filename)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	if err := t.Execute(w, data); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
}

func main() {
	fmt.Printf("Uruchamianie serwera na porcie :8080\n")
	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/game", testGameHandler)
	http.HandleFunc("/process", processBlob)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
