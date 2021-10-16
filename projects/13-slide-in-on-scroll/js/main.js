const pics = document.querySelectorAll("img");
let lastKnownScrollPosition = 0;

function picGen(){
    pics.forEach(pic => {
        let seed = Math.floor(Math.random() * (99999 - 1)) + 1;
        pic.setAttribute('src',`https://picsum.photos/seed/${seed}/320/240`);
    })
};

function detectScrolling(e){
    if(lastKnownScrollPosition < window.scrollY){
        pics.forEach(pic => {
            if(pic.getBoundingClientRect().y <= (Math.ceil(window.innerHeight/1.5))){
                console.log("wysunięcie")
                if(pic.classList.contains('float-left')){
                    pic.classList.remove('hide-left');
                } else {
                    pic.classList.remove('hide-right');
                }
            }
        });
    } else {
        pics.forEach(pic => {
            if(pic.getBoundingClientRect().y >= Math.ceil(window.innerHeight/1.8)){
                console.log("wsunięcie")
                if(pic.classList.contains('float-left')){
                    pic.classList.add('hide-left');
                } else {
                    pic.classList.add('hide-right');
                }
            }
        });
    }
    lastKnownScrollPosition = window.scrollY;
};

window.addEventListener("load", picGen);
document.addEventListener('scroll', detectScrolling);