add to the stand for question
sql, no sql, xml
,
"dev": "node --watch --env-file=.env script"

match match: [/.+@.+\..+/, "Please enter a valid email"],
validate: {
validator: function (value) {
return /^(?=._[A-Za-z])(?=._\d)[A-Za-z\d]/.test(value);
},
message: "Password must contain at least one letter and one number",
},,
required: [true, "Name is required"],

---

npm install mongoose bcryptjs jsonwebtoken

# Question:

How do you write rest files

## Answer:.

you create a folder , foldernam.rest

```js
GET http://localhost:9000/api/todo
PUT
DELETE
POST
```

## usually http and not https , because

# Question:

how do you create get post, put and delete to mongooses db

## Answer:

```js
class todoRoutesClass {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get("/", todocontroller.viewAllTodo);
    this.router.post("/new", todocontroller.createTodo);
    this.router.delete("/delete/:id", todocontroller.deleteTodo);
    this.router.put("/update/:id", todocontroller.updateTodo);
  }
  getRouter() {
    return this.router;
  }
}
const todoRoutes = new todoRoutesClass();
export default todoRoutes;

//Delete
const { id } = req.params;

const deletedTodo = await todo.findByIdAndDelete(id);

// Create -post
const { title, desc, completed } = req.body;
const newtodo = await todo.create({
  title,
  desc,
  completed,
});

//get
const todos = await todo.find();
res.status(200).json(todos);

//Update - put
const { id } = req.params; // The :id from the URL
const { title, desc, completed } = req.body; // Fields to update

// Find the todo by id and update with new data
const updatedTodo = await todo.findByIdAndUpdate(
  id,
  { title, desc, completed },
  { new: true, runValidators: true } // Return the updated doc + validate fields
);
```

---

# Question:

what are end points

## Answer:

ChatGPT said:

In programming and web development, endpoints are basically the points of interaction between a client (like a web browser or mobile app) and a server. They are specific URLs (or URIs) where your application can send requests and get responses. Think of them as “doors” into your application where you can ask it to do something or get some data.

Here’s a breakdown:

Web APIs (REST/HTTP context):

Each endpoint corresponds to a URL and usually a request method (GET, POST, PUT, DELETE).

Example:

GET /users → Fetches all users

POST /users → Creates a new user

GET /users/123 → Fetches the user with ID 123

Function:

Endpoints define the operations your application exposes to the outside world.

They handle incoming requests, process data, and return a response (JSON, HTML, files, etc.).

In real life analogy:

Imagine a restaurant: the endpoint is the counter where you place your order. You give instructions (request), and the kitchen responds with food (response).

Key Points:

Not all URLs are endpoints; only those meant for programmatic interaction.

They are the backbone of APIs, microservices, and server-client communication

```js

```

---

# Question:

How do you connect node/expresss app to mongodb server

## Answer:

```js
import express from "express";
import mongoose from "mongoose";

const mongouri = process.env.MONGOURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbport);
    console.log("'✅ MongoDB Connected'");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
export default connectDB;
```

---

# Question:

what is the skelenton for route module for an Express app

## Answer:

```js
import express from "express";
import usercontroller from "../controller/userController.js";

class UserRouteClass {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post("/register", usercontroller.registeracct);
  }
  getRouter() {
    return this.router;
  }
}

const userRoutes = new UserRouteClass();
export default userRoutes;
```

anf this is teh controler , import express from "express";
import mongoose from "mongoose";

class userControllerClass {
constructor() {

}
registeracct = async () => {
try {
} catch (error) {}
};
}

const usercontroller = new userControllerClass()
export default usercontroller
and use like th8s in the script /server
app.use("/api/", userRoutes.getRouter());

---

# Question:
what is the regex lookahead and greddy reference 


## Answer:

```js
Regex Lookahead Reference

Lookaheads allow you to assert that something follows (or doesn’t) without consuming characters.

1. Positive Lookahead (?=...)

Asserts that a pattern must exist ahead.

Pattern	Meaning	Example
(?=\d)	Next character is a digit	"a1" → matches "a" if 1 is next
(?=[A-Za-z])	Next character is a letter	"1a" → matches "1" if a follows
(?=\W)	Next character is a symbol/punctuation	"a!" → matches "a" if ! follows
(?=\s)	Next character is whitespace	"a " → matches "a" if space follows
(?=.*\d)	Somewhere ahead there is a digit	"abc1" → true because digit exists

Example – password rule:

^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$


Must contain uppercase, lowercase, number, and symbol.

2. Negative Lookahead (?!...)

Asserts that a pattern must NOT exist ahead.

Pattern	Meaning	Example
(?!\d)	Next character is NOT a digit	"a1" → "a" does NOT match if 1 follows
(?![A-Z])	Next character is NOT uppercase	"aB" → "a" does not match if B follows
(?!\W)	Next character is NOT a symbol	"a!" → "a" does not match if ! follows
(?!\s)	Next character is NOT whitespace	"a " → "a" does not match if space follows
3. Notes on Combining Lookaheads

Lookaheads can be chained to enforce multiple conditions.

They don’t consume characters—so the main match still happens after checking conditions.

Can be used for letters, numbers, symbols, whitespace, or any character set.

Example – letters and numbers only, no symbols:

^(?=.*[A-Za-z])(?=.*\d)(?!.*\W).+$


Must contain letters and numbers

Must not contain symbols
```
GREDDDY 
Greedy Regex

Definition:
A greedy regex tries to match as much of the input as possible while still satisfying the overall pattern.

Key Points:

Greedy quantifiers include:

* → 0 or more

+ → 1 or more

? → 0 or 1

{n, m} → n to m times

Behavior:

The regex engine expands the match as far as it can.

If needed, it will backtrack to make the full pattern match.

Example:

Input: "I love cats and dogs"
Regex: a.*s


.* is greedy → matches everything from the first a to the last s

Match: "ats and s"

Lazy Version (Non-Greedy)

Add ? after quantifier: *?, +?, {n,m}?

Tries to match as little as possible while still satisfying the pattern

Regex: a.*?s
Match: "ats"   // stops at the first s


Summary:

Greedy = take as much as possible

Lazy = take as little as possible

Greedy is the default in regex.
 nb: there is also what we call a quarifier , {8,}

This is called a quantifier.

{8,} means: “match at least 8 characters”.

No maximum is set, so it can be 8, 9, 10… as long as it’s letters/numbers.

---

# Question:
what is destructing with renaming 

## Answer:
const { hashedPassword: pw, ...userData } = user._doc;
This is destructuring with renaming.

It does TWO things at once:

1. Removes hashedPassword from userData
So the password will NOT be included in what you send back.

2. Renames it to pw
We rename the field before discarding it.

Why rename it?
Because if you simply wrote:

js
Copy code
const { hashedPassword, ...userData } = user._doc;
You would create a variable named hashedPassword in your function scope.

You don’t need it.
You don’t want to expose it.
You don’t want naming conflicts.

So instead, devs rename it to something throwaway:

js
Copy code
hashedPassword: pw
…and then simply never use pw.
you can also extend it , Just extend the destructuring:

const { hashedPassword: pw, createdAt: ca, ...userData } = user._doc;


pw and ca are both ignored.

Now the response will NOT include:

hashedPassword

createdAt
or for multiple fields, you can also do , const { hashedPassword, createdAt, ...userData } = user._doc;


```js

```

---
# Question:
how does the _doc mongoose internal document work


## Answer:

```js

```

---
# Question:
explain how the mongoose _doc internal document and mongoose user decument work

## Answer:

```scss
user  ──> Mongoose Document instance
 │
 ├─ Methods (from Mongoose prototype)
 │    ├─ save()
 │    ├─ validate()
 │    ├─ populate()
 │    └─ toObject(), toJSON(), etc.
 │
 └─ _doc (internal plain object)
      ├─ _id: ObjectId("...")
      ├─ name: "Xander"
      ├─ email: "xander@gmail.com"
      ├─ hashedPassword: "$2b$10$abc123..."
      └─ createdAt: 2025-11-25T00:00:00.000Z


```
How it works

The “outer layer” (user)

This is the Mongoose Document instance.

It has methods like .save(), .populate(), .validate() — things you call to manipulate or validate the document.

The inner layer (_doc)

Stores the actual data you defined in your schema.

Only plain JavaScript objects. No methods.

When you destructure it or send JSON responses, this is what you’re accessing.

What happens when you update

user.name = "New Xander";


Mongoose updates _doc.name internally.

When you call user.save(), Mongoose reads _doc to build the database update.

toObject() / toJSON()

These methods give you a copy of _doc.

Useful if you want to remove sensitive info (like password) or manipulate the object without touching the document itself.
---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
# Question:

## Answer:

```js

```

---
