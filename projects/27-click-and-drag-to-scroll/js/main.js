const itemContainer = document.querySelector(".items");
let lastPosition;
let offset;
let toggleScroll = false;
let interval;

function stopScrolling(){
    toggleScroll = false;
    itemContainer.style.background = "rgba(255,255,255,0.2)";
    itemContainer.style.transform = "";
    itemContainer.style.cursor = "grab"
    interval = window.setInterval(() => {
        if(offset < -3){
            offset += 3;
        } else if (offset > 3){
            offset -= 3;
        } else {
            offset = 0;
            window.clearInterval(interval);
        }
        offset = Math.round(offset);
        itemContainer.scrollBy(offset,0);
    }, 1000/60)
}

itemContainer.addEventListener("mousedown", event => {
    if(event.target.className != "item"){
        itemContainer.style.background = "rgba(255,255,255,0.6)";
        itemContainer.style.transform = "scale(1.01)";
        window.clearInterval(interval);
        itemContainer.style.cursor = "grabbing";
        toggleScroll = true;
        lastPosition = event.offsetX;
    }
}, useCapture = true);

itemContainer.addEventListener("mousemove", event => {
    if(toggleScroll && event.target.className != "item"){
        offset = (lastPosition-event.offsetX);
        itemContainer.scrollBy(offset*1.5,0);
        lastPosition = event.offsetX;
    }
});

itemContainer.addEventListener("mouseup", stopScrolling);
window.addEventListener("mouseleave", stopScrolling);

function itemsGenerator(){
    for(i=0;i<52;i++){
        const item = document.createElement("div");
        item.setAttribute("class", "item");
        let r = Math.floor(Math.random()*(255 - 128)) + 128;
        let g = Math.floor(Math.random()*(255 - 128)) + 128;
        let b = Math.floor(Math.random()*(255 - 128)) + 128;
        item.setAttribute("style", `background-color: rgb(${r},${g},${b});`);
        itemContainer.appendChild(item);
        if(i+1<10){
            item.innerHTML = `0${i+1}`;
        } else {
            item.innerHTML = i+1;
        }
    }
}

window.addEventListener("load", itemsGenerator);
