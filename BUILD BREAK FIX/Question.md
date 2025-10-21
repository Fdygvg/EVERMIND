❓ Question:
Why do we separate multiple class names in HTML with spaces instead of commas?

💡 Answer:
Because in HTML, the class attribute is defined as a space-separated list of class names, not comma-separated.
Each word is treated as a separate class.
If you use commas, the browser will treat them as part of the class name — and your CSS selectors won’t match.

Example:
✅ Correct:

<div class="card highlight large"></div>

❌ Wrong:

<div class="card, highlight, large"></div>

In contrast, CSS uses commas to separate multiple selectors, meaning “apply this rule to either selector.”

❓ Question:
Can you give an element multiple classes or IDs in HTML?

💡 Answer:
You can give an element multiple classes (separated by spaces), but only one ID.
IDs must be unique in a page, while classes can be reused and combined.

Example:

<div id="main" class="card highlight large"></div>

✅ Multiple classes → OK
🚫 Multiple IDs → Not allowed

---

✅ 1. How do you write comments in JavaScript?

// Single-line comment

/_ Multi-line
comment _/

---

✅ 2. What are the seven data types in JavaScript?

Type What It’s Like Example
undefined An empty box you haven’t used yet let a;
null An empty box on purpose let a = null;
boolean A light switch true / false
number A math number 8, 3.5
string Words or text in quotes 'Hello'
BigInt A really big number 9007199254740991n
object A box holding labeled mini boxes {name: 'Luna', age: 7}

---

✅ 3. What are the three ways to declare a variable?

var
let
const
What Do They Mean?
var — the old sticker. You can keep sticking it on new toys or moving it to another toy, even find it in far-away rooms! But sometimes it slips off without warning.

let — the modern sticky note: Just for THIS room (or block). You can change what’s written, but you can’t put two sticky notes with the same name here.

const — the permanent label: Once you stick it and write a name, that’s it! You can’t change it. The toy is always called that name.

---

✅ 4. Example of declaring vs declaring & assigning:

var a; // declaring only
var b = 2; // declaring and assigning

console.log(a); // undefined

a = 7;
b = a;

console.log(a); // 7

Declaring vs Declaring & Assigning
Declaring a variable: Telling JavaScript, “I want a box, but I don’t know what will go inside yet!”

js
var a; // Making the box (nothing inside yet)
Declaring AND Assigning: Making the box AND choosing what goes inside, all at once!

js
var b = 2; // Making the box and putting '2' inside

---

✅ 5. How do you write in camelCase?

weWriteItLikeThis

---

✅ 6. How to perform addition, subtraction, division, and multiplication in JS?

- // addition

* // subtraction

- // multiplication
  / // division

---

✅ 7. What are the shorthand assignment operators?

+= // add and assign
-= // subtract and assign
\*= // multiply and assign
/= // divide and assign

---

✅ 8. How to increment and decrement a number?

number++; // increase by 1
number--; // decrease by 1

---

✅ 9. How do you use quotes inside JavaScript strings?

var myStr = "I am a \"double\" quoted string";
var myStr2 = 'I am a "double" quoted string';

---

✅ 10. How to find the length of a string?

var lastName = "Lovelace";
var lastNameLength = lastName.length;

---

✅ 11. What is bracket notation?

var firstName = "Jack";

var firstLetter = firstName[0]; // "J"
var secondLetter = firstName[1]; // "a"

---

1. Q: Can you use subscript notation to change the first letter of a string?
   A: No — strings are immutable in JavaScript. You can’t do myStr[0] = "h".
   Use a new string:

myStr = "helloworld";

2. Q: How do you use bracket notation to find the last letter of a string without knowing its length?
   A:

var firstName = "ada";
var lastLetterOfFirstName = firstName[firstName.length - 1];

📘 Tip:

-2 → second-to-last letter

-3 → third-to-last letter

Q: How do you link a JavaScript file in HTML?
A: Use the `<script>` tag with the `src` attribute:

```html
<script src="yourfile.js"></script>
```

Place it inside `<head>` or just before `</body>`. Replace `yourfile.js` with your JS file name.

Q: How do you show an alert in JavaScript?
A: Use the `alert()` function:

```javascript
alert("put text here");
```

Replace "put text here" with your message.

Q: what is concatenation and give an example of strings in JavaScript?
A: Concatenation means sticking two or more pieces of text (called "strings") together to make a longer piece of text , You use the + sign, like this: "I am " + "happy" becomes "I am happy". You can do this with variables too, such as let name = "Sam"; let message = "Hi " + name; which becomes "Hi Sam".​

Q: How do spaces work when joining strings?
A: JavaScript only puts in what you write. If you want spaces between words, you have to add them yourself: "Hello" + " " + "World" gives "Hello World". Without the space: "Hello" + "World" gives "HelloWorld".​

Q: Can you give an example with a JavaScript function?
A: Yes!

javascript
function wordBlanks(myNoun, myAdjective, myVerb, myAdverb) {
return "The " + myAdjective + " " + myNoun + " " + myVerb + " to the store " + myAdverb + ".";
}
console.log(wordBlanks("dog", "big", "ran", "quickly")); // Output: The big dog ran to the store quickly.
The code combines the words in the order: adjective, noun, verb, adverb, which is what you see in the output.​

Q: what is an array and give an examlple ,

ANS:arrays allow you to store sevrel paces of data in one stirng,
var ourarray = ["hohn", "mary", "gambit", 23, 22, 10]
console.log(ourarray)

Q:What is a nested array
a nested array is an array eith an array , it as also know as a multi dimensional array , e.g
var o1urarray = [["hohn", "mary", "gambit", 23, 22, 10], ["hohn", "mary", "gambit", 23, 22, 10], ["hohn", "mary", "gambit", 23, 22, 10]]
console.log(o1urarray)

Q: HOW TO find identify elements in an array and nested array with bracket notation

ANS:
var ourarray = ["hohn", "mary", "gambit", 23, 22, 10]
var array = ourarray[1]
console.log(array)
var o1urarray = [["hohn", "mary", "gambit", 23, 22, 10], ["hohn", "mary", "gambit", 23, 22, 10], ["hoohn", "marrroy", "gambitf", 23, 22, 10]]
var array = o1urarray[o1urarray.length - 1]
console.log(array)
and for individual elements- , var access = ourarray[0][1]

Q:how to use array indexes to modify arrays
ourarray[1] = 1;

Q: HOW TO MAnipulate array with push
var ourarray = [["hohn", "mary", "gambit", 23, 22, 10]]
ourarray.push([42, 48])

Q: how to remove data from and array and nested array with pop function
ANS:  
var ourarray = ["hohn", "mary", "gambit", 23, 22, 10];  
var remove = ourarray.pop();
console.log(ourarray)

var o1urarray = [["hohn", "mary"], ["gambit", 23, 22, 10]];  
var remove1 = o1urarray.pop()

Q: How to use shift function in an array
it is used for add elements to the begingein

var ourarray = ["hohn", "mary", "gambit", 23, 22, 10];  
var remove = ourarray.shift();
console.log(ourarray)

var o1urarray = [["hohn", "mary"], ["gambit", 23, 22, 10], ["gambit", 23, 22, 10]];  
var remove1 = o1urarray.shift()
console.log(o1urarray)

Q: how to use unshift function in array
ANS:var ourarray = ["hohn", "mary", "gambit", 23, 22, 10];  
var remove = ourarray.shift();
console.log(ourarray);
var add = ourarray.unshift("John");
console.log(ourarray)

var o1urarray = [["hohn", "mary"], ["gambit", 23, 22, 10], ["gambit", 23, 22, 10]];  
var remove1 = o1urarray.shift();
console.log(o1urarray)

var add1 = o1urarray.unshift(["Text1", "Text2"]);
console.log(o1urarray)

Q: give a example of a shopping list array
ANS: , var mylist = [["cereal", 3], ["milk", 2], ["banana", 3]]

Q:How do you write reusale code with function
ANS:function ourReusableFunction() {
console.log("BRUH,BRUH,BRUH")
}
ourReusableFunction();

Q:How do you pass values to functions with arguments
ANS:function ourFunctionWithArgs(a, b) {
console.log(a - b);
}

ourFunctionWithArgs(10, 5)

ourFunctionWithArgs(19, 10); ,This function needs two inputs called a and b. These are called parameters.​

When you run the function, you must give it two values (these values are called arguments).​

Q: what are global scopes and functions
ANS: Scope means: Where can you see and use a variable in your code?

Global Scope
If you define a variable outside any function, it's global.

Global variables can be used anywhere in your code—inside functions or outside.

javascript
var car = "Volvo";
console.log(car); // You can use it here
function myFunction() {
console.log(car); // You can use it here too
}
Function Scope
If you define a variable inside a function with var, it's local.

Local variables can only be used inside that function, not outside.

javascript
function myFunction() {
var car = "Volvo"; // Only inside this function
console.log(car); // Works here
}
console.log(car); // ERROR! Can't use outside
What if you DON'T use var in a function?
If you assign a value to a variable inside a function WITHOUT using var (or let/const), JavaScript makes it global!

javascript
function myFunction() {
car = "Volvo"; // No 'var', becomes global
}
myFunction();
console.log(car); // Works here because it's global

Q: How do you return a value from a function in JavaScript?
A: You use the return statement to send a value back from a function. Here’s an example:

javascript
function minusSeven(num) {
return num - 7;
}

console.log(minusSeven(10));

Q: explain why a code might give undefined sometimes
ANS: Why is it "undefined" sometimes?
If you run console.log(addThree()); (or console.log(addFive());), you'll see undefined in the console. Why?

That's because your functions do not use a return statement. In JavaScript, if a function runs and does not explicitly return anything, its default result is undefined.​

Example:

javascript
function addThree() {
sum = sum + 3;
}
console.log(addThree()); // prints undefined
console.log(sum); // prints the new value of sum
If you want your functions to give back the new sum, you should use return:

javascript
function addThree() {
sum = sum + 3;
return sum;
}
Now, console.log(addThree()); will show you the new value of sum directly!

Q: explain what a queue is, new ittems are added to the bamc amd old items are , and give an example
ANS: function netline(arr, num) {
arr.push(num)
return arr.shift();
}
var testArrr = [1,2,3,4,5];  
console.log("before", testArrr)
var remove = netline(testArrr, 6)
console.log("removed:", remove)
console.log("after", testArrr)

Q: how do you make an array be printed out as a string
ANS:we use jsonstringify to print it

Q: do booleans use quotes
ANS: no its either true or false , function{ return true or return false}

Q:give an example of a if statement that identifies if text is true or false in js and leave comments xplaining it
ANS:function trueorfalse(wasthattrue) {
if (wasthattrue) {
return "Yes, that was true"
}
return "no,that was false"
}

console.log(trueorfalse(true))

Q: What are truthy and falsy values in JavaScript? //for cursor-- this question there are a lot of diffferent parts under so i wnat you to group related ones and split the, like for example if & if else & else will be in the same questions , then just group the others and give them their own category
A: Truthy values are values that evaluate to true in a Boolean context (for example, non-zero numbers, non-empty strings, objects, arrays). Falsy values are values that evaluate to false: false, 0, -0, 0n, "" (empty string), null, undefined, and NaN

Q: how to USE with the equality operator in js
ANS:function equality(val){
if(val == 12){
return "yes the number is 12" }
return "no its not 12"
}

console.log(equality(12))

FOR COMPARISON

function equality(a, b){
if(a == b){
return "yes the number is 12" }
return "no its not 12"
}

console.log(equality(1, "1"))

FOR INEQUALITY
function equality(a, b){
if(a != b){
return "Its Not Equal To" }
return "It Is Equal To"
}

console.log(equality(1, 2))

FOR GREATER THAN OR LESSER THAN // LESS THAN OR EQUAL TO OR GREATER THAN OR EQUAL TO
function equality(val){
if(val >= 12){
return "IT IS GREATER THAN 12" }
return "no ITS NOT GREATER THAN 12"
}

console.log(equality(12))

FOR AND (&&)
function equality(val){
if(val >= 12 && val >= 8){
return "GOOD" }
return "BAD"
}

console.log(equality(20))

FOR OR (||)

function equality(val){
if(val > 20 || val < 10 ){
return "OUTSIDE" }
return "INSIDE"
}

console.log(equality(30))

FOR ELSE STATEMENTS

function equality(val){
var result;
if(val > 20 || val < 10 ){
result = "OUTSIDE" }
else {
result = "INSIDE"

}
return result;
}

console.log(equality(12));

FOR ELSE IF

function equality(val) {
let result;
if (val > 20) {
result = "OUTSIDE - above";
} else if (val < 10) {
result = "OUTSIDE - below";
} else {
result = "INSIDE";
}
return result;
}

CHAINING IF ELSE

function equality(val){
var result;
if(val < 5){
return "small"
}
else if (val < 10){
return "big"
}
else if (val < 20){
return "large"
}
else return "error"

    }

    console.log(equality(19));

nb:If you want to be even stricter—so only the number 12, not the string "12"—you can use triple equals: if (val === 12)

Q: what is a switch statement and give an example
ANS: function caseInSwitch(val) {
var answer = "";
switch (val) {
case 1:
answer = "alpha";
break;
case 2:
answer = "beta";
break;
case 3:
answer = "gamma";
break;
case 4:
answer = "delta";
break;
default:
answer = "Stuff"
}
return answer;
}

console.log(caseInSwitch(1));

SWITCH STATEMENT WITH MULTIPLE CASE STATEMENT
function sequentialSizes(val) {
var answer = "";
switch (val) {
case 1:
case2:
case3:
answer = "low";
break;
case 4:
case5:
case6:
answer = "medium";
break;
case 1:
case2:
case3:
answer = "high";
break;
default:
answer = "unknown";
break;
}
return answer;
}
console.log(sequentialSizes(1));

Q: how do you return boolean values from functions
ANS:function comparison(a, b){
let result;
result = (a < b);
return result;

}
var compAns = comparison(15, 18);

console.log(compAns); , no need for if and all 

