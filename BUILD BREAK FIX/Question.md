🧩 Date.now()

Returns the number of milliseconds since January 1, 1970 (UTC).

It does not return a readable date — it just gives you a big number.

console.log(Date.now()); 
// Example: 1731474081650  (milliseconds)


That’s what JavaScript uses internally to keep track of time.

🧩 new Date()

If you want a readable date, you have to wrap it like this:

console.log(new Date());
// Example: Thu Nov 13 2025 14:41:21 GMT+0100 (West Africa Standard Time)

----------------
what is the rules of hooks m in react 


Hooks must run in the same order on every render

React doesn’t track hooks by their names — it tracks them by position.

It expects something like:

Hook #1 → useState
Hook #2 → useEffect
Hook #3 → useMemo


If that order changes, React gets confused and your component breaks.

2. Never put hooks inside conditions

❌ BAD:

if (isLoggedIn) {
  useState(0); // sometimes skipped → order changes → breaks
}


Why is this wrong?
Because if isLoggedIn is false, React will SKIP the hook → order changes → crash.

3. Never put hooks inside loops or functions

❌ BAD:

for (let i = 0; i < 3; i++) {
  useEffect(() => {}); // illegal
}


❌ BAD:

function doSomething() {
  useState(5); // illegal
}


Hooks can only be called in:

React component functions

Custom hooks

4. Hooks MUST always run before any early return

✔ SAFE:

const [a, setA] = useState(0);
const [b, setB] = useState(1);

if (!ready) return null;


Here, React ALWAYS sees the hooks.
Order never changes.

❌ NOT SAFE:

if (!ready) return null;

useState(0); // sometimes skipped, sometimes not

5. You can write hooks in any order

This is allowed:

useEffect(() => {}, []);
useState(100);
useMemo(() => 5, []);
useCallback(() => {}, []);


Order DOESN’T MATTER at writing time.
It only matters that the order stays the same every time the component renders.

✔ Good Example (Follows All Rules)
function Profile({ user }) {
  const [count, setCount] = useState(0);  // hook #1
  const [theme, setTheme] = useState("light"); // hook #2

  useEffect(() => {
    console.log("User updated");
  }, [user]);  // hook #3

  if (!user) return <p>No user found</p>; // early return AFTER hooks

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

❌ Bad Example (Breaks Hook Rules)
function Profile({ user }) {

  if (!user) return null;   // ❌ early return BEFORE hooks

  const [count, setCount] = useState(0);

  if (count > 5) {
    useEffect(() => {}, []);  // ❌ hook in a condition
  }

  return <div>Hi</div>;
}


This will definitely break React.

⭐ Final Summary

✔ Hooks must run in SAME ORDER every render

✔ Put hooks at the top

❌ No hooks in:

if statements

loops

early returns

nested functions

✔ You CAN reorder hooks however you want, just keep them consistent
-------------------------------












what are custom hooks in javascript
Think of a custom hook as a function that packages logic you want to reuse.

It always starts with use

It can use state, effects, or other hooks

It doesn’t render anything itself

You call it inside a component just like useState or useEffect

It’s basically like a “mini helper” for your component.

import { useState } from "react";

// ✅ Custom hook: just wraps useState
export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  return [count, setCount];
}
🔹 Using it in a Component
jsx
Copy code
import React from "react";
import { useCounter } from "./useCounter";

function Counter() {
  const [count, setCount] = useCounter(0); // call custom hook

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

export default Counter;
-------------------
what does it mean for a component to mount and unmount in react

When React renders your component and actually attaches it to the page, the component is mounted. After that, React may update it many times (that’s updates), and eventually it may remove it (that’s unmount).

Here’s the quick breakdown:

✅ Mount

Happens once, when the component first appears.

React creates the component, renders it, and inserts it into the DOM.

In class components, this is when componentDidMount() runs.

In function components, this is when a useEffect(() => {}, []) runs.

🔄 Update

Happens any time props or state change.

Function components rerun their body and effects (with dependencies).

❌ Unmount

When the component is removed from the DOM.

Cleanup effects run here.

Think of it like this:

Mount: You enter the room.

Update: You change clothes, adjust, move around.

Unmount: You leave the room.
--------------------------------
what is lazy initilization in react 

Normal usage

This sets state to a function (yes, the function itself becomes the state):

const [value, setValue] = useState(() => {
  return 5;
});


Here, the state is 5, because the function runs IMMEDIATELY.

🟢 2. Lazy initialization (the real magic)

If you do:

const [value, setValue] = useState(() => expensiveWork());


React does not call that function on every render.

It only calls it once — during the initial render.

This is called lazy initialization.

It’s perfect for:

loading from localStorage

heavy computations

generating IDs

large default arrays

Example:

const [savedValue] = useState(() => {
  console.log("Runs only once!");
  return JSON.parse(localStorage.getItem("key")) || [];
});


If you didn’t wrap it in a function, it would run every single render — bad.
-----------------------
add to the react root question 


(write this part in your notes)

React component = returns ONE root.
map() callback = returns ONE root.

If you have multiple siblings → wrap in:

a <div>

or a <section>

or <> </>

or <React.Fragment> </React.Fragment>

Otherwise React throws errors.


1. Only .map() must return ONE JSX root

React checks .map() because it creates UI.

Wrong:

items.map(item => (
  <p>{item.name}</p>
  <span>{item.age}</span>  // ❌ two roots
));


Right:

items.map(item => (
  <>
    <p>{item.name}</p>
    <span>{item.age}</span>
  </>
));

✅ 2. .filter() doesn’t return JSX → React doesn’t care

It only returns a new array.

const adults = items.filter(i => i.age >= 18);


No JSX = No rules.

✅ 3. .filter() + .map() → Only .map() matters
items
  .filter(i => i.age >= 18)
  .map(i => (
    <div key={i.id}>{i.name}</div>  // ✔ one parent
  ));

✅ 4. .reduce() also fine — but JSX must follow 1-root rule
items.reduce((acc, item) => {
  acc.push(
    <div key={item.id}>{item.name}</div>  // ✔ one root
  );
  return acc;
}, []);

✅ 5. .forEach() → React doesn’t check anything

Because it returns nothing.

items.forEach(i => console.log(i));

🧠 THE UNBREAKABLE RULE

Any function that returns JSX must return ONE parent element.
Only .map() normally returns JSX, so it’s the one that throws errors.
----------------------
# JavaScript: Object.entries() + Destructuring Pattern

## Title: Converting Objects to Arrays and Extracting Values

---

## Note: What is Object.entries()?
`Object.entries()` converts an object into an array of `[key, value]` pairs. This is useful when you need to loop through an object.

## Code Example:
```javascript
const myObject = {
  "Shopping": { items: [1, 2, 3], total: 100 },
  "Food": { items: [4, 5], total: 50 }
};

// Object.entries() converts it to:
[
  ["Shopping", { items: [1, 2, 3], total: 100 }],
  ["Food", { items: [4, 5], total: 50 }]
]
```

---

## Note: Destructuring Arrays
When you have an array like `["Shopping", { items: [...], total: 100 }]`, you can extract values using destructuring.

## Code Example:
```javascript
const pair = ["Shopping", { items: [1, 2, 3], total: 100 }];

// Destructure the array:
const [category, data] = pair;
// category = "Shopping"
// data = { items: [1, 2, 3], total: 100 }
```

---

## Note: Destructuring Objects (with Renaming)
When destructuring an object, you can rename properties using the syntax `oldName: newName`.

## Code Example:
```javascript
const data = { expenses: [1, 2, 3], total: 100 };

// Destructure and rename:
const { expenses: categoryExpenses, total } = data;
// categoryExpenses = [1, 2, 3]  (renamed from "expenses")
// total = 100
```

---

## Note: Combining Everything - The Full Pattern
This is the pattern used in ExpenseList.jsx line 42. It combines Object.entries(), array destructuring, and object destructuring with renaming.

## Code Example:
```javascript
const expensesByCategory = {
  "Shopping": { expenses: [1, 2, 3], total: 150 },
  "Food": { expenses: [4, 5], total: 80 }
};

// Step 1: Convert to array of pairs
Object.entries(expensesByCategory)
// Returns: [["Shopping", {...}], ["Food", {...}]]

// Step 2: Map through each pair and destructure
.map(([category, { expenses: categoryExpenses, total }]) => {
  // category = "Shopping" (first element of array)
  // categoryExpenses = [1, 2, 3] (renamed from "expenses")
  // total = 150
  
  console.log(category);           // "Shopping"
  console.log(categoryExpenses);   // [1, 2, 3]
  console.log(total);              // 150
})
```

---

## Note: Why This Pattern is Useful
- You can loop through objects (which you can't do directly with `.map()`)
- You get both the key (category name) and value (the data) at the same time
- You can rename properties to avoid confusion
- It's clean and readable

---

## Quick Reference Template:
```javascript
Object.entries(yourObject).map(([key, value]) => {
  // key = the object's key (like "Shopping")
  // value = the object's value (like { expenses: [...], total: 100 })
  
  // If value is an object, you can destructure it further:
  const { property1: newName1, property2 } = value;
})
```

---

## Real-World Example (From ExpenseList.jsx):
```javascript
{Object.entries(expensesByCategory).map(([category, { expenses: categoryExpenses, total }]) => {
  // Now you can use:
  // - category (the category name string)
  // - categoryExpenses (the array of expenses, renamed)
  // - total (the total amount)
  
  return <div>{category}: ${total}</div>;
})}
```

---------------------------
how do you add homepage pointing to github url for react projects
Add homepage in package.json

Open package.json

Add a top-level "homepage" property pointing to your GitHub Pages URL:

"homepage": "https://your-username.github.io/your-repo-name"


Make sure it is outside the "scripts" section.

2️⃣ Install gh-pages

This package will handle deploying your build folder to GitHub Pages:

npm install gh-pages --save-dev

3️⃣ Add deploy scripts

In the "scripts" section of package.json, add:

"predeploy": "npm run build",
"deploy": "gh-pages -d build"


predeploy: automatically builds your project before deployment

deploy: pushes the build folder to the gh-pages branch on GitHub

Example "scripts" section:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

4️⃣ Deploy your app

Run the deploy command:

npm run deploy


Wait a few seconds, then visit:

https://your-username.github.io/your-repo-name/


--------------------------------
what is cascading renders in jsx 
"Don't call setState (like setData) directly inside a useEffect because it can cause cascading renders."
What "cascading renders" means
When you call setData, React re-renders the component. If that happens inside useEffect, and the effect runs again, it can create a loop:

Component renders → useEffect runs → setData() → Component re-renders → useEffect runs again → setData() → ... (infinite loop!) and the cycle ,goen on and on and on

The solution
Instead of:
// ❌ Function defined OUTSIDE useEffectconst fetchData = async () => {  setData(json);};useEffect(() => {  fetchData();  // Calling it from useEffect}, []);
Do this:
// ✅ Function defined INSIDE useEffectuseEffect(() => {  const fetchData = async () => {    setData(json);  };  fetchData();  // Then call it}, []);
Why this work
The function is scoped to the effect, so the linter sees it's only used there.
The async/await pattern is clear, so the state update happens after async work.
This satisfies the linter rule.
----------------------------
How do you use async await in reac to call api ?
How to use async/await in React (quick reference)

State setup

const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);


Create async function to fetch data

const fetchData = async () => {
  try {
    setLoading(true);
    const res = await fetch("API_URL");
    const json = await res.json();
    setData(json);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


Call it in useEffect to run on mount

useEffect(() => {
  fetchData();
}, []);


Optional: call it on button click

<button onClick={fetchData}>Load Data</button>


Render state safely

{loading ? <p>Loading...</p> : <p>{data?.someField}</p>}


💡 Tips

Always wrap async calls in try/catch.

Update loading state to handle spinners/messages.

Use useCallback if you pass the async function to useEffect or buttons repeatedly.
-----------------------------

