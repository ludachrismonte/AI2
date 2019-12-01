
var videoCount = 0;
var videoHTML_A = '<div id="video-';
var videoHTML_B = '" class="video-container"><div id="video-exit-';
var videoHTML_C = '" class="close-buttton" onclick="closeVideo(';
var videoHTML_D = ')"></div><iframe class="video-iframe"';
var videoHTML_E = '/preview" frameBorder="0" allowfullscreen></iframe></div>';
var container;

$(document).ready( function() {
  container = $('#parent');
});

var movieTitle;

function VideoSearch(t) {
  movieTitle = t;
  console.log("looking for the movie: " + movieTitle);
  getCORSRequest("http://www.omdbapi.com/?apikey=ceeff7df&t=" + movieTitle.replace(" ", "+"), handleOMDBData);
}

function handleOMDBData(text) {
  var data = JSON.parse(text);
  getCORSRequest("https://www.google.com/search?q=google+drive+" + movieTitle.replace(" ", "+") + "+" + data.Year, GetContent);
  getCORSRequest("https://www.bing.com/search?q=google+drive+" + movieTitle.replace(" ", "+") + "+" + data.Year, GetContent);
}

var patterns = {
  '(?<=href="https:\/\/drive.google.com\/file\/d\/).*?(?=[\/&"])': 'src="https://drive.google.com/file/d/',
  '(?<=href="https:\/\/docs.google.com\/file\/d\/).*?(?=[\/&"])': 'src="https://docs.google.com/file/d/',
  '(?<=href="https:\/\/drive.google.com\/open\?id=).*?(?=[\/&"])': 'src="https://drive.google.com/file/d/'
}

function GetContent(data) {
  for (let pattern in patterns) {
  	let result = Array.from(data.matchAll(pattern), m => m[0]);
  	console.log(result);
  	for (let i = 0; i < result.length; i++) {
  	  videoCount++;
      container.append(videoHTML_A + videoCount + videoHTML_B + videoCount + videoHTML_C +  + videoCount + videoHTML_D + patterns[pattern] + result[i] + videoHTML_E);
  	  dragElement(document.getElementById("video-" + videoCount));
  	}
  }
}

function closeVideo(id) {
  $("#video-" + id).remove();
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


