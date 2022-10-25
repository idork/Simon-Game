
buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var gamePatternLength = gamePattern.length;
var userClickedPattern = [];

var theColorsLength = document.querySelectorAll(".btn").length;
var level = 0;
var started = false; /* this is going to be so that while it's false, do this for the beginning
 of the game */

function nextSequence(){

    userClickedPattern = []; /* this will reset nextSequence to default everytime it's called
    so that the empty array is ready for next level */

    level = level + 1; //increase the level everytime nextSequence is called
    var h1Text = document.getElementById("level-title").innerHTML = "Level " + level;
    //random number generated
    randomNumber = Math.floor(Math.random() * 4);

    //assigning the random number to a colour
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    playVisuals(randomChosenColour);
    playSounds(randomChosenColour);

}
/* 1. Use jQuery to select the button with the same id as the randomChosenColour
*/

function playVisuals(color){ //color is I am passing in the color I need from nextSequence() randomChosencolor

    var activeButton = $("#" + color); //activeButton is equal to the color that is passed it, and we would like to find the ID that matches it, so we added the hashtag

    $(activeButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //this will create the animation affects for ccolor that appears in activeButton
}

//passing colorAudio which will get data from randomChosenColor then find it in the switch statement and play the audio it corresponds to
function playSounds(colorAudio){
    var audio = new Audio("sounds/" + colorAudio + ".mp3" );
    audio.play();
}

function thePromise(){
    if (promise) {
        //Older browsers may not return a promise, according to the MDN website
        promise.catch(function(error) { console.error(error); });
    }
}

/*2. Take a look inside the styles.css file, you can see there is a class called "pressed", it will add a box shadow and changes the background colour to grey.


3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
*/
function animatePress(currentColour){

    var color = document.querySelector("." + currentColour);
    //colir is the variable of currentColor being made into a class by adding "."
    $(color).addClass("pressed");

    setTimeout(function () {
        $(color).removeClass("pressed");
        }, 100);
}
//jquery, the .btn box of color will trigger they key handler function and userChosenColour will be to the attribute that is equal to the .btn id
$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

    playSounds(userChosenColour);
    animatePress(userChosenColour); //passing the color that the user picked

    checkAnswer(userClickedPattern.length-1); /* check the answer the user clicked and passin
    their last answer */
});

/*1. Use jQuery to detect when a keyboard key has been pressed, 
when that happens for the first time, call nextSequence(). */

/* adding event listener to check for keypress, only do play game results if
level is equal to 0 */
$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        console.log(gamePattern);
        console.log(userClickedPattern);

        if ( gamePattern.length === userClickedPattern.length){
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        //checking if they are blank which means it can start next sequence
            setTimeout(function () {
                nextSequence();
            }, 1000);
            playSounds(userClickedPattern[Level]);
        }
    } else {
        var h1Text = document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";
        playSounds("wrong"); //playsound function, play the sound wrong;

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
            }, 200);
        console.log("wrong");
        console.log(gamePattern);
        console.log(userClickedPattern);
        startOver();
    }
}

function startOver(){
    //resetting the values when losing
    level = 0;
    gamePattern = [];
    started = false;
}
