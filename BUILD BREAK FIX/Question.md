



# Question:
  What is the shortcut to duplicate a page in chrome 
## Answer:
Ctrl + L → Alt + Enter (Windows)

Ctrl + L focuses the address bar

Alt + Enter opens the same URL in a new tab

```js

```

---

# Question:
what is axios in javascript
## Answer:
Axios

Axios is a popular JavaScript library for making HTTP requests.

Think of it as a better, modern alternative to the built-in fetch() API in browsers.

What it does

You use Axios to communicate with servers—your backend, public APIs, etc.

Example in React:

import axios from "axios";

async function getUserData() {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}


axios.get(url) → fetch data

axios.post(url, data) → send data

Handles JSON automatically

Supports request/response interceptors, timeouts, and cancellation

Why people use it instead of fetch
Feature	fetch API	Axios
JSON parsing	Manual (res.json())	Automatic
Timeout support	Needs extra code	Built-in
Interceptors	Not built-in	Built-in
Older browser support	Needs polyfill	Works out of the box
```js

```

---

# Question:
Exaplin how the react context works 
## Answer:

```js
React Context Notes

1️⃣ What it is:

createContext() → creates a “magic box” to share data across components.

Provider → the caretaker that holds the data and gives access to children.

useContext() → the key components use to peek inside the box.

2️⃣ Example: Auth Context

import { createContext, useState, useContext } from "react";

// 1. Create the context (magic box)
const AuthContext = createContext();

// 2. Provider (caretaker)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store current user
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}  // all components inside can use the context
    </AuthContext.Provider>
  );
};

// 3. Consuming the context (peek inside the box)
const MyComponent = () => {
  const { user, setUser } = useContext(AuthContext);
  
  return (
    <div>
      {user ? `Hello, ${user.name}` : "Not logged in"}
      <button onClick={() => setUser({ name: "Chuks" })}>
        Log In
      </button>
    </div>
  );
};
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
