var gamePattern = [];
var userClickedPattern = [];
var b = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function (event) {
    var userChosenColor = event.currentTarget.id;
    userClickedPattern += userChosenColor;
    playSound(userChosenColor);
    animatePres(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Wrong Answer! Press any key to restart!");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        started = false;
        level = 0;
        gamePattern = [];
    }
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level: " + level);
    var a = Math.floor(Math.random() * 4);
    var randomChosenColor = b[a];
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern += randomChosenColor;
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePres(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}
