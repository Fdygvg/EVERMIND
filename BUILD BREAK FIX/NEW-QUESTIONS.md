1. **In JavaScript DOM selection, what's the key difference between `getElementById()` and `querySelector()` when targeting an element by its ID?**

   **Answer:** `getElementById()` directly matches an element's ID without requiring a `#` symbol, while `querySelector()` uses CSS selector syntax and requires the `#` prefix. For example:

   ```js
   // getElementById - no # symbol needed
   document.getElementById("header");

   // querySelector - requires # symbol
   document.querySelector("#header");
   ```

2. **What do `getElementsByClassName()` and `querySelectorAll()` return, and how do you access individual elements from each?**

   **Answer:** Both return array-like structures that you access using square brackets `[]` with an index. `getElementsByClassName()` returns an HTMLCollection, while `querySelectorAll()` returns a NodeList. Examples:

   ```js
   // getElementsByClassName returns HTMLCollection
   const items = document.getElementsByClassName("menu-item");
   items[0].style.color = "blue";

   // querySelectorAll returns NodeList
   const list = document.querySelectorAll("li");
   list[2].style.fontWeight = "bold";
   ```

3. **Why does including a `return` statement inside a `for` loop cause the loop to stop after the first iteration?**

   **Answer:** The `return` statement exits the entire function immediately when executed, which stops the loop after just one iteration. To apply changes to all items in a loop, use only statements without `return`:

   ```js
   // Wrong - stops after first iteration
   for (let i = 0; i < choice.length; i++) {
     return (choice[i].style.color = "red");
   }

   // Correct - processes all items
   for (let i = 0; i < choice.length; i++) {
     choice[i].style.color = "red";
   }
   ```

4. **What are the three main ways to read and display text content from a DOM element in JavaScript (`innerText`, `innerHTML`, `textContent`), and when should you use each?**

   **Answer:**

   - `innerText` - Returns visible text as shown to the user, formatted as it appears on screen
   - `innerHTML` - Returns the HTML code inside the element, including tags. **Security risk:** Using `innerHTML` with unsanitized user input can introduce script injection (XSS attacks)
   - `textContent` - Returns all text content including hidden elements

   Use `innerText` or `textContent` for plain text; use `innerHTML` only when intentionally injecting HTML and never with unsanitized user input.

5. **How do you manipulate element attributes and IDs in JavaScript using DOM methods?**

   **Answer:**

   ```js
   // Reading an attribute
   const title = document.querySelector("#mainHeading");
   console.log(title.getAttribute("id"));

   // Setting/modifying an attribute
   element.setAttribute("type", "button");

   // Removing an attribute
   element.removeAttribute("type");

   // Setting ID directly
   element.id = "myButton";
   console.log(element.id);

   // Setting ID with setAttribute
   element.setAttribute("id", "myButton");
   ```

6. **How do you manage CSS classes on an element in JavaScript DOM?**

   **Answer:** Use the `classList` property which provides methods to control CSS classes:

   ```js
   const newDiv = document.createElement("div");

   // Add a class
   newDiv.classList.add("choice");

   // Remove a class
   newDiv.classList.remove("choice");

   // Check if a class exists (returns true or false)
   console.log(newDiv.classList.contains("choice"));
   ```

7. **How do you remove an element from the DOM in JavaScript?**

   **Answer:** Call the `.remove()` method on the element:

   ````js
   newDiv.remove();
   ```1. **What is parent node traversal in JavaScript DOM, and what's the difference between `parentNode` and `parentElement`?**

   **Answer:** Parent node traversal allows you to navigate up the DOM tree from a child element to its ancestors. Both `parentNode` and `parentElement` move up one level in the hierarchy, and you can chain them to go multiple levels up:
   ```js
   let div = document.querySelector('.choice');

   // Both navigate up 4 levels to ancestor elements
   console.log(div.parentNode.parentNode.parentNode.parentNode);
   console.log(div.parentElement.parentElement.parentElement.parentElement);
   ````

   In most cases, `parentNode` and `parentElement` work the same way for HTML elements.

8. **What is child node traversal in JavaScript DOM, and what properties can you use to access child elements?**

   **Answer:** Child node traversal allows you to navigate down the DOM tree to access an element's children. You can use these properties:

   ```js
   let div = document.querySelector(".choices");

   console.log(div.childNodes); // All nodes including text/comments
   console.log(div.firstChild); // First node (any type)
   console.log(div.lastChild); // Last node (any type)
   console.log(div.firstElementChild); // First element node only
   console.log(div.lastElementChild); // Last element node only

   // Access by index
   div.childNodes[1].style.backgroundColor = "blue";
   ```

9. **Why does using `childNodes` sometimes cause a "Cannot set properties of undefined" error when trying to style elements, and what's the solution?**

   **Answer:** `childNodes` returns a NodeList that includes all types of nodes: element nodes, text nodes (spaces, newlines), and comment nodes. If you try to access `.style` on a text node, you get an error because text nodes don't have a `.style` property.

   **Solution:** Use `.children` instead of `.childNodes` because `.children` only returns element nodes that have a `.style` property:

   ```js
   // Wrong - might access a text node
   div.childNodes[2].style.backgroundColor = "blue"; // Error!

   // Correct - only element nodes
   console.log(div.children);
   div.children[1].style.backgroundColor = "blue";
   ```

10. **What is a Node and a NodeList in JavaScript DOM?**

    **Answer:**

    - **Node:** A single piece of your webpage's structure. Nodes can be:

      - Element nodes: HTML tags like `<div>`, `<p>`, `<span>`
      - Text nodes: Actual text content like "Hello World!"
      - Comment nodes: HTML comments like `<!-- comment -->`

    - **NodeList:** A collection (list) of nodes returned by DOM methods like `querySelectorAll()`:

    ```js
    const divs = document.querySelectorAll("div"); // Returns a NodeList
    ```

    Think of nodes as building blocks and a NodeList as a box holding multiple building blocks. You can access items by index, but remember not everything in a NodeList is an HTML element.

11. **What is sibling node traversal in JavaScript DOM, and how do you navigate between sibling elements?**

    **Answer:** Sibling node traversal lets you move horizontally between elements at the same level in the DOM tree. You can use these properties:

    ```js
    let div = document.querySelector(".choi");
    let divs = document.querySelector(".choices");

    console.log(divs.childNodes); // All child nodes
    console.log(div.previousElementSibling); // Previous element only
    console.log(div.nextElementSibling); // Next element only
    console.log(div.previousSibling); // Previous node (any type)
    console.log(div.nextSibling); // Next node (any type)
    ```

    Use `previousElementSibling` and `nextElementSibling` to avoid text nodes; use `previousSibling` and `nextSibling` for all node types.

12. **How do you apply event listeners directly in HTML using inline JavaScript?**

    **Answer:** Add the `onclick` attribute directly to an HTML element with JavaScript code:

    ```html
    <button onclick="alert('BRUHHHHHH')">Enter</button>
    ```

    This method is simple but not recommended for larger applications because it mixes HTML and JavaScript.

13. **How do you apply event listeners in JavaScript using the `addEventListener()` method with functions?**

    **Answer:** Select the element, define a function, and attach it using `addEventListener()`:

    ```js
    const btn2 = document.querySelector(".btn2");

    function alertbtn() {
      alert("BRUDAHHH");
    }

    // Note: Pass function name without () - don't call it immediately
    btn2.addEventListener("click", alertbtn);
    ```

    **Important:** Pass the function name without parentheses (`alertbtn`, not `alertbtn()`) so it executes when clicked, not immediately when the code runs.
    1. **What are the most common event types in JavaScript DOM, and when do they occur?**

   **Answer:** Here are the main event categories:
   
   **Mouse Events:**
   - `click` - User clicks an element
   - `dblclick` - Double-click
   - `mouseover` - Mouse pointer enters an element (hover)
   - `mouseout` - Pointer leaves an element
   - `mouseenter` - Enters element, doesn't bubble
   - `mouseleave` - Leaves element, doesn't bubble
   - `mousedown` - Mouse button pressed down
   - `mouseup` - Mouse button released
   - `mousemove` - Mouse moves over an element
   
   **Keyboard Events:**
   - `keydown` - Key is pressed
   - `keyup` - Key is released
   - `keypress` - Key is pressed (deprecated, less common)
   
   **Form Events:**
   - `submit` - Form is submitted
   - `focus` - Element gets focus
   - `blur` - Element loses focus
   - `change` - Input value changes
   - `input` - User types (captures every character)
   
   **Other Events:**
   - `load` - Page/element finishes loading
   - `resize` - Window size changes
   - `scroll` - User scrolls page/element

2. **What's the simplest way to revert a background color using event listeners in JavaScript?**

   **Answer:** Set the `backgroundColor` property to an empty string, which removes the inline style:
   ```js
   btn2.style.backgroundColor = '';  // Removes inline style
   ```

3. **How do you create a button that toggles the visibility of hidden content using event listeners and CSS classes?**

   **Answer:** Use `classList.toggle()` or check if a class exists, then add/remove it:
   ```js
   const revealBtn = document.querySelector(".reveal-center");
   const hiddenContent = document.querySelector(".hidden-content");
   
   function revealBot() {
     if (hiddenContent.classList.contains("revealBtn")) {
       hiddenContent.classList.remove("revealBtn");
     } else {
       hiddenContent.classList.add("revealBtn");
     }
   }
   
   revealBtn.addEventListener("click", revealBot);
   ```
   
   **CSS:**
   ```css
   .hidden-content {
     display: none; /* Hidden by default */
   }
   .hidden-content.revealBtn {
     display: block; /* Visible when class added */
   }
   ```

4. **What is event propagation in JavaScript DOM, and what are its three phases?**

   **Answer:** Event propagation is the process of how events travel through elements in the DOM. It has three phases:
   
   1. **Event Capturing** - The event travels from the outermost parent down to the target element
   2. **Target** - The exact element that was clicked or triggered
   3. **Event Bubbling** - After hitting the target, the event travels back up from the target to the outermost parent
   
   **Summary:** Capturing goes inward → Target is the clicked item → Bubbling goes outward

5. **What is the `window` object in JavaScript?**

   **Answer:** `window` is the global browser object that represents the entire browser window or tab. It's the top-level object in the browser's JavaScript environment.

6. **What is event delegation in JavaScript DOM, and why is it useful?**

   **Answer:** Event delegation means putting a single event listener on a parent element to handle events for many child elements—even children added later—by checking what was actually clicked using event bubbling.
   
   **Example without delegation:**
   ```js
   document.querySelector('.btn-1').addEventListener("click", function(e) {
     console.log('One is clicked');
     const target = e.target;
     
     if (target.matches('button')) {
       target.style.color = 'red';
     }
   });
   ```
   
   **Example with delegation:**
   ```js
   document.querySelector('.items').addEventListener('click', function(e) {
     console.log(e.target.getAttribute('class') + ' is clicked');
   });
   ```
   
   **Why it's useful:** One parent, one listener handles all children. Perfect for lists, tables, and menus with similar elements!
   
   **Note:** `e` contains details about the click, and `e.target` is the element that was clicked.

7. **What does the `.matches()` method do in JavaScript DOM?**

   **Answer:** `.matches(selector)` checks if an element fits a given CSS selector (tag, class, or id). It returns `true` or `false`:
   ```js
   document.querySelector('.items').addEventListener('click', function(e) {
     if (e.target.matches('button')) {
       // Only true if clicked thing is a <button>
       e.target.style.backgroundColor = 'blue';
     }
     if (e.target.matches('#btn1')) {
       // Only true if it's the button with id="btn1"
       alert('Button 1 clicked!');
     }
     if (e.target.matches('.special')) {
       // Only true if clicked thing has class="special"
       e.target.style.fontWeight = 'bold';
     }
   });
   ```
   **Summary:** `.matches()` asks "does this thing fit the criteria?"

8. **What is `e.target` in JavaScript DOM events?**

   **Answer:** `e.target` tells you what element was clicked (or what triggered the event):
   ```html
   <ul class="items">
     <li><button id="btn1">Button 1</button></li>
     <li><button id="btn2">Button 2</button></li>
   </ul>
   ```
   ```js
   document.querySelector('.items').addEventListener('click', function(e) {
     console.log(e.target.tagName); // "BUTTON" if you click a button
   });
   ```
   If you click Button 1, `e.target` is `<button id="btn1">` and `e.target.tagName` is "BUTTON".
   
   **Summary:** `.target` is "who did the action"
