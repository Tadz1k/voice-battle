function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function bigCounter(seconds)   { //nie działa
    var div = document.createElement("div");
    for(let i = 0; i < seconds; i++)    {
        let secondsRemaining = seconds-i;
        div.innerHTML = "<h5>"+secondsRemaining+"</h5>";
        document.body.appendChild(div);
        console.log(secondsRemaining)
        sleep(1000);
    }
    div.remove();
}

function releaseTestPlayer(recordedChunks)    {
    var player = document.createElement("AUDIO");
    player.setAttribute("src", URL.createObjectURL(new Blob(recordedChunks)));
    player.setAttribute("controls", "controls");
    player.setAttribute("id", "player")
    document.body.appendChild(player);
}

function destroyPlayer()    {
    var oldPlayer = document.getElementById("player");
    if(oldPlayer != null) oldPlayer.remove();
}

