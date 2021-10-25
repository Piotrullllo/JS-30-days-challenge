const list = document.querySelector(".bands");
const sortModeBtn = document.querySelector(".toggle-sort");
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
let toggleSort = true;

function delArticle(string){
    if(string.search(/the /i) == 0) return string.substring(4);
    else if (string.search(/an /i) == 0) return string.substring(3);
    else if (string.search(/a /i) == 0) return string.substring(2);
    else return string;
}        

function sortBands(){
    list.innerHTML = "";
    bands.sort((a,b) => {
        let stringA = delArticle(a);
        let stringB = delArticle(b);
        if(toggleSort){
            if (stringA > stringB) return 1;
            else if (stringA < stringB) return -1;
            else return 0;
        } else {
            if (stringA > stringB) return -1;
            else if (stringA < stringB) return 1;
            else return 0;
        }
    });
    bands.forEach(band => {
        const element = document.createElement("li");
        element.innerHTML = band;
        list.appendChild(element);
    });
}

window.addEventListener('load', sortBands);
sortModeBtn.addEventListener('click',() => {
    toggleSort = !toggleSort;
    sortBands();
    if(toggleSort)sortModeBtn.innerHTML = "Sorting mode: ascending";
    else sortModeBtn.innerHTML = "Sorting mode: descending"
});