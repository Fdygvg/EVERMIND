### JavaScript DOM Selection and Manipulation — Study Set

 **Q:** When using `getElementById()` in JavaScript, should you include the `#` symbol in the argument?  
   **A:** No. The `getElementById()` method directly matches an element’s `id`, so you pass only the name (e.g., `document.getElementById("main")`). The `#` prefix is only used with `querySelector()` and `querySelectorAll()`.

 **Q:** What does `getElementsByClassName()` return, and how do you access a single element from it?  
   **A:** It returns an HTMLCollection, which is an array‑like list of elements. You access individual elements using an index, for example:

   ```js
   const items = document.getElementsByClassName("menu-item");
   items[0].style.color = "blue";
   ```

. **Q:** What does `querySelectorAll()` return, and how do you access elements within it?  
   **A:** It returns a NodeList, another array‑like structure. You use square brackets `[]` to access items, not parentheses `()`, for example:

   ```js
   const list = document.querySelectorAll("li");
   list[2].style.fontWeight = "bold";
   ```

4. **Q:** Why does a `return` statement inside a `for` loop stop iteration immediately?  
   **A:** `return` exits the entire function when executed, so the loop ends after the first iteration. To apply a change to all items, use only statements like `choice[i].style.color = "red";` inside the loop without `return`.

5. **Q:** What is the difference between `innerText` and `innerHTML`?  
   **A:**
   - `innerText` gives visible text as shown to the user, formatted as it appears on screen.
   - `innerHTML` returns the HTML code inside the element, including tags. It can be risky because inserting user input through `innerHTML` can introduce script injection (XSS).
   - `textContent`
     Use `innerText` or `textContent` for plain text; use `innerHTML` only when intentionally injecting HTML and never with unsanitized input.
6. **Q:** How do you assign or remove an attribute in the DOM with JavaScript?  
   **A:**

   - To add or modify:
     ```js
     element.setAttribute("id", "new-id");
     ```
   - To remove:
     ```js
     element.removeAttribute("id");
     ```

7. **Q:** How can you read the value of an element’s attribute in JavaScript?  
   **A:** Use `getAttribute()` with the attribute name, for example:

   ```js
   const title = document.querySelector("#mainHeading");
   console.log(title.getAttribute("id"));
   ```

8. **Q:** How can you manage CSS classes on an element in JavaScript DOM — including adding, removing, and checking if a class exists?  
   **A:** You can use the `classList` property, which provides methods to control an element’s CSS classes:

   ```js
   const newDiv = document.createElement("div");

   // Add a class
   newDiv.classList.add("choice");

   // Remove a class
   newDiv.classList.remove("choice");

   // Check if a class exists (returns true or false)
   console.log(newDiv.classList.contains("choice"));
   ```

   The `element.classList.add()` method attaches a class, `element.classList.remove()` deletes one, and `element.classList.contains()` verifies whether a certain class is present on the element.
Working with IDs
You usually set or read the ID property directly:

element.id = "myButton"

console.log(element.id)
Or with setAttribute:

element.setAttribute('id', 'myButton')
5. Changing Any Attribute
element.setAttribute('type', 'button') – (sets or adds)

element.getAttribute('type') – (gets)

element.removeAttribute('type') – (removes)


==================================================================
how to remove element with dom
ANS: newdiv.remove()
---------------------------
what is the parent node traversal


let div = document.querySelector('.choice');

console.log(div.parentNode.parentNode.parentNode.parentNode)
console.log(div.parentElement.parentElement.parentElement.parentElement)

-----------------------------
what is the child node traversal 

let div = document.querySelector(".choices");

console.log(div.childNodes);
console.log(div.firstChild);
console.log(div.lastChild);
console.log(div.firstElementChild);
console.log(div.lastElementChild);
div.childNodes[1].style.backgroundColor = 'blue';
--------------------
div.childNodes returns a NodeList, but this includes all types of nodes: element nodes, text nodes (spaces, newlines), comments, etc.
If childNodes[2] happens to be a text node instead of a div, it has no .style property.

That's why you get:

text
Uncaught TypeError: Cannot set properties of undefined (setting 'backgroundColor')
 because you're trying to access .style on a node that’s not an elemen
------------
 Use .children Instead of .childNodes
.children only gives you element nodes, which have a .style property.

console.log(div.children);

div.children[1].style.backgroundColor = 'blue';
-----------------
what is a node and a nodelist 

What is a Node?
A node is just one piece of your web page’s structure. On an HTML page, nodes can be:

Element nodes: Things like <div>, <p>, <span>, <body>, etc.

Text nodes: The actual text inside elements, like "Hello World!"

Comment nodes: Notes in the HTML that don’t show up on the page (<!-- comment -->)

Think of nodes as the "building blocks" inside your webpage.

What is a NodeList?
A NodeList is like a collection (or list) of nodes that you get when you use certain DOM methods. For example, if you use:

javascript
const divs = document.querySelectorAll("div");
Here, divs is a NodeList that contains all the <div> elements in your page.

Summary:
A NodeList is a collection, like a box holding parts of your webpage's structure—sometimes text, sometimes tags, sometimes even comments. You can look inside by index, but remember, not everything will be an HTML element!
-----------------------
What are sibling node trasversal
let div = document.querySelector(".choi");
let divs = document.querySelector(".choices");

console.log(divs.childNodes)
console.log(div.previousElementSibling);
console.log(div.nextElementSibling);
console.log(div.previousSibling);
console.log(div.nextSibling);

---------------------
how do you apply event listeners in html
add onclick e.g 
  <button onclick="alert('BRUHHHHHH')">Enter</button>
  --------------------
  how do you apply eventlistenres in js with functions
  const btn2 = document.querySelector('.btn2');


function alertbtn() {
    alert('BRUDAHHH')
    
}
alertbtn()
btn2.addEventListener("click", alertbtn)
--------------------
what are some common event/event types in dom 
Here are the most common events you’ll use:

Mouse events

click: When a user clicks an element

dblclick: Double-click

mouseover: When the mouse pointer enters an element (like “hover”)

mouseout: When the pointer leaves an element

mouseenter: Enters an element, but doesn’t bubble like mouseover

mouseleave: Leaves an element, doesn’t bubble

mousedown: When a mouse button is pressed down

mouseup: When a mouse button is released

mousemove: When the mouse moves over an element

Keyboard events

keydown: When a key is pressed

keyup: When a key is released

keypress: When a key is pressed (but not for all keys, less common now)

Form events

submit: When a form is submitted

focus: When an element (like input) gets focus

blur: When it loses focus

change: When the value of an input changes

input: Whenever user types in an input (captures every character)

Other common events

load: When page or element finishes loading

resize: When window size changes

scroll: When user scrolls a page or element

Events like mouseover and mouseout are especially useful for creating things like hover effects, tooltips, dropdown menus, etc.
----------------------- 
what is the simplest way to revert a backgrounf color with event listeners 
 btn2.style.backgroundColor = '';  // Empty string removes the inline style
-------------------
how to make a button that reveals text 

const revealBtn = document.querySelector(".reveal-center");
const hiddenContent = document.querySelector(".hidden-content");

function revealBot() {
  if (hiddenContent.classList.contains("revealBtn")) {
    console.log(hiddenContent)
    hiddenContent.classList.remove("revealBtn");
    console.log(hiddenContent)
} else {
    hiddenContent.classList.add("revealBtn");
    console.log(hiddenContent)
  }
}


revealBtn.addEventListener("click", revealBot);

CSS
.hidden-content {
  display: none; /* Hidden by default */
}
.hidden-content.revealBtn {
  display: block; /* Hidden by default */
}
---------------------------------
what is event probagation
Event Propagation
The process of how events (like clicks) travel through elements in the DOM. It has three phases.

Event Capturing
The event travels from the outermost parent down into the target element.

Target
The exact element that was clicked (or triggered by the user).

Event Bubbling
After hitting the target, the event travels back up from the target to the outermost parent.

Summary:

Capturing: Event goes inward.

Target: Event is at the clicked item.

Bubbling: Event goes outward again.
-----------------------
what is the .window
window is the global browser object that represents the whole browser window/tab.
--------------------
what is event delegation
Event delegation means putting a single event listener on a parent element so it can handle events for many child elements—even children added later—by checking what was actually clicked.

Summary:
One parent, one listener, handles all children using event bubbling.
It's super useful when you have lots of similar elements (like button lists, tables, menus) that need the same type of behavior!

example code, document.querySelector('.btn-1').addEventListener("click", function(e)
{
    console.log('One is clicked');
    const target = e.target;

if (target.matches('button')){
    target.style.color = 'red'}
});
with document delegation 
document.querySelector('.items').addEventListener(
    'click', function(e){
        console.log(e.target.getAttribute('class') + 'is clicked');

    })

    nb= e: Lots of details about the click.

e.target: The element that was clicked.
(Like saying “the save button was pressed”; it tells you exactly what in the party did something!)

------------------------------
what is the .matches i js Dom
.matches(selector) checks if the element fits a given CSS selector (like a tag, class, or id).

Example:

javascript
document.querySelector('.items').addEventListener('click', function(e) {
  if (e.target.matches('button')) {
    // Only true if the clicked thing is a <button>
    e.target.style.backgroundColor = 'blue';
  }
  if (e.target.matches('#btn1')) {
    // Only true if it's the button with id="btn1"
    alert('Button 1 clicked!');
  }
  if (e.target.matches('.special')) {
    // Only true if the clicked thing has class="special"
    e.target.style.fontWeight = 'bold';
  }
});

.matches is "does this thing fit the criteria?"
-------------
what is the .target in js DOM
e.target tells you what was clicked (or what triggered the event).

Example:

xml
<ul class="items">
  <li><button id="btn1">Button 1</button></li>
  <li><button id="btn2">Button 2</button></li>
</ul>
javascript
document.querySelector('.items').addEventListener('click', function(e) {
  // This logs the tag name of whatever you clicked
  console.log(e.target.tagName); // "BUTTON" if you click a button, "LI" if you click the li, etc
});
If you click on Button 1,

e.target is <button id="btn1">

So e.target.tagName is "BUTTON"

.target is "who did the action".

