
-----------------
  {
    "question": "How to set image as background in CSS, make image stay in middle and make image fit the screen?",
    "answer": "**Background Image Properties:**\n```css\nbody {\n    background-image: url('my-background.jpg');\n    background-position: center;\n    background-size: cover;\n    background-repeat: no-repeat;\n}\n\n/* Alternative sizes */\n.contain {\n    background-size: contain;\n}\n\n.specific-size {\n    background-size: 800px 600px;\n}\n\n.percentage {\n    background-size: 100% 100%;\n}\n```",
    "type": "css",
    "tags": ["css", "backgrounds", "images"],
&&
  {
    "question": "How to stop background from repeating and fix empty background with background-attachment: fixed?",
    "answer": "**Background Repeat Control:**\n```css\n.no-repeat {\n    background-repeat: no-repeat;\n}\n\n.fixed-background {\n    background-attachment: fixed;\n    background-repeat: no-repeat;\n}\n\n.cover-background {\n    background-size: cover;\n    background-repeat: no-repeat;\n}\n```\n\n**Common with gradients:**\n- Gradients don't repeat by default\n- Use `background-attachment: fixed` to keep background in place when scrolling\n- Use `background-size: cover` to make image fit screen",
    "type": "css",
    "tags": ["css", "backgrounds", "repeating"],

  ----------------------

    {
    "question": "Difference between em, px and fr",
    "answer": "**CSS Units Comparison: em, px, and fr:**\n\n**1. px (Pixels):**\n- **Definition:** Absolute unit, fixed size\n- **Behavior:** Always same size regardless of context\n- **Use:** Fixed measurements, borders, precise positioning\n- **Example:** `width: 200px`\n- **Responsive:** No, doesn't scale with font size\n\n**2. em (Relative to parent):**\n- **Definition:** Relative unit, based on parent's font-size\n- **Behavior:** Scales with parent's font-size\n- **Use:** Typography, spacing, scalable layouts\n- **Example:** `font-size: 1.5em` (1.5 × parent font-size)\n- **Responsive:** Yes, scales with font size\n\n**3. fr (Fractional unit):**\n- **Definition:** Fractional unit for CSS Grid\n- **Behavior:** Takes available space in grid container\n- **Use:** Grid layouts, flexible sizing\n- **Example:** `grid-template-columns: 1fr 2fr 1fr`\n- **Responsive:** Yes, flexible grid sizing\n\n**Complete Units Comparison:**\n\n**px (Pixels):**\n- `10px` - Fixed 10 pixels\n- `100px` - Fixed 100 pixels\n- `0px` - No size\n- `1px` - Minimum visible size\n\n**em (Relative to parent):**\n- `1em` - Same as parent font-size\n- `1.5em` - 1.5 × parent font-size\n- `0.5em` - Half of parent font-size\n- `2em` - Double parent font-size\n\n**fr (Fractional):**\n- `1fr` - One fraction of available space\n- `2fr` - Two fractions of available space\n- `0.5fr` - Half fraction of available space\n- `auto` - Size based on content\n\n**Other Related Units:**\n- `rem` - Relative to root font-size\n- `%` - Percentage of parent element\n- `vw/vh` - Viewport width/height\n- `ch` - Width of character \"0\"\n- `ex` - Height of lowercase \"x\"",
    "type": "css",
    "tags": ["css", "units", "px", "em", "fr"],
    
&& Add rem 
---------------------
  {
    "question": "How do you link a JavaScript file in HTML?",
    "answer": "**Linking JavaScript Files**\n\n**Use the `<script>` tag with the `src` attribute:**\n```html\n<script src=\"yourfile.js\"></script>\n```\n\n**Where to place it:**\n\n**Option 1: Inside `<head>`**\n```html\n<head>\n    <script src=\"yourfile.js\"></script>\n</head>\n```\n\n**Option 2: Just before `</body>` (recommended)**\n```html\n<body>\n    <!-- Your HTML content -->\n    <script src=\"yourfile.js\"></script>\n</body>\n```\n\n**Why place before `</body>`:**\n- HTML loads first\n- JavaScript runs after page content loads\n- Prevents blocking page rendering\n- Better user experience\n\n**Multiple files:**\n```html\n<script src=\"file1.js\"></script>\n<script src=\"file2.js\"></script>\n<script src=\"file3.js\"></script>\n```",
    "type": "html",
    "tags": ["html", "javascript", "script-tag", "linking"],

  && add type="module"

-----------------------------
    {
    "question": "How do you create a new line in HTML?",
    "answer": "Use the `<br>` or `<br/>` tag:\n\n```html\n<p>This is the first line.<br>This is the second line.</p>\n```\n\n**Note:** `<br>` is a self-closing tag, so both `<br>` and `<br/>` work the same way.",
    "type": "html",
    "tags": ["html", "formatting"],

  &&
  {
    "question": "How do you create a horizontal line in HTML?",
    "answer": "Use the `<hr>` or `<hr/>` tag:\n\n```html\n<p>Content above the line</p>\n<hr>\n<p>Content below the line</p>\n```\n\nThis creates a horizontal line that spans the width of its container.",
    "type": "html",
    "tags": ["html", "formatting"],

  &&
      {
    "question": "How to set a new line and tab in JavaScript?",
    "answer": "**New Line and Tab Characters in JavaScript**\n\n**New Line:** `\\n`\n**Tab:** `\\t`\n\n**Usage examples:**\n```javascript\n// New line\nconsole.log(\"Line 1\\nLine 2\");\n// Output:\n// Line 1\n// Line 2\n\n// Tab\nconsole.log(\"Name:\\tJohn\");\n// Output: Name:    John\n\n// Combined\nconsole.log(\"Name:\\tJohn\\nAge:\\t25\");\n// Output:\n// Name:    John\n// Age:     25\n```\n\n**Key concepts:**\n- **`\\n`:** Creates a new line (line break)\n- **`\\t`:** Creates a tab character (horizontal tab)\n- **Escape sequences:** Both are escape sequences in strings\n- **String interpolation:** Can be used in template literals\n- **Cross-platform:** `\\n` works on most systems (Unix/Linux/Mac), `\\r\\n` for Windows\n\n**Common uses:**\n- **Formatting output:** Create readable console output\n- **Text processing:** Format strings with proper spacing\n- **File generation:** Create formatted text files\n- **Logging:** Structure log messages",
    "type": "javascript",
    "tags": ["javascript", "strings", "escape-sequences", "formatting"],
   
  ------------------------------------

    {
    "question": "How to create unordered lists in HTML?",
    "answer": "**Basic unordered list:**\n```html\n<ul>\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n</ul>\n```\n\n**With links:**\n```html\n<ul>\n    <li><a href=\"home.html\">Home</a></li>\n    <li><a href=\"about.html\">About</a></li>\n    <li><a href=\"contact.html\">Contact</a></li>\n</ul>\n```\n\n**When to use:**\n- Navigation menus\n- Feature lists\n- Any items without specific order\n- Bullet points",
    "type": "html",
    "tags": ["html", "lists", "navigation"]
  },
  &&
  {
    "question": "How to create ordered lists in HTML?",
    "answer": "**Basic ordered list:**\n```html\n<ol>\n    <li>First item</li>\n    <li>Second item</li>\n    <li>Third item</li>\n</ol>\n```\n\n**Different number formats:**\n```html\n<!-- Numbers (default) -->\n<ol type=\"1\">\n    <li>Item 1</li>\n    <li>Item 2</li>\n</ol>\n\n<!-- Letters -->\n<ol type=\"A\">\n    <li>Item A</li>\n    <li>Item B</li>\n</ol>\n\n<!-- Roman numerals -->\n<ol type=\"I\">\n    <li>Item I</li>\n    <li>Item II</li>\n</ol>\n```\n\n**When to use:**\n- Step-by-step instructions\n- Rankings\n- Any items with specific order",
    "type": "html",
    "tags": ["html", "lists", "ordered"]
  },
  -------------------
    {
    "question": "How to create tables in HTML?",
    "answer": "**Basic table:**\n```html\n<table>\n    <tr>\n        <td>Cell 1</td>\n        <td>Cell 2</td>\n    </tr>\n    <tr>\n        <td>Cell 3</td>\n        <td>Cell 4</td>\n    </tr>\n</table>\n```\n\n**With headers:**\n```html\n<table>\n    <caption>Student Grades</caption>\n    <tr>\n        <th>Name</th>\n        <th>Math</th>\n        <th>Science</th>\n    </tr>\n    <tr>\n        <td>John</td>\n        <td>85</td>\n        <td>90</td>\n    </tr>\n</table>\n```\n\n**With formatting:**\n```html\n<table>\n    <thead>\n        <tr><th>Header 1</th><th>Header 2</th></tr>\n    </thead>\n    <tbody>\n        <tr><td>Data 1</td><td>Data 2</td></tr>\n    </tbody>\n</table>\n```",
    "type": "html",
    "tags": ["html", "tables", "data"]
  },
  &&
  {
    "question": "How to make table cells span multiple columns?",
    "answer": "Use `colspan` attribute:\n\n```html\n<table>\n    <tr>\n        <th>Name</th>\n        <th>Subject</th>\n        <th>Grade</th>\n    </tr>\n    <tr>\n        <td>John</td>\n        <td colspan=\"2\">Math - A</td>\n    </tr>\n    <tr>\n        <td>Jane</td>\n        <td>Science</td>\n        <td>B+</td>\n    </tr>\n</table>\n```\n\n**What `colspan=\"2\"` does:**\n- Makes the cell span 2 columns\n- Useful for headers that cover multiple columns\n- Adjusts the table layout automatically",
    "type": "html",
    "tags": ["html", "tables", "colspan"]
  },-------------------------

  {
    "question": "How to create different input types in HTML forms?",
    "answer": "**Text inputs:**\n```html\n<!-- Text -->\n<input type=\"text\" placeholder=\"Enter your name\">\n\n<!-- Password -->\n<input type=\"password\" placeholder=\"Enter password\">\n\n<!-- Email -->\n<input type=\"email\" placeholder=\"Enter email\">\n\n<!-- Phone -->\n<input type=\"tel\" placeholder=\"Enter phone number\">\n\n<!-- Date -->\n<input type=\"date\">\n\n<!-- Number -->\n<input type=\"number\" min=\"1\" max=\"100\">\n\n<!-- Range -->\n<input type=\"range\" min=\"0\" max=\"100\">\n\n<!-- File -->\n<input type=\"file\">\n\n<!-- Checkbox -->\n<input type=\"checkbox\" id=\"agree\">\n<label for=\"agree\">I agree</label>\n\n<!-- Radio buttons -->\n<input type=\"radio\" name=\"gender\" value=\"male\"> Male\n<input type=\"radio\" name=\"gender\" value=\"female\"> Female\n\n<!-- Button -->\n<input type=\"submit\" value=\"Submit\">\n```\n\n**Default values:**\n```html\n<input type=\"text\" value=\"Default text\">\n```\n\n**Note:** Radio buttons with the same `name` allow only one selection!",
    "type": "html",
    "tags": ["html", "forms", "input", "validation"]
  },
&&
  {
    "question": "What is a form in HTML and how to write it?",
    "answer": "**What forms are used for:**\n- Collecting user input\n- Submitting data to servers\n- User registration, contact forms, surveys\n\n**Basic form structure:**\n```html\n<form action=\"submit.php\" method=\"POST\">\n    <label for=\"name\">Name:</label>\n    <input type=\"text\" id=\"name\" name=\"name\" required>\n    \n    <label for=\"email\">Email:</label>\n    <input type=\"email\" id=\"email\" name=\"email\" required>\n    \n    <label for=\"message\">Message:</label>\n    <textarea id=\"message\" name=\"message\" rows=\"4\"></textarea>\n    \n    <input type=\"submit\" value=\"Send Message\">\n</form>\n```\n\n**Form attributes:**\n- `action` = where to send the data\n- `method` = GET or POST\n- `required` = makes field mandatory\n\n**Example with different inputs:**\n```html\n<form action=\"process.php\" method=\"POST\">\n    <input type=\"text\" name=\"username\" placeholder=\"Username\">\n    <input type=\"password\" name=\"password\" placeholder=\"Password\">\n    <input type=\"checkbox\" name=\"remember\"> Remember me\n    <input type=\"submit\" value=\"Login\">\n</form>\n```",
    "type": "html",
    "tags": ["html", "forms", "submission", "data"]
  },
  ----------------------------------
    {
    "question": "Explain these Git terms simply:",
    "answer": "**Directory:**\nA folder on your computer that contains files and other folders.\n\n**Terminal/Command Line:**\nA text-based way to interact with your computer (like talking to your computer with text commands).\n\n**CLI:**\nCommand Line Interface - another name for terminal/command line.\n\n**cd (Change Directory):**\nCommand to move between folders: `cd folder-name`\n\n**Code Editor:**\nA program for writing code (like VS Code, Sublime Text, Atom).\n\n**Repository:**\nA project folder that Git is tracking (contains your code and Git history).\n\n**GitHub:**\nOnline platform where you can store and share your Git repositories.\n\n**README.md:**\nA file that explains what your project is about (like a project description).",
    "type": "git",
    "tags": ["git", "terminology", "basics", "concepts"]
  },
  &&
  {
    "question": "Explain these Git commands simply:",
    "answer": "**Clone:**\n`git clone` - Downloads a copy of a repository from GitHub to your computer.\n\n**Add:**\n`git add` - Tells Git to start tracking changes in your files (stages them).\n\n**Commit:**\n`git commit` - Saves your changes with a message (like saving a snapshot).\n\n**Push:**\n`git push` - Uploads your local changes to GitHub (sends your work to the cloud).\n\n**Pull:**\n`git pull` - Downloads the latest changes from GitHub to your computer.\n\n**Simple workflow:**\n1. `git add .` (stage changes)\n2. `git commit -m \"message\"` (save snapshot)\n3. `git push` (upload to GitHub)\n\n**Think of it like:**\n- Add = Put items in a box\n- Commit = Seal the box with a label\n- Push = Send the box to storage\n- Pull = Get the latest box from storage",
    "type": "git",
    "tags": ["git", "commands", "workflow", "basics"]
  },
  &&
    {
    "question": "How to solve 'origin does not appear to be a git repo' error?",
    "answer": "**The error means:**\nGit doesn't know where to send your code (no remote repository set up).\n\n**How to solve:**\n\n**Step 1: Create repository on GitHub**\n- Go to GitHub.com\n- Click \"New repository\"\n- Give it a name\n- Click \"Create repository\"\n\n**Step 2: Copy the repository URL**\n- Copy the HTTPS or SSH URL from GitHub\n- Example: `https://github.com/username/repo-name.git`\n\n**Step 3: Connect your local repo to GitHub**\n```bash\ngit remote add origin https://github.com/username/repo-name.git\n```\n\n**Step 4: Verify it worked**\n```bash\ngit remote -v\n```\n\n**Step 5: Push your code**\n```bash\ngit push -u origin main\n```\n\n**What this does:**\n- `remote add origin` = tells Git where GitHub repo is\n- `remote -v` = shows connected repositories\n- `push -u origin main` = uploads code and sets default branch",
    "type": "git",
    "tags": ["git", "error", "origin", "remote", "github"]
  },
  &&
    {
    "question": "How to undo staging in Git?",
    "answer": "**Undo staging for single file:**\n```bash\ngit reset filename\n```\n\n**Undo staging for all files:**\n```bash\ngit reset\n```\n\n**Examples:**\n```bash\n# Unstage specific file\ngit reset index.html\n\n# Unstage all files\ngit reset\n\n# Unstage all files in directory\ngit reset css/\n```\n\n**What `git reset` does:**\n- Removes files from staging area\n- Files go back to \"modified\" status\n- Changes are still there, just not staged\n\n**Before reset:**\n```bash\n$ git status\nChanges to be committed:\n  modified:   index.html\n  modified:   style.css\n```\n\n**After `git reset index.html`:**\n```bash\n$ git status\nChanges to be committed:\n  modified:   style.css\n\nChanges not staged for commit:\n  modified:   index.html\n```\n\n**Think of it like:**\n- Taking items out of shopping cart\n- Unchecking files you don't want to commit\n- Going back to \"modified\" status",
    "type": "git",
    "tags": ["git", "reset", "unstage", "undo"]
  },
  &&
    {
    "question": "How to delete branches in Git?",
    "answer": "**Delete local branch:**\n```bash\ngit branch -d branch-name\n```\n\n**Force delete (if branch has unmerged changes):**\n```bash\ngit branch -D branch-name\n```\n\n**Delete remote branch:**\n```bash\ngit push origin --delete branch-name\n```\n\n**Examples:**\n```bash\n# Delete local feature branch\ngit branch -d feature-login\n\n# Force delete (careful!)\ngit branch -D old-feature\n\n# Delete remote branch\ngit push origin --delete feature-signup\n```\n\n**What happens:**\n- `-d` = safe delete (only if merged)\n- `-D` = force delete (even if not merged)\n- Remote delete = removes from GitHub\n\n**Best practice:**\n- Delete branches after merging\n- Keep main branches (main, develop)\n- Clean up old feature branches\n\n**Think of it like:**\n- Throwing away old drafts\n- Cleaning up your workspace\n- Keeping only what you need",
    "type": "git",
    "tags": ["git", "branches", "delete", "cleanup"]
  },
  ---------------------------  

  {
    "question": "How do you write in camelCase?",
    "answer": "**CamelCase Naming Convention**\n\n**Format:**\n- Start with lowercase letter\n- Capitalize the first letter of each new word\n- No spaces or underscores\n\n**Example:**\n```javascript\nweWriteItLikeThis\n```\n\n**Common uses:**\n```javascript\nvar firstName = \"John\";\nvar lastName = \"Doe\";\nvar myAge = 25;\nvar userEmailAddress = \"john@example.com\";\n\nfunction calculateTotalPrice() {\n    // code here\n}\n\nfunction getUserData() {\n    // code here\n}\n```\n\n**Why use camelCase:**\n- Standard convention in JavaScript\n- Easy to read without spaces\n- Distinguishes variables from constants (UPPER_CASE)\n- Distinguishes from classes (PascalCase)",
    "type": "javascript",
    "tags": ["javascript", "naming", "conventions", "camelCase"],

  ------------------------------
    {
    "question": "How to perform addition, subtraction, multiplication, and division in JavaScript?",
    "answer": "**Arithmetic Operators in JavaScript**\n\n**Basic operators:**\n```javascript\n+ // Addition\n- // Subtraction\n* // Multiplication\n/ // Division\n```\n\n**Examples:**\n```javascript\nvar sum = 10 + 5;        // 15 (addition)\nvar difference = 10 - 5; // 5 (subtraction)\nvar product = 10 * 5;    // 50 (multiplication)\nvar quotient = 10 / 5;   // 2 (division)\n```\n\n**Additional operators:**\n```javascript\n% // Modulus (remainder)\n** // Exponentiation (power)\n```\n\n**Examples:**\n```javascript\nvar remainder = 10 % 3;  // 1 (10 divided by 3, remainder 1)\nvar power = 2 ** 3;      // 8 (2 to the power of 3)\n```",
    "type": "javascript",
    "tags": ["javascript", "arithmetic", "operators", "math"],

  &&
  {
    "question": "What are the shorthand assignment operators in JavaScript?",
    "answer": "**Shorthand Assignment Operators**\n\n**Basic operators:**\n```javascript\n+= // Add and assign\n-= // Subtract and assign\n*= // Multiply and assign\n/= // Divide and assign\n```\n\n**How they work:**\n```javascript\nx += 5;  // Same as: x = x + 5\nx -= 3;  // Same as: x = x - 3\nx *= 2;  // Same as: x = x * 2\nx /= 4;  // Same as: x = x / 4\n```\n\n**Additional operators:**\n```javascript\n%= // Modulus and assign\n**= // Exponentiation and assign\n```\n\n**Examples:**\n```javascript\nvar num = 10;\nnum %= 3;   // num = num % 3 (remainder)\nnum **= 2;  // num = num ** 2 (power)\n```",
    "type": "javascript",
    "tags": ["javascript", "operators", "assignment", "shorthand"],

  ---------------------
  {
    "question": "What is an array in JavaScript and how to create one?",
    "answer": "**JavaScript Arrays**\n\n**What is an array:**\nArrays allow you to store several pieces of data in one variable. You can store different types of data together (strings, numbers, booleans, etc.).\n\n**How to create an array:**\n```javascript\nvar ourarray = [\"john\", \"mary\", \"gambit\", 23, 22, 10];\nconsole.log(ourarray);\n```\n\n**Key points:**\n- Arrays use square brackets `[]`\n- Items are separated by commas\n- Can contain different data types\n- Items are stored in order\n- Access items by index (starting at 0)\n\n**Examples:**\n```javascript\nvar numbers = [1, 2, 3, 4, 5];\nvar names = [\"Alice\", \"Bob\", \"Charlie\"];\nvar mixed = [\"text\", 42, true, null];\n```",
    "type": "javascript",
    "tags": ["javascript", "arrays", "data-structures"],

  &&
  {
    "question": "What is a nested array (multi-dimensional array)?",
    "answer": "**Nested Arrays**\n\n**What is a nested array:**\nA nested array is an array within an array. It's also known as a multi-dimensional array.\n\n**Example:**\n```javascript\nvar ourarray = [\n    [\"john\", \"mary\", \"gambit\", 23, 22, 10],\n    [\"alice\", \"bob\", \"charlie\", 30, 35, 40],\n    [\"x\", \"y\", \"z\", 1, 2, 3]\n];\n```\n\n**Why use nested arrays:**\n- Store related groups of data\n- Create tables or grids\n- Represent 2D or 3D data\n- Organize complex data structures\n\n**Accessing nested arrays:**\n```javascript\nourarray[0]       // First inner array\nourarray[0][0]    // First item of first array\nourarray[1][2]    // Third item of second array\n```",
    "type": "javascript",
    "tags": ["javascript", "arrays", "nested-arrays", "multidimensional"],

  ---------------------

    {
    "question": "What is bracket notation in JavaScript?",
    "answer": "**Bracket Notation for Strings**\n\n**What it is:**\nBracket notation allows you to access individual characters in a string using their index position.\n\n**How it works:**\n```javascript\nvar firstName = \"Jack\";\nvar firstLetter = firstName[0];  // \"J\"\nvar secondLetter = firstName[1]; // \"a\"\n```\n\n**Key points:**\n- Indexing starts at 0 (first character is index 0)\n- Returns the character at that position\n- Returns `undefined` if index doesn't exist\n- Strings are zero-indexed\n\n**Index positions:**\n```\n\"Jack\"\n J a c k\n 0 1 2 3\n```",
    "type": "javascript",
    "tags": ["javascript", "strings", "bracket-notation", "indexing"],

&&
    {
    "question": "How to access elements in arrays and nested arrays with bracket notation?",
    "answer": "**Accessing Array Elements**\n\n**Single array:**\n```javascript\nvar ourarray = [\"john\", \"mary\", \"gambit\", 23, 22, 10];\nvar item = ourarray[1];  // \"mary\"\n```\n\n**Nested array:**\n```javascript\nvar nestedArray = [\n    [\"john\", \"mary\"],\n    [\"gambit\", 23, 22, 10]\n];\nvar lastArray = nestedArray[nestedArray.length - 1];\n// Gets the last inner array\n```\n\n**Individual elements in nested arrays:**\n```javascript\nvar element = ourarray[0][1];  // \"mary\"\n// [0] = first inner array\n// [1] = second element in that array\n```\n\n**Using length property:**\n```javascript\nnestedArray[nestedArray.length - 1]  // Last array\nourarray[ourarray.length - 1]        // Last element\n```",
    "type": "javascript",
    "tags": ["javascript", "arrays", "bracket-notation", "indexing"],

  },
  &&
    {
    "question": "How do you access the values of objects in JavaScript?",
    "answer": "**Accessing Object Properties**\n\n**Two main ways:**\n\n**1. Dot Notation:**\n```javascript\nobject.property\n```\n\n**2. Bracket Notation:**\n```javascript\nobject[\"property\"]\n```\n\n**When to use each:**\n- **Dot notation:** When property name is simple (no spaces, starts with letter)\n- **Bracket notation:** When property has spaces, special characters, or is stored in a variable\n\n**Examples:**\n```javascript\nvar testObj = {\n    \"Shirt\": \"blue\",\n    \"Trousers\": \"red\",\n    \"Cap\": \"orange\"\n};\n\nvar shirtColor = testObj.Cap;  // Dot notation\nvar capColor = testObj[\"The Cap\"]; // Bracket notation\n```",
    "type": "javascript",
    "tags": ["javascript", "objects", "access", "properties"],
 
  ------------------------
  
  {
    "question": "How to add elements to an array with push()?",
    "answer": "**Array push() Method**\n\n**What it does:**\nAdds one or more elements to the END of an array.\n\n**Syntax:**\n```javascript\narray.push(element1, element2, ...);\n```\n\n**Example:**\n```javascript\nvar ourarray = [[\"john\", \"mary\", \"gambit\", 23, 22, 10]];\nourarray.push([42, 48]);\n// Now: [[\"john\", \"mary\", \"gambit\", 23, 22, 10], [42, 48]]\n```\n\n**Key points:**\n- Adds to the end of array\n- Can add multiple items at once\n- Modifies the original array\n- Returns new length of array\n\n**Common uses:**\n- Building arrays dynamically\n- Adding items to a list\n- Queue operations",
    "type": "javascript",
    "tags": ["javascript", "arrays", "push", "methods"],

  {
    "question": "How to remove elements from an array with pop()?",
    "answer": "**Array pop() Method**\n\n**What it does:**\nRemoves the LAST element from an array and returns it.\n\n**Syntax:**\n```javascript\nvar removed = array.pop();\n```\n\n**Example:**\n```javascript\nvar ourarray = [\"john\", \"mary\", \"gambit\", 23, 22, 10];\nvar remove = ourarray.pop();\nconsole.log(remove);  // 10 (removed item)\nconsole.log(ourarray); // [\"john\", \"mary\", \"gambit\", 23, 22]\n```\n\n**Nested arrays:**\n```javascript\nvar nestedArray = [[\"john\", \"mary\"], [\"gambit\", 23, 22, 10]];\nvar remove = nestedArray.pop();\n// remove = [\"gambit\", 23, 22, 10]\n// nestedArray = [[\"john\", \"mary\"]]\n```\n\n**Key points:**\n- Removes from the end\n- Returns the removed element\n- Modifies the original array\n- Returns `undefined` if array is empty",
    "type": "javascript",
    "tags": ["javascript", "arrays", "pop", "methods"],

  {
    "question": "How to use shift() to remove elements from the beginning of an array?",
    "answer": "**Array shift() Method**\n\n**What it does:**\nRemoves the FIRST element from an array and returns it.\n\n**Syntax:**\n```javascript\nvar removed = array.shift();\n```\n\n**Example:**\n```javascript\nvar ourarray = [\"john\", \"mary\", \"gambit\", 23, 22, 10];\nvar remove = ourarray.shift();\nconsole.log(remove);   // \"john\" (removed item)\nconsole.log(ourarray); // [\"mary\", \"gambit\", 23, 22, 10]\n```\n\n**Nested arrays:**\n```javascript\nvar nestedArray = [[\"john\", \"mary\"], [\"gambit\", 23, 22, 10], [\"x\", \"y\"]];\nvar remove1 = nestedArray.shift();\n// remove1 = [\"john\", \"mary\"]\n// nestedArray = [[\"gambit\", 23, 22, 10], [\"x\", \"y\"]]\n```\n\n**Key differences:**\n- `pop()` - Removes from END\n- `shift()` - Removes from BEGINNING",
    "type": "javascript",
    "tags": ["javascript", "arrays", "shift", "methods"],

  {
    "question": "How to use unshift() to add elements to the beginning of an array?",
    "answer": "**Array unshift() Method**\n\n**What it does:**\nAdds one or more elements to the BEGINNING of an array.\n\n**Syntax:**\n```javascript\narray.unshift(element1, element2, ...);\n```\n\n**Example:**\n```javascript\nvar ourarray = [\"mary\", \"gambit\"];\nourarray.unshift(\"John\");\n// Now: [\"John\", \"mary\", \"gambit\"]\n```\n\n**With shift() and unshift():**\n```javascript\nvar ourarray = [\"john\", \"mary\", \"gambit\"];\nvar remove = ourarray.shift();  // Removes \"john\"\nourarray.unshift(\"John\");       // Adds \"John\" at start\n// Result: [\"John\", \"mary\", \"gambit\"]\n```\n\n**Nested arrays:**\n```javascript\nvar nestedArray = [[\"gambit\", 23], [\"x\", \"y\"]];\nnestedArray.unshift([\"Text1\", \"Text2\"]);\n// [[\"Text1\", \"Text2\"], [\"gambit\", 23], [\"x\", \"y\"]]\n```\n\n**Key differences:**\n- `push()` - Adds to END\n- `unshift()` - Adds to BEGINNING",
    "type": "javascript",
    "tags": ["javascript", "arrays", "unshift", "methods"],

  },
  ----------------------------
    {
    "question": "How to use comparison operators (==, !=, >, <, >=, <=) in JavaScript?",
    "answer": "**Comparison Operators**\n\n**Equality operators:**\n- `==` - Equal to (loose equality)\n- `!=` - Not equal to\n- `===` - Strict equal to (same value AND type)\n\n**Relational operators:**\n- `>` - Greater than\n- `<` - Less than\n- `>=` - Greater than or equal to\n- `<=` - Less than or equal to\n\n**Examples:**\n\n**Equality (==):**\n```javascript\nfunction equality(val) {\n    if (val == 12) {\n        return \"yes the number is 12\";\n    }\n    return \"no its not 12\";\n}\n```\n\n**Comparison (==):**\n```javascript\nfunction equality(a, b) {\n    if (a == b) {\n        return \"Equal\";\n    }\n    return \"Not equal\";\n}\nequality(1, \"1\"); // \"Equal\" (loose equality)\n```\n\n**Inequality (!=):**\n```javascript\nfunction equality(a, b) {\n    if (a != b) {\n        return \"Its Not Equal To\";\n    }\n    return \"It Is Equal To\";\n}\n```\n\n**Greater/Less Than:**\n```javascript\nfunction equality(val) {\n    if (val >= 12) {\n        return \"IT IS GREATER THAN OR EQUAL TO 12\";\n    }\n    return \"IT IS LESS THAN 12\";\n}\n```\n\n**Note:** For strict comparison (type + value), use `===` instead of `==`:\n```javascript\nif (val === 12) // Only true for number 12, not string \"12\"\n```",
    "type": "javascript",

&&  
  {
    "question": "How to use logical operators (AND &&, OR ||) in JavaScript?",
    "answer": "**Logical Operators**\n\n**AND operator (&&):**\n- Returns `true` if BOTH conditions are true\n- Otherwise returns `false`\n\n```javascript\nfunction testAnd(val) {\n    if (val >= 12 && val >= 8) {\n        return \"GOOD\";\n    }\n    return \"BAD\";\n}\ntestAnd(20); // \"GOOD\" (20 is >= 12 AND >= 8)\n```\n\n**OR operator (||):**\n- Returns `true` if AT LEAST ONE condition is true\n- Returns `false` only if BOTH are false\n\n```javascript\nfunction testOr(val) {\n    if (val > 20 || val < 10) {\n        return \"OUTSIDE\";\n    }\n    return \"INSIDE\";\n}\ntestOr(30); // \"OUTSIDE\" (30 > 20)\n```\n\n**Truth tables:**\n\n**AND (&&):**\n- true && true = true\n- true && false = false\n- false && true = false\n- false && false = false\n\n**OR (||):**\n- true || true = true\n- true || false = true\n- false || true = true\n- false || false = false",
    "type": "javascript",
    "tags": ["javascript", "operators", "logical", "and", "or"],

  ---------------------------
    {
    "question": "What is a switch statement and how to use it?",
    "answer": "**Switch Statement**\n\n**What it is:**\nA switch statement tests a value against multiple cases. It's an alternative to multiple if/else statements.\n\n**Basic syntax:**\n```javascript\nswitch (val) {\n    case 1:\n        answer = \"alpha\";\n        break;\n    case 2:\n        answer = \"beta\";\n        break;\n    default:\n        answer = \"unknown\";\n}\n```\n\n**Key points:**\n- Each `case` tests for a specific value\n- `break` prevents fall-through to next case\n- `default` runs if no cases match\n- Without `break`, execution continues to next case\n\n**Example:**\n```javascript\nfunction caseInSwitch(val) {\n    var answer = \"\";\n    switch (val) {\n        case 1:\n            answer = \"alpha\";\n            break;\n        case 2:\n            answer = \"beta\";\n            break;\n        case 3:\n            answer = \"gamma\";\n            break;\n        case 4:\n            answer = \"delta\";\n            break;\n        default:\n            answer = \"Stuff\";\n    }\n    return answer;\n}\n```",
    "type": "javascript",
    "tags": ["javascript", "switch", "conditionals", "control-flow"],

  &&
  {
    "question": "How to use switch statement with multiple cases?",
    "answer": "**Switch with Multiple Cases**\n\n**What it does:**\nMultiple cases can share the same code block by omitting `break` statements between them.\n\n**Syntax:**\n```javascript\nswitch (val) {\n    case 1:\n    case 2:\n    case 3:\n        answer = \"low\";\n        break;\n    case 4:\n    case 5:\n    case 6:\n        answer = \"medium\";\n        break;\n    default:\n        answer = \"unknown\";\n}\n```\n\n**Example:**\n```javascript\nfunction sequentialSizes(val) {\n    var answer = \"\";\n    switch (val) {\n        case 1:\n        case 2:\n        case 3:\n            answer = \"low\";\n            break;\n        case 4:\n        case 5:\n        case 6:\n            answer = \"medium\";\n            break;\n        case 7:\n        case 8:\n        case 9:\n            answer = \"high\";\n            break;\n        default:\n            answer = \"unknown\";\n            break;\n    }\n    return answer;\n}\n```\n\n**How it works:**\n- If val is 1, 2, or 3 → \"low\"\n- If val is 4, 5, or 6 → \"medium\"\n- If val is 7, 8, or 9 → \"high\"\n- Otherwise → \"unknown\"",
    "type": "javascript",
    "tags": ["javascript", "switch", "multiple-cases", "conditionals"],

  -----------------------
    {
    "question": "How do you generate random whole numbers within a range?",
    "answer": "**Random Numbers Within a Range**\n\n```javascript\nfunction withinRange(myMin, myMax){\n    var rD = Math.floor(Math.random() * (myMax - myMin + 1) + myMin);\n    return rD;\n}\n\nconsole.log(withinRange(1, 10));\n```\n\n**Formula breakdown:**\n- **myMax - myMin + 1:** Total number of possible values\n- **Math.random() * (myMax - myMin + 1):** Random decimal 0 to range\n- **+ myMin:** Shifts range to start from myMin\n- **Math.floor():** Converts to whole number\n\n**Examples:**\n- Range 1-10: Math.floor(Math.random() * 10 + 1)\n- Range 5-15: Math.floor(Math.random() * 11 + 5)\n- Range 0-9: Math.floor(Math.random() * 10)",
    "type": "javascript",
    "tags": ["javascript", "math", "random", "range", "numbers"],

  &&
  
    {
    "question": "How do you generate random decimals and whole numbers in JavaScript?",
    "answer": "**Generating Random Numbers**\n\n**Random Decimals:**\n```javascript\nfunction randomFunction(){\n    return Math.random(); // Returns decimal between 0 and 1\n}\n```\n\n**Random Whole Numbers:**\n```javascript\nvar randomNumber = Math.floor(Math.random() * 20);\n// OR\nfunction randomDigit(){\n    var rD = Math.floor(Math.random() * 10);\n    return rD;\n}\n```\n\n**Key concepts:**\n- **Math.random():** Returns decimal between 0 (inclusive) and 1 (exclusive)\n- **Math.floor():** Rounds down to nearest whole number\n- **Math.random() * 20:** Scales to range 0-19.999...\n- **Math.floor(Math.random() * 20):** Gives integers 0-19",
    "type": "javascript",
    "tags": ["javascript", "math", "random", "numbers"],

  ----------------------------
    {
    "question": "What are parameters and arguments in JavaScript?",
    "answer": "**Parameters vs Arguments**\n\n**Parameters:**\nParameters are the named boxes that a function asks for. You list them in the function's definition (when you make the function).\n\n**Example:**\n```javascript\nfunction add(x, y) {\n    return x + y;\n}\n```\nHere, `x` and `y` are parameters. They're like buckets waiting to be filled.\n\n**Arguments:**\nArguments are the actual values you put into the function's boxes when you call it.\n\n**Example:**\n```javascript\nadd(2, 3);\n```\nHere, `2` and `3` are arguments. You're saying, \"Hey add function, put 2 in the first bucket (x), and 3 in the second (y).\"\n\n**Key concepts:**\n- **Parameters:** Defined in function declaration\n- **Arguments:** Passed when calling the function\n- **Order matters:** Arguments are assigned to parameters in order\n- **Can be different types:** Numbers, strings, objects, arrays, etc.",
    "type": "javascript",
    "tags": ["javascript", "parameters", "arguments", "functions"],

  &&
    {
    "question": "How do you use default parameters in JavaScript?",
    "answer": "**Default Parameters**\n\nDefault parameters allow you to set default values for function parameters. If an argument is not provided or is undefined, the default value is used.\n\n**Syntax:**\n```javascript\nfunction functionName(param1 = defaultValue1, param2 = defaultValue2) {\n    // function body\n}\n```\n\n**Example:**\n```javascript\nfunction greet(name = \"Guest\") {\n    return \"Hello, \" + name + \"!\";\n}\n\nconsole.log(greet()); // \"Hello, Guest!\"\nconsole.log(greet(\"Alice\")); // \"Hello, Alice!\"\n```\n\n**Key concepts:**\n- **Fallback values:** Used when arguments are missing\n- **Undefined triggers default:** Only undefined values use defaults\n- **Order matters:** Default parameters can be followed by non-default ones\n- **Expressions allowed:** Defaults can be expressions or function calls",
    "type": "javascript",
    "tags": ["javascript", "default-parameters", "functions", "es6"],

  ------------------------

    {
    "question": "What is a media query, why is it called that, and what does it do in the code?",
    "answer": "**CSS Media Queries:**\n\n**What is a Media Query?**\nA CSS feature that allows you to apply styles conditionally based on device characteristics.\n\n**Why is it called \"Media Query\"?**\n- **Media:** Refers to the output medium (screen, print, etc.)\n- **Query:** Asks questions about device capabilities\n- **Media Query:** \"Query the media about its characteristics\"\n\n**What Media Queries Do:**\n- **Responsive Design:** Adapt layout to different screen sizes\n- **Device Targeting:** Apply styles for specific devices\n- **Feature Detection:** Check for device capabilities\n- **Print Styles:** Different styles for printing\n- **Accessibility:** High contrast, reduced motion\n\n**Complete Media Query Syntax:**\n```css\n@media media-type and (condition) {\n    /* CSS rules */\n}\n```\n\n**Media Types:**\n- `all` - All media types (default)\n- `screen` - Computer screens, tablets, phones\n- `print` - Printers and print preview\n- `speech` - Screen readers\n- `handheld` - Handheld devices (deprecated)\n\n**Common Media Features:**\n- `width` - Viewport width\n- `height` - Viewport height\n- `min-width` - Minimum viewport width\n- `max-width` - Maximum viewport width\n- `orientation` - Portrait or landscape\n- `resolution` - Device pixel ratio\n- `aspect-ratio` - Width to height ratio\n- `color` - Number of color bits\n- `hover` - Hover capability\n- `pointer` - Pointer type (coarse, fine)\n\n**Breakpoint Examples:**\n- **Mobile:** `@media (max-width: 767px)`\n- **Tablet:** `@media (min-width: 768px) and (max-width: 1023px)`\n- **Desktop:** `@media (min-width: 1024px)`\n- **Large Desktop:** `@media (min-width: 1440px)`",
    "type": "css",
    "tags": ["css", "media-queries", "responsive", "breakpoints"],
,
  Edit the Common Media Features part 
- `width` - Viewport width  , min & max
- `height` - Viewport height min & max
- `min-width` - Minimum viewport width Remove
- `max-width` - Maximum viewport width Remove
- `orientation` - Portrait or landscape 
- `resolution` - Device pixel ratio dppx OR DPI
- `aspect-ratio` - Width to height ratio 
- `color` - Number of color bits , usually 8 
- `hover` - Hover capability hover:hover , hover:none 
- `pointer` - Pointer type (coarse, fine,none) 

Correct Syntax for not  -- it should be in the beginning immediately after @media
-------------------------------
This is the end of the list , be sure to update teh media query question also , i want to edit just that last part of the question

