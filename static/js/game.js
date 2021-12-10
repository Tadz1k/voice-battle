const handleSuccess = function(stream) {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function() {
      releaseTestPlayer(recordedChunks); //Tutaj zmiana. Zapis pliku do analizy.
      //W przyszłości warto obrabiać go w locie. Teraz będę zapisywał.
      var testPlayerText = document.createElement("b");
      testPlayerText.innerHTML = "Odsłuchaj swojego nagrania:<br>";
      testPlayerText.setAttribute("id", "testPlayerTest")
      document.body.appendChild(testPlayerText)
        //?
      var blobUrl = URL.createObjectURL(new Blob(recordedChunks, {'type': 'audio/wav'}));
      //test
      console.log(recordedChunks);
      //eot
      var txt = document.createElement("i");
      txt.innerHTML = blobUrl;
      document.body.appendChild(txt);
      var fd = new FormData();
      var tempFileName = photoName + '.wav';
      fd.append('fname', tempFileName);
      fd.append('data', recordedChunks);
      $.ajax({
            type: 'POST',
            url: '/process',
            data: fd,
            processData: false,
            contentType: false
      }).done(function(data)   {
          console.log(data);
    });
});

    startButton.addEventListener('click', function()    {
        console.log(musicDuration);
        destroyPlayer();
        bigCounter(5); //Nie działa
        mediaRecorder.start();
        setTimeout(()=>{mediaRecorder.stop();},musicDuration);
    })
};

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(handleSuccess);