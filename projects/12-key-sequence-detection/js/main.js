const theCode = ["j", "a", "v", "a", "s", "c", "r", "i", "p", "t"];
const paragraphs = document.querySelectorAll("p");
let doneFlag = false;
let i = 0;
let j = 0;

paragraphs[0].setAttribute("secretCode", theCode.join(""));

function changeBackground(){
    let r = Math.floor(Math.random() * 128);
    let g = Math.floor(Math.random() * 128);
    let b = Math.floor(Math.random() * 128);
    document.querySelector("body").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function changeDots(){
    let dots = "";
    if(j == 0){
        dots = "";
        j++;
    } else if (j == 1){
        dots = "."
        j++;
    } else if (j == 2){
        dots = ".."
        j++;
    } else {
        dots = "..."
        j = 0;
    }
    paragraphs[1].innerHTML = `> Formating drive C: ${dots}`;
    paragraphs[2].innerHTML = `> Tracking IP address${dots}`;
}

function sequenceDetection(e){
    if(doneFlag == true) return;
    if(i == (theCode.length - 1) && e.key.toUpperCase() == theCode[i].toUpperCase()){
        doneFlag = true;
        for(paragraph of paragraphs){
            paragraph.classList.add("glitchedText");
            paragraph.style.opacity = 0.8;
        }
        setInterval(changeBackground, 300);
        setTimeout(() => {
            paragraphs[0].innerHTML = "> YOU'VE GOT HACKED, MUAHAHAHAHAHA";
            paragraphs[1].innerHTML = "> Formating drive C: ";
            paragraphs[2].innerHTML = "> Tracking IP address";
            paragraphs[3].querySelector('a').innerHTML = "CLICK HERE TO GO BACK!!!";
        }, 500);
        setInterval(changeDots, 300);
        return;
    } else {
        if(e.key == theCode[i] || e.key.toUpperCase() == theCode[i].toUpperCase()){
            i++;
        } else {
            i = 0;
        }
    }
}

window.addEventListener('keyup', sequenceDetection);