/*Score Board*/
let userpoint= 0;
let pcpoint= 0;
const userpoint_0= document.getElementById("user-0")
const pcpoint_0= document.getElementById("pc-0")
/*Phrase "Make your choice:"*/
const result_= document.querySelector(".result > p");
/*Icons (Font Awesome) - Hands in the shape of rock, paper, scissors, lizard, spock*/
const rock= document.getElementById("Rock");
const paper= document.getElementById("Paper");
const scissors= document.getElementById("Scissors");
const lizard= document.getElementById("Lizard");
const spock= document.getElementById("Spock");
/*Choose the number of matches:*/
let n_matches= 0;
let limit= 0;
const three_= document.getElementById("three");
const five_= document.getElementById("five");
const infinity_= document.getElementById("infinity");
/*Start Game*/
function playMatch() {
    const choices = document.querySelectorAll(".choices i");
    const userhand = document.querySelector(".user-hand");
    const pchand = document.querySelector(".pc-hand");
    const hands = document.querySelectorAll(".center-hands img");
    /*Hands animation*/
    hands.forEach(hand => {hand.addEventListener("animationend", function() {this.style.animation = "";});});
    /*Defines number of plays*/
    let mylimit = sessionStorage.getItem('mylimit');
    choices.forEach(choice => {choice.addEventListener("click", function(){
        if (n_matches < mylimit){
            /*Randomly chooses a PC move*/
            const choicespc = ["Rock","Paper","Scissors","Lizard","Spock"];
            const random_n= (Math.floor(Math.random()*5));
            const pcchoice = choicespc[random_n];
            /*The current image of the closed hands will be replaced by another one according to the user's choice.*/
            setTimeout(() => {
                compareHands(this.id, pcchoice);
                userhand.src = `../Hands/${this.id}.png`;
                pchand.src = `../Hands/${pcchoice}.png`;
            }, 2000);
            /*Animation of hands*/
            userhand.style.animation = "shakeUser 2s ease";
            pchand.style.animation = "shakePC 2s ease";
        }
        else {return}
    });});};
/*User score update*/
function updateUser(){
    userpoint++;
    userpoint_0.innerHTML= userpoint;
};
/*PC score update*/
function updatePC(){
    pcpoint++;
    pcpoint_0.innerHTML= pcpoint;
};
const compareHands = (userchoice, pcchoice) => {
    /*Sentence to inform the player who won the point*/
    function pUser(){result_.textContent=`Your ${userchoice} beats PC's ${pcchoice}. You Win!`}
    function pPC(){result_.textContent=`Your ${userchoice} loses to PC's ${pcchoice}. You Lost!`}
    /*compare the PC's choice with the user's and update the points*/
    if(userchoice === pcchoice){result_.textContent="It's a DRAW!";}
    else if(userchoice === "Rock"){n_matches++;
        if(pcchoice === "Scissors" || pcchoice === "Lizard"){pUser(); updateUser();} else{pPC(); updatePC();}}
    else if(userchoice === "Paper"){n_matches++;
        if(pcchoice === "Rock" || pcchoice === "Spock"){pUser(); updateUser();} else{pPC(); updatePC();}}
    else if(userchoice === "Scissors"){n_matches++;
        if(pcchoice === "Paper" || pcchoice === "Lizard"){pUser(); updateUser();} else{pPC(); updatePC();}}
    else if(userchoice === "Lizard"){n_matches++;
        if(pcchoice === "Paper" || pcchoice === "Spock"){pUser(); updateUser();} else{pPC(); updatePC();}}
    else if(userchoice === "Spock"){n_matches++;
        if(pcchoice === "Scissors" || pcchoice === "Rock"){pUser(); updateUser();} else{pPC(); updatePC();}}
}
/*Define the number of moves*/
function choose_matches(){
    three_.addEventListener('click', function(){limit=3; sessionStorage.setItem('mylimit', limit);})
    five_.addEventListener('click', function(){limit=5; sessionStorage.setItem('mylimit', limit);})
    infinity_.addEventListener('click', function(){limit=9999; sessionStorage.setItem('mylimit', limit);})
}
try {choose_matches();}
catch(err) {playMatch();}