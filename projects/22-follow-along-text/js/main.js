const container = document.getElementById("container");
const backgroundDiv = document.querySelector(".backgroundDiv");
let paddingVal = 5;
let prevHover;
let interval;

function resizeDiv(top, left, width, height){
    if(!top){
        backgroundDiv.style.top = `-100%`;
    } else {
        backgroundDiv.style.top = `${top-paddingVal}px`;
    }
    if(!left){
        backgroundDiv.style.left = `-100%`;
    } else {
        backgroundDiv.style.left = `${left-paddingVal}px`;
    }
    backgroundDiv.style.width = `${width}px`;
    backgroundDiv.style.height = `${height}px`
    backgroundDiv.style.padding = `${paddingVal}px`;
}

function restoreColor(){
    if(prevHover){
        if(prevHover.tagName == "A"){
            prevHover.style.color = "cyan";
        } else {
            prevHover.style.color = "white";
        }
    }
}

function hideBackgroundDiv(){
    resizeDiv(null,null,0,0);
    clearInterval(interval);
    restoreColor();
    prevHover = null;
}

window.addEventListener('scroll', e => {
    e.preventDefault();
})

container.addEventListener('mouseover', event => {
    clearInterval(interval);
    if(event.target.id == "container" || event.target.tagName == "UL"){
        hideBackgroundDiv();
        return;
    };
    restoreColor();
    prevHover = event.target;
    event.target.style.color = "black";
    let top;
    let left;
    let width;
    let height;
    interval = setInterval(() => {
        top = event.target.getBoundingClientRect().top;
        left = event.target.getBoundingClientRect().left;
        if(left == 0)left = -1;
        width = event.target.getBoundingClientRect().width;
        height = event.target.getBoundingClientRect().height;
        resizeDiv(top, left, width, height);
    }  
    , 1)
});

container.addEventListener("mouseleave", hideBackgroundDiv);

document.querySelector("#container a").addEventListener('click', e =>{
    e.preventDefault();
});