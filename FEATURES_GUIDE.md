# 🎵💻 EVERMIND V.3 - Audio & Code Editor Features Guide

## 🎯 Overview

EVERMIND V.3 now includes two powerful interactive features:
1. **🔊 Audio Pronunciation System** - Hear words spoken in multiple languages
2. **💻 Live Code Editor** - Write and run HTML/CSS/JavaScript code instantly

---

## 🔊 Audio Pronunciation System

### Supported Languages

**Web Speech API (Free, Built-in):**
- 🇯🇵 Japanese
- 🇪🇸 Spanish  
- 🇫🇷 French

**Spitch API (African Languages):**
- 🇳🇬 Yoruba
- 🇳🇬 Igbo
- 🇳🇬 Hausa

### How It Works

1. **Language Questions:** Each language question has a 🔊 speaker button
2. **Click to Hear:** Click the speaker button to hear the word pronounced
3. **Smart Routing:** 
   - French/Spanish/Japanese use Web Speech API (free, offline-capable)
   - Yoruba/Igbo/Hausa use Spitch API (requires internet)
4. **Voice Preference:** Female voices are preferred when available
5. **Caching:** Audio is cached to avoid repeated API calls

### Adding Audio to Questions

Update your `data/languages.json` with this format:

```json
{
  "question": "How do you say 'hello' in Spanish?",
  "word": "hola",
  "language": "spanish",
  "answer": "Translated: hola | Pronounced: OH-lah"
}
```

**Required fields:**
- `question` - The question text
- `word` - The word to pronounce (this gets sent to audio API)
- `language` - Must be one of: japanese, spanish, french, yoruba, igbo, hausa
- `answer` - The answer explanation

### Audio System Features

✅ **Automatic language detection** - Routes to correct API based on language
✅ **Female voice preference** - Uses female voices when available
✅ **Fallback to male voice** - If female voice not available (Web Speech API)
✅ **Audio caching** - Stores generated audio to save API calls
✅ **Error handling** - Skips audio gracefully if API fails
✅ **Works in revision mode** - Audio available during quiz sessions

---

## 💻 Live Code Editor

### Features

**Three-Panel Editor:**
- 📝 HTML Editor - Write your HTML structure
- 🎨 CSS Editor - Add styles
- ⚡ JavaScript Editor - Add interactivity

**Live Preview:**
- 👁️ Instant preview of your code
- 🔄 Real-time updates when you run code
- 🖼️ Full iframe isolation for safety

**Quick Symbol Buttons:**
- HTML: `<div>`, `<p>`, `<button>`, `<input>`
- CSS: `{ }`, `:`, `;`, `#`, `.`
- JavaScript: `{ }`, `[ ]`, `( )`, `=>`, `;`

### How to Use

#### From Programming Section:
1. Click on any programming question
2. Click the **💻 Try Code** button
3. Code editor modal opens with the example code pre-loaded
4. Modify the code as needed
5. Click **▶️ Run** to see results in preview
6. Click **✖️ Close** when done

#### From Revision Mode:
1. During programming question review
2. After showing the answer, click **💻 Try This Code**
3. Editor opens with the code ready to experiment
4. Test your understanding by modifying the code

### Keyboard Shortcuts

- **Ctrl/Cmd + Enter** - Run code
- **Escape** - Close editor

### Editor Controls

- **▶️ Run** - Execute your code and show preview
- **🗑️ Clear** - Clear all editors (with confirmation)
- **🔄 Refresh** - Refresh the preview
- **✖️ Close** - Close the editor modal

### Example Use Cases

**HTML Practice:**
```html
<div class="card">
  <h2>My Card</h2>
  <p>This is a card component</p>
  <button>Click Me</button>
</div>
```

**CSS Styling:**
```css
.card {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**JavaScript Interactivity:**
```javascript
document.querySelector('button').addEventListener('click', () => {
  alert('Hello from EVERMIND!');
});
```

---

## 📚 Creating Content

### Language Questions Format

```json
[
  {
    "question": "How do you say 'thank you' in Japanese?",
    "word": "ありがとう",
    "language": "japanese",
    "answer": "Translated: ありがとう (arigatou) | Pronounced: ah-ree-gah-toh"
  }
]
```

### Programming Questions Format

```json
[
  {
    "question": "How do you center a div with flexbox?",
    "answer": ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}"
  }
]
```

---

## 🔧 Technical Details

### Audio System Architecture

**Web Speech API:**
- Built into modern browsers
- No API key required
- Works offline after initial load
- Supports 50+ languages
- Female voice selection priority

**Spitch API:**
- Specialized African language support
- Requires API key: `sk_yaxeQ5VVO8ZBXl7ACEyzJZZfQ3Ojafb0PLtDELhl`
- Female voices for Yoruba, Igbo, Hausa
- Graceful error handling (skips audio on failure)

**Caching System:**
- Uses JavaScript Map for in-memory caching
- Caches both Web Speech and Spitch audio
- Reduces API calls and improves performance
- Cache persists during session

### Code Editor Architecture

**Editor Components:**
- Three separate textarea panels (HTML, CSS, JS)
- Sandboxed iframe for safe code execution
- Quick symbol insertion buttons
- Monospace font (Consolas/Monaco/Courier New)

**Security:**
- Iframe with `sandbox="allow-scripts allow-modals"` attribute
- Isolated execution environment
- No access to parent window
- Safe for user experimentation

**Responsive Design:**
- Three columns on desktop (1024px+)
- Single column on mobile
- Touch-friendly controls
- Adaptive button sizing

---

## 🎨 UI/UX Features

### Audio Player
- 🔊 Circular speaker button
- Smooth scale animation on hover
- Positioned next to question text
- Works in both section view and revision mode
- Clear visual feedback on click

### Code Editor
- 🌙 Dark theme (VS Code-inspired)
- Syntax-friendly monospace font
- Color-coded panels (HTML, CSS, JS)
- Large, clear preview area
- Keyboard shortcuts for efficiency
- Mobile-optimized layout

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Syntax highlighting in code editor
- [ ] Code auto-completion
- [ ] More programming languages (Python via Pyodide)
- [ ] Download audio files for offline use
- [ ] Code snippets library
- [ ] Share code feature

### Language Expansion
- [ ] Add more languages to Web Speech API
- [ ] Support for Arabic, Chinese, Hindi
- [ ] Custom pronunciation guides
- [ ] Slow playback option

---

## 📝 Quick Tips

### For Language Learning:
1. Click speaker button multiple times to practice pronunciation
2. Try to say the word before hearing it
3. Use revision mode for spaced repetition
4. All African languages use Spitch API (internet required)

### For Programming Practice:
1. Start with example code, then modify it
2. Use quick symbol buttons to speed up typing
3. Experiment freely - the editor is isolated and safe
4. Use Ctrl+Enter to quickly run code
5. Clear editor to start fresh practice

### For Content Creators:
1. Always include `word` and `language` fields for audio
2. Use `\n` for line breaks in code examples
3. Test speaker buttons after adding language questions
4. Verify code runs correctly in the editor
5. Keep code examples focused and educational

---

## 🐛 Troubleshooting

### Audio Issues

**Speaker button not working:**
- Check internet connection (Spitch API requires internet)
- Verify language field matches supported languages
- Check browser console for errors

**No female voice:**
- Web Speech API may not have female voice for that language
- System will fallback to available male voice
- Spitch API always provides female voices

### Code Editor Issues

**Code not running:**
- Click the ▶️ Run button
- Check for syntax errors in console
- Try refreshing the preview

**Editor not opening:**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing the page

---

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Verify JSON syntax in data files
3. Ensure API key is valid (Spitch)
4. Test with sample data first

---

**Happy Learning with EVERMIND V.3! 🧠✨**

