const pics = document.querySelectorAll("img");
const toggleMenu = document.querySelector(".icon");
const links = document.querySelectorAll("nav .link");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navOffset = document.querySelector(".navOffset");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");

let menuStatus = false;


function picGen(){
    pics.forEach(pic => {
        let seed = Math.floor(Math.random() * (99999 - 1)) + 1;
        pic.setAttribute('src',`https://picsum.photos/seed/${seed}/320/240`);
    })
};

function handleToggle(){
    if(!menuStatus){
        links.forEach(link => {
            toggleMenu.innerHTML = "▲";
            link.classList.add("responsive");
        });

    }
    else {
        links.forEach(link => {
            toggleMenu.innerHTML = "▼";
            link.classList.remove("responsive");
        });
    }
    menuStatus = !menuStatus;
}

function fixNav(){
    if(header.getBoundingClientRect().bottom <= 0){
        nav.classList.add("fixedNav");
        navOffset.style.display = "block";

    } else {
        nav.classList.remove("fixedNav");
        navOffset.style.display = "none";
    }
}

function changeLogoPosition(){
    if(header.getBoundingClientRect().bottom <= 1){
        if(header.getBoundingClientRect().bottom >= -251){
            let logoPosition = Math.abs(100*header.getBoundingClientRect().bottom/180);
            if(window.innerWidth > 820){
                menu.style.marginLeft = `${logoPosition-10}px`;
            } else {
                menu.style.marginLeft = 0;
            }
            logo.style.transform = `translateX(${logoPosition-150}%)`;
        } else if(header.getBoundingClientRect().bottom < -251){
            if(window.innerWidth > 820){
                menu.style.marginLeft = `130px`;
            } else {
                menu.style.marginLeft = 0;
            }
            logo.style.transform = `translateX(-10%)`;
        }
    } else {
        menu.classList.remove("menuOffset");
        logo.style.transform = `translateX(${-150}%)`;
    }
}


toggleMenu.addEventListener("click", handleToggle);
window.addEventListener("load", picGen);
window.addEventListener("scroll",() => {
    fixNav();
    changeLogoPosition();
});
window.addEventListener("resize",() => {
    fixNav();
    changeLogoPosition();
});