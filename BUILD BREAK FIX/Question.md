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




---
# Question
Why Are Auth Tokens Are Dangerous If Leaked?
## Answer:
An auth token is basically a temporary master key to your account.
If someone steals it, they can act as you until that token expires.
No password, no OTP, nothing — the token is your identity for that session.

What a stolen token can allow:

Full access to your account

API calls under your name

Viewing or modifying data

Staying logged in until the token dies

Why this happens:

Auth tokens are designed to skip constant re-authentication.
The downside?
Anyone holding the token is trusted by the server.

Different tokens = different danger levels

Access tokens (short-lived): Dangerous but expire quickly

Refresh tokens (long-lived): Super dangerous — can generate new tokens

Scoped tokens: May limit what someone can do

Device-bound tokens: Harder to steal and reuse

Common ways tokens get exposed

Putting them in browser localStorage

Accidentally logging them in console/server logs

Sharing screenshots of dev tools

Committing them to GitHub (the classic disaster)

Using HTTP instead of HTTPS

Extensions spying on browser storage

How to protect yourself

Never store tokens in localStorage if you can avoid it

Prefer HTTP-only secure cookies

Rotate or revoke tokens regularly

Avoid logging tokens

Keep expiration short

Don’t paste tokens anywhere public or semi-public

Bottom line

If someone gets your token, they can walk into your account like they own it.
Protect your tokens like you’d protect your password — actually, protect them more.
```js

```

---
# Question:
Write a sample AUTH check middleware for login and logout 
## Answer:

```js
// middleware/auth.js
import jwt from "jsonwebtoken";

export const tokenBlacklist = new Set();
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ msg: "Token revoked - please login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // attach userId to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};


```

---
# Question:
What are protected routes
## Answer:
What Are Protected Routes?

A protected route is any API route that only logged-in users are allowed to access.

That’s it. Nothing fancy.

If the user has a valid token, they’re allowed in.
If not → blocked.

⭐ Example (unprotected vs protected)
Unprotected routes

Anyone can access these. No login required.

POST /register

POST /login

GET /public-posts

GET /landing-page

These routes shouldn't require a token.

Protected routes

Only users with a valid JWT token can access these.

GET /profile

PUT /edit-account

POST /create-post

DELETE /delete-account

GET /dashboard

These routes must include your middleware:

router.get("/profile", verifyToken, controller.viewAcct);

⭐ Why do we protect routes?

Because:

You don’t want strangers viewing everyone's profiles

You don’t want someone editing your account without being logged in

You don’t want anonymous users creating or deleting things

Any action that belongs to a logged-in user should be protected

Think of it like:

🔒 Stuff behind the locked door is protected
🔓 Stuff outside is public

Your token is the key to the locked door.
```js

```

---
# Question:
what is the `Set` js object?
## Answer:
new Set()

Set is a built-in JavaScript object that lets you store unique values of any type—strings, numbers, objects, etc.

Unlike arrays, a Set cannot have duplicates. If you try to add the same value twice, it will only appear once.

```js
Example:

const numbers = new Set();
numbers.add(1);
numbers.add(2);
numbers.add(1); // ignored, already exists
console.log(numbers); // Set { 1, 2 }

```
Use case for tokenBlackList

Judging by the name, it’s probably meant to keep track of invalid or revoked tokens (like JWTs) in a system.

When a token is “blacklisted,” you can add it to the set:

tokenBlackList.add("some-invalid-token");


Then, when a request comes in, you can check if the token is blacklisted:

if (tokenBlackList.has("some-token")) {
    console.log("Token is invalid!");
}


In short: this line creates a globally accessible, dynamically modifiable collection of unique tokens to quickly check if a token is blacklisted.

If you want, I can also show why Set is faster than arrays for blacklist

it has 4 main methods , 
.add(value) → Adds a value to the set. If it’s already there, it does nothing.

.has(value) → Checks if a value exists in the set. Returns true or false.

.delete(value) → Removes a value from the set. Returns true if it existed and was removed, otherwise false.

.clear() → Removes all values from the set.

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
