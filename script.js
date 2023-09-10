var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern= [];
var randomNumber;
var randomChosenColour ;
var userChosenColour;
var started= false;
var level=0;
$(".btn").on("click" , function(event){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
  }

function nextSequence(){
  userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    randomNumber= Math.round(Math.random()*3); 
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    console.log(gamePattern);
    
    
}
function animatePress(currentColour){
    let a= $("#"+currentColour);
    a.addClass("pressed");
    setTimeout(() => {
        a.removeClass("pressed");
      }, 100);
    }

$(document).keypress(function(){
    if(!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started = true;
    }
})
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
           $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }


}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}



