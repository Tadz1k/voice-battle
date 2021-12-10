const handleSuccess = function(stream) {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function() {
      releaseTestPlayer(recordedChunks); 
    });

    startButton.addEventListener('click', function()    {
        destroyPlayer();
        bigCounter(5); //Nie działa
        mediaRecorder.start();
        setTimeout(()=>{mediaRecorder.stop();},5000);
    })
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);