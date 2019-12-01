  
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = true;
} catch (e) {
    console.error(e);
}

var name = "Danny"

var messages;
var response = "";

var running = false;

$(document).ready( function() {
  messages = $('#messages');
  recognition.start();
  setInterval(function run() {
    if (!running) {
      console.log("starting listening service")
      recognition.start();
    }
  }, 5000);

  $("#text-input").on("keydown", function search(e) {
    if(e.keyCode == 13) {
      handleInput();
    }
  });
});

function handleInput() {
  aihandler($("#text-input").val());
  $("#text-input").val("");
}

function aihandler(input) {
  if (input.includes(name)) {
    messages.append(input + "<br>");
    input = input.split(name);
    var command = input[input.length - 1].trim().toLowerCase();
    console.log("Recieved command:")
    console.log(command);
    if (command.includes("let's watch") || command.includes("put on")) {
      console.log("Video Command!");
      command = command.replace("let's watch", "");
      command = command.replace("put on", "");
      command = command.trim();
      VideoSearch(command);
    }
    else if (command.includes("play")) {
      console.log("Music Command!");
      command = command.replace("play", "");
      command = command.trim();
      MusicSearch(command);
    }
  }
}

function stopListening() {
  console.log('Voice recognition stopped');
  recognition.stop();
}

recognition.onstart = function() { 
  console.log('Voice recognition initiated');
  running = true;
}

recognition.onspeechend = function() {
  console.log('Voice recognition speech end');
}

recognition.onend = function() {
  console.log('Voice recognition ended');
  running = false;
};

recognition.onerror = function(event) {
  if (event.error == 'no-speech') {
      console.log('No speech was detected. Try again.');
  }
  else {
    console.log('Voice recognition error:');
  }
}

recognition.onresult = function(event) {
  var current = event.resultIndex;
  aihandler(event.results[current][0].transcript);
};

function play() {
  setInterval(function(){ 
    if (response !== "") {
      responsiveVoice.speak(response, "UK English Male");
      response = "";
    }
  }, 1000);
}
