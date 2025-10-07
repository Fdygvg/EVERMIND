# EVERMIND V.3 - Quick Start Guide

## 🎯 New Features Overview

### 1. **Improved Revision Mode**
- All buttons now in one row: **Back | Skip | Next | Wrong | Correct**
- Answers **always visible** (no "Show Answer" button needed)
- Marking "Wrong" makes question return **after 5 other questions**

### 2. **Programming Section with Tag Filtering**
- Click **Programming** to open section
- See tag filter UI at top with clickable chips: `#html` `#js` `#css` `#python` `#c` `#git`
- Click any tag to filter questions by that language
- Or type in search box: `#html` to filter
- Click **All** to show all questions

### 3. **Code Editor with Persistence**
- Click **💻 Try Code** on any programming question
- Code loads in the **correct panel** (HTML/CSS/JS based on question type)
- **Edit code** → Close editor → **Code is saved automatically**
- Reopen same question → **Your edited code reappears**
- Code persists even after page refresh!

### 4. **Code Editor Controls**
- **Enter** - Create new line (natural behavior)
- **Ctrl+Enter** - Run code and see live preview
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo
- **▶️ Run** button - Execute code
- **🗑️ Clear** button - Clear all panels
- **✖️ Close** button - Save & close editor

---

## 🚀 How to Use

### Revision Mode
1. Go to homepage
2. Click any section (e.g., **Bible**)
3. Click **Start Revision**
4. Answer questions
5. Use buttons:
   - **Back** - Go to previous question
   - **Skip** - Move to end of queue
   - **Next** - Go to next question
   - **Wrong** - Mark wrong (returns after 5 questions)
   - **Correct** - Mark correct (removed from queue)

### Programming Section
1. Click **Programming** section
2. See tag filter at top
3. **Option A:** Click a tag chip (e.g., `#html`)
4. **Option B:** Type in search box: `#js`
5. Questions are filtered by selected tag
6. Click **All** to clear filter

### Code Editor
1. Open **Programming** section
2. Click **💻 Try Code** on any question
3. **Your code loads in the correct panel**:
   - HTML questions → HTML panel
   - CSS questions → CSS panel
   - JS questions → JavaScript panel
4. Edit code (Enter creates new lines)
5. Press **Ctrl+Enter** or click **▶️ Run** to see preview
6. Close editor → **Code is auto-saved**
7. Reopen same question → **Your code is still there!**

---

## 📚 Programming Tags Available

| Tag | Language |
|-----|----------|
| `#html` | HTML |
| `#css` | CSS |
| `#js` | JavaScript |
| `#react` | React (JSX) |
| `#python` | Python |
| `#c` | C Programming |
| `#git` | Git Commands |

---

## 💾 Code Persistence Details

**Where is code saved?**
- Stored in browser's **localStorage**
- Each question has unique storage key
- Survives page refreshes, browser restarts

**When is code saved?**
- Automatically when you **close the editor**
- No manual save needed

**How to reset code?**
- Open editor, click **🗑️ Clear**, close editor
- Or clear browser localStorage manually

**Storage limit:**
- ~10MB per domain (plenty for code snippets)

---

## 🎨 UI Tips

### Tag Filter
- **Active tag** = Blue background
- **Inactive tags** = Transparent with border
- **Search input** = Type `#tagname` or just `tagname`

### Buttons
- **Yellow/Orange** = Skip
- **Red** = Wrong
- **Green** = Correct
- **Blue** = Navigation (Back/Next)

### Code Editor
- **3 panels side-by-side**: HTML | CSS | JS
- **Preview at bottom**: Live output
- **Quick symbols**: Click toolbar buttons to insert code snippets
- **Keyboard shortcuts**: Ctrl+Enter to run

---

## 🔧 Troubleshooting

### "Code editor not loading in right panel"
✅ **Fixed!** Code now loads based on question's `type` field.

### "Enter key not working in editor"
✅ **Fixed!** Enter creates new lines. Use Ctrl+Enter to run code.

### "Code disappears after refresh"
✅ **Fixed!** Code is saved to localStorage automatically.

### "Programming section not opening"
✅ **Fixed!** Section click handlers now work properly.

### "Wrong button not working correctly"
✅ **Fixed!** Questions now return after exactly 5 other questions.

---

## 📱 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1-7` | Jump to section (Homepage) |
| `Ctrl+Enter` | Run code (Editor) |
| `Ctrl+Z` | Undo (Editor) |
| `Ctrl+Y` | Redo (Editor) |
| `Esc` | Close editor (Future feature) |

---

## 🎓 Best Practices

1. **Use tags** to focus on specific languages
2. **Edit code** in the editor to learn by doing
3. **Mark Wrong** questions to review them again
4. **Try Code** to experiment without leaving the app
5. **Your edits persist** - no need to copy-paste to external editor

---

## 🆘 Need Help?

- Check `IMPLEMENTATION_COMPLETE.md` for technical details
- All features are browser-based, no server needed
- Works offline after initial load
- Code persistence uses localStorage (browser feature)

---

**Enjoy EVERMIND V.3!** 🧠✨

