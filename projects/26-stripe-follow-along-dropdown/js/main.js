const listElements = document.querySelectorAll(".navigation>li");
const body = document.querySelector("body");
const dropdownBackground = document.querySelector(".dropdownBackground");
const arrow = document.querySelector(".arrow");
const dropdownContent = document.querySelector(".dropdownContent");

function changeDropdown(){
    dropdownContent.innerHTML = this.getElementsByClassName("hiddenContent")[0].innerHTML;
    let listElCenter = Math.round(this.getBoundingClientRect().left+ this.getBoundingClientRect().width/2); 
    dropdownBackground.style.transform = `translateX(${listElCenter-dropdownBackground.getBoundingClientRect().width/2}px)`;
    dropdownBackground.style.top = `${this.getBoundingClientRect().bottom}px`;
    arrow.style.top = `${-dropdownBackground.getBoundingClientRect().height}px`;
}

body.addEventListener("mouseover", event => {
    if(event.target.classList.contains("dropdownElement") || event.target.className == "dropdownBackground"){
        return;
    } else {
        dropdownBackground.style.transform = `translateX(-100%)`; 
    }
}, true)

listElements.forEach(element => {
    element.addEventListener("mouseover", changeDropdown);
});