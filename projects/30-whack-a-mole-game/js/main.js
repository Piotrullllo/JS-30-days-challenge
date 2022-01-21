const scr = document.querySelector(".number");
const moles = document.querySelectorAll(".mole");

let holeNumber = moles.length;
let score = 0;
let hideTime = 400;
let hideFast = 250;
let moleReactionTimeMax = 250;
let moleReactionTimeMin = 60;
let maxTime = 2500;
let minTime = 800;

function randomTime(){
    return Math.floor(Math.random()*(maxTime-minTime)+minTime);
}

function hideOffset(){
    return Math.floor(Math.random()*(moleReactionTimeMax-moleReactionTimeMin)+moleReactionTimeMin);
}

function randomMole(){
    return Math.floor(Math.random()*(holeNumber-1));
}

function moleOut(){
    let moleNumber = randomMole();
    moles[moleNumber].style.transform = "translateY(0)";
    setTimeout(() => {
        moles[moleNumber].style.transform = "translateY(120px)";
    }, randomTime())
}

function killMole(){
    this.removeEventListener('click', killMole);
    this.style.backgroundImage = `url("images/deadMole.gif")`;
    this.classList.add("killed");
    this.style.transitionDuration = `.${hideTime}s`;
    this.style.transform = "translateY(150px)";
    score++;
    scr.textContent = score;
    setTimeout(() => {
        this.addEventListener('click', killMole);
        this.classList.remove("killed");
        this.style.backgroundImage = `url("images/mole.gif")`;
    }, hideTime+100);
}

function hideMole(){
    if(this.classList.contains("killed"))return;
    this.style.transitionDuration = `.${hideFast}s`;
    setTimeout(() => {
        this.style.transform = "translateY(150px)";
        this.style.transitionDuration = `.${hideTime}s`;
    }, hideOffset());
}

setInterval(() => {
    moleOut();
}, maxTime+hideTime);

moles.forEach(mole => {
    mole.addEventListener("click", killMole);
    mole.addEventListener("mouseover",hideMole);
});