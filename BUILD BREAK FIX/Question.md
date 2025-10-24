QUESTION: what are properties and aelementsand method

ANSWER: the thing an object holds are called properties , and elements are the indidveial thing in arrays, a function in an object
QUESTION: Give an example of a function that uses destructuring in its parameter
ANSWER: const numbers = {
one: 1,
two: 2,
three: 3,
four: 4
}

const addition = (function(){
return function addition({one, two}){
return (one + two) / 2;
};

})();

console.log(addition(numbers))

QUESTION: what is destructuring in js
ANSWER: Destructuring means quickly pulling out pieces (values) from an object or array into separate variables, using a shortcut instead of picking each piece one by one.

For objects, it grabs specific properties:

Example:

javascript
const person = { name: "Ali", age: 15 };
const { name, age } = person;
// name is "Ali", age is 15
For arrays, it grabs items by position:

Example:

javascript
const nums = [1, 2, 3];
const [a, b] = nums;
// a is 1, b is 2
For Function,
javascript
const person = {
name: "Aria",
age: 20,
city: "Nairobi"
};

function greet({ name, city }) {
return `Hello, ${name} from ${city}!`;
}

console.log(greet(person)); // "Hello, Aria from Nairobi!"

In simple words:
Destructuring is a fast way to pick out values you want from a box (object/array), and put them in their own cups (variables), all in one line.

QUESTION: give an example code showing the diffence between structured and unstructured
ANSWER: Destructured/Obstructed (using destructuring):

javascript
const user = { name: "Ali", age: 20 };

function printInfo({ name, age }) {
console.log(name, age);
}

printInfo(user); // prints: Ali 20
Undestructured (not using destructuring):

javascript
const user = { name: "Ali", age: 20 };

function printInfo(user) {
console.log(user.name, user.age);
}

printInfo(user); // prints: Ali 20
Summary:

Destructured: grabs name and age directly from the object in the function parameters.

Undestructured: grabs them inside the function, using user.name, user.age.

QUESTION: what is the proper format for IIFE
ANSWER: (function(){
console.log("Hello from IIFE!");
})();

QUESTION: Solve the make list function question
ANSWER: const result = {
success: ["max-length", "no-amd", "prefer-arrow-functions"],
failure: ["no-var", "var-on-top", "linebreak"],
skipped: ["no-extra-semi", "no-dup-keys"]
};

function makeList(arr) {
const displayResult = [];
for (let i = 0; i < arr.length; i++) {
displayResult.push(`<li class="text-warning">${arr[i]}</li>`);
}
return displayResult;
}

const failuresList = makeList(result.failure);
const successList = makeList(result.success);
const skippedList = makeList(result.skipped);

console.log(failuresList)

QUESTION: how to set a new line in js and tab
ANSWER: /t /n

QUESTION: write a function that builds new objects with the arguments given
ANSWER: const newPerson = (name, age, gender) => ({name, age, gender})
console.log(newPerson("jack", 44, "male"))

QUESTION: with a short code explain how the ,ethod and .this function correlate with one another
ANSWER: javascript
const bicycle = {
gear: 2,
setGear(newGear) {
"use strict";
this.gear = newGear;
}
};
Creates a bicycle object.

Its default gear is 2.

It has a function setGear for changing the gear.

javascript
bicycle.setGear(3);
console.log(bicycle.gear);
Calls the method to set the gear to 3.

Prints out the new gear: 3.
const car = {
color: "red",
paint(newColor) {
this.color = newColor; // changes the `car` object's color!
}
};
car.paint("blue"); // The car is now blue

QUESTION: explain the class, constuctor and new functions and give code examole
ANSWER: class is ......
function makeClass() {
class Vegetable {
constructor(name){
this.name = name;
}
}
return Vegetable;
}

const Vegetable = makeClass();
const carrot = new Vegetable('carrot');
console.log(carrot.name);

QUESTION: what are getters and setters and the underscore ,
ANSWER: Getters
Special functions that let you read a property inside an object/class.

You use them like normal properties: object.property.

Behind the scenes, it runs your code (can clean, format, or do stuff before returning).

Setters
Special functions that let you change a property inside an object/class.

You use them like normal property assignment: object.property = value.

It secretly runs your code—can check, fix, warn, or change the value before saving.  
Underscore (\_)
Just a naming hint for “private” properties in JavaScript.

NOT required, NOT automatic—just developer tradition.

Shows “use my getter/setter; don’t touch me directly unless you know what you’re doing.”
function makeClass() {
class Thermostat {
constructor(temp) {
this.\_temp = 5 / 9 \* (temp - 32); // save as Celsius
}
get temperature() {
return this.\_temp;
}
set temperature(updatedTemp) {
this.\_temp = updatedTemp;
}
}
return Thermostat;
}

const Thermostat = makeClass();
const thermos = new Thermostat(76); // F to C
console.log(thermos.temperature); // Should print Celsius value
thermos.temperature = 26;
console.log(thermos.temperature); // Should print 26

QUESTION: what is the .tolowercase and teh .to upperacase
ANSWER: let word = "HeLLo";
console.log(word.toUpperCase()); // "HELLO"
console.log(word.toLowerCase()); // "hello"

QUESTION: how do you link js to use export and import
ANSWER: for example in the code
import { capitalizeString } from "./js2.js"
const mar = capitalizeString("hello");

console.log(mar)
in another file
export const capitalizeString = str => str.toUpperCase()

nb: make sure to add .js in the file name ,and its recommened to run the file from localhost becaues of chrome E6 something and use type=module just to be safe <script type="module" src="Js.js"></script>
<script type="module" src="js2.js"></script>

QUESTION: what is the charAT function
ANSWER: The .charAt() function in JavaScript is a string method that lets you get the letter (character) at a specific position in a word or sentence.

How does it work?

You give it a number (position), and it returns the character at that spot.

Positions start counting at 0 (not 1).

Example:

javascript
let word = "hello";

console.log(word.charAt(0)); // "h" (the first letter)
console.log(word.charAt(1)); // "e" (the second letter)
console.log(word.charAt(4)); // "o" (the fifth letter)
If you ask for a number bigger than the word, it gives you an empty string:

javascript
console.log(word.charAt(10)); // ""

QUESTION: what is the . slice function
ANSWER: The .slice() function is used on strings and arrays in JavaScript to cut out a section and give you a smaller piece.

For Strings
It lets you grab part of a word or sentence.

You tell it where to start (first number) and optionally, where to stop (second number—not included).

Example:

javascript
let word = "banana";

console.log(word.slice(1)); // "anana" (starts at letter 1 to the end)
console.log(word.slice(2, 5)); // "nan" (starts at 2, ends before 5)
For Arrays
It lets you take out a few items from your list.

Example:

javascript
let arr = [10, 20, 30, 40, 50];

console.log(arr.slice(1, 4)); // [20, 30, 40]

QUESTION: how do you export and import in js
ANSWER: const capitalizeString = (string) => {
return string.charAt(0).toUpperCase() + string.slice(1);
}

export { capitalizeString };

export const foo = "bar";
export const bar = "foo";

you can import like so -- ,
import { capitalizeString, foo, bar } from "./filewiththiscode.js";
console.log(capitalizeString("dog")); // "Dog"
console.log(foo); // "bar"
console.log(bar); // "foo"

nb. you can importeveerything at once with , import \* as myModule from "./filename.js";

QUESTION: how do you create and import a default export
ANSWER: To create an export fallback in JavaScript modules, you use export default.
This means if another file imports without curly braces, it gets your “main” thing—even if you have other exports.

How to do it
javascript
const capitalizeString = (string) => {
return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalizeString; // This is the fallback
export const foo = "bar";
export const bar = "foo";
How to import the default (fallback)
javascript
import capitalizeString from "./filename.js"; // Gets the default
import { foo, bar } from "./filename.js"; // Gets the named ones
If you import without curly braces, you get the default.

If you use curly braces, you get the named exports.

QUESTION: what are the 5 main dom manipulation techniques
ANSWER: getelementbyid, classname, tagname , queryselector,queryselctorall , const title = document.getElementById('main-heading');
console.log(title)

const listItem = document.getElementsByClassName('choice');
console.log(listItem)

const listItem = document.getElementsByTagName('li');
console.log(listItem)

const container = document.querySelector('div') Browsers (or frameworks, or plugins) sometimes add their own <div>s
use . for class and # for id
at the very top of the body, before your content. OR USE CLASS you set yourself
const container = document.querySelector('.container')
console.log(container)

const selectAll = document.querySelectorAll('div');
console.log(selectAll)
nb, startwith document. then ('id') ,

QUESTION: how to edit text with dom manipu;ation in js
ANSWER: const title = document.querySelector('#main-heading');

title.style.color = "red";
console.log(title) <= to view results

QUESTION: how to edit list items with dom manipulation
ANSWER: const choice = document.querySelectorAll(".choice");
for (let i = 0; i < choice.length; i++) {
choice[i].style.backgroundColor = "orange";
choice[i].style.color = "purple";
choice[i].style.fontSize = "5rem";
choice[i].style.fontWeight = "5rem";

};

Q2: What’s the difference between innerText, textContent, and innerHTML?

A2:

innerText shows just the visible words inside an element (property).

textContent shows all the text inside an element, even if it’s hidden (property).

innerHTML shows all the HTML (tags + text) inside an element (property).

console.log(bigBox.innerText);
console.log(bigBox.textContent);
console.log(bigBox.innerHTML);

Q1: How do you add a new content to your HTML using JavaScript?
A1:

Create it: const box = document.createElement('div');

Fill it: box.textContent = "Iron Man";

Add it: bigBox.append(box); (where bigBox is an existing element like .container)

const bigBox = document.querySelector('.choice');
const box = document.createElement('div');
box.textContent = "Iron Man"
// Adding Elements innerText can also be used
bigBox.append(box);

Q: What are the three ways to add created elements to existing classes
A:

Use .className = "your-class" to set all classes.

Use .classList.add("another-class") to add one or more classes.

Use .id = "element-id" to give the element an id.
