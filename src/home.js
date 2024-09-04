var i = 0;
var wrongText = "Budi izvrstan u onom što vidiš.";
var correctText = " voliš.";
var secondText = "Zaiskri!";
var speed = 100;
var pauseDuration = 1000;

function typeWriter(text, callback) {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(function () { typeWriter(text, callback); }, speed);
  } else if (callback) {
    setTimeout(callback, pauseDuration);
  }
}

function deleteText(count, callback) {
  if (count > 0) {
    var currentText = document.getElementById("typewriter").innerHTML;
    document.getElementById("typewriter").innerHTML = currentText.slice(0, -1);
    setTimeout(function () { deleteText(count - 1, callback); }, speed);
  } else if (callback) {
    setTimeout(callback, pauseDuration);
  }
}

function startTyping() {

  typeWriter(wrongText, function () {

    var deleteCount = wrongText.length - wrongText.indexOf("što") - "što".length;
    deleteText(deleteCount, function () {
      document.getElementById("typewriter").innerHTML += correctText;
      setTimeout(function () {
        document.getElementById("typewriter").innerHTML += "<br><span class='blinker'></span><span class='orange-text'> " + secondText + "</span>";
      }, pauseDuration);
    });
  });
}

window.onload = startTyping;
