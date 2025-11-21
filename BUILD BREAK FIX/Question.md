npm install express bcryptjs

------------------
add pascal case to camel case question

----------------

How does route prefixing work
Route Prefixing is like giving a common address to a group of related routes.

Simple Definition:
Route prefixing adds a common base path to multiple routes, so you don't have to repeat the same path segment for every route.

🆚 Before vs After Prefixing
BEFORE (Repetitive Routes):
javascript
// ❌ Repeating "/api/users" everywhere
app.get("/api/users", userController.getUsers);
app.get("/api/users/:id", userController.getUser);
app.post("/api/users", userController.createUser);
app.put("/api/users/:id", userController.updateUser);
app.delete("/api/users/:id", userController.deleteUser);

// ❌ Repeating "/api/posts" everywhere  
app.get("/api/posts", postController.getPosts);
app.get("/api/posts/:id", postController.getPost);
app.post("/api/posts", postController.createPost);
AFTER (With Prefixing):
javascript
// ✅ Define prefix once, use clean routes
app.use("/api/users", userRoutes);  // 🎯 Prefix: "/api/users"
app.use("/api/posts", postRoutes);  // 🎯 Prefix: "/api/posts"
app.use("/api/auth", authRoutes);   // 🎯 Prefix: "/api/auth"
🔧 How Route Prefixing Works:
1. Create Route Files with Clean Paths:
javascript
// routes/userRoutes.js
router.get("/", userController.getUsers);        // Becomes: /api/users
router.get("/:id", userController.getUser);      // Becomes: /api/users/1
router.post("/", userController.createUser);     // Becomes: /api/users
router.put("/:id", userController.updateUser);   // Becomes: /api/users/1
router.delete("/:id", userController.deleteUser);// Becomes: /api/users/1
2. Apply Prefixes in Main File:
javascript
// server.js
app.use("/api/users", userRoutes);  // 🎯 Adds "/api/users" prefix
app.use("/api/posts", postRoutes);  // 🎯 Adds "/api/posts" prefix 
app.use("/api/auth", authRoutes);   // 🎯 Adds "/api/auth" prefix
3. Resulting URLs:
text
/userRoutes.js paths + "/api/users" prefix = Final URLs:

"/"          + "/api/users" = "/api/users"
"/:id"       + "/api/users" = "/api/users/1" 
"/" (POST)   + "/api/users" = "/api/users"
"/:id" (PUT) + "/api/users" = "/api/users/1"
---------------------
when should you use parentheses in classes ()
Always use parentheses () when you want to execute/call a function in a class and get its result

🎯 With vs Without Parentheses
Without () - Gets the FUNCTION ITSELF:
javascript
class UserService {
  getUsers() {
    return ["John", "Jane"];
  }
}

const service = new UserService();

// ❌ Gets the function object (not what we want)
console.log(service.getUsers); 
// Output: [Function: getUsers]
With () - Gets the RESULT:
javascript
// ✅ Calls the function and gets the return value
console.log(service.getUsers()); 
// Output: ["John", "Jane"]

When to Use ()
ALWAYS use () when you want to:

Execute a function

Get a return value

Call a method

Trigger an action
---------------
what are the two ways to write methods in classes ?
Method 1: Regular Function (What you wrote)
javascript
class BookController {
  getAllBooks(req, res) {
    // This is correct!
  }
}
Method 2: Arrow Function (What you're thinking)
javascript
class BookController {
  getAllBooks = (req, res) => {
    // This also works!
  }
}
The Difference:
Regular functions are the standard way in classes

Arrow functions behave differently with this keyword (but we don't use this in our controllers yet)
--------------------
when o you and do you not need a constructor in a class
You DON'T always need a constructor!
When you NEED a constructor:

When you need to initialize properties

When you need to set up things when the class is created

javascript
class Person {
  constructor(name) {
    this.name = name;  // Setting up a property
  }
}
When you DON'T need a constructor:

When your class is just a collection of methods

When you don't have initial data to set up

javascript
class BookController {
  // No constructor needed - just methods!
  getAllBooks(req, res) {
    // Your logic here
  }
  
  createBook(req, res) {
    // Your logic here  
  }
}
-------------------
what are some ways of exporting classes?
Option 1: Export the Class
javascript
export default BookController;

// In routes, you'd have to:
import BookController from "./BookController.js";
const bookController = new BookController(); // Create instance yourself
Option 2: Export an Instance
javascript

export default new BookController();

// In routes, you just:
import bookController from "./BookController.js"; // Instance is ready to use
-------------
Why "this" Becomes Undefined in Express Controllers

The problem

In Express, when you pass a class method directly to a route:

router.get("/", bookController.getAllBooks);


Express calls it like a plain function:

getAllBooks(req, res);


Because it’s no longer called as bookController.getAllBooks(...),
the method loses its this context.

Result:

TypeError: Cannot read properties of undefined (reading 'library')

✔ How to Fix It
1. Use Arrow Functions (Best + Easiest)

Arrow functions automatically bind this to the instance.

class BookController {
  constructor() {
    this.library = [...];
  }

  getAllBooks = (req, res) => {
    res.status(200).json(this.library);
  };

  createBook = (req, res) => {
    res.status(201).json({ msg: "Soon…" });
  };
}

export default new BookController();


Works with:

router.get("/", bookController.getAllBooks);
-------------------
how do you create a simple rest api to make post and get requests

server.js:

javascript
import express from 'express';

const app = express();
const PORT = 9000;

// Middleware to parse JSON
app.use(express.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
2. 📝 Controller (Business Logic)
controllers/BookController.js:

javascript
class BookController {
  constructor() {
    this.books = []; // Start with empty array
  }

  // GET all books
  getAllBooks = (req, res) => {
    res.json({
      success: true,
      count: this.books.length,
      data: this.books
    });
  }

  // POST new book
  createBook = (req, res) => {
    const { title, author } = req.body;
    
    // Simple validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: "Title and author are required"
      });
    }

    // Create new book
    const newBook = {
      id: this.books.length + 1,
      title,
      author,
      createdAt: new Date().toISOString()
    };

    // Add to array
    this.books.push(newBook);

    // Return response
    res.status(201).json({
      success: true,
      data: newBook
    });
  }
}

// Export instance (ready-to-use)
export default new BookController();
3. 🛣️ Routes (URL Mapping)
routes/bookRoutes.js:

javascript
import express from 'express';
import bookController from '../controllers/BookController.js';

class BookRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    // GET /api/books
    this.router.get('/', bookController.getAllBooks);
    
    // POST /api/books  
    this.router.post('/', bookController.createBook);
  }

  getRouter() {
    return this.router;
  }
}

// Export instance
export default new BookRoutes();
4. 🔗 Connect Everything
Update server.js:

javascript
import express from 'express';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = 9000;

// Middleware
app.use(express.json());

// Routes with prefix
app.use('/api/books', bookRoutes.getRouter());

app.listen(PORT, () => {
  console.log(`📚 Book API running on http://localhost:${PORT}`);
});

 Key Concepts Summary
Server Setup: Express app + JSON middleware

Controller: Contains business logic (GET, POST)

Routes: Maps URLs to controller methods

Export Pattern: Export instances for easy use

Prefixing: /api/books + / = /api/books

🔄 Data Flow
text
Client → Server → Routes → Controller → Response
   ↓       ↓         ↓         ↓         ↓
Postman → Express → Router → Methods → JSON Back

----------------------------
what middleware function must you use when destructuring 
the 
app.use(express.json())

Express does NOT parse JSON by default

When you send a POST request with a JSON body:

{
  "author": "James Carter"
}


Express does not automatically convert that JSON into req.body.

Without the JSON parser, Express literally receives the raw bytes:

7B 20 22 61 75 74 68 6F 72 22 ...


Worthless to your controller.

❌ Without express.json()
createBook = (req, res) => {
  console.log(req.body); // undefined
};


Your destructuring will break:

const { author } = req.body;
// TypeError: Cannot read properties of undefined

✔ With express.json()
app.use(express.json());


Now Express converts incoming JSON into a proper JavaScript object:

req.body = {
  author: "James Carter"
}


Your controller now works:

const { author } = req.body; // "James Carter"

🧠 2. Why it’s typically placed in server.js

server.js (or app.js) is where you configure your Express app before any routes run.
Middlewares must be set up first, otherwise your controllers will receive unparsed requests.

Flow is:

Middleware (parsers, loggers, CORS)
↓
Routes
↓
Controllers


If you put app.use(express.json()) after your routes, it's useless — the controllers won’t get parsed bodies.

So the startup file (server.js/app.js) is the correct place.
-----------------------------
how do you hash passwords with bcrypt 
Why Hash Passwords?
Security: Never store plain text passwords

Irreversible: Can't get original password from hash

Different hashes: Same password → different hash every time

Installation
bash
npm install bcryptjs
Basic Usage
1. Hashing Passwords (Registration)
javascript
import bcrypt from 'bcryptjs';

// Hash a password
const plainPassword = "user123";
const hashedPassword = bcrypt.hashSync(plainPassword, 10);
// Result: "$2a$10$N9qo8uLOickgx2ZMRZoMye..."

// Store hashedPassword in database instead of plain text
2. Verifying Passwords (Login)
javascript
// When user tries to login
const isPasswordValid = bcrypt.compareSync("user123", hashedPassword);
// Returns: true (if correct) or false (if wrong)
In UserService Class
javascript
class UserService {
  registerUser(userData) {
    const { password } = userData;
    
    // Hash before storing
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const user = {
      email: userData.email,
      password: hashedPassword, // Store the hash!
    };
    return user;
  }

  loginUser(email, password) {
    const user = this.findUserByEmail(email);
    
    // Verify password
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error("Invalid password");
    
    return user; // Login successful
  }
}
Key Points
Salt Rounds (10): Higher = more secure but slower

compareSync(): Checks if password matches hash

Never store plain passwords

Never return passwords in API responses

Security Benefits
✅ Same password → different hashes

✅ Slow hashing prevents brute force

✅ Can't reverse engineer passwords

Use this for ALL user authentication! 🛡️

----------------------------
