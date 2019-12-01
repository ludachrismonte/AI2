

function getCORSRequest(url, callback) {
  console.log("Sending: " + url);
  var x = new XMLHttpRequest();
  x.open("GET", 'https://cors-anywhere.herokuapp.com/' + url);
  x.onload = x.onerror = function() {
  	callback(x.responseText);
  };
  x.send();
}

function getRequest(url, callback) {
  console.log("Sending: " + url);
  var x = new XMLHttpRequest();
  x.open("GET", url);
  x.onload = x.onerror = function() {
  	callback(x.responseText);
  };
  x.send();
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};