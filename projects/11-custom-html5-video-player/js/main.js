const player = document.querySelector(".player");
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const muteBtn = player.querySelector('.toggleMute');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
let videoVolume = 1;
let fullscreenFlag = false;

function toggleMute(){
    if(video.volume > 0){
        videoVolume = video.volume;
        video.volume = 0;
        volRangeRefresh(0);
        muteBtn.innerHTML = "🔇";
    } else {
        video.volume = videoVolume;
        volRangeRefresh(videoVolume);
        muteBtn.innerHTML = "🔉";
    }
}
function togglePlay(){
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}

function updateButton(){
    if(this.paused){
        toggle.innerHTML = "▶️";
    } else {
        toggle.innerHTML = "⏸️";
    }
}

function skip(){
    let skipTime = parseInt(this.getAttribute('data-skip'));
    video.currentTime += skipTime;
}

function handleRangeUpdate(){
    if(this.name == "volume"){
        video.volume = this.value;
        this.value == 0 ? muteBtn.innerHTML = "🔇" : muteBtn.innerHTML = "🔉";
    } else if (this.name == "playbackRate"){
        video.playbackRate = this.value;
    }
}

function volRangeRefresh(volVal){
    for(el of ranges){
        if(el.name == "volume")el.value = volVal;
    }
}

setInterval(handleProgress, 500);

function handleProgress(){
    let percent = (video.currentTime/video.duration)*100;
    progressBar.style.width = `${percent}%`;
}

function handleProgressSkip(e){
    let progPercent = (e.layerX/progress.clientWidth)*100;
    video.currentTime = (progPercent.toFixed(2)*video.duration)/100;
    handleProgress();
}

toggle.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', toggleMute);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
progress.addEventListener('click', handleProgressSkip);

for (skipBtn of skipBtns){
    skipBtn.addEventListener('click', skip);
} 
for (range of ranges){
    range.addEventListener('change', handleRangeUpdate);
}
