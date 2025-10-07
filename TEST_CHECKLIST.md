# EVERMIND V.3 - Test Checklist

## 🧪 Complete Testing Checklist

Use this checklist to verify all fixes are working correctly.

---

### ✅ Issue 1: Button Layout

**Test Steps:**
1. Open any section (e.g., Bible)
2. Click "Start Revision"
3. Observe the revision controls

**Expected Results:**
- [ ] All 5 buttons visible in **one horizontal row**
- [ ] Button order: `⬅️ Back` | `⏭️ Skip` | `➡️ Next` | `✗ Wrong` | `✓ Correct`
- [ ] No "Show Answer" button visible
- [ ] No separate row for Wrong/Correct buttons
- [ ] Buttons fit on screen without scrolling

**Visual:**
```
┌─────────────────────────────────────────────────┐
│  ⬅️ Back  ⏭️ Skip  ➡️ Next  ✗ Wrong  ✓ Correct │
└─────────────────────────────────────────────────┘
```

---

### ✅ Issue 2: Wrong Button Logic

**Test Steps:**
1. Start revision with at least 10 questions
2. Mark first question as "Wrong"
3. Continue through next questions
4. Count when the "wrong" question reappears

**Expected Results:**
- [ ] After marking "Wrong", question doesn't appear immediately
- [ ] Question reappears after **exactly 5 other questions**
- [ ] Works correctly even with less than 5 total questions
- [ ] Can mark multiple questions wrong, each returns after 5 others
- [ ] Progress counter updates correctly

**Example Flow:**
```
Q1 (Mark Wrong) → Q2 → Q3 → Q4 → Q5 → Q6 → Q1 appears again ✓
```

---

### ✅ Issue 3: Auto-Show Answers

**Test Steps:**
1. Start any revision
2. Observe when question loads

**Expected Results:**
- [ ] Answer is **immediately visible** below question
- [ ] No "Show Answer" button exists
- [ ] No need to click anything to see answer
- [ ] Answer stays visible throughout

---

### ✅ Issue 4: Programming Tag System

**Test Steps:**
1. Click **Programming** section from homepage
2. Observe the tag filter UI at top
3. Click different tags
4. Use the search input

**Expected Results:**
- [ ] Tag filter UI appears at top of questions list
- [ ] See tag chips: `All` `#html` `#js` `#css` `#python` `#c` `#git` `#react`
- [ ] Click `#html` → Only HTML questions visible
- [ ] Click `#js` → Only JavaScript questions visible
- [ ] Click `All` → All questions visible again
- [ ] Active tag has **blue background**
- [ ] Inactive tags have **transparent background**

**Search Input Tests:**
- [ ] Type `#html` → Filters to HTML questions
- [ ] Type `html` (without #) → Still works
- [ ] Type `#js` → Filters to JavaScript questions
- [ ] Clear input → Shows all questions
- [ ] Type partial match (e.g., `py`) → Finds `python` tag

---

### ✅ Issue 5: Code Persistence

**Test Steps:**
1. Open Programming section
2. Click any question's "💻 Try Code" button
3. Edit the code in editor
4. Close the editor
5. Refresh the page (F5)
6. Reopen the same question

**Expected Results:**
- [ ] Edited code is **still there** after refresh
- [ ] Each question has **separate** saved code
- [ ] Editing Q1's code doesn't affect Q2's code
- [ ] Code persists across browser sessions
- [ ] Works for all 3 panels (HTML, CSS, JS)

**Storage Test:**
- [ ] Open browser DevTools → Application → Local Storage
- [ ] See keys like `code_programming_0`, `code_programming_1`, etc.
- [ ] Values contain the edited code

---

### ✅ Issue 6: Code Editor Panel Loading

**Test Steps:**
1. Open Programming section
2. Find an **HTML question** (e.g., "How do you create a basic HTML structure?")
3. Click "💻 Try Code"
4. Observe which panel has code

**Expected Results:**
- [ ] **HTML question** → Code loads in **HTML panel** (left)
- [ ] **CSS question** → Code loads in **CSS panel** (middle)
- [ ] **JavaScript question** → Code loads in **JS panel** (right)
- [ ] **Python question** → Code loads in JS panel with comment
- [ ] **C question** → Code loads in JS panel with comment
- [ ] **Git question** → Code loads in JS panel with comment

**Panel Verification:**
```
HTML Question → [HTML Panel has code] [CSS empty] [JS empty]
CSS Question  → [HTML empty] [CSS Panel has code] [JS empty]
JS Question   → [HTML empty] [CSS empty] [JS Panel has code]
```

---

### ✅ Issue 7: Enter Key in Editor

**Test Steps:**
1. Open code editor (any question)
2. Click in any textarea (HTML/CSS/JS)
3. Press **Enter** key
4. Press **Ctrl+Enter**

**Expected Results:**
- [ ] **Enter** → Creates new line (cursor moves down)
- [ ] **Enter** → Does NOT run code
- [ ] **Enter** → Text continues on next line
- [ ] **Ctrl+Enter** → Runs code and updates preview
- [ ] **Ctrl+Z** → Undo works
- [ ] **Ctrl+Y** → Redo works

**Multi-line Code Test:**
```javascript
function test() {
  console.log("Line 1");  // Press Enter here
  console.log("Line 2");  // Should create this line
}
```

---

### ✅ Issue 8: Section Click Handlers

**Test Steps:**
1. Go to homepage
2. Click **Programming** section card
3. Go back, click **Languages** section card

**Expected Results:**
- [ ] **Programming** section opens successfully
- [ ] Questions are displayed
- [ ] "💻 Try Code" buttons are visible
- [ ] **Languages** section opens successfully
- [ ] Questions are displayed
- [ ] Speaker buttons (🔊) are visible

---

## 🔍 Additional Tests

### Global Revision Mode
**Test Steps:**
1. Click "Global Revision" from homepage
2. Ensure some sections are checked
3. Click "Start Revision"

**Expected Results:**
- [ ] Questions from multiple sections appear
- [ ] All button fixes apply (single row, auto-show, etc.)
- [ ] Wrong logic works correctly
- [ ] Progress counter shows total questions

---

### Code Editor Features

**Quick Symbols:**
- [ ] Click `<div>` button → Inserts `<div></div>` in HTML
- [ ] Click `{ }` button → Inserts `{}` in CSS/JS
- [ ] Click `=>` button → Inserts `=>` in JS

**Preview:**
- [ ] Edit HTML → Click Run → Preview updates
- [ ] Edit CSS → Click Run → Styles apply
- [ ] Edit JS → Click Run → Script executes
- [ ] Click 🔄 Refresh → Preview reloads

**Controls:**
- [ ] Click 🗑️ Clear → All panels cleared
- [ ] Click ✖️ Close → Editor closes and saves code

---

### Languages Section

**Test Steps:**
1. Open Languages section
2. Click speaker button on different languages

**Expected Results:**
- [ ] **French** → Uses Web Speech API (female voice if available)
- [ ] **Spanish** → Uses Web Speech API (female voice if available)
- [ ] **Japanese** → Uses Web Speech API (female voice if available)
- [ ] **Yoruba** → Uses Spitch API (or skips if fails)
- [ ] **Igbo** → Uses Spitch API (or skips if fails)
- [ ] **Hausa** → Uses Spitch API (or skips if fails)

---

### Country Flags Section

**Test Steps:**
1. Open Country Flags section
2. Observe flag images

**Expected Results:**
- [ ] Flag images display correctly (not as HTML code)
- [ ] Images load from flagcdn.com
- [ ] No emoji or raw HTML visible in questions

---

## 🎯 Performance Tests

**Page Load:**
- [ ] Loading screen appears with falling brains
- [ ] Progress bar reaches 100%
- [ ] All sections show question counts (not 0/0)
- [ ] Homepage loads in < 3 seconds

**Code Editor:**
- [ ] Editor opens in < 500ms
- [ ] Code runs and preview updates in < 200ms
- [ ] No lag when typing in textareas

**LocalStorage:**
- [ ] Saving code doesn't slow down editor close
- [ ] Loading saved code doesn't delay editor open

---

## 🐛 Bug Checks

**No Regressions:**
- [ ] Theme switching still works (Red/Blue/Light)
- [ ] Homepage stats update correctly
- [ ] Section navigation works
- [ ] Back button works from all screens
- [ ] No console errors in DevTools
- [ ] No broken images or 404s in Network tab

---

## 📊 Final Verification

**All 6 Issues:**
- [ ] ✅ Issue 1: Button layout fixed
- [ ] ✅ Issue 2: Wrong logic fixed
- [ ] ✅ Issue 3: Auto-show answers working
- [ ] ✅ Issue 4: Tag filtering working
- [ ] ✅ Issue 5: Code persistence working
- [ ] ✅ Issue 6: Panel loading + Enter key working

**Documentation:**
- [ ] ✅ IMPLEMENTATION_COMPLETE.md created
- [ ] ✅ QUICK_START_GUIDE.md created
- [ ] ✅ TEST_CHECKLIST.md created

**Files Modified:**
- [ ] ✅ index.html (button layout)
- [ ] ✅ main.js (all logic fixes)
- [ ] ✅ code_editor.js (panel loading, persistence)
- [ ] ✅ style.css (tag filter styling)
- [ ] ✅ data/programming.json (type & tags added)

---

## ✅ Testing Complete!

If all checkboxes are checked, the implementation is **100% complete** and ready for use! 🎉

**Test Server:** http://localhost:8000/index.html

**Last Updated:** October 7, 2025

