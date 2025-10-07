# 🚀 EVERMIND V.3 - Quick Reference Card

## 🎵 Audio System

### Supported Languages
| Language | API | Voice |
|----------|-----|-------|
| 🇯🇵 Japanese | Web Speech | Female preferred |
| 🇪🇸 Spanish | Web Speech | Female preferred |
| 🇫🇷 French | Web Speech | Female preferred |
| 🇳🇬 Yoruba | Spitch | Female |
| 🇳🇬 Igbo | Spitch | Female |
| 🇳🇬 Hausa | Spitch | Female |

### JSON Format
```json
{
  "question": "How do you say 'hello' in Spanish?",
  "word": "hola",
  "language": "spanish",
  "answer": "Translated: hola | Pronounced: OH-lah"
}
```

### Usage
- Click 🔊 button next to language questions
- Audio plays automatically
- Cached for repeat playback
- Works in section view & revision mode

---

## 💻 Code Editor

### Features
- **HTML Panel** - Write structure
- **CSS Panel** - Add styles  
- **JS Panel** - Add interactivity
- **Live Preview** - See results instantly

### Keyboard Shortcuts
| Action | Shortcut |
|--------|----------|
| Run Code | `Ctrl/Cmd + Enter` |
| Close Editor | `Esc` |

### Quick Symbols
**HTML:** `<div>` `<p>` `<button>` `<input>`  
**CSS:** `{ }` `:` `;` `#` `.`  
**JS:** `{ }` `[ ]` `( )` `=>` `;`

### JSON Format
```json
{
  "question": "How do you center with flexbox?",
  "answer": ".container {\n  display: flex;\n  justify-content: center;\n}"
}
```

---

## 🎨 Theme Colors

### Red Theme
```css
--color-red: #B91C1C      /* Primary */
--color-red-dark: #991B1B /* Hover */
--color-red-darker: #7F1D1D /* Active */
```

### Blue Theme
```css
--color-blue: #1E3A8A      /* Primary */
--color-blue-dark: #1E40AF /* Hover */
--color-blue-darker: #0B3D91 /* Active */
```

---

## ⌨️ Keyboard Shortcuts

### Revision Mode
| Key | Action |
|-----|--------|
| `Space` | Show Answer |
| `→` or `Enter` | Mark Correct |
| `←` | Mark Wrong |
| `↓` | Skip Question |

### Code Editor
| Key | Action |
|-----|--------|
| `Ctrl/Cmd + Enter` | Run Code |
| `Esc` | Close Editor |

---

## 📁 File Structure

```
EVERMIND V.3/
├── index.html              # Main page
├── style.css               # All styles
├── main.js                 # Core logic
├── audio_player.js         # Audio system
├── code_editor.js          # Code editor
├── data/
│   ├── languages.json      # Language Q&A
│   ├── programming.json    # Code Q&A
│   └── [other].json        # Other sections
└── assets/
    └── languages/          # Audio files (cached)
```

---

## 🔧 API Keys

**Spitch API:**
```
sk_yaxeQ5VVO8ZBXl7ACEyzJZZfQ3Ojafb0PLtDELhl
```
(Located in `audio_player.js`)

**Web Speech API:**
- No key required
- Built into browsers

---

## 🐛 Troubleshooting

### Audio Not Playing
1. ✅ Check internet connection (Spitch needs it)
2. ✅ Verify `language` field is correct
3. ✅ Check browser console for errors
4. ✅ Ensure JSON has `word` field

### Code Editor Issues
1. ✅ Click ▶️ Run button
2. ✅ Check for syntax errors
3. ✅ Try 🔄 Refresh preview
4. ✅ Clear and start fresh

### Loading Screen
1. ✅ Should appear for 3 seconds
2. ✅ Check `loading_screen.js` is loaded
3. ✅ Verify no console errors

---

## ✅ Quick Checklist

### Adding Language Question:
- [ ] Include `question` field
- [ ] Include `word` field (for audio)
- [ ] Include `language` field (lowercase)
- [ ] Include `answer` field
- [ ] Language must be supported (6 total)

### Adding Programming Question:
- [ ] Include `question` field
- [ ] Include `answer` field with code
- [ ] Use `\n` for line breaks
- [ ] Test in code editor

### Testing:
- [ ] Audio plays on 🔊 click
- [ ] Code runs in editor
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎯 Common Tasks

### Open Code Editor:
1. Go to Programming section
2. Click any question
3. Click 💻 Try Code button

### Test Audio:
1. Go to Languages section  
2. Click any question
3. Click 🔊 speaker button

### Global Revision:
1. Deselect unwanted sections (all checked by default)
2. Click "Start Global Revision"
3. Use keyboard shortcuts for speed

---

## 📞 Need Help?

1. Read `FEATURES_GUIDE.md` for detailed info
2. Check `IMPLEMENTATION_SUMMARY.md` for technical details
3. Review browser console for errors
4. Verify JSON syntax at jsonlint.com

---

**Happy Learning! 🧠✨**

