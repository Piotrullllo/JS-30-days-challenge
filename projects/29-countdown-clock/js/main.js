const listItems = document.querySelectorAll(".options li a");
const ul = document.querySelector(".options ul");
const inputMins = document.querySelector(".options input");
const countdownTimer = document.querySelector(".countdown");
const beBackAt = document.querySelector(".be-back-at");
const container = document.querySelector(".container");
const toggle = document.querySelector(".options .toggle");
const clock = [document.querySelector(".seconds"), document.querySelector(".minutes"), document.querySelector(".hours")];

let time = [];
let countdownTime = [0,0,0]
let hours = 0;
let minutes = 0;
let seconds = 0;
let blinking;
let blnk = false;
let countingDown;

function getDataFromInput(mins){
    window.clearInterval(countingDown);
    stopBlinking();
    countdownTime[2] = Math.floor(mins/60);
    countdownTime[1] = mins%60;
    countdownTime[0] = 0;
    setClock();
    setTimer();
    countingDown = window.setInterval(countdown, 1000);
}

function stopBlinking(){
    const button = document.querySelector(".stop-blinking");
    if(button != null){
        window.clearInterval(blinking);
        beBackAt.style.color = "black";
        countdownTimer.style.color = "black";
        button.removeEventListener("click", stopBlinkingUsingButton);
        button.remove();
    }
}

function getDataFromLink(){
    window.clearInterval(countingDown);
    stopBlinking();
    countdownTime[2] = Math.floor(parseInt(this.getAttribute("data-minutes"))/60);
    countdownTime[1] = parseInt(this.getAttribute("data-minutes"))%60;
    countdownTime[0] = parseInt(this.getAttribute("data-seconds"));
    setClock();
    setTimer();
    countingDown = window.setInterval(countdown, 1000);
}

function setClock(){
    const now = new Date();
    time[0] = now.getSeconds();
    time[1] = now.getMinutes();
    time[2] = now.getHours();
    for(i=0;i<time.length;i++){
        time[i] += countdownTime[i];
    }
    for(i=0;i<time.length;i++){
        if(i<2 && time[i] >= 60){
            time[i+1] += Math.floor(time[i]/60);
            time[i] = time[i]%60;
        } else if (i == 2 && time[i] >= 24){
            time[i] = time[i]%24;
        }
    }
    for(i=0;i<time.length;i++){
        fillClock(time[i], i);
    }
}

function fillClock(value, index){
    let data;
    if(value < 10){
        data = `0${value}`;
    } else {
        data = `${value}`;
    }
    clock[index].innerHTML = data;
}

function setTimer(){
    let actualCountdown = [];
    for(i=0;i<2;i++){
        if(countdownTime[i]<10){
            actualCountdown[i] = `0${countdownTime[i]}`;
        } else {
            actualCountdown[i] = `${countdownTime[i]}`;
        }
    }
    countdownTimer.innerHTML = `${countdownTime[2]}:${actualCountdown[1]}:${actualCountdown[0]}`
}

function blink(){
    if(!blnk){
        countdownTimer.style.color = "red";
        beBackAt.style.color = "black";
        blnk = !blnk;
    } else {
        countdownTimer.style.color = "black";
        beBackAt.style.color = "red";
        blnk = !blnk;
    }
}

function countdown(){
    if(countdownTime[0] > 0){
        countdownTime[0]--;
    } else if(countdownTime[0] == 0 && countdownTime[1] > 0){
        countdownTime[1]--;
        countdownTime[0] = 59;
    }  else if(countdownTime[0] == 0 && countdownTime[1] == 0 && countdownTime[2] > 0){
        countdownTime[2]--;
        countdownTime[1] = 59;
        countdownTime[0] = 59;
    }
    else {
        window.clearInterval(countingDown);
        let stopBlnk = document.createElement("button");
        stopBlnk.innerHTML = "Stop blinking";
        stopBlnk.classList.add("stop-blinking");
        stopBlnk.addEventListener("click", stopBlinkingUsingButton);
        container.appendChild(stopBlnk);
        blinking = window.setInterval(blink, 200);
    }
    setTimer();
}

function stopBlinkingUsingButton(){
    this.removeEventListener("click", stopBlinkingUsingButton);
    window.clearInterval(blinking);
    beBackAt.style.color = "black";
    countdownTimer.style.color = "black";
    this.remove();
}

function handleToggle(){
    ul.classList.toggle("responsive");
    if(ul.classList.contains("responsive")){
        toggle.innerHTML = "▲";
    } else {
        toggle.innerHTML = "▼";
    }
}

listItems.forEach(item => {
    item.addEventListener("click", getDataFromLink);
});

toggle.addEventListener("click", handleToggle)

inputMins.addEventListener("keypress", e => {
    if(e.code === "Enter" || e.code === ""){
        const inputInt = parseInt(inputMins.value);
        if(!isNaN(inputInt)&&inputInt >= 1&&inputInt<=1440){
            getDataFromInput(inputInt);
        } else {
            alert("Please input integer value between 1 and 1440");
        }
        inputMins.value = "";
    }
});