

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

QUESTION: give an example of a iterate while & for loop that , numbers 1-10
ANSWER:
var myArr = [];
const i = 0;
while(i <= 10){
myArr.unshift(i) // myArr.push(i)
i++;
}
console.log(myArr)

For Loop
var myArr = [];
for (var i = 1; i <= 10; i++){
myArr.unshift(i);
}

console.log(myArr)

QUESTION: write a for and while loop that , counts all even and odd numbers
ANSWER: var myArr = [];
for (var i = 1; i <= 10; i+=2){
myArr.unshift(i);
}

console.log(myArr)

var myArray = [];
let j = 0;
while(j < 10){
myArray.push(j);
j+=2;
}
console.log(myArray)

QUESTION: write a for and while loop to count backward
ANSWER: var myArr = [];
for (var i = 100; i > 0; i-=2){
myArr.push(i);
}

console.log(myArr)

var myArray = [];
let j = 50;
while(j > 0){
myArray.push(j);
j-=3;
}
console.log(myArray)

QUESTION: how do you iterate through an array witha for loop anda while loop
ANSWER:
var myArr = [2, 4, 6, 8, 10];
//, "ten", "one", "yes", "NO"
var ourTotal = 0;

for (var i = 0; i < myArr.length; i++){
ourTotal += myArr[i];
}

console.log(ourTotal)

var i = 0;
while (i < myArr.length) {
ourTotal += myArr[i];
i++
}
console.log(ourTotal)

QUESTION: write a for and while loops that multiplies all the numberes in a nesting array
ANSWER:

function multiplyAllWithFor(arr) {
var product = 1;

for(var i = 0; i < arr.length; i++){
for(var j = 0; j < arr[i].length; j++ ){
console.log("Now Multiplying:", product, "x", arr[i][j] )
product \*= arr[i][j]

      console.log("Product so Far:", product)
    }

}
return product
}

console.log(multiplyAllWithFor([[1,2], [3,4], [5,6,7]]))

function Mum(array){
var product = 1;
var i = 0;

while(i < array.length){
var j = 0;
while(j < array[i].length){
product\*= array[i][j];
j++;
}
i++;
}
return product;
}
console.log(Mum([[1,2], [3,4], [5,6,7]]))

QUESTION: write a doo while loop that adds number to an array
ANSWER: var myarray = [];
var i = 0;
do{
myarray.push(i);
i++;
}
while
(i < 5);

console.log(myarray)
nb: do while loops runs once before checking condition , but a whil loop will first chect condition before running the loop

QUESTION: what is the profile lookup challenge
ANSWER: var contacts = [
{
firstName: "John",
lastName: "Doe",
number: "123456789",
likes: ["Pizza", "Coding"]
},
{
firstName: "Jane",
lastName: "Smith",
number: "987654321",
likes: ["Pasta", "Music"]
},
{
firstName: "Emily",
lastName: "Jones",
number: "555555555",
likes: ["Movies", "Swimming"]
}
];

function lookUpProfile(name, prop){
for(var i = 0; i < contacts.length; i++)
if (contacts[i].firstName === name){
return contacts[i][prop] || "No Such Property";
}
return "No Such Contact"
}

console.log(lookUpProfile("Jane", "likes"))

QUESTION: How do you create random decimalsand whole numbers in js
ANSWER:

function randomFunction(){
return (Math.random()); // Math.round(Math.random()) for nearest whole number
}

console.log(randomFunction())

WHOLE NUMBER

var randomNumber = Math.floor(Math.random() \* 20);

OR

console.log(randomNumber)
function randomDigit(){
var rD = Math.floor(Math.random() \* 10);
return rD
}

console.log(randomDigit())

QUESTION:whar is the difference btw math.floor and math.round ,
ANSWER:Math.floor()
Always rounds DOWN to the nearest whole number.

If you have 5.8, it becomes 5.

If you have 2.3, it becomes 2.

If you have 3.999, it still becomes 3.

It never goes up, just chops off the decimal part (“drops to the floor”).

Math.round()
Rounds to the nearest whole number.

If the decimal is .5 or higher, it goes UP.

If the decimal is less than .5, it goes DOWN.

Examples:

Math.round(5.8) → 6

Math.round(5.3) → 5

Math.round(3.5) → 4

Math.round(3.49) → 3

QUESTION: hOW do you generate random whole numbers within a range
ANSWER:
function withinRange(myMin, myMax){
var rD = Math.floor(Math.random() \* (myMin - myMax + 1) + myMin);
return rD
}

console.log(withinRange(1, 10))

QUESTION: What is the parse in function and give examples
ANSWER: function convertToInteger(str) {
return parseInt(str);
}
console.log(convertToInteger("text"))
console.log(convertToInteger("122"))

With Radix

function convertToInteger(str) {
return parseInt(str, 2);
}

console.log(convertToInteger("101"))

QUESTION: what are the different number bases
ANSWER: Base 2 (Binary)
Digits used: Only 0 and 1.

Where used: Inside computers, everything is stored as 0s and 1s.

Example:

The binary number 101 is:

(1 × 4) + (0 × 2) + (1 × 1) = 4 + 0 + 1 = 5 in decimal (base 10).

So parseInt("101", 2) returns 5.

Base 8 (Octal)
Digits used: 0 to 7.

Where used: Used in early computers, and sometimes in permissions (like Unix file permissions).

Example:

The octal number 17 is:

(1 × 8) + (7 × 1) = 8 + 7 = 15 in base 10.

So parseInt("17", 8) returns 15.

Base 10 (Decimal)
Digits used: 0 to 9.

Where used: This is your normal counting system.

Example:

The number 254 is just 2 × 100 + 5 × 10 + 4 × 1 = 254.

So parseInt("254", 10) is 254.

Base 16 (Hexadecimal)
Digits used: 0 to 9, A to F (A=10, B=11, ..., F=15).

Where used: Used a lot in computers and web color codes (like #FF0000 for red).

Example:

The hex number 2A is:

(2 × 16) + (10 × 1) = 32 + 10 = 42 in base 10.

So parseInt("2A", 16) returns 42.

Base 36
Digits used: 0 to 9, A to Z (A=10, ..., Z=35).

Where used: Used in web-shortening services or codes that need lots of unique values in a short string.

Example:

The base-36 number Z is:

Z = 35 in base 10.

So parseInt("Z", 36) returns 35.

The base-36 number 10 is:

(1 × 36) + (0 × 1) = 36 in base 10.

So parseInt("10", 36) is 36.

Quick tip: to convert a string to a decimal using any of these bases, use:
parseInt("string", base)

QUESTION: How Do you use teh ternary conditional operator
ANSWER: function checkEquality(a, b){
return a===b ? true : false;
}
console.log(checkEquality(2,2))

condition ? valueIfTrue : valueIfFalse

The ternary operator is a tiny shortcut for if-else: it lets you choose between two things, super fast, just by answering one question.

FOR MULTIPLE TERNARY OPERATORS
function checkSign(num){
return num > 0 ? "positive" : num < 0 ? "negative" : "error";
}
QUESTION: what is the difference between var and let
ANSWER: you can redeclare a var but you cant redeclare alet

QUESTIO: what is the directive to make sure your js has no error
ANSWER:
"use strict" is a special instruction you can put at the top of your JavaScript code. Where Can You Use "use strict"?

1. Top of Your File (Whole Code)
   javascript
   "use strict";
   var x = 10;
   // All your code is strict—no sloppy mistakes allowed anywhere!
2. Inside a Function (Just That Function)
   javascript
   function doMath() {
   "use strict";
   // Only code INSIDE this function is strict.
   }
   Stuff outside this function does NOT use strict mode.

You could have some parts of your program strict, and others not.

Can You Put It Inside Loops?
Strict mode can only be set for:

The whole file or script.

An individual function.

You cannot put "use strict" inside a loop, if-block, or single statement.

It won't do anything there!

Summary
Put it at the top for “strict everywhere!”

Put it inside functions for “strict only here!”

Not inside loops, if/else, etc.

copare scopes of var and let
var and let scope in JavaScript:

var

Has function scope.

This means: If you create a var inside a function, you can use it anywhere in that function—even inside blocks (if, for, etc).

Not limited to block { }, so values can "leak out" of small code blocks.

let

Has block scope.

This means: If you create a let inside a block ({ }), it only exists inside that block. Outside that block, the variable is gone.

Keeps values safe and separate by each { } section.

QUESTION: can a variable declared eith const ne reassigned
ANSWER: NO , nb good to use all capital letters TEXT , when using const
function printManyTimes(str) {
"use strict";

const SENTENCE = str + " is cool!";

for (let i = 0; i < str.length; i += 2) {
console.log(SENTENCE);
}
}

printManyTimes("freeCodeCamp");

QUESTION: how can you mutate an array
ANSWER: const S = [5, 4, 3]
function mutateArray (){
"use strict";
S[0] = 2
S[1] = 1
S[2] = 0
}

mutateArray()

const mutateObj = {name: "Sam", age: 7};
mutateObj.age = 8; // This is allowed!
mutateObj.name = "Sally"; // This works too
console.log(mutateObj); // { name: "Sally", age: 8 }

mutateObj = {name: "Bob"}; // ERROR! You can't reassign to a completely new object.

AND TO PREVENT MUTATION :
use Object.freeze()
const noMutate = {name: "Sam", age: 7};
Object.freeze(noMutate)
noMutate.age = 8; // This is allowed!
noMutate.name = "Sally"; // This works too
console.log(noMutate); // { name: "Sally", age: 8 }

QUESTION: how do you write arrow function
ANSWER:
The Two Ways:

1. Function Expression
   javascript
   var magic = function() {
   return new Date();
   };
   This is the old way (traditional).

function() { ... } means: "Whenever you call magic(), run this code."

Returns a Date object (shows the time right now).

2. Arrow Function (ES6, newer style)
   javascript
   var magic = () => new Date();
   This is the new way (arrow function).

() => new Date() is a shortcut to write a function.

Does exactly the same thing: when you call magic(), you get the date and time.

Super Simple Summary
Both make a function named magic.

Both will show you the current date/time if you run console.log(magic()).

The arrow function (=>) is just a shortcut—less writing, same meaning.

QUESTION: what is function expression
ANSWER: writing a function inside a variable

QUESTION: how do you write arrow function with parameters
ANSWER:  
var myFunction = (arr1, arr2) => arr1.concat(arr2);

console.log(myFunction([1, 2], [3, 4, 5])); // [1, 2, 3, 4, 5]
nb: the () , then the function , , it is used in map, filter, and other arrray functions -- =>

QUESTION: what is the concat method
ANSWER:The concat method in JavaScript is a simple way to join (add together) two or more arrays into one big array.

How does it work?
Syntax: array1.concat(array2)

It leaves the original arrays as they were, and gives you a new joined array.

Example:
javascript
let arr1 = [1, 2];
let arr2 = [3, 4, 5];

let result = arr1.concat(arr2);

console.log(resut)

QUESTION: what are parametees and arguments in js
ANSWER: arameters
Parameters are the named boxes that a function asks for.

You list them in the function’s definition (when you make the function).

Example:

javascript
function add(x, y) {
return x + y;
}
Here, x and y are parameters.
They’re like buckets waiting to be filled.

Arguments
Arguments are the actual values you put into the function’s boxes when you call it.

Example:

javascript
add(2, 3);
Here, 2 and 3 are arguments.

You’re saying, “Hey add function, put 2 in the first bucket (x), and 3 in the second (y).”

QUESTION: What is the filter tool
ANSWER: What is filter?
filter is a tool you use on an array (a list).

It lets you pick out some items—the ones that pass your test.

Gives you a new array with only those items.

Example (with numbers):

javascript
let nums = [1, 2, 3, 4, 5];
let onlyEven = nums.filter(n => n % 2 === 0);
console.log(onlyEven); // [2, 4]
Only the even numbers are kept!

QUESTION: What is map?
ANSWER: map is another tool for arrays.

It goes over every item in your array and changes it however you want.

Gives you a new array, same length, but with changed items.

Example (with numbers):

javascript
let nums = [1, 2, 3];
let doubled = nums.map(n => n \* 2);
console.log(doubled); // [2, 4, 6]
Every number is doubled.

QUESTION: What is the isInteger Tool
ANSWER: Number.isInteger() is a built-in JavaScript function that checks if something is a whole number (an integer).

What does it do?
It takes any value (like a number) and says true if it’s a whole number (like 1, 2, 42, -5), and false if it isn’t (like 2.5, 5.6, 3.14).
eXAMPLE

QUESTION: what is the typof function in js
ANSWER: typeof is a JavaScript tool (operator) that tells you what kind of data/value you have.

What does typeof give you?
"string" — for text

"number" — for numbers

"boolean" — for true/false

"object" — for objects and arrays

"undefined" — for things not set

"function" — for functions

Examples for Each Kind
javascript
// String
console.log(typeof "hello"); // "string"

// Number
console.log(typeof 42); // "number"
console.log(typeof 3.14); // "number"

// Boolean
console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"

// Object
console.log(typeof { a: 1, b: 2 }); // "object"

// Array (a special object)
console.log(typeof [1, 2, 3]); // "object"
console.log(Array.isArray([1, 2, 3])); // true (checks if it's an array)

// Undefined
let x;
console.log(typeof x); // "undefined"

// Function
console.log(typeof function(){}); // "function"
Summary:

Use typeof to check the kind of value (string, number, boolean, object, etc.).

Arrays are shown as "object" by typeof, but you can use Array.isArray(...) to check them for sure.



QUESTION:"How do I make squareList higher-order with filter and map callbacks?"
ANSWER: const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34, -2];

// This function finds all positive whole numbers and squares them
const squareList = (arr) => {
const squaredIntegers = arr
.filter(num => Number.isInteger(num) && num > 0) // keep only positive integers
.map(x => x \* x); // square each one
return squaredIntegers; // return the new array
};

const squaredIntegers = squareList(realNumberArray);
console.log(squaredIntegers); // [16, 1764, 36]

QUESTION: how to use default parameter in js
ANSWER: the default parameter is ackitved when the argument is nit stated or specified

QUESTION: what is an IIFE in js
ANSWER:An IIFE (pronounced “iffy”) stands for:

Immediately Invoked Function Expression

What is it?
It’s a function that you make and run right away—all in one go.

What does it look like?
javascript
(function() {
// code in here runs right away!
})();
or with arrows:

javascript
(() => {
// code runs immediately
})();
Why use it?
To do something quickly and not leave any new variables behind.

Used in older JavaScript to make a “private space.”

nb: The parentheses () at the end are what actually make the function run right away!

Here’s how it works:
function() { ... }
Just defines a function. Doesn't run it yet!

(function() { ... })()
Defines the function (inside parentheses), then the last () calls (executes) it immediately.

QUESTION: Give an example of a function inside a function? code
ANSWER: the explanition is tht,const increment = (function() {
return function increment(number, value = 1) {
return number + value;
};
})();

QUESTION: what is the rest operator
ANSWER: he rest operator (...) lets you collect all leftover items into an array, often used when you want to grab "everything else" after the first item(s).

Example:

javascript
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest); // [20, 30, 40]
first is the first value

rest has everything else

You can also use it in functions to collect many arguments!

QUESTION: wHAT IS the reduce function in Javascript
ANSWER: How does it work (super simple)?
You give it a function and a starting number (or value).

That function gets two things every time:

The “current total” (called accumulator)

The next item in your list

It keeps running your function for every item until everything is “reduced” into a single result.

let sum = nums.reduce((total, next) => total + next, 0);
The first argument (acc, cur) => acc + cur is a function.

Where acc and cur are the names you use for each cycle.

For summing, it just adds them together.

The second argument 0 is where the accumulator starts (for a sum, you want to start from zero).
Whatever numbers you put in the array, reduce will “squish” them using the rule you give it.

QUESTION: How can you use the rest operator to gather all function arguments into an array?"
ANSWER:
const sum = (function () {
return function sum(...args) {
console.log(args);
return args.reduce((a, b) => a + b, 0);
};
})();

var calc = sum(1, 2, 3, 4, 6, 6, 6);
console.log(calc)

QUESTION: how do you use reduce with a mix of letters and alphabets  
ANSWER: const mixedSum = (...args) =>
args.reduce((acc, cur) =>
typeof cur === "number" ? acc + cur : acc, 0
);

console.log(mixedSum(1, "apple", 5, "banana", 2));
// Output: 8 (just adds numbers)

QUESTION: how do you know the diffetrnce betwenn spread and rest opereator
ANSWER: The key is where you use the three dots (...):

1. Rest Operator (collect/scoop up values)
   Used in function parameters or array destructuring

Means: grab everything else and put it in an array

javascript
function myFunc(first, ...rest) { ... }
const [a, ...others] = [1, 2, 3]; 2. Spread Operator (spread/blow out values)
Used in function calls, arrays, or objects (NOT in parameter lists)

Means: unpack items into a new place

javascript
let nums = [1, 2, 3];
let newNums = [0, ...nums, 4]; // makes [0, 1, 2, 3, 4]
myFunc(...nums); // passes as separate arguments

QUESTION:write a spread operator code that unpacks all the items from arr2 and sticks them at the end of arr1.
ANSWER: let arr2 = [1, 2, 4, 6];
const arr1 = ["Jan", "Feb", "March", ...arr2]
console.log(arr1)
nb you can put ...arr2 at the front of the function to make the arr1 values stay at the front , simalat to unshift dfunction

QUESTION: hOW DO you us destruct to assign variables fro objects
ANSWER:var voip = {x: 1.1, y: 2.3, z: 9.3};
console.log(voip)
OLD
var x = voip.x
var y = voip.y
var z = voip.z
console.log(voip)
NEW -- destructure FROM an object
const {x : a, y : b, z : c} = voip;

console.log(a,b,c)

QUESTION:how do create a function that uses destructure to extract a prop from an object
ANSWER:const RECIPE = {
fruit: "orange",
color: "orange"
}

function getColor(color){
"use strict"
const { color : cols } = color;
return cols
}

console.log(getColor(RECIPE))
tep-by-step:

When you run getColor(RECIPE),
color (the parameter) now holds the RECIPE object.

Inside your function,
const { color: cols } = color; grabs the color property from the parameter object and puts its value into cols.

The function then returns cols (“orange”),
and that’s what gets printed to the console!

QUESTION: how do you destructure nested objects ato access obj
ANSWER: const RECIPE = {
fruit: {"orange": "o", "apple": "a"},
color: {"orange": "nge", "red": "r"}
}

function getColor(color){
"use strict";
const { color :{ red : cols}} = color;
return cols
}

console.log(getColor(RECIPE))

QUESTION: what does the following code do , const [z, x, , r] = [1, 2, 3, 4];
ANSWER:console.log([z, x, r]); , [1, 2, 4]

QUESTION: write the code to destruce and swaps the vlue of a&b
ANSWER: let a = 3,
b = 2;
(() => {
[a, b] = [b, a];
})();
console.log(a, b);

QUESTION: write code that uses the rest operator to collect all elements of the array after the first two into a new array.
ANSWER: const source = [1,2,3,4,5,6,7,8,9,10]

function removeFirstTwo(two){
const [ , , ...arr] = two;
console.log(arr)
return arr;
}
console.log(removeFirstTwo(source));
