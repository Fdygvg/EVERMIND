**QUESTION:** How do you write square root, power (^), and round off in JavaScript?

**ANSWER:**

- **Square root:** Use `Math.sqrt(number)` → Example: `Math.sqrt(9)` gives `3`.
- **Power (^):** Use `Math.pow(base, exponent)` → Example: `Math.pow(2, 3)` gives `8`.
- **Round off:** Use `Math.round(number)` → Example: `Math.round(4.6)` gives `5`.

QUESTION: Write a sample black jack card counter js
ANSWER:
var count = 0;
function cardCount(card) {
switch (card) {
case 2:
case 3:
case 4:
case 5:
case 6:
count++;
break;
case 10:
case "J":
case "Q":
case "K":
case "A":
count--;
break;
default:
return "invalid";
}

var holdbet = 'Hold';
if (count > 0) {
holdbet = 'Bet';
}

return count + " " + holdbet;
}
console.log(cardCount(2));
console.log(cardCount('K'));
console.log(cardCount(10));
console.log(cardCount('K'));
console.log(cardCount('A'));
console.log(cardCount(4));

QUESTION: Give and example of an object contain, string , array , booblean, number
ANSWER:var ourdog = {
name: "Camper",
legs: 4,
eyes: 2,
tail: 1,
friends: ["john", "mark", "mary"],
straight: true,
};

console.log(JSON.stringify(ourdog));

QUESTION:how do you access the values of objects

ANSWER:With Dot Notation ,--var testObj = {
Shirt: "blue",
Trousers: "red",
Cap: "orange"
};

var shirtColor = testObj.Cap
console.log(JSON.stringify(shirtColor));
console.log(JSON.stringify(testObj.Shirt));

OR WITH BRACKET NOTATION
var testObj = {
"The Trousers": "red",
"The Cap": "orange",
"The Shirt\" ": "blue"
};

var capColor = testObj["The Cap"];

console.log(capColor);

QUESTION: How do you access object properties with variables
ANSWER:
var testObj = {
"The Trousers": "red",
"The Cap": "orange",
"The Shirt\" ": "blue",
16: "A Number"
};

var playerNumber = 16;
var player = testObj[playerNumber];
console.log(player)
var capColor = testObj["The Cap"];
console.log(capColor);

QUESTION: How do you update object property
ANSWER: var ourDog = {
name: "Camper",
legs: 4,
eyes: 2,
tail: 1,
friends: ["john", "mark", "mary"],
straight: true,
};

ourDog.name = "Happy Camper"

console.log(JSON.stringify(ourDog))

QUESTION: How to add new properties to an object
ANSWER: var ourDog = {
name: "Camper",
legs: 4,
eyes: 2,
tail: 1,
friends: ["john", "mark", "mary"],
straight: true,
};

ourDog.bark = "RUFF RUFF!"

QUESTION: How to delete properties from objects
ANSWER: var ourDog = {
name: "Camper",
legs: 4,
eyes: 2,
tail: 1,
friends: ["john", "mark", "mary"],
straight: true,
bark: "WOOF!";
};

delete ourDog.bark;

QUESTION: How do you use objects for lookups instead of switch statements
ANSWER:function phoneticLookUp1(val){
let answer;
switch(val){
case 1:
answer = "one"
break;
case 2:
answer = "two"
break;
case 3:
answer = "three"
break;
default:
answer = "errr"

};
return answer;
}

console.log(phoneticLookUp1(3))

WITH OBJ

function phoneticLookUp(val){
let result;
var lookUp = {
A: "Adam",
B: "Banner",
C: "Charles",
D: "Dennis"
};
result = lookUp[val];
return result;
}

console.log(phoneticLookUp("B"))

QUESTION: How Do you check if an object has a property in js
ANSWER: , by using th ehasw own property var ourDog = {
name: "Camper",
legs: 4,
eyes: 2,
tail: 1,
friends: ["john", "mark", "mary"],
straight: true,
};

function checkObj(find){
if(ourDog.hasOwnProperty(find)){
return ourDog[find];
} {
return "Not Found"
}
}
console.log(checkObj("tail"))

QUESTION: how do you create a nested and access object
ANSWER:🐶 1. The ourDogOwner example
javascript
var ourDogOwner = [
{
name: "Camper",
legs: 4,
eyes: 2,
tail: 1,
friends: ["john", "mark", "mary"],
straight: true,
},
{
name: "John",
age: "22",
status: "Single",
Religion: "Christian",
}
];
👇 What’s happening here
You made an array [ ... ] that holds two objects inside it (the { ... } parts).

You can think of this like a list of two people:

The first person is a dog named Camper with his details.

The second person is an owner named John with his details.

🧩 How you can access the info
ourDogOwner[0] → means the first object (the dog Camper).

ourDogOwner[1] → means the second object (the owner John).

To get the dog's name:

javascript
console.log(ourDogOwner[0].name); // Camper
To get the owner’s religion:

javascript
console.log(ourDogOwner[1].Religion); // Christian
To get the dog’s best friend:

javascript
console.log(ourDogOwner[0].friends[0]); // john
🚗 2. The myStorage example
javascript
var myStorage = {
car: {
passengerSeat: {
money: "$100"
}
}
};
👇 What’s happening here
This is a nested object — an object inside another object.

You can imagine it like a box inside a box:

The first box is myStorage (a garage).

Inside that is another box called car.

Inside car is another box called passengerSeat.

Inside passengerSeat is the money label that says "$100".

🧩 How to get that money
To reach the money, you go step by step through each box:

javascript
console.log(myStorage.car.passengerSeat.money); // $100
You can also use bracket notation:

javascript
console.log(myStorage["car"]["passengerSeat"]["money"]); // $100

QUESTION: solve the var record collection problem and give comments in you code explaining it ,
ANSWER:

var recordCollection = {
2548: {
albumTitle: "Slippery When Wet",
artist: "Bon Jovi",
tracks: ["Let It Rock", "You Give Love a Bad Name"],
},
2468: {
albumTitle: "1999",
artist: "Prince",
tracks: ["1999", "Little Red Corvette"],
},
1245: {
artist: "Robert Palmer",
tracks: [],
},
5439: {
albumTitle: "ABBA Gold",
},
};
var backUp = recordCollection;

function updateRecords(records, id, prop, value) {
if (prop !== "tracks" && value !== "") {
records[id][prop] = value;
} else if (prop === "tracks" && !records[id][prop]) {
records[id][prop] = [value];
} else if (prop === "tracks" && value !== "") {
records[id][prop].push(value);
} else if (value === "") {
delete records[id][prop];
}
return records;
}

console.log(
updateRecords(recordCollection, 2468, "tracks", "Never Gonna Give You")
);

QUESTION: Give an example of object with keys
ANSWER: Don’t use [0] unless your data is an array.

Don’t put quotes after a dot (."artist" ❌).

To get the artist of record 2548:

javascript
recordCollection[2548].artist; // ✅ works!
recordCollection[2548]["artist"]; // ✅ also works!
To add or remove keys, you use:

object.key = value; → add a new key

delete object.key; → remove a key
<!-- 
QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER:

QUESTION:
ANSWER: -->
