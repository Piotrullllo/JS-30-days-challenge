// start with strings, numbers and booleans
//numbers
const number = 6;
let numberCopy = number;

console.group("Numbers:");
console.log("Number before changing copy:");
console.log(number);
console.log(numberCopy);

numberCopy = 3;

console.log("Number after changing copy:");
console.log(number);
console.log(numberCopy);
console.groupEnd("Numbers:");

//strings
const string = "Some string";
let stringCopy = string;

console.group("Strings:");
console.log("String before changing copy:");
console.log(string);
console.log(stringCopy);

stringCopy = "Some other string";

console.log("String after changing copy:");
console.log(string);
console.log(stringCopy);
console.groupEnd("Strings:");

//booleans
const boolean = true;
let booleanCopy = boolean;

console.group("Booleans:");
console.log("Boolean before changing copy:");
console.log(boolean);
console.log(booleanCopy);

booleanCopy = false;

console.log("Boolean after changing copy:");
console.log(boolean);
console.log(booleanCopy);
console.groupEnd("Booleans:");

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
let playersCopy = players;

console.group("Arrays (reference):");
console.log("Arrays before changing 'copy':");
console.log(players);
console.log(playersCopy);

// You might think we can just do something like this:
playersCopy.push("JayJay");

// however what happens when we update that array?
console.log("Arrays after changing 'copy':");
console.error(playersCopy);

// now here is the problem!
console.error(players);
console.groupEnd("Arrays:");
// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!

// one way
let anotherPlayersCopy = [];
for (i = 0; i < players.length; i++) {
    anotherPlayersCopy[i] = players[i];
}

console.group("Arrays using loop:");
console.log("Arrays before changing copy:");
console.log(players);
console.log(anotherPlayersCopy);

anotherPlayersCopy.push("JSON");

console.log("Arrays after changing copy:");
console.log(players);
console.log(anotherPlayersCopy);
console.groupEnd("Arrays using loop:");

// or create a new array and concat the old one in
let concatPlayers = players.concat();

console.group("Arrays using concat:");
console.log("Arrays before changing copy:");
console.log(players);
console.log(concatPlayers);

concatPlayers.push("Chris");

console.log("Arrays after changing copy:");
console.log(players);
console.log(concatPlayers);
console.groupEnd("Arrays using concat:");

// or use the new ES6 Spread
let spreadPlayers = [...players];

console.group("Arrays using spread:");
console.log("Arrays before changing copy:");
console.log(players);
console.log(spreadPlayers);


// now when we update it, the original one isn't changed
spreadPlayers.push("Michael");

console.log("Arrays after changing copy:");
console.log(players);
console.log(spreadPlayers);
console.groupEnd("Arrays using concat:");
// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
    name: 'Wes Bos',
    age: 80
};

// and think we make a copy:
console.group("Object (reference):");
let personCopy = person;
console.log("Objects before changing 'copy':");
console.log(person);
console.log(personCopy);

console.log("Objects after changing 'copy':");
personCopy.age = 30;
console.error(person);
console.error(personCopy);
console.groupEnd("Object (reference):");
// how do we take a copy instead?
console.group("Object using Object.assign():");
let anotherPersonCopy = Object.assign({}, person);

console.log("Objects before changing copy:");
console.log(person);
console.log(anotherPersonCopy);

console.log("Objects after changing copy:");

anotherPersonCopy.age = 36;
console.log(person);
console.log(anotherPersonCopy);
console.groupEnd("Object (reference):");

console.group("Object using JSON:");
let JSONPersonCopy = JSON.parse(JSON.stringify(person));

console.log("Objects before changing copy:");
console.log(person);
console.log(JSONPersonCopy);

console.log("Objects after changing copy:");

JSONPersonCopy.name = "Jason";

console.log(person);
console.log(JSONPersonCopy);
console.groupEnd("Object (reference):");
// We will hopefully soon see the object ...spread

console.group("Object using spread:");
let spreadPerson = {
    ...person
};

console.log("Objects before changing copy:");
console.log(person);
console.log(spreadPerson);

console.log("Objects after changing copy:");

spreadPerson.name = "Jerry";
spreadPerson.age = 72;

console.log(person);
console.log(spreadPerson);
console.groupEnd("Object using spread:");

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.