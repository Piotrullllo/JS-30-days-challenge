const speed =  document.querySelector(".speed");
const speedAmount = document.querySelector(".speed-amount");
const video = document.querySelector(".video");
const wrapper = document.querySelector(".wrapper");

let speedPercentage;
let speedValue;

function handleSpeedValueChange(){
    if(speedPercentage < 8){
        speedPercentage = 8;
    } else if(speedPercentage > 100){
        speedPercentage = 100;
    }
    speedValue = (speedPercentage*4/100).toFixed(1);
    speedAmount.style.width = `${speedPercentage}%`;
    speedAmount.innerHTML = `${speedValue}x`;
    video.playbackRate = speedValue;
}

speed.addEventListener("mousemove", event => {
    speedPercentage = Math.round(event.layerX/speed.getBoundingClientRect().width*100);
    handleSpeedValueChange();
});
speed.addEventListener("touchmove", event => {
    speedPercentage = Math.round((event.targetTouches[0].pageX-speed.getBoundingClientRect().left)/speed.getBoundingClientRect().width*100);
    handleSpeedValueChange();
});

function changeElementsSize(){
    if(window.innerWidth < 1054){
        video.style.width = `${window.innerWidth-30}px`;
    } else {
        video.style.width = '1024px';
    }
    speed.style.width = `${video.getBoundingClientRect().width}px`;
}

window.addEventListener("load", changeElementsSize);
window.addEventListener("resize", changeElementsSize);