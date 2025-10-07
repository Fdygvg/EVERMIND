# 🧠 EVERMIND V.3

**Your Personal Interactive Learning System with Audio & Live Code Editor**

EVERMIND V.3 is a beautiful, fast, and expandable learning platform that helps you organize and master knowledge across multiple domains using proven spaced repetition techniques. Now with **audio pronunciation** and a **live code editor**!

---

## 🎉 What's New in V.3

### 🔊 **Audio Pronunciation System**
- Hear words spoken in **6 languages**: Japanese, Spanish, French, Yoruba, Igbo, Hausa
- Click 🔊 speaker buttons to hear correct pronunciation
- Female voices preferred with automatic fallback
- Works in both learning and revision modes
- Audio caching for faster repeat playback

### 💻 **Live Code Editor**
- Write and run **HTML, CSS, and JavaScript** instantly
- Three-panel editor with live preview
- Quick symbol insertion buttons
- Dark theme (VS Code style)
- Keyboard shortcuts (Ctrl+Enter to run)
- Safe, sandboxed execution environment

### ✨ **Beautiful Loading Screen**
- Professional 3-second loading animation
- Falling brain emojis with smooth animations
- Branded with EVERMIND V.3 logo
- Progress bar with percentage display
- Fully accessible with reduced motion support

### 🎨 **Darker Professional Themes**
- Upgraded red and blue themes with richer colors
- Better contrast for improved readability
- Sophisticated dark backgrounds
- All buttons updated with new darker palette

---

## ✨ Core Features

### 📚 **Organized Knowledge Sections**
- **Languages** 🌍 - Learn translations and pronunciation **(with audio!)**
- **Programming** 💻 - Master code syntax and concepts **(with live editor!)**
- **Bible** 📖 - Study verses and biblical knowledge
- **Science** 🔬 - Explore scientific facts and concepts
- **History** 🏛️ - Remember important historical events
- **Random Facts** 💡 - Interesting facts from around the world
- **Country Flags** 🚩 - Identify flags from around the world

### 🔄 **Smart Revision Mode**
- **Spaced Repetition Algorithm**: Wrong answers come back after 5 questions
- **Progress Tracking**: See how many questions remain
- **Section Revision**: Focus on one topic at a time
- **Global Revision**: All sections pre-selected (just deselect what you don't want!)

### 🎨 **Beautiful Interface**
- **4 Themes**: Light, Dark, Red (darker), and Blue (darker) modes
- **iPad-Optimized**: Large touch-friendly buttons
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Delightful user experience
- **Loading Screen**: Professional branded experience

### 📱 **Multimedia Support**
- **Audio Pronunciation**: Web Speech API + Spitch API
- **Images**: For visual learning (flags, diagrams, etc.)
- **Live Code Editor**: Write and run code instantly
- **Code Formatting**: Syntax-preserved code blocks

### ⚡ **Easy to Extend**
- Add new questions in **under 10 seconds**
- Simply edit JSON files - no coding required
- Automatic loading and display
- Audio works automatically with proper JSON format

---

## 🚀 Quick Start

### 1. **Open the App**
Simply open `index.html` in your web browser. Enjoy the 3-second loading screen! No server needed!

### 2. **Try the Audio System**
- Click on **Languages** section
- Click the **🔊 speaker button** next to any question
- Hear the word pronounced correctly in 6 languages!

### 3. **Try the Code Editor**
- Click on **Programming** section
- Click the **💻 Try Code** button on any question
- Write code, click **▶️ Run**, see instant results!

### 4. **Start Revision**
- **Section Revision**: Click "Start Revision Mode" in any section
- **Global Revision**: All sections pre-selected - just deselect what you don't want and click "Start Global Revision"

### 5. **Use Revision Mode**
- Click "Show Answer" to reveal the answer (or press Spacebar)
- Click "✓ Correct" if you got it right (question disappears)
- Click "✗ Wrong" if you got it wrong (question returns after 5 others)
- Click "Skip" to see the question later
- Use 🔊 audio and 💻 code editor during revision!

---

## 📝 Adding New Questions

### Method 1: Edit JSON Files

1. Navigate to the `data/` folder
2. Open the relevant JSON file (e.g., `languages.json`)
3. Copy an existing question object
4. Modify the values:

```json
{
  "question": "Your question here?",
  "answer": "Your answer here"
}
```

5. Save the file
6. Refresh the page - your question is live!

### Optional Fields

**For audio pronunciation (Languages):**
```json
{
  "question": "How do you say 'hello' in Spanish?",
  "word": "hola",
  "language": "spanish",
  "answer": "Translated: hola | Pronounced: OH-lah"
}
```
*Supported languages: japanese, spanish, french, yoruba, igbo, hausa*

**For images:**
```json
{
  "question": "Which country is this?",
  "image": "assets/country_flags/usa.png",
  "answer": "United States"
}
```

**For code (Programming):**
```json
{
  "question": "How do you center a div with flexbox?",
  "answer": ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}"
}
```
*Code automatically gets "Try Code" button in the editor!*

---

## 📂 File Structure

```
EVERMIND V.3/
├── index.html              # Main application
├── main.js                 # Core functionality
├── audio_player.js         # Audio system (Web Speech + Spitch API)
├── code_editor.js          # Live code editor
├── style.css               # Styles and themes
├── README.md               # This file
│
├── Documentation/
│   ├── FEATURES_GUIDE.md         # Complete feature documentation
│   ├── IMPLEMENTATION_SUMMARY.md # Technical overview
│   ├── QUICK_REFERENCE.md        # Quick lookup guide
│   ├── WHATS_NEW.md              # What's new in V.3
│   ├── TEST_FEATURES.md          # Testing checklist
│   └── JSON_GUIDE.md             # How to add questions
│
├── data/                  # JSON files for each section
│   ├── languages.json      # With audio support
│   ├── programming.json    # With code editor support
│   ├── bible.json
│   ├── science.json
│   ├── history.json
│   ├── facts.json
│   └── country_flags.json
│
└── assets/                # Optional media files
    ├── languages/          # Audio files (cached)
    ├── programming/
    ├── bible/
    ├── science/
    ├── history/
    ├── facts/
    └── country_flags/
```

---

## ⌨️ Keyboard Shortcuts

### Revision Mode:
- **Spacebar**: Show Answer
- **→ (Right Arrow) or Enter**: Mark Correct
- **← (Left Arrow)**: Mark Wrong
- **↓ (Down Arrow)**: Skip Question

### Code Editor:
- **Ctrl/Cmd + Enter**: Run Code
- **Escape**: Close Editor

---

## 🎨 Themes

Switch between 4 beautiful themes from the homepage:
- ☀️ **Light Mode**: Clean white background
- 🌙 **Dark Mode**: Easy on the eyes
- 🔴 **Red Mode**: Darker, sophisticated red palette (#B91C1C)
- 🔵 **Blue Mode**: Darker, professional blue palette (#1E3A8A)

Your theme preference is saved automatically!

**New in V.3:** Red and Blue themes now use darker, more professional colors with better contrast!

---

## 🔧 Advanced Features

### Adding New Sections

To add a completely new section:

1. Create a new JSON file in `data/` (e.g., `music.json`)
2. Add the section to the `sections` array in `main.js`:

```javascript
{ id: 'music', name: 'Music Theory', icon: '🎵' }
```

3. Add a section card in `index.html`
4. Add a checkbox for global revision

### Custom Styling

Edit `style.css` to customize:
- Colors and gradients
- Button sizes
- Fonts and typography
- Animations

---

## 💡 Tips for Effective Learning

1. **Review Regularly**: Use revision mode daily for best results
2. **Mix Sections**: Global revision helps reinforce connections
3. **Be Honest**: Mark answers wrong if you're unsure - it helps you learn
4. **Add Context**: Include explanations in answers for deeper understanding
5. **Use Multimedia**: Audio for languages, images for visual concepts

---

## 🌟 Future Enhancements

Possible additions for future versions:
- ✅ ~~Audio pronunciation system~~ (Implemented in V.3!)
- ✅ ~~Live code editor~~ (Implemented in V.3!)
- ✅ ~~Loading screen with branding~~ (Implemented in V.3!)
- 🔜 Python support (via Pyodide)
- 🔜 Syntax highlighting in code editor
- 🔜 Download audio files for offline use
- 🔜 Code snippets library
- 🔜 Search functionality across all questions
- 🔜 Custom spaced repetition intervals
- 🔜 Export/import questions
- 🔜 Progress statistics and analytics
- 🔜 Multi-user support with cloud sync

---

## 📄 License

This is a personal learning system. Feel free to customize it for your needs!

---

## 🤝 Support

To report issues or request features, document them in your personal notes or modify the system directly!

---

**Happy Learning! 🎓**

*Master your knowledge, one question at a time.*

