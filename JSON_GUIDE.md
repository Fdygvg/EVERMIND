# 📋 JSON Structure Guide - EVERMIND V.3

## 🎯 Quick Reference for Adding Questions

Every section uses JSON files in the `data/` folder. Here's how to structure your questions:

---

## 📝 Basic Question Format

### Simple Text Question
```json
{
  "question": "What is the capital of France?",
  "answer": "Paris"
}
```

---

## 🖼️ With Images

### Country Flags Example
```json
{
  "question": "Which country is this?",
  "image": "assets/country_flags/japan.png",
  "answer": "Japan"
}
```

### Science Diagram Example
```json
{
  "question": "Label the parts of a cell",
  "image": "assets/science/cell_diagram.png",
  "answer": "1. Nucleus\n2. Mitochondria\n3. Cell Membrane\n4. Cytoplasm"
}
```

---

## 🔊 With Audio

### Language Pronunciation
```json
{
  "question": "How do you say 'thank you' in Japanese?",
  "answer": "Translated: ありがとう | Pronounced: ah-ree-gah-toh",
  "audio": "assets/languages/arigatou.mp3"
}
```

---

## 💻 With Code

### Programming Examples
```json
{
  "question": "What is a Python list comprehension?",
  "answer": "squares = [x**2 for x in range(10)]\n# Creates: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]"
}
```

```json
{
  "question": "How to create a React component?",
  "answer": "function MyComponent() {\n  return (\n    <div>\n      <h1>Hello World</h1>\n    </div>\n  );\n}"
}
```

---

## 🔗 Combining Features

### Image + Audio
```json
{
  "question": "What animal is this and what sound does it make?",
  "image": "assets/facts/cow.png",
  "answer": "A cow - it moos!",
  "audio": "assets/facts/cow_moo.mp3"
}
```

### Code + Explanation
```json
{
  "question": "Explain JavaScript promises",
  "answer": "Promises handle async operations:\n\nconst fetchData = () => {\n  return new Promise((resolve, reject) => {\n    // async operation\n    resolve(data);\n  });\n};\n\nfetchData()\n  .then(data => console.log(data))\n  .catch(error => console.error(error));"
}
```

---

## 📚 Complete File Example

### data/languages.json
```json
[
  {
    "question": "How do you say 'hello' in Spanish?",
    "answer": "Translated: hola | Pronounced: OH-lah"
  },
  {
    "question": "How do you say 'goodbye' in French?",
    "answer": "Translated: au revoir | Pronounced: oh reh-vwah",
    "audio": "assets/languages/au_revoir.mp3"
  },
  {
    "question": "What is 'she' in Igbo?",
    "answer": "Translated: ọ | Pronounced: oh"
  }
]
```

---

## 🎨 Field Reference

| Field | Required | Type | Description | Example |
|-------|----------|------|-------------|---------|
| `question` | ✅ Yes | String | The question to ask | `"What is 2+2?"` |
| `answer` | ✅ Yes | String | The answer (use `\n` for new lines) | `"4"` |
| `image` | ❌ No | String | Path to image file | `"assets/flags/usa.png"` |
| `audio` | ❌ No | String | Path to audio file | `"assets/audio/hello.mp3"` |

---

## ✅ JSON Syntax Rules

### ✔️ DO:
```json
[
  {
    "question": "First question?",
    "answer": "First answer"
  },
  {
    "question": "Second question?",
    "answer": "Second answer"
  }
]
```

### ❌ DON'T:
```json
[
  {
    "question": "Missing comma",
    "answer": "Wrong"
  }  <-- Missing comma!
  {
    "question": "Another question",
    "answer": "Wrong"
  }
]
```

### Key Points:
1. ✅ Wrap everything in square brackets `[]`
2. ✅ Each question is in curly braces `{}`
3. ✅ Use commas between questions (but NOT after the last one)
4. ✅ Use double quotes `"` for strings
5. ✅ Use `\n` for line breaks in answers
6. ✅ Escape special characters: `\"` for quotes, `\\` for backslash

---

## 🔄 Special Characters in Answers

### Line Breaks
```json
{
  "question": "List the primary colors",
  "answer": "1. Red\n2. Blue\n3. Yellow"
}
```

### Code Formatting
```json
{
  "question": "CSS flexbox center?",
  "answer": ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}"
}
```

### Quotes in Text
```json
{
  "question": "Famous quote?",
  "answer": "He said, \"To be or not to be\""
}
```

---

## 📂 Recommended Asset Organization

```
assets/
├── languages/
│   ├── hello_spanish.mp3
│   ├── goodbye_french.mp3
│   └── thank_you_japanese.mp3
│
├── country_flags/
│   ├── usa.png
│   ├── japan.png
│   └── france.png
│
├── science/
│   ├── cell_diagram.png
│   ├── periodic_table.png
│   └── solar_system.jpg
│
└── history/
    ├── world_war_2.jpg
    └── ancient_rome.png
```

---

## 🎯 Quick Add Workflow

1. **Open** the relevant JSON file
2. **Copy** the last question object (including braces)
3. **Paste** it before the closing `]`
4. **Add** a comma after the previous question
5. **Edit** your new question and answer
6. **Save** the file
7. **Refresh** your browser

### Example:
```json
[
  {
    "question": "Existing question?",
    "answer": "Existing answer"
  },  <-- Add comma here
  {
    "question": "Your new question?",  <-- Paste & edit here
    "answer": "Your new answer"
  }
]
```

---

## 🔍 Validation Checklist

Before saving, check:
- [ ] File starts with `[` and ends with `]`
- [ ] Each question has both `question` and `answer`
- [ ] Commas between objects (not after last one)
- [ ] All strings use double quotes `"`
- [ ] Paths to images/audio are correct
- [ ] Special characters are escaped
- [ ] File saved as `.json` in `data/` folder

---

## 🆘 Common Errors

### Error: "Unexpected token"
→ Missing or extra comma

### Error: "Unexpected end of JSON"
→ Missing closing bracket `]`

### Error: Questions not showing
→ Check file is in `data/` folder with correct name

### Images not loading
→ Verify path is correct (case-sensitive!)

---

## 💡 Pro Tips

1. **Use a JSON validator** (search "JSON validator online")
2. **Keep backups** of your JSON files
3. **Test with one question** before adding many
4. **Copy-paste** to avoid syntax errors
5. **Be consistent** with formatting

---

**Happy Question Adding! 📝**

Master your knowledge by adding questions that matter to you!


