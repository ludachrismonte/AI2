var startTime;
var elapsed = 0;
var currentID = "";

$(document).ready( function() {
  $("#play-button").show();
  $("#pause-button").hide();
});

function MusicSearch(q) {
  var query = "youtube+" + q.replace(/ /, "+") + "+audio";
  getRequest('x' + query, handleSongResults);
}

function handleSongResults(data) {
  data = JSON.parse(data);
  currentID = data.items[0].link.split("=").last();
  var src = "https://www.youtube.com/embed/" + currentID + "?autoplay=1";
  elapsed = 0;
  $("#music-iframe").attr('src', src);
}

function onMusicLoaded() {
  if ($("#music-iframe").attr('src') === ""){
    return;
  }
  $("#play-button").hide();
  $("#pause-button").show();
  lastStartTime = Date.now();
}

function pauseMusic() {
  if ($("#music-iframe").attr('src') === ""){
    return;
  }
  $("#play-button").show();
  $("#pause-button").hide();
  elapsed += Math.floor((Date.now() - lastStartTime)/1000) - 1;
  $("#music-iframe").attr('src', "");
}

function resumeMusic() {
  if (currentID === ""){
    return;
  }
  var src = "https://www.youtube.com/embed/" + currentID + "?autoplay=1&start=" + elapsed;
  $("#music-iframe").attr('src', src);
}


navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
if (navigator.getUserMedia) {
  navigator.getUserMedia({
      audio: true
    },
    function(stream) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;
          for (var i = 0; i < array.length; i++) {
            values += (array[i]);
          }
          var average = values / array.length;
          $("#footer").css("box-shadow", "0px 0px " + average + "px cyan");
        }
    },
    function(err) {
      console.log("The following error occured: " + err.name)
    });
} else {
  console.log("getUserMedia not supported");
}