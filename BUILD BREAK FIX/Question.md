what is the shorcat to rename a file in cmd 
You must be in the right directory

Before renaming, navigate to the folder containing your file or directory:

cd C:\Users\USER\Desktop


Then use ren (short for rename).

🔹 2. Basic syntax

For both files and folders:

ren "old_name" "new_name"


✅ Always use quotes if there are spaces in the names.

Examples:

ren "ASYNC" "CHUCK NORRIS API"        ← folder
ren "notes.txt" "final_notes.txt"     ← file

nb both rename and ren work the same way in Windows CMD.
---------------------
explain the .ok function
its like teh if to know if something is true
.ok / if → “Is this true?”
--------------------
what is the console.error and the throw new error function
throw new Error

This is plain JavaScript.

It’s like shouting: “STOP! Something is wrong here!”

Example:

function eatCake(cakes) {
  if(cakes === 0) {
    throw new Error("No cake to eat!");
  }
  console.log("Yum!");
}

eatCake(0); // Shouts: Error: No cake to eat!


JavaScript will stop running this part of the code when you throw.

4. console.error

This is like saying: “Hey, look! There’s a problem!”

It doesn’t stop your code; it just prints the problem in red.

Example:

console.error("Uh-oh, something went wrong!");


You’ll see it in the console, but your program keeps running.
--------------------
explain the logic behind fetching variables using promises 
Fetch flow in plain logic

1️⃣ fetch(url)
→ Sends a request.
→ Returns a promise that eventually gives you a Response object if the network works.

2️⃣ .then((response) => response.json())
→ Runs when the first promise resolves (you got a reply).
→ response.json() parses the reply body and returns another promise.
→ The next .then() will get whatever response.json() returns.

3️⃣ .then((data) => { ... })
→ Runs when the JSON parsing promise resolves.
→ data is now a usable JS object with the actual info from the server.

4️⃣ .catch((error) => { ... })
→ Runs if anything fails anywhere above —

network error (server down, bad URL, no internet),

invalid JSON,

or your own code threw an error.
→ It automatically catches the first failure in the chain.

🧠 The real logic behind the chain

Each .then() returns a new promise.
Whatever you return inside one .then() becomes the input for the next one.
If any .then() fails (rejects), .catch() takes over.

One line mental model:

fetch → get response → parse JSON → use data → if anything breaks → catch error.

nb : That {} in the fetch-url is the options object for fetch().
---------------------------
how do you write async function to fetch data from a website

const func = async () => {
  try {
    const response = await fetch(
      "https://superheroapi.com/api/83f20e741e49830da2b1d9bea97259ee/300",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    // convert to JSON
    const data = await response.json();

    // log result
    console.log(data);
  } catch (error) {
    console.error("This is an error:", error);
  }
};

func();
----------------  
how do you get tempory access if haveing cors error 
https://cors-anywhere.herokuapp.com

sometimes you need to request  temporary access 
How to fix that 403

In your browser, open this link:
👉 https://cors-anywhere.herokuapp.com/corsdemo

Click “Request temporary access to the demo server.”

Now try reloading your page again.
Your fetch will work this time ✅
    image.src="https://cors-anywhere.herokuapp.com/" + data.image.url
can also be used in images ,
---------------
what is a proxy 
Let’s say you really want to talk to Class B.
But your teacher won’t let you.
So you tell your friend — let’s call him Proxy Paul — who can talk to both classes.

You whisper to Paul:

“Hey, can you ask Class B what the hero data is and bring it to me?”

Paul goes, asks Class B, gets the answer, and hands it to you.
Now your teacher doesn’t complain — because technically, you only talked to Paul, not Class B directly.

That’s what a proxy does.
It’s a middleman that fetches things for you.
Helps bypass CORS
---------------------------
how do you handle errors in async wait and promises 
 put it in the catch(error) block  
--------------
what is the disabled in js 
disabled is a built-in property and attribute that belongs to form elements like:

<button>

<input>

<select>

When you set it to true, it turns that element off — meaning the user can’t click or type in it.

🧠 Example:
const btn = document.querySelector(".submit");
btn.disabled = true;  // 🚫 button is now unclickable
btn.disabled = false; // ✅ button works again

🧩 How it connects to HTML
<button disabled>Submit</button>


This does the same thing as:

btn.disabled = true;

nb: you do not need to define it 
--------------------
how do you make math.rndm , never generate 0 
ou can make it start from 1 like this:

randomNum = Math.floor(Math.random() * maxVal) + 1;


That gives you a range of
✅ 1 to maxVal
-------------------
