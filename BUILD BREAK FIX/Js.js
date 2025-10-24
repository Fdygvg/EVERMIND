// "use strict";
// const choice = document.querySelectorAll(".choice");
// for (let i = 0; i < choice.length; i++) {
//   choice[i].style.backgroundColor = "orange";
//   choice[i].style.color = "purple";
//   choice[i].style.fontSize = "5rem";
//   choice[i].style.fontWeight = "5rem";

// };
// console.log(choice)

// creating Elements
// Creating Elements
const bigBox = document.querySelector('.choices');
const box = document.createElement('div');
box.textContent = "Iron Man"
box.className = "choice";
// or box.classList.add("choice");

// Adding Elements
bigBox.append(box);

// Modifying the text
const item = document.querySelector('.choices');
console.log(item.innerText);
console.log(item.textContent);
console.log(item.innerHTML);
