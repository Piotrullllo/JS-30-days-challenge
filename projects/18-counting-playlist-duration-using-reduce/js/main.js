function calculateVideosDuration(){
    const videos = document.querySelectorAll(".videos li"); //.ytd-thumbnail .ytd-thumbnail-overlay-time-status-renderer for YouTube;
    const secondArr = [];
    videos.forEach(video =>{
        let vidLength = video.dataset.time.replace(/\s+/g, ''); //video.textContent.replace(/\s+/g, '') for Youtube
        const secs = vidLength.substring(vidLength.length - 2);
        const mins = vidLength.substring(vidLength.length - 5, vidLength.length - 3);
        const hour = vidLength.substring(0, vidLength.length - 6);
        secondArr.push(Number(secs));
        secondArr.push(Number(mins)*60);
        secondArr.push(Number(hour)*3600);
    });

    let seconds = secondArr.reduce(function(totalSec, currentSec){
        return totalSec + currentSec;
    });
    let minutes = 0;
    let hours = 0;
   
    function addZero(val){
        if(val < 10){
            return `0${val}`; 
        } else {
            return val;
        }
    }

    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
    
    let secStr = addZero(seconds);
    let minStr = addZero(minutes);

    //console.log(`Videos duration: ${hours}:${minStr}:${secStr}`);
    document.querySelector(".counter").innerHTML = `${hours}:${minStr}:${secStr}`;
}

function generateVideoThumbnails(){
    const videos = document.querySelectorAll(".videos li");
    videos.forEach(video => {
        let title = document.createElement("h3");
        title.innerHTML = video.innerHTML;
        title.classList.add("title");
        video.innerHTML = "";
        let pic = document.createElement("img");
        let picDiv = document.createElement("div");
        let seed = Math.floor(Math.random() * (99999 - 1)) + 1;
        picDiv.classList.add("thumbnail")
        pic.setAttribute('src',`https://picsum.photos/seed/${seed}/160/120`);
        video.appendChild(picDiv);
        picDiv.appendChild(pic);
        let duration = document.createElement("span");
        duration.innerHTML = video.dataset.time;
        duration.classList.add("duration");
        picDiv.appendChild(duration);
        video.appendChild(title);
    });
}

window.addEventListener('load', generateVideoThumbnails);