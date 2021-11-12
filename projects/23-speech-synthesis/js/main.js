const synth = window.speechSynthesis;
let voices = [];

const voiceList = document.querySelector("#voice");
const text = document.querySelector("#text");
const speakBtn = document.querySelector("#speak");
const stopBtn = document.querySelector("#stop");
const ranges = document.querySelectorAll("input[type='range']");

let togglePause = false;

function loadVoices(){
    voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-name', voice.name);
        voiceList.appendChild(option)
    });
}

function tglPause(){
    if(!togglePause){
        speakBtn.innerHTML = "Resume";
        synth.pause();
    } else {
        speakBtn.innerHTML = "Pause";
        synth.resume();
    }
    togglePause = !togglePause;
}

function speakEnd(){
    speakBtn.removeEventListener("click", tglPause);
    speakBtn.innerHTML = "Speak";
    speakBtn.addEventListener('click', speak);
    stopBtn.disabled = true;
}

function speak(){
    let selectedOption = voiceList.selectedOptions[0].getAttribute('data-name');
    if(selectedOption == "null"){
        alert("No voice selected");
        return;
    }
    speakBtn.removeEventListener('click', speak);
    let speakThis = new SpeechSynthesisUtterance(text.value);
    voices.forEach(voice => {
        if(voice.name === selectedOption){
            speakThis.voice = voice;
        }
    });
    ranges.forEach(range => {
        if(range.id == "rate"){
            speakThis.rate = range.value;
        } else if(range.id == "pitch"){
            speakThis.pitch = range.value;
        }
    });
    stopBtn.disabled = false;
    speakBtn.innerHTML = "Pause";
    speakBtn.addEventListener("click", tglPause)
    synth.speak(speakThis);
    speakThis.onend = () => {
        speakEnd();
    }
}

function stop(){
    synth.cancel();
    speakEnd();
}

window.onload = function(){
    loadVoices();
}
speakBtn.addEventListener('click', speak);
stopBtn.addEventListener('click', stop);
