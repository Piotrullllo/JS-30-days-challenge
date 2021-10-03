const dogs = [{ name: "Snickers", age: 2}, {name: "Hugo", age: 8}];
const paragraph = document.querySelector('.test');
let flag = false;
const poop = '💩💩💩';

function makeGreen(){
    if(!flag){
        flag = !flag;
        paragraph.style.color = '#BADA55';
        paragraph.style.fontSize = '50px';
    } else {
        flag = !flag;
        paragraph.style.color = 'white';
        paragraph.style.fontSize = '20px';
    }
}

// Console.logs:
// Clearing
console.clear();

// Regular
console.log("Hello");

// Interpolated
console.log('Hello I am a %s string!', '💩💩💩');
console.log(`Hello I am a ${poop} string!`);

//Styled
console.log("%c I am some 'special' text", 'font-size: 30px; color: green; background-color: silver; text-shadow: 5px 5px 0 black;');

// Warning!
console.warn("OH NOOOOO!");

// Error :-/
console.error("Error 404");

// Info
console.info("Crocodiles eat 3-4 people per year");

//Testing
console.assert(paragraph.classList.contains('ouch'), "That is wrong! :-(");

// Viewing DOM Elements
console.log(paragraph);
console.dir(paragraph);

// Grouping 💩 together
dogs.forEach(dog =>{
    console.groupCollapsed(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.groupEnd(`${dog.name}`);
});

// Counting
console.count("Wes");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Steve");
console.count("Steve");
console.count("Wes");
console.count("Wes");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Steve");
console.count("Wes");
console.count("Wes");
console.count("Steve");
console.count("Steve");
console.count("Steve");

// Timing
console.time('Fetching data...');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data =>{
        console.timeEnd("Fetching data...");
        console.log(data);
    });

// Table
console.table(dogs);