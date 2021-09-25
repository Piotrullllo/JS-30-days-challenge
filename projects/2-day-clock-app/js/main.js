window.setInterval(timeCounter, 500);

const secondHand = document.getElementById("Component_5_1");
const minuteHand = document.getElementById("Component_6_1");
const hourHand = document.getElementById("Component_7_1");
const text = document.querySelector(".text");

function timeCounter(){
    let now = new Date;
    // let ms = now.getMilliseconds();
    let sec = now.getSeconds();
    let min = now.getMinutes();
    let hour = now.getHours();
    secondHand.style.transform = `rotate(${(sec*6)}deg)`;
    minuteHand.style.transform = `rotate(${(min*6)+(sec/10)}deg)`;
    hourHand.style.transform = `rotate(${(hour*30)+(min/2)}deg)`;
}


