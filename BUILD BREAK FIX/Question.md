what is react
react is a library/framework for building user intefaces(UI), it was created by facebook
------------------------------
WHAT ARE COMPOnents in react
reusable piece of code that can be used to builf elements on the page, it allows breaking of complex ui , which makes , theme asier to maintaina and scale 
components can be classes(old) or functions(modern) , and they can also take in props
--------------------
what are states in react 
state represent , the data that a componnet manages internally,it used fo rdata thats expected to chaneg , inoput box , fetch api ...
------------------------
what are hooks in java script 
these allow us to use state and other react features, without writing class
useSet
useEffect
useRef
useReducer
------------------
what goes  jsx stand for
javascript , SYNTAX EXTENSIOIN
----------------------
wHAT Is SPA SSR AND SSG in react
Single page app load a single html file and js , loads the entire ui including routes
server side rendered
static site generation ,genertes ststic html files at build time, these are very fast 
----------------
what is vite
vite is a super fast front enf toolkit , that can be used for all kind of js prohects , including js,
its built ontop ESBuild , ehich is very fast JS bundler 
installed with npm create vite@latest folder-name

nb: and to install tailwind (V3) its 
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p


-----------------------

-----------------
what is vite default port and how to change it 
the default is 5173 
and to change it you have to add this 
  plugins: [react()],
  server: {
    port: 3000,
  },
to the vite.config.js
---------------------
WHAT IS strict mode in react ,
<StrictMode> is a React component, not a string.

React StrictMode does something different: it watches your components , and warns you if youre using bad or outdates react patterns 
---------------------
what is the jsx arrow and normal function skelenton 


ARROW FUNCTION

import React from 'react'

const hero = () => {
  return (
    <div>hero</div>
  )
}

export default hero

vs code shortcut
rafce  + tab 
(reachtarror functionexport component )




Normal Function

export default hero

import React from 'react'

export default function hero() {
  return (
    <div>hero</div>
  )
}
shortcut on vscode
rfc + tab
(react Functions Component)


recommended to install , ES7 + React/Redux Extension on vscode 
-------------------
what is the extends in css 
a special pocket where you can add your own crayons, without throwing away Tailwind’s crayons.
theme: {
  extend: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
}

so  you can run , <h1 className="font-poppins">Hello</h1>

but without adding yuor own , yull have to run tailwinf default 
So if you don’t add your own, you'd write:

<h1 className="font-sans">Hello</h1>


or

<h1 className="font-serif">Hello</h1>


or

<h1 className="font-mono">Hello</h1>


Those are Tailwind’s built-in crayons.
----------------
how to change use tail wind css 
Tailwind is not magic. It’s just CSS, but with a twist:

🔹 Normal CSS

You write rules like this:

h1 {
  font-size: 3rem;
  color: red;
  margin: 20px;
}


Then in React:

<h1 className="my-class">Hello</h1>


And you have to write a new class for every style you want.

🔹 Tailwind CSS

Tailwind gives you a big set of ready-to-use classes:

<h1 className="text-3xl text-red-500 m-5">Hello</h1>


text-3xl → font size

text-red-500 → color

m-5 → margin
----------------------
how many root element can react return 
React component can only return one “root” element
Example: this does NOT work:

const App = () => {
  return (
    <h1>Hello</h1>
    <p>Welcome!</p>
  )
}


❌ React says: “I don’t know which one is the main element!

How To Fix
Wrap in a parent element (like a <div> or <section>):

const App = () => {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome!</p>
    </div>
  )
}

Use a React Fragment (doesn’t add extra HTML):
OR 
import React from 'react'

const App = () => {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome!</p>
    </>
  )
}


<> ... </> = a “ghost box”

React sees one root, but no extra <div> is added in the HTML

Clean and lightweight

✅ Now React has one box containing everything.
-------------------
why is index used in  key 
When you do:
  const names = ["Brad", "Chuks", "Iron Nigga", "N9ne","wolf"];



names.map((name, index) => (
  <li key={index}>{name}</li>
))


map passes two arguments to your callback function:

name → the actual value in the array ('Brad', 'Chuks', etc.)

index → the position of that value in the array

So for:

const names = ['Brad', 'Chuks', 'Iron Nigga', 'N9ne'];


Brad → index 0

Chuks → index 1

Iron Nigga → index 2

N9ne → index 3
------------------
how can you use two returns in react? 

const loggedIn = true;
 if (loggedIn) {
  return <h1>hello member</h1> //1st return
 }

return ( //2nd return
  <>
 <div>
 {loggedin ?  <h1>hello member</h1> :  <h1>hello guest</h1>}
 </div> 
  </>
)

if the first return rund then the second wont run, its recommend to have a conditional that will trigger the seconf retunr 
------------------------
what are some ways to add styles to react 

const App = () => {
  return (
    <div
      style={{
        color: 'white',
        backgroundColor: 'teal',
        fontWeight: 'bold',
        fontSize: '24px',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px',
        textAlign: 'center'
      }}
    >
      Hello, this is Sample 1
    </div>
  )
}

export default App;


OR


const styles = {
  color: 'red',
  fontSize: '55px'
};

const App = () => {
  return <div style={styles}>Hello</div>;
}
--------------------

----------------
How do you import and export components in jsx 

first copy the code
thrn in a in jsx. file inside a components follder  , after running rafce  paste the code in the return block 

\\Navbar.jsx
then in your main file, 
import Navbar from './components/Navbar'

//inside the code where teh navbar should be  , <Navbar />
nb: first name must be capital letter
-------------------
what are props in react 
What are props?

Props = “properties” you pass into a component from its parent.

They let components be dynamic and reusable.

Props example using your <Hero />
// Hero.jsx (child component)
const Hero = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  )
}

export default Hero;

// App.jsx (parent component)
import Hero from './components/Hero';

const App = () => {
  return (
    <div>
      <Hero title="Test Title" subtitle="This is a subtitle" />
    </div>
  )
}

export default App;


✅ What happens:

<Hero title="Test Title" subtitle="This is a subtitle" /> → passes props to Hero

props.title → "Test Title"

props.subtitle → "This is a subtitle"

🔹 Shortcut: destructuring props

You can make it cleaner:

const Hero = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}


Works exactly the same

No need to write props.title or props.subtitle

or

destructured props version with a default value defined inside the component,
// Hero.jsx
const Hero = ({ title = 'This is the default title', subtitle = 'Default subtitle' }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

export default Hero;





If the parent does pass a prop, it overrides the default:

<Hero title="Test Title" subtitle="This is a subtitle" />


Output:

title → "Test Title" (overrides default)

subtitle → "This is a subtitle" (overrides default)

If the parent doesn’t pass props:

<Hero />


Output:

title → "This is the default title"

subtitle → "Default subtitle"
--------------------------------
what is wrapping in react Wrapping = putting one piece of content inside a component, so the component can add styles, structure, or behavior automatically.
The content you wrap becomes children of that component.

Example
// Card.jsx
const Card = ({ children }) => {
  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-md">
      {children}
    </div>
  )
}

export default Card;

// App.jsx
import Card from './components/Card';

const App = () => {
  return (
    <div>
      {/* Wrapping these inside Card */}
      <Card>
        <h1>Hello!</h1>
        <p>This is a wrapped paragraph.</p>
      </Card>

      <Card>
        <button>Click Me</button>
      </Card>
    </div>
  )
}

export default App;

🔹 What happens

The <h1> and <p> go inside the first Card → they get blue background, padding, rounded corners, shadow

The <button> goes inside the second Card → it also gets the same Card styling

✅ This is wrapping — you put content inside a component, and it automatically inherits the component’s styling/structure.
-------------------------
what is useState in react


Think of useState as a special box to store something in React.

It’s like having a labeled jar that can hold a value, and you can change the value anytime, and React will update the screen automatically.

Example: a counter, a username, or whether a button is clicked.



import { useState } from "react";

const Counter = () => {
  // Create a "box" called count, starting at 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1> 
      {/* Show whatever is in the box */}

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
};

export default Counter;

What’s happening

const [count, setCount] = useState(0);

count → the current value in the box.

setCount → a function to change the value.

0 → the starting value of the box.

<h1>Count: {count}</h1>

React shows whatever is inside the box.

onClick={() => setCount(count + 1)}

When the button is clicked, we update the box.

React automatically re-renders the component with the new value.
---------------------
what is the substring() javascript  string method 

It cuts out part of a string based on the start and end positions you give it.

How it works
string.substring(startIndex, endIndex)


startIndex: where you want to start cutting (inclusive).

endIndex: where you want to stop (exclusive — it does NOT include this index).

If you don’t give an endIndex, it just takes from the start to the end of the string.

✅ Example
const text = "Hello World";

const result = text.substring(0, 5);
console.log(result);


Output:

Hello


Why?
Because it takes characters from index 0 up to but not including index 5.

✅ Another example (end index optional)
const name = "Evermind";
console.log(name.substring(4));


Output:

mind


Starts at index 4 and goes till the end.
-------------------
what is to use prev state in react 

React passes the previous value of the state into that parameter.

So:

setShowFullDescription(prev => !prev)


Means:

take the previous value → flip it → store it as the new value.

✅ Example without any fancy terms

You have a switch.

const [lightIsOn, setLightIsOn] = useState(false)


To flip the switch, you tell React:

setLightIsOn(previous => !previous)


React runs it like this internally:

previous = false
!previous = true


Next click:

previous = true
!previous = false


So it keeps toggling.
----------------------------------
how do you use icons in react 
npm install react-icons
import { FaLocationDot } from "react-icons/fa6";
npm install react-icons
→ gives you access to all major icon libraries, including Font Awesome.
------------------------------
what are react routers and how to use

imagine your React app is like a house with many rooms:

Each room is a page (Home, About, Jobs, Contact…).

You want to walk to a room without leaving the house.

React Router is like the hallway that lets you go to any room without reloading the whole house. How it works
Install React Router:

npm install react-router-dom

Wrap your app in a Router:

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />      {/* Home page */}
        <Route path="/about" element={<About />} /> {/* About page */}
      </Routes>
    </Router>
  );
}

export default App;


Add links:

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

✅ Key points

<Routes> → container for all your routes.

<Route path="/xyz" element={<Component />} /> → define which page shows for which URL.

<Link to="/xyz"> → navigate without refreshing the page.

React Router keeps your app SPA (Single Page App): no full page reloads.
---------------------------

