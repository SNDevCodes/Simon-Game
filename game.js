let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let buttons = $('.btn');
let levels = 0;

function nextSequence() {
    levels++
    userClickedPattern = []; 
    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    addMusic(randomChosenColour);
}

buttons.on('click', function (e) {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log( );
    addMusic(userChosenColour);
    // $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})


// Animation on keypress 
function animatePress( currentColor){
    $('#' + currentColor).addClass('pressed');
    
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    }, 100)
}

// Function to add music to the selected color
function addMusic(input) {

    switch (input) {
        case 'red':
            let redSound = new Audio('sounds/red.mp3');
            redSound.play();
            break;
        case 'blue':
            let blueSound = new Audio('sounds/blue.mp3');
            blueSound.play();
            break;
        case 'green':
            let greenSound = new Audio('sounds/green.mp3');
            greenSound.play();
            break;
        case 'yellow':
            let yellowSound = new Audio('sounds/yellow.mp3');
            yellowSound.play();
            break;
    }

}


// Press A or enter to start the game  
$(document).on('keydown', function(e){
        nextSequence(); 
        $('#level-title').text(`level ${levels}`);
    }
)

// Checking the user answers 
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log('success');
        
        if (userClickedPattern.length === gamePattern.length){
            
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
                $('#level-title').text(`level ${levels}`);
            }, 1000);
            
        }
    }
    else{
        $('body').addClass('game-over');
        startOver();
        
        setTimeout(function(){
            $('body').removeClass('game-over'); 
        }, 200)
    }
}

// Start Again 
function startOver(){
    userClickedPattern = [];
    levels = 0;
    gamePattern = [];
    $('#level-title').text(`Press A Key to Start`);
}