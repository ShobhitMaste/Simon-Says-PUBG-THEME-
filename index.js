var game_Started = false;
var MAX_LEN = 50;
var level = 1;
var sequence = [];
var player_sequence = [];
var title = document.querySelector("h1");
var delay = 300;
var score = 0;
var maxScore = 0;
var death_sound_effects = [
    "./sounds/gameover/death (1).mp3",
    "./sounds/gameover/death (2).mp3",
    "./sounds/gameover/death (3).mp3",
    "./sounds/gameover/death (9).mp3",
];

for(var j = 0; j < 4; j++){
    document.querySelectorAll("button")[j].addEventListener("click", function (){
        if(game_Started){
            player_sequence.push(this.id);
            console.log(this.id);
            console.log(player_sequence);
            if(!validSequence()){
                game_Started = false;
                title.textContent = "Sorry You Lost, Press Any Button To Try Again";
                sequence = [];
                player_sequence = [];
                level = 1;
                console.log("lose");
                setTimeout(playDeathSound , 500);
            }
            else if(player_sequence.length == level && validSequence()){
                level++;
                title.textContent = "Level " + level;
                console.log("Correct sequence!");
                setTimeout(StartGame, 1000);
                
            }
        }
    });
}

document.addEventListener("keypress", function () {
    if(!game_Started){
        game_Started = true;
        Generate_sequence();
        setTimeout(StartGame, 100);
    }
});
var on = false;
var toggleButton = document.querySelector(".show-toggle")
toggleButton.addEventListener("click", () => {
    if(!on){
        toggleButton.innerHTML = '<path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>';
        on = true;
    }
    else{
        toggleButton.innerHTML = '<path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>'
        on = false;
    }
    document.querySelector(".green").classList.toggle("green-image");
    document.querySelector(".red").classList.toggle("red-image");
    document.querySelector(".blue").classList.toggle("blue-image");
    document.querySelector(".yellow").classList.toggle("yellow-image");
});

var slider = document.getElementById("slider-id");
slider.addEventListener("input", function (){
    var difficulty = this.value;
    console.log(this.value);
    document.querySelector(".slider > p").textContent = difficulty + "%";
    difficulty = 100 - difficulty;
    delay = (difficulty / 100) * 500;
});

function StartGame(){
    player_sequence = [];
    title.textContent = "Level " + level;
    if(sequence.length == 0){
        title.textContent = "Sorry You Lost, Press Any Button To Try Again";
    }
    playSequence();
    updateScores();
    console.log(sequence);
}

function updateScores(){
    score = level - 1;
    maxScore = Math.max(maxScore, score);
    document.getElementById("score").textContent = "Score : " + score;
    document.getElementById("maxscore").textContent = "Max Score : " + maxScore;
}

function validSequence(){
    for(var i = 0 ; i < player_sequence.length; i++){
        if(player_sequence[i] != sequence[i])
            return false
    }
    return true;
}


function playSequence() {
    for (let i = 0; i < level; i++) {
        setTimeout(() => {        
                blinkButton(sequence[i]);
        }, i*delay);
    }
}

function blinkButton(button_id){
    console.log(button_id);
    play_sound(button_id)
    switch(button_id){
        case "green":
            document.querySelector("#"+button_id).classList.add("showgreen");
            setTimeout(() => {
                document.querySelector("#"+button_id).classList.remove("showgreen");
            }, 100)
            break;
        case "red":
            document.querySelector("#"+button_id).classList.add("showred");
            setTimeout(() => {
                document.querySelector("#"+button_id).classList.remove("showred");
            }, 100)
            break;
        case "yellow":
            document.querySelector("#"+button_id).classList.add("showyellow");
            setTimeout(() => {
                document.querySelector("#"+button_id).classList.remove("showyellow");
            }, 100)
            break;
        case "blue":
            document.querySelector("#"+button_id).classList.add("showblue");
            setTimeout(() => {
                document.querySelector("#"+button_id).classList.remove("showblue");
            }, 100)
            break;
    }
}

function button_pressed(button_name){
    var cssClassName = button_name + "_press";
    document.querySelector("." + button_name).classList.add(cssClassName);
    setTimeout(() => {
        document.querySelector("." + button_name).classList.remove(cssClassName);    
    } , 60);
    play_sound(button_name);
}


function Generate_sequence() {
    for (var i = 0; i < MAX_LEN; i++) {
        var choice = Math.floor((Math.random() * 4) + 1); // 1 - green, 2 - red, 3 - yellow, 4 - blue
        switch (choice) {
            case 1:
                sequence.push("green");
                break;
            case 2:
                sequence.push("red");
                break;
            case 3:
                sequence.push("yellow");
                break;
            case 4:
                sequence.push("blue");
                break;
        }
    }
}

function play_sound(button_id){
    switch(button_id){
        case "green":
            var awm = new Audio("./sounds/awm.mp3");
            awm.play();
            break;
            case "red":
            var akm = new Audio("./sounds/akm.mp3");
            akm.play();
            break;
        case "yellow":
            var sks = new Audio("./sounds/sks.mp3");
            sks.play();
            break;
            case "blue":
            var m416 = new Audio("./sounds/m416.mp3");
            m416.play();
            break;
    }
}

function playDeathSound() {
    var deathChoice = Math.floor(Math.random() * 4);
    var deathSound = new Audio(death_sound_effects[deathChoice]);
    deathSound.play();
}

function toggleSettings(){
    document.querySelector(".left-space").classList.toggle("hidden");
    document.querySelector(".slider").classList.toggle("hidden");
}

