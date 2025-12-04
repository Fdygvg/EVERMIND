[
  {
    question: "How to open a New instance of vscode",
    answer:
      "**Keyboard shortcut:**\n```js\nctrl + shift + N\n```\nOpens new VS Code window",
    type: "tools",
  },
  {
    question:
      "How do you print numbers and strings & char, float, double, booleans in C",
    answer:
      '**Basic printf formats:**\n```c\nint age = 18;\nchar name[] = "UserN9ne";\nchar grade = \'A\';\nfloat gpa = 4.99;\ndouble pi = 3.14159;\nbool flag = true;\n\nprintf("Age: %d\\n", age);          // int\nprintf("Name: %s\\n", name);       // string\nprintf("Grade: %c\\n", grade);     // char\nprintf("GPA: %f\\n", gpa);        // float\nprintf("Pi: %lf\\n", pi);         // double\nprintf("Flag: %d\\n", flag);      // bool (0/1)\n\n// Multiple variables\nprintf("%s is %d years old\\n", name, age);\n```\n\n**String storage:**\n```c\nchar name[10] = "UserN9ne";  // Array\nchar name[] = "UserN9ne";     // Auto-sized\n\n// Assign later\nchar name[10];\nstrcpy(name, "UserN9ne");     // Need string.h\n```\n\n**Key points:** Use correct format specifiers, strings need char arrays',
    type: "c",
  },
  {
    question: "What is the difference between chars and unsigned chars",
    answer:
      '**char vs unsigned char:**\n\n**Signed char:**\n- Range: -128 to 127\n- Can be negative\n- Default for `char` (compiler-dependent)\n\n**Unsigned char:**\n- Range: 0 to 255\n- Always non-negative\n\n**Key differences:**\n```c\nchar c = \'A\';           // ASCII 65\nprintf("%c", c);       // Prints: A\nprintf("%d", c);       // Prints: 65\n\nunsigned char uc = 200; // Safe\nchar c = 200;           // Might wrap to -56\n```\n\n**Use cases:**\n- `char` = text, characters\n- `unsigned char` = raw bytes, binary data, images\n\n**Format specifiers:**\n- `%c` = print as character\n- `%d` = print as number',
    type: "c",
  },
  {
    question:
      "What is the difference between short int & unsigned short int in C?",
    answer:
      '**short int vs unsigned short int:**\n\n**short int (signed):**\n- 2 bytes typically\n- Range: -32,768 to 32,767\n- Can be negative\n\n**unsigned short int:**\n- 2 bytes typically\n- Range: 0 to 65,535\n- Only non-negative\n- Double the positive range\n\n**Example:**\n```c\nshort int a = 40000;         // Wraps (outside range)\nunsigned short b = 40000;    // Correct\n\nprintf("%d", a);            // Negative value\nprintf("%u", b);            // 40000\n```\n\n**Use cases:**\n- `short int` = small signed numbers\n- `unsigned short` = counts, sizes, indexes (non-negative)\n\n**Format specifiers:**\n- `%d` = signed short\n- `%u` = unsigned short',
    type: "c",
  },

  {
    question: "Why use char over int in C?",
    answer:
      "**Primary Reason: Memory Efficiency**\n- `char` = **1 byte**\n- `int` = **4 bytes** (usually)\n\n**Example Impact:**\n```c\nunsigned char pixels[1000000]; // 1 MB\nint pixels[1000000];            // 4 MB (4x larger!)\n```\n\n**Best uses for `char`:**\n- Text (ASCII/UTF-8 characters)\n- Raw bytes (file data, network packets)\n- Image pixel values (0-255)\n- Anywhere negative values don't make sense (use `unsigned char`)\n\n**When to use `int`:**\n- General-purpose math\n- Numbers outside 0-255 range\n- Loop counters, calculations\n\n**Short Alternative:**\n```c\nshort smallNumber; // 2 bytes, between `char` and `int`\n```",
    type: "c",
  },
  {
    question: "What is integer promotion in C?",
    answer:
      "**Integer Promotion** = Automatic conversion of small types (`char`, `short`) to `int`/`unsigned int` during operations.\n\n**Why it happens:** Prevents overflow and standardizes calculations.\n\n**Example:**\n```c\nchar a = 100;\nchar b = 30;\n// a and b are PROMOTED to int before addition\nint result = a + b; // 130\n```\n\n**Rules:**\n1. If type smaller than `int` → promoted to `int`\n2. If `int` can't hold all values → promoted to `unsigned int`\n\n**Key Insight:** This happens silently in comparisons and arithmetic to keep operations safe and predictable.",
    type: "c",
  },
  {
    question: "What happens in signed vs unsigned comparison?",
    answer:
      "**Mixed Comparison Rule:** Signed value gets converted to **unsigned**, which can flip results!\n\n**Safe Case (small types):**\n```c\nsigned char a = -5;\nunsigned char b = 250;\n// Both promoted to int → comparison works\nif (a < b) { } // TRUE (-5 < 250)\n```\n\n**Danger Case (int/long):**\n```c\nint a = -1;          // Signed\nunsigned int b = 1;  // Unsigned\n// a converted to unsigned → becomes HUGE number\nif (a < b) { } // FALSE! (Unexpected)\n```\n\n**Why:** Negative signed values wrap to large unsigned numbers (e.g., `-1` → `4,294,967,295`).\n\n**Golden Rule:** Avoid directly comparing signed and unsigned integers.",
    type: "c",
  },
  {
    question:
      "How does overflow work internally when a value exceeds the limit in C?",
    answer:
      "**Integer Overflow** = Wrap-around when exceeding bit limits\n\n**8-bit signed char (-128 to 127):**\n```c\n// Overflow above max (127)\n120 + 10 = 130 → wraps to -126\n\n// Underflow below min (-128)\n-120 + -10 = -130 → wraps to 126\n```\n\n**8-bit unsigned char (0 to 255):**\n```c\n// Overflow above max (255)\n250 + 10 = 260 → wraps to 4\n\n// Underflow below min (0)\n5 - 10 = -5 → wraps to 251\n```\n\n**Key idea:** Numbers wrap cyclically within type's range",
    type: "c",
  },
  {
    question: "Explain the concept of modulo wrapping",
    answer:
      "**Modulo Wrapping** = Keep remainder after dividing by max+1\n\n**For unsigned 8-bit (0-255):**\n- Max+1 = 256 possible values\n- Wrap formula: `result % 256`\n\n**Examples:**\n```c\n// Adding past max\n260 % 256 = 4\n\n// Subtracting below min\n-5 % 256 = 251  (computer uses 2's complement)\n```\n\n**Visual:** Clock with 256 hours\n- After hour 255 comes hour 0\n- Before hour 0 comes hour 255\n\n**Key idea:** `% (max+1)` determines wrapped value",
    type: "c",
  },
  {
    question: "How do you do addition and subtraction in binary?",
    answer:
      "**Binary Addition:**\n```\n0 + 0 = 0 carry 0\n0 + 1 = 1 carry 0\n1 + 0 = 1 carry 0\n1 + 1 = 0 carry 1\n```\n\n**Binary Subtraction:**\n```\n0 - 0 = 0 borrow 0\n1 - 0 = 1 borrow 0\n1 - 1 = 0 borrow 0\n0 - 1 = 1 borrow 1  (needs borrowing)\n```\n\n**Borrowing:** If bit needs to borrow from left:\n- Left bit becomes 0\n- Current bit becomes 10 (binary 2)\n- Subtract 1 from 10 = 1\n\n**Example:** 1101 - 1011 = 0010\n\n**Key idea:** Similar to decimal math but with base 2",
    type: "c",
  },

  {
    question: "What are format specifiers in C?",
    answer:
      '**Format specifiers** = Tell `printf`/`scanf` the data type\n\n**Common specifiers:**\n```c\n%d  // Integer: printf("%d", 42)\n%f  // Float: printf("%f", 3.14)\n%c  // Character: printf("%c", \'A\')\n%s  // String: printf("%s", "hello")\n%u  // Unsigned integer\n```\n\n**Precision & width:**\n```c\nprintf("%.2f", pi);    // 3.14 (2 decimals)\nprintf("%5d", x);      // "   42" (width 5)\nprintf("%-5d!", x);    // "42   !" (left-aligned)\n```\n\n**Combined example:**\n```c\nprintf("%10.2f", pi);  // "      3.14" (width 10, 2 decimals)\n```',
    type: "c",
  },
  {
    question: "What does it mean for something to be truncated?",
    answer:
      '**Truncated** = Cut off without rounding\n\n**Number truncation:**\n```c\nfloat pi = 3.14159;\nprintf("%.2f", pi); // 3.14 (cuts off .00159)\n```\n\n**Integer truncation:**\n```c\nint x = 300;\nchar c = x; // char max 127 → truncates to 44\n```\n\n**String truncation:**\n```c\nchar str[5];\nstrcpy(str, "HelloWorld"); // Stores only "Hell"\n```\n\n**Key point:** Truncation discards extra data to fit limits (precision, memory, range)',
    type: "c",
  },
  {
    question: "What are arithmetic operators in C?",
    answer:
      "**Basic operators:**\n```c\n+  // Addition\n-  // Subtraction\n*  // Multiplication\n/  // Division\n%  // Modulus (remainder)\n```\n\n**Increment/decrement:**\n```c\na++  // Post-increment (use then add 1)\n++a  // Pre-increment (add 1 then use)\na--  // Post-decrement\n--a  // Pre-decrement\n```\n\n**Key notes:**\n- `7 / 2 = 3` (integer division truncates)\n- Cast to float for decimals: `(float)7 / 2 = 3.5`\n- `%` works only with integers\n- Use parentheses to control order",
    type: "c",
  },
  {
    question: "What are augmented assignment operators?",
    answer:
      "**Augmented assignment** = Arithmetic + assignment shortcut\n\n**Shorthand operators:**\n```c\nx += 5   // x = x + 5\nx -= 3   // x = x - 3\nx *= 2   // x = x * 2\nx /= 4   // x = x / 4\nx %= 3   // x = x % 3\n```\n\n**Example:**\n```c\nint a = 10;\na += 5;  // a = 15\na *= 2;  // a = 30\na %= 4;  // a = 2\n```\n\n**Benefits:** Cleaner code, prevents mistakes, works with all arithmetic operators",
    type: "c",
  },
  {
    question: "What is a buffer overflow in C?",
    answer:
      '**Buffer Overflow** = Writing more data than buffer can hold\n\n**Example:**\n```c\nchar name[5];          // Buffer size 5\nstrcpy(name, "HelloWorld"); // 10 chars → OVERFLOW\n```\n\n**What happens:**\n- Extra data overwrites adjacent memory\n- Causes crashes, bugs, or security vulnerabilities\n\n**Common causes:**\n- Not checking input size\n- Using `strcpy()`, `gets()` (no length checks)\n- Ignoring array bounds\n\n**Fix:** Use `strncpy()`, check sizes, validate input',
    type: "c",
  },
  {
    question: "How do you collect user input in C?",
    answer:
      '**C User Input Methods:**\n\n**1. Basic scanf:**\n```c\nchar name[20];\nscanf("%s", name);  // No spaces allowed\n```\n\n**2. With spaces (fgets):**\n```c\nfgets(name, 20, stdin);  // Reads spaces\n// Remove newline:\nname[strcspn(name, "\\n")] = \'\\0\';\n```\n\n**3. Multiple inputs:**\n```c\nint age;\nscanf("%s %d", name, &age);  // & for non-arrays\n```\n\n**Key:** Always check buffer sizes to prevent overflow',
    type: "c",
  },
  {
    question: "What are some math functions in C?",
    answer:
      "**C Math Functions (include <math.h>):**\n\n**Basic operations:**\n```c\nsqrt(16)    // 4 → square root\npow(2, 3)   // 8 → power\nfabs(-3.14) // 3.14 → absolute value\nabs(-5)     // 5 → integer absolute value\n```\n\n**Rounding:**\n```c\nceil(4.2)   // 5 → round up\nfloor(4.8)  // 4 → round down\nround(4.5)  // 5 → nearest integer\n```\n\n**Trigonometry (radians):**\n```c\nsin(angle)  // sine\ncos(angle)  // cosine\ntan(angle)  // tangent\n```",
    type: "c",
  },
  {
    question: "What is the command to kill active programs?",
    answer:
      "**Windows:**\n```cmd\ntaskkill /IM programname.exe /F  # Force kill\n```\n\n**Linux/Mac:**\n```bash\nkill <PID>            # Graceful stop\nkill -9 <PID>         # Force kill\npkill programname     # Kill by name\n```\n\n**Find PID:**\n```bash\ntasklist              # Windows (find .exe)\nps aux | grep name    # Linux/Mac\n```",
    type: "system",
  },
  {
    question: "How to use if and switch statements in C?",
    answer:
      '**if statement:**\n```c\nif (score >= 90) {\n    printf("A");\n} else if (score >= 75) {\n    printf("B");\n} else {\n    printf("Fail");\n}\n```\n\n**switch statement:**\n```c\nswitch(grade) {\n    case \'A\':\n        printf("Excellent");\n        break;          // ← Exit switch\n    case \'B\':\n        printf("Good");\n        break;\n    default:            // ← No match\n        printf("Other");\n}\n```\n\n**Key difference:**\n- `if` → Any condition\n- `switch` → Equality checks only (int/char)',
    type: "c",
  },
  {
    question:
      "What is the function to convert lowercase to uppercase and vice versa in C",
    answer:
      "**Case conversion functions:**\n```c\n#include <ctype.h>\n\nchar ch = 'a';\n\n// Convert to uppercase\ntoupper(ch);  // 'a' → 'A'\n\n// Convert to lowercase\ntolower('B'); // 'B' → 'b'\n```\n\n**Convert entire string:**\n```c\nchar str[] = \"hello\";\nfor (int i = 0; str[i] != '\\0'; i++) {\n    str[i] = toupper(str[i]);  // \"HELLO\"\n}\n```\n\n**Key points:**\n- From `<ctype.h>` library\n- Returns unchanged if not a letter\n- Works with characters only",
    type: "c",
  },
  {
    question: "What are logical operators in C",
    answer:
      "**Logical operators:**\n```c\nint a = 5, b = 8;\n\n// AND (both must be true)\na > 0 && b > 0  // true\n\n// OR (at least one true)\na < 0 || b > 0  // true\n\n// NOT (inverts condition)\n!(a < 0)       // true\n```\n\n**Key points:**\n- `&&` = AND\n- `||` = OR  \n- `!` = NOT\n- Return 1 (true) or 0 (false)\n- Short-circuit evaluation: stops early when possible",
    type: "c",
  },
  {
    question: "What are the different types of functions in C",
    answer:
      '**Two main function types:**\n\n**1. Void functions (no return):**\n```c\nvoid printInfo(char name[], int age) {\n    printf("Name: %s, Age: %d\\n", name, age);\n}\n// Call: printInfo("Chuks", 20);\n```\n\n**2. Value-returning functions:**\n```c\nint add(int a, int b) {\n    return a + b;\n}\n// Call: int sum = add(5, 3);\n\n// Other return types:\ndouble calculateGPA() { ... }\nchar getGrade() { ... }\nfloat getAverage() { ... }\n```\n\n**Key points:**\n- `void` = no return value\n- Specify return type before function name\n- Use `return` to send value back',
    type: "c",
  },
  {
    question: "What are function prototypes",
    answer:
      '**Function prototype** = Declaration before definition\n\n**Why needed:** Compiler reads top-down; must know function exists\n\n**Example:**\n```c\n#include <stdio.h>\n\n// Prototype (declaration)\nint add(int a, int b);\n\nint main() {\n    int sum = add(5, 3);  // Works - compiler knows add()\n    printf("%d\\n", sum);\n    return 0;\n}\n\n// Full definition\nint add(int a, int b) {\n    return a + b;\n}\n```\n\n**Key points:**\n- Tells compiler: return type, name, parameter types\n- Ends with semicolon\n- Optional if function defined before use\n- Useful for organization and multi-file programs',
    type: "c",
  },
  {
    question: "What are some string functions",
    answer:
      '**Common string functions (from string.h):**\n```c\n#include <string.h>\n\nchar str1[20] = "Hello";\nchar str2[20] = "World";\n\n// Length\nstrlen(str1);          // 5\n\n// Concatenate\nstrcat(str1, str2);    // "HelloWorld"\n\n// Copy\nstrcpy(str1, str2);    // str1 = "World"\n\n// Compare\nstrcmp("Cat", "Dog"); // Negative (Cat < Dog)\nstrcmp("Dog", "Dog"); // 0 (equal)\nstrcmp("Dog", "Cat"); // Positive (Dog > Cat)\n\n// Case-insensitive compare\nstrcmpi("DOG", "dog"); // 0 (equal ignoring case)\n```\n\n**Other useful functions:**\n- `strrev(str)` - reverse string\n- `strupr(str)` - to uppercase\n- `strlwr(str)` - to lowercase\n- `strncpy()` - copy n characters\n- `strncat()` - concatenate n characters\n\n**Important:** Ensure destination has enough space!',
    type: "c",
  },
];
