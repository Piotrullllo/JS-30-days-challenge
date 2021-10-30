const wordBox = document.querySelector(".word-box");
const functionBtn = document.querySelector(".func-btn");
const clearBtn = document.querySelector(".clear");

let toggleMode = false;
let recognition;
let i = 0;
let j = 0;

if('SpeechRecognition' in window || 'webkitSpeechRecognition' in window){
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
} else {
    wordBox.innerHTML = "Unsupported browser";
}

recognition.onstart = () => {
    if(i == 0)wordBox.innerHTML = "";
    let paragraph = document.createElement('p');
    paragraph.classList.add(`recognition-${i}`)
    wordBox.appendChild(paragraph);
}
recognition.onend = () => {
    j = 0;
}

recognition.onresult = function(event){
    let thisPar = document.querySelector(`.recognition-${i}`);
    thisPar.innerHTML = event.results[j][0].transcript;
    thisPar.classList.add("grayed");
    if(event.results[j].isFinal){
        thisPar.innerHTML = event.results[j][0].transcript;
        thisPar.classList.remove("grayed");
        i++;
        j++;
        let paragraph = document.createElement('p');
        paragraph.classList.add(`recognition-${i}`)
        wordBox.appendChild(paragraph);
    }
};

function clearDiv(){
    i = 0;
    wordBox.innerHTML = "<p>Press the button below and say something...</p>"
}

function toggleRecognition(){
    if(!toggleMode){
        recognition.start();
        clearBtn.disabled = true;
        functionBtn.innerHTML = "Stop recognition";
    } else {
        recognition.stop();
        clearBtn.disabled = false;
        functionBtn.innerHTML = "Start recognition";
    }
    toggleMode = !toggleMode;
}

functionBtn.addEventListener('click', toggleRecognition);
clearBtn.addEventListener('click', clearDiv);

