function playSound(keynr){
    const audio = document.querySelector(`audio[data-key="${keynr}"]`);
    const key = document.querySelector(`.key[data-key="${keynr}"]`);
    if(!audio)return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}
function removeTransition(e){
    if(e.propertyName !== 'transform')return
    this.classList.remove('playing');
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => {
    key.addEventListener('click', function () {
        const btn = this.getAttribute('data-key');
        playSound(btn);
    });
    key.addEventListener('transitionend', removeTransition);
});

window.addEventListener('keydown', (e) => {
    const key = e.keyCode;
    playSound(key);
});