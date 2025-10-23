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


-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-











QUESTION: give an example of a iterate  while & for loop that , numbers 1-10
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
