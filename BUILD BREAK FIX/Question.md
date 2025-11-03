how to make an async function 
async ()=> {
    const taskOne = await preHeatOven();
    console.log(taskOne);

    const taskTwo = await addSugar();
    console.log(taskTwo);
    const taskThree = await addFlour();
    console.log(taskThree);
    console.log('Enjoy Your Cookies')
}
nb , the await   keyword only works in the , async function
--------------
give an example of fetching data from a dummy url
fetch("https://dummyjson.com/products/1", {})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));


Step	What’s happening	Like in real life
fetch()	Ask the website for info	Sending a letter
.then(response => response.json())	Open and read the reply	Reading the letter
.then(data => console.log(data))	Show what was inside	Saying out loud what it says
.catch(error => console.error(error))	Handle any problems	Saying “Oops, something went wrong!”
------------------------
what are the  methods to fetch data from an api 
Method	What it does	Simple meaning
GET	Ask for existing info	“Show me the data.”
POST	Add new info	“Here’s something new.”
PUT	Update existing info	“Change this thing.”
DELETE	Remove info	“Delete this thing.”
💻 Examples
1️⃣ GET — ask for info
fetch("https://dummyjson.com/products/1")
  .then(res => res.json())
  .then(data => console.log("GET:", data))
  .catch(err => console.error(err));


➡️ Gets product #1 and shows it.

2️⃣ POST — add new info
fetch("https://dummyjson.com/products/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "New Product",
    price: 99
  })
})
  .then(res => res.json())
  .then(data => console.log("POST:", data))
  .catch(err => console.error(err));


➡️ Adds a new product.

3️⃣ PUT — update existing info
fetch("https://dummyjson.com/products/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Updated Product",
    price: 150
  })
})
  .then(res => res.json())
  .then(data => console.log("PUT:", data))
  .catch(err => console.error(err));


➡️ Updates product #1.

4️⃣ DELETE — remove info
fetch("https://dummyjson.com/products/1", {
  method: "DELETE"
})
  .then(res => res.json())
  .then(data => console.log("DELETE:", data))
  .catch(err => console.error(err));


➡️ Deletes product #1.

⚡ In one line:

nota bene:
GET = look, POST = create, PUT = edit, DELETE = remove.
nb: method: 'POST' → tells the server you’re sending new data.

headers → little notes that describe your message;
'Content-Type': 'application/json' means “the stuff I’m sending is in JSON format.”

body → the actual data you’re sending (the product info, in this case).

JSON.stringify() → turns your JavaScript object into a text version (JSON) so the server can understand it.

Without JSON.stringify, the server won’t be able to read your object — it’ll just get gibberish.

fetch() defaults to the GET method automatically.

So this:

fetch('https://dummyjson.com/products')


is exactly the same as this:

fetch('https://dummyjson.com/products', { method: 'GET' })
------------------
how do you make buttonsand inputs trasnparent

backgrounf-color:transparent;
----------------
what are the requirements before z-index will work 
z-index only works on positioned elements. That means the element must have:

position: relative | absolute | fixed | sticky;


By default, z-index does nothing on static elements (the default positioning).

 Fix:add position: relative; (or absolute if you want it floating somewhere)
 -------------------
 how do you create new date,month and year in js
 let dateObj = new Date();
 You can pass a string like "YYYY-MM-DD":

let dateObj = new Date("2025-11-03");
console.log(dateObj); // Mon Nov 03 2025 00:00:00


You can also include time:

let dateObj = new Date("2025-11-03T14:30:00");
console.log(dateObj); // Mon Nov 03 2025 14:30:00


Note: Always use the ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS) to avoid timezone issues.


let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

date.innerHTML= `${month} ${day} ${year}`;

-------------------
what is cors 
CORS (Cross-Origin Resource Sharing) is a security rule in browsers that controls whether a webpage can request data from a different website or server.

Purpose: Protect users from malicious websites stealing data.

Applies to: Browser-based JavaScript (fetch, XMLHttpRequest).

Does not apply to: Node.js, backend scripts, or servers.

✅ If the server allows your site, the browser lets the request through. If not, the browser blocks it.

It’s basically the browser asking:
"Are you allowed to talk to that other server?"
----------------


