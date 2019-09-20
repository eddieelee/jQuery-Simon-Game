//A new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//A new empty array called gamePattern.
var gamePattern = [];

//A new empty array with the name userClickedPattern.
var userClickedPattern = [];

//Need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//Start the level at 0
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //Store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //Add the contents of the variable userChosenColour.
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);

  //Play sound in nextSequence().
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

//A new function called checkAnswer().
function checkAnswer(currentLevel) {
  //If statement to check user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //If the user got the most recent answer right in first if statement, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    //Play the wrong sound if the user got one of the answers wrong.
    playSound("wrong");

    //Add class game-over to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    //Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

//A new function called nextSequence().
function nextSequence() {

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //Increase the level by 1 every time nextSequence() is called.
  level++;

  //Update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  //A new random number between 0 and 3, and store it in a variable called randomNumber.
  var randomNumber = Math.floor(Math.random() * 4);

  //A new variable called randomChosenColour and use the randomNumber to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //Add the new randomChosenColour push into the gamePattern array.
  gamePattern.push(randomChosenColour);

  //Use jQuery to select the button with the same id and animate a flash to the button.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);

}

//A new function called playSound().
function playSound(name) {
  //Play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//A new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
  //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColour).addClass("pressed");
  //Use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Reset the values of level, gamePattern and started variables.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
