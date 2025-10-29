what is the short hand to use active class
.element .active
------------------
how do you add the after pseudoclass 
you need :: , double columns
----------------
what is the setinterval function
window.setInterval() is a JavaScript function that repeatedly calls a function over and over at a specific time interval. It's like setting a repeating alarm that triggers your function every X milliseconds
window.setInterval(stopWatch, milliseconds)

-------------------
1. What does .padStart() do in JavaScript?

Answer:
.padStart() is a string method that adds characters to the beginning of a string until it reaches a specific length.
It’s often used to make numbers display with leading zeros (like 09 instead of 9).

Syntax:

string.padStart(targetLength, padString)


Parameters:

targetLength: The total length you want the string to be.

padString: The characters you want to add to the start (default is a space " ").

Examples:

"5".padStart(2, "0");   // "05"
"12".padStart(2, "0");  // "12"
"7".padStart(6, "abc"); // "abcab7"
"hi".padStart(6, "*");  // "****hi"
NB:.padStart() only works on strings, not numbers.
----------------------------
❓3. How do you convert a number to a string in JavaScript?

Answer:
You use .toString() to turn a number (or other data type) into a string.

let num = 10;
num.toString(); // returns the STRING "10"


🧩 It does the opposite of parseInt() —
toString() turns a number into text, while parseInt() turns text into a number.
-----------

