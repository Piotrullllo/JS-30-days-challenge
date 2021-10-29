const video = document.querySelector("video");
const takePht = document.querySelector(".takePht")
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');
const ranges = document.querySelectorAll('.controls input')
const photos = document.querySelector(".photos");
const audio = new Audio('sounds/shutter.mp3');
const cameraOptions = document.querySelector('.video-options>select');
const toggleGhosting = document.querySelector('.toggleGhosting');
const toggleGreenScreen = document.querySelector('.greenscr');

let ghostingMode = false;
let greenScreenMode = false;
let interval;
let nameDate;
let r = 0;
let g = 0;
let b = 0;
let rOffset = 0;
let gOffset = 0;
let bOffset = 0;

let minRed = 0;
let minGreen = 0;
let minBlue = 0;
let maxRed = 255;
let maxGreen = 255;
let maxBlue = 255;

function resizeCanvas(){
    if(window.orientation == 0){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = (window.innerWidth/3)*5;
    } else {
        if(window.innerWidth <= 800){
            if(window.orientation == 90 || window.orientation == -90){
                ctx.canvas.width  = (window.innerHeight/3)*4;
                ctx.canvas.height = window.innerHeight;
            } else {
                ctx.canvas.width  = window.innerWidth;
                ctx.canvas.height = (window.innerWidth/4)*3;
            }
        } else {
            ctx.canvas.width  = 800;
            ctx.canvas.height = 600;
        }
    }
}

function filters(){
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    if(!ghostingMode){
        toggleGhosting.innerHTML = "Enable Ghosting";
        for (i = 0; i < data.length; i += 4) {
            data[i + (rOffset * 4)] = r + data[i];     
            data[i + 1 + (gOffset * 4)] = g + data[i + 1]; 
            data[i + 2 + (bOffset * 4)] = b + data[i + 2];
        }
        ctx.globalAlpha = 1;
        ranges.forEach(range => {
            range.disabled = false;
        });
    } else {
        toggleGhosting.innerHTML = "Disable Ghosting";
        for (i = 0; i < data.length; i += 4) {
            data[i] = r + data[i];     
            data[i + 1] = g + data[i + 1]; 
            data[i + 2] = b + data[i + 2];
        }
        ctx.globalAlpha = 0.1;
        ranges.forEach(range => {
            range.disabled = true;
        });
    }
    if(greenScreenMode){
        for (i = 0; i < data.length; i += 4) {
            const red = data[i + 0];
            const green = data[i + 1];
            const blue = data[i + 2];
            if ((red < maxRed && green < maxGreen && blue < maxBlue) || (red > minRed && green > minGreen && blue > minBlue)) {
              data[i + 3] = 0;
            } 
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function videoDraw(){
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    filters();
}
function captureVideo(){
    resizeCanvas();
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function success(stream){
    video.srcObject = stream;
    video.play();
    });
    interval = setInterval(() => {
        videoDraw();
    }, 1000/60);
}

function stopCanvas(){
    clearInterval(interval);
    setTimeout(() => {
        interval = setInterval(() => {
            videoDraw();
        }, 1000/60);
    }, 1000);
}

function nameGenerator(){
    let date = new Date;
    nameDate = date.getFullYear()+'_'+(date.getMonth()+1)+'_'+date.getDate()+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds();
}

function handleUpdate(){
    switch (this.name){
        case "red":
            r = parseInt(this.value);
            break;
        case "green":
            g = parseInt(this.value);
            break;
        case "blue":
            b = parseInt(this.value);
            break;
        case "redoffset":
            rOffset = parseInt(this.value);
            break;
        case "greenoffset":
            gOffset = parseInt(this.value);
            break;
        case "blueoffset":
            bOffset = parseInt(this.value);
            break;
        case "minRed":
            minRed = parseInt(this.value);
            break;
        case "minGreen":
            minGreen = parseInt(this.value);
            break;
        case "minBlue":
            minBlue = parseInt(this.value);
            break;
        case "maxRed":
            maxRed = parseInt(this.value);
            break;
        case "maxGreen":
            maxGreen = parseInt(this.value);
            break;
        case "maxBlue":
            maxBlue = parseInt(this.value);
            break;
    }
}

ranges.forEach(range => range.addEventListener('change', handleUpdate));

takePht.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
    stopCanvas();
    let image_data_url = canvas.toDataURL('image/jpeg');
    canvas.href = image_data_url;
    nameGenerator()
    photos.innerHTML += `<a download="IMG${nameDate}.jpg" href=${image_data_url}><img src="${image_data_url}"/>`;
});

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', captureVideo);
toggleGhosting.addEventListener('click',() => {
    ghostingMode = !ghostingMode;
});
toggleGreenScreen.addEventListener('click',() => {
    greenScreenMode = !greenScreenMode;
    if(greenScreenMode)toggleGreenScreen.innerHTML="Disable greenscreen";
    else toggleGreenScreen.innerHTML="Enable greenscreen"
});
window.addEventListener("orientationchange", resizeCanvas);