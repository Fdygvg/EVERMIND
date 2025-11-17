what is a javascript runtime
A JavaScript runtime is the environment where JavaScript code actually runs.
JavaScript by itself is just text — the runtime gives it the power to do things.

There are two main runtimes:

Browser Runtime:
Lets JavaScript interact with web pages (DOM, buttons, input, fetch, etc.).

Node.js Runtime:
Lets JavaScript interact with files, servers, databases, and the computer itself.

In short:
JavaScript runtime = the place that gives JavaScript the tools and power it needs to work.

---

What Is the Event Loop in Node.js?

The event loop is the system inside Node.js that handles tasks one at a time while keeping everything running smoothly.
Node.js does slow tasks (like reading files or fetching data) in the background, and the event loop checks when those tasks are done and runs their results.

In short:
The event loop keeps Node.js from getting stuck by managing tasks and running them when they’re ready.

---

What Is a REPL?

REPL is a tool that lets you interact with JavaScript (or other languages) one command at a time.

REPL stands for:

Read – reads what you type

Evaluate – figures out the result

Print – shows the result

Loop – repeats for the next command

e.g
got to cmd and type node then enter
and run code , you can console.log,a nd use functions

Use:
It’s like a code playground where you can test small pieces of code instantly without making a full file.

---

how do you create a new folder from cmd ?
mkdir filename
cd filename

---

how do setup a new node.js project

first run npm init
there will be questiosn asked ,
Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (nodejs)
version: (1.0.0)
description: nodejs
entry point: (index.js)
test command:
git repository:
keywords:
author: userN9ne
license: (ISC) "MIT"
Sorry, license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>" and license is similar to the valid expression "MIT".
license: (ISC) MIT
About to write to C:\Users\USER\nodejs\package.json:

{
"name": "nodejs",
"version": "1.0.0",
"description": "nodejs",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "userN9ne",
"license": "MIT"
}

Is this OK? (yes),

if you wanna skip , run npm init -y

---

how do you export in common js and es module
common js

module.exports = function

const function = require("./filepath")
or if there are two you can put both in an object
e.g

module.exports =
{
function1,
function2
}

const {
function1,
function2
} = require("./utils");
then

and for es modules 
you have to add "type": "module" to top of package.json first  export your function, 
export const getPosts = ()=> posts;
you can import like this , 
import { getPosts} from './postController.js'
you have to addcurly braces because ....

another way to export is by at the botttom of ht file  

export {function}
and you cn imort like thsi
import { getPosts} from './postController.js'
and to eport default 
export default function
import getPosts from './postController.js'
you can also export and import a default and a non default at the same time, 

export default function1
export{function2}
import function1,{ function2 } from "./postController.js";

--------------------
// how to create a server in node.js
import http from "http";
const PORT = 9000
const server = http.createServer((req, res)=>{
res.write("Hello World");
res.end()
});
server.listen(PORT, () => {
console.log(`Server Running On Port ${PORT}`)
})




What this Node.js code does (Simple Version)

import http from "http";
This brings in Node.js’s HTTP toolkit. It’s like taking out a box of building blocks to make a web server.

const PORT = 9000
This chooses the door number (port) your server will use to talk to the internet. Think of it like picking which door visitors should knock on.

const server = http.createServer((req, res)=>{ ... })

This makes a server (a little helper that listens for people knocking).

(req, res) are the visitor and your reply:

req = the request (what the visitor asks)

res = the response (what you answer)

res.write("Hello World");
This is what your server sends back to the visitor. In this case, it just says “Hello World.”

res.end()
This closes the conversation. The server is done talking for now.

server.listen(PORT, () => { ... })

This tells the server: start listening on door 9000.

The function inside () => { ... } runs when the server is ready.

It prints: "Server Running On Port 9000" so you know it’s working.

nb: sometimes , res.write, isnt nrcessary, you can still get response with res.end ,
res.end("Hello World")
 
ot you can also set header
const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html')
res.end("<h1>Hello World!</h1>")
});, now hello world gets printed in an h1 tag

or you can also change tehstatus code  , 
const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 404;
res.end("<h1>Hello World!</h1>")
});
or you can do both together with
-------------------
how do you set  a shortcut to run js files on nodejs

add to you script in package.json,-- 
    "start": "node filename.js"
    now you can run npm start

    if yiu use any othe r wors apart from statt you have to add run , e.g 
    "dev": "node server"
in cmd youll have to run npm run dev
--------------------
how do you install nodemon  so you dont always have to restart your server , whenever you make a change
 
first run , npm i -D nodemon
the D makes it so that ....
//and youll see the dev dependency in you package,json file , you can delete nodemodules folder , nadn only run npm install to get it back 
then step 2 : in you packgaje ,json in the scripts property , add 
    "start": "nodemon server.js"
    "dev": "nodemon server.js"


now run npm start or npm run dev and the server will restart it self , and auto update, without you needing to 
-----------------
how do you prevent files from being pushed to github

first create a ,gitignore file 
then put filenmae you dont want to get pushed ,e.g, node_modules.
------------
what are env files, and how to use 
env stands for Environ,ent Variables

it is rrecommend to add env files to gitignore, so api keys dont leak,
a sample

API_KEY= 91301394134
PORT= 3432

IN THE BEGIINing you do have to run it with a flag 
    "dev": "nodemon --env-file=.env server.js"
and in where you were supposed to call it before , you now call it with , 
//index.js

const PORT = process.env.{VARIABLE NAME}
---------------
how do you api with postman 
 after instalign the extenstion or where ever you want to access , postman 
 then put the link , e,g 
 https://localhost:8000

 then you can send get,post,put,request , from there 
 -----------------
 how to create a router in nodejs
 
 import http from "http";
const PORT = process.env.PORT;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About</h1>");
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1 >Not Found</h1>");
  }
});
server.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});

if you want the router to be for only get request 
wrap in try catch, try {
    if (req.method === "GET") {}
}
-------------------------


