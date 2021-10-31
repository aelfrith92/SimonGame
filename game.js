var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var esito = true;

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function nextSequence() {
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;

  userClickedPattern = [];
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").click(function(event) {
  var userChosenColour = event.target.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  console.log("vettore generato dai click: " + userClickedPattern);

  $("#" + userChosenColour).fadeOut(100).fadeIn(100);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lengthUser = userClickedPattern.length;
  var lengthGame = gamePattern.length;
  //quando si fermano i click? con lengthUser == lengthGame
  //come viene eseguito il controllo sulla corrispondenza click -> gamePattern?
  //con un ciclo for che controlla la corrispondenza dei vettori
  //provare prima valore per valore del vettore, poi una sola condizione vettore == vettore.
  var i = 0
  while (i <= lengthGame && esito == true && lengthUser ==
    lengthGame && started == true) {
    if (userClickedPattern[i] == gamePattern[i]) {
      esito = true;
      //quando avviare la sequenza successiva?
      if (i == lengthGame && esito != false)
        setTimeout(function() {
          nextSequence();
        }, 800);
      i++;
    } else {
      //triggers the game over script
      esito = false;
      gameOver();
      playSound("wrong");

    }
  }
});

//game over script
function gameOver() {

  $("#level-title").text("Game over. Press any key to restart.");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  esito = true;

}

$(document).keydown(function() {
  while (started == false) {

    started = true;
    nextSequence();
  }
});
