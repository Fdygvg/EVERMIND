ok , its an exppense tracker , im still think on how wel go about the components, so i thousgth , AddNewExpense.jsx , ExpenseComponent.jsx, ExpenseDetials.jsk , now in the page theres this add new expnese button at the top , a big button , and clicking on that button a form will appearn in the space of that button, a dropdown catgory with preset , expenses , shoppint, transport, entertainemt... , then below theres name of expense, and amount, then a add, or cancel button, , then after that , below the add button, is a button labaled stats, clcikingon it , will realease a dropdown, again, expenses today, , expenses, this week, ....month,year, then lastly , below it are the difffernet categoriesl , now by default they won show unless a use addd an expense to that category , then react will creact some kind of rectangular card from htat category , e.g , shopping, then when user adds an expens unders hopping, then , shopping will, show , then user can also click on it and ill drop down , and show all expenses ,for thtat category, the title , amount , date, then a date, limited to 5 ,then a showmore button, user click redirected to another page , where hell see all , for that category , a backkbutton at the top left, so he can go back to main page, so yeah thats basicallly it , hope this wasnt tooo much ?
-----------------   
How do you get and store today’s date in React using useState?

✅ Answer (short summary):

You can use JavaScript’s Date object with useState to save today’s date in a readable format (YYYY-MM-DD).

🧩 Explanation (step-by-step):
const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);

🧠 Step 1 — new Date()

Creates a Date object with the current date and time.

🧠 Step 2 — .toISOString()

Turns that date into a clean string like:

"2025-11-12T14:00:00.000Z"

🧠 Step 3 — .split("T")[0]

Removes the time and keeps just the date part:

"2025-11-12"

🧠 Step 4 — useState(...)

Stores that date in React’s memory as the initial state.
Now you can use it in your app or update it later with setDate().
-----------------------------
What is the preventDefault() function in JavaScript, and how do you use it?

✅ Answer (short summary):

preventDefault() is a function you call on an event (e) to stop the browser from doing its normal action.

For forms: stops the page from reloading on submit

For links: stops navigation to a new page

You can use it anywhere a browser event has a default action you want to prevent

🧩 Explanation with examples
1️⃣ On a form submit
const handleSubmit = (e) => {
  e.preventDefault(); // stop page reload
  console.log("Form submitted, but page did not reload!");
};

<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Type something" />
  <button type="submit">Submit</button>
</form>


Without preventDefault() → page reloads when you submit

With preventDefault() → you handle submission yourself without reload

2️⃣ On a link
<a
  href="https://google.com"
  onClick={(e) => {
    e.preventDefault(); // stop navigation
    alert("Link clicked, but browser did not go to Google");
  }}
>
  Click me
</a>


Normally, clicking would go to Google

preventDefault() stops the browser → you can handle the click in React
---------------------------------
add to datenow that it is also recommens to be used ,
as is fo robjects for its unquness, or if teh nubers is t0oo long you could use , 
-----------------------------
-----------------------------
-----------------------------
-----------------------------
-----------------------------
-----------------------------
-----------------------------
add to number is integer question, add number is nan
Number.isNaN(value)

Checks if a value is literally NaN.

Number.isNaN(NaN)  // true
Number.isNaN(5)    // false
Number.isNaN("foo") // false (important: only true for actual NaN)


Number.isFinite(value)

Checks if a value is a finite number (not NaN or Infinity).

Number.isFinite(5)       // true
Number.isFinite(Infinity) // false
Number.isFinite(NaN)      // false
Number.isFinite("5")      // false
Number.isSafeInteger(value)

Checks if a number is a safe integer within JS number limits (-(2^53 -1) to 2^53 -1).

Number.isSafeInteger(9007199254740991) // true
Number.isSafeInteger(9007199254740992) // false




isNumber(value) checks if a value is truly a number and not NaN.

Example:

const isNumber = (value) => typeof value === "number" && !Number.isNaN(value);

console.log(isNumber(5));       // true
console.log(isNumber(NaN));     // false
console.log(isNumber("hello")); // false



-----------------------------
add select input type to type of inputs question

<select>
  <option value="shopping">Shopping</option>
  <option value="food">Food</option>
  <option value="transport">Transport</option>
</select>
The user sees a dropdown and can pick one of the options.

value = what gets sent when the form is submitted

add input type date , to input also  , fo rdate only 
-----------------------------
ADD TO PARSEFLOAT QUESTION

what is the parse float function
parseFloat()

Takes a string and converts it to a floating-point number (decimal included).

Stops reading when it hits something that isn’t a number.

Examples:

parseFloat("12.442"); // 12.442  → keeps the decimal
parseFloat("12ddd");  // 12      → stops at "d"
parseFloat("abc12");  // NaN     → no number at the start
-----------------------------
what are some "on" event ahndlers/eveent props in react
onClick

Runs when you click a button or element.

Example:

<button onClick={() => console.log("Button clicked!")}>Click me</button>


Every time you click → the function runs.

2️⃣ onChange

Runs when the value of an input changes.

Example:

<input type="text" onChange={(e) => console.log(e.target.value)} />


Every time you type → the function runs.

3️⃣ onSubmit

Runs when a form is submitted, usually by:

Pressing Enter in an input

Clicking a <button type="submit"> inside the form

Example:

<form onSubmit={handleSubmit}>
  <input type="text" />
  <button type="submit">Submit</button>
</form>


When the form is submitted → handleSubmit runs

Without e.preventDefault() → browser reloads the page

With e.preventDefault() → you can handle the data yourself (React-style)

onMouseEnter	Runs when the mouse moves over an element
onMouseLeave	Runs when the mouse leaves an element
onKeyDown	Runs when a key is pressed
onKeyUp	Runs when a key is released
onFocus	Runs when an input gets focus
onBlur	Runs when an input loses focus
onDoubleClick	Runs on double click
onScroll	Runs when a container is scrolled

-----------------------------
why is it better to use  <label> with inputs in React
1️⃣ Wrapping input inside a label
<label>
  Expense Title:
  <input
    type="text"
    placeholder="e.g. Movie ticket"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
</label>


Key points:

The text inside the <label> is automatically linked to the input.

Clicking the label focuses the input.

Improves accessibility for screen readers.

No need for id + htmlFor if the input is inside the label.
---------------------
what is rendering in react and give examples 

It turns your JavaScript code (JSX) into real HTML elements that the browser can show.

Example 1 – Simple JSX Render
function App() {
  return <h1>Hello World!</h1>;
}


🗣️ Sentence:

React is rendering the <h1> element that says “Hello World!” on the screen.

That means it’s turning that line of JSX into something the browser can display — literally <h1>Hello World!</h1>.

🧩 Example 2 – Conditional Rendering
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}


🗣️ Sentence:

When isLoggedIn is true, React renders “Welcome back!” —
when it’s false, it renders “Please log in.”

Here, conditional rendering just means React decides what to show based on the data.

🧩 Example 3 – Rendering a Component
function Dashboard() {
  return (
    <div>
      <UserProfile />
      <Notifications />
    </div>
  );
}


🗣️ Sentence:

React renders both the UserProfile and Notifications components inside the Dashboard.
Each of those components will render their own JSX too.

So React keeps going deeper — each component can render other components.
It’s like a tree where each branch “renders” smaller branches.

🧩 Example 4 – Re-rendering (state change)
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}


🗣️ Sentence:

Each time you click the button, React re-renders the Counter component with the new count.

So “re-render” means React redraws that component because its state changed.
-------------------------
React prev in state updates


What prev is

prev stands for “previous state”.

When you use the functional form of setState:

setState(prev => newState)


React automatically passes the current/latest state as prev.
Used in the functional form of setState

setState(prev => newState)


Guarantees you always work with the latest state, even if multiple updates happen quickly.

2️⃣ Example with an expense list
const [expenses, setExpenses] = useState([]);

const handleAddExpense = (expense) => {
  setExpenses((prev) => [expense, ...prev]);
};


Explanation:

prev = the old array of expenses

[expense, ...prev] = new array with the new expense added at the front

React replaces old state with this new array

nb: any name can be used , prev doesnt have any significant meaning , 
Example:
setExpenses((currentState) => {
  console.log(currentState); // current/latest state automatically passed in by React
  return [expense, ...currentState]; // new state returned
});


currentState could be called anything — React just passes the latest state.

The function’s return value is what updates the state.
-----------------------------------
how do you set toggle to a button in react, 
To toggle it when clicking the button:

<button
  style={style}
  onClick={() => setDropdown(true)} // OR toggle: setDropdown(!dropdown)
>
--------------------
Why doesn’t style[1] work when I define my styles as an object in React, and how can I fix it?

💡 Answer:
1️⃣ What was wrong
const style = {
  color: "red",
  backgroundColor: "orange",
  newest: {
    color: "blue",
    backgroundColor: "red"
  }
};


style is a plain object, not an array.

It has keys: color, backgroundColor, newest.

There is no numeric index [1] — so style[1] is undefined.

Result: Your button won’t get any styles.

2️⃣ How to fix it (access by key)

If you want to use the newest style:

<button style={style.newest} onClick={() => setDropdown(!dropdown)}>
  Show Stats
</button>


Access by key name, not index.

3️⃣ Alternative: use an array of styles
const styles = [
  { color: "red", backgroundColor: "orange" },
  { color: "blue", backgroundColor: "red" }
];

<button style={styles[1]} onClick={() => setDropdown(!dropdown)}>
  Show Stats
</button>


Arrays use numeric indices → now styles[1] exists and works.
----------------------------
what is usememo in react js 
useMemo is a React Hook that memoizes (remembers) the result of a calculation so React can skip redoing the work when the inputs haven’t changed.Think of it as:

“Hey React, only redo this heavy calculation if its inputs change, otherwise just give me the last result.”


const memoizedValue = useMemo(() => {
  // expensive calculation
  return computeSomething(a, b);
}, [a, b]); // dependencies
The first argument: a function that returns a value

The second argument: an array of dependencies (a, b)

React will recompute memoizedValue only if a or b change


import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Expensive calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <input value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
}

-----------------------------

what is the .tofixed js method 
 
 toFixed() is a JavaScript number method
 What it does

.toFixed(n) rounds a number to n decimal places and returns it as a string.

n = number of digits after the decimal point

2️⃣ Examples
const num = 12.3456;

num.toFixed(2); // "12.35"  → rounded to 2 decimals
num.toFixed(0); // "12"     → no decimals
num.toFixed(4); // "12.3456" → 4 decimals


Notice: the result is always a string, not a number.
Converting back to number (optional)
const rounded = parseFloat(num.toFixed(2)); // 12.35 as a number
-----------------------

