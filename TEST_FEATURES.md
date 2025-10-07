# 🧪 Feature Testing Guide

## ✅ Complete Testing Checklist

Use this guide to verify all new features are working correctly.

---

## 🎬 Loading Screen Test

### Expected Behavior:
1. ✅ Page loads with loading screen visible
2. ✅ Dark background with gradient
3. ✅ "🧠 EVERMIND V.3" title displayed
4. ✅ "Your Personal Learning System" subtitle shown
5. ✅ 14 brain emojis falling from top to bottom
6. ✅ Progress bar fills from 0% to 100%
7. ✅ Percentage text updates (0% → 100%)
8. ✅ Takes approximately 3 seconds
9. ✅ Fades out smoothly
10. ✅ Homepage appears after fade

### Test Steps:
```
1. Open index.html
2. Watch the loading screen
3. Verify all brains are falling
4. Check progress bar reaches 100%
5. Confirm smooth fade-out
6. Verify homepage appears
```

### Reduced Motion Test:
```
1. Enable "Reduce Motion" in OS settings
2. Refresh page
3. Verify: Brains don't animate (static brain shows instead)
4. Verify: Progress bar still works
```

✅ **Pass if:** All animations smooth, completes in ~3 seconds, fades properly

---

## 🔊 Audio System Test

### Web Speech API (Japanese, Spanish, French)

**Test 1: Japanese Audio**
```
1. Click "Languages" section
2. Find question: "How do you say 'thank you' in Japanese?"
3. Click 🔊 speaker button
4. Expected: Hear "ありがとう" (arigatou) in Japanese
5. Click again - should play from cache (instant)
```

**Test 2: Spanish Audio**
```
1. Find question: "How do you say 'hello' in Spanish?"
2. Click 🔊 speaker button
3. Expected: Hear "hola" in Spanish
4. Note: Female voice if available, male fallback OK
```

**Test 3: French Audio**
```
1. Find question: "How do you say 'goodbye' in French?"
2. Click 🔊 speaker button
3. Expected: Hear "au revoir" in French
```

### Spitch API (Yoruba, Igbo, Hausa)

**Test 4: Yoruba Audio**
```
1. Find question: "How do you say 'good morning' in Yoruba?"
2. Click 🔊 speaker button
3. Expected: Hear "ẹ káàárọ̀" in Yoruba (requires internet)
4. Note: Female voice
```

**Test 5: Igbo Audio**
```
1. Find question: "How do you say 'welcome' in Igbo?"
2. Click 🔊 speaker button
3. Expected: Hear "nnọọ" in Igbo
```

**Test 6: Hausa Audio**
```
1. Find question: "How do you say 'how are you?' in Hausa?"
2. Click 🔊 speaker button
3. Expected: Hear "yaya kake?" in Hausa
```

### Audio Revision Mode Test
```
1. Start "Languages" section revision
2. Click through questions
3. Verify 🔊 button appears on language questions
4. Click to hear pronunciation during revision
```

✅ **Pass if:** All languages play correctly, caching works, female voices used

---

## 💻 Code Editor Test

### Basic Editor Test

**Test 1: Open Editor**
```
1. Click "Programming" section
2. Click any question
3. Click "💻 Try Code" button
4. Expected: Editor modal opens
5. Verify: Three panels (HTML, CSS, JS)
6. Verify: Preview section at bottom
```

**Test 2: Write & Run HTML**
```
1. In HTML panel, type:
   <h1>Hello EVERMIND!</h1>
   <p>This is a test</p>

2. Click ▶️ Run button
3. Expected: Text appears in preview
```

**Test 3: Add CSS**
```
1. In CSS panel, type:
   h1 { color: blue; }
   p { color: green; }

2. Click ▶️ Run button
3. Expected: Text changes color in preview
```

**Test 4: Add JavaScript**
```
1. In JS panel, type:
   alert('EVERMIND works!');

2. Click ▶️ Run button
3. Expected: Alert popup appears
```

### Quick Symbols Test
```
1. Click HTML <div> button
2. Verify: <div></div> inserted
3. Click CSS { } button
4. Verify: {} inserted
5. Click JS => button
6. Verify: => inserted
```

### Keyboard Shortcuts Test
```
1. Write some code
2. Press Ctrl+Enter (or Cmd+Enter on Mac)
3. Expected: Code runs
4. Press Escape
5. Expected: Editor closes
```

### Pre-loaded Code Test
```
1. Find question: "How do you center a div with flexbox?"
2. Click "💻 Try Code" button
3. Expected: CSS code pre-loaded in CSS panel
4. Click ▶️ Run
5. Verify: Code executes correctly
```

### Revision Mode Editor Test
```
1. Start Programming section revision
2. Show answer on a question with code
3. Click "💻 Try This Code" button
4. Expected: Editor opens with code pre-loaded
5. Modify and run code
```

✅ **Pass if:** Editor opens, all panels work, preview updates, shortcuts work

---

## 🎨 Theme Test

### Red Theme
```
1. Click 🔴 Red Mode button
2. Expected changes:
   - Dark red gradient background
   - Section cards dark red (#450a0a)
   - Buttons use #B91C1C
   - Hover: #991B1B
   - Text readable (light on dark)
```

### Blue Theme
```
1. Click 🔵 Blue Mode button
2. Expected changes:
   - Dark blue gradient background
   - Section cards dark blue (#0c1e47)
   - Buttons use #1E3A8A
   - Hover: #1E40AF
   - Text readable (light on dark)
```

### Contrast Test
```
1. Switch between themes
2. Verify: All text is readable
3. Check: Buttons have clear hover states
4. Confirm: No eye strain from colors
```

✅ **Pass if:** Themes are noticeably darker, good contrast, smooth transitions

---

## 🏠 Homepage Test

### Global Revision Checkboxes
```
1. Go to homepage
2. Scroll to "Global Revision Mode"
3. Expected: All 7 checkboxes are CHECKED
4. Try unchecking some
5. Click "Start Global Revision"
6. Verify: Only selected sections appear
```

✅ **Pass if:** All checkboxes pre-selected, can deselect, revision works

---

## 📱 Mobile Test

### Responsive Design
```
1. Open in mobile browser OR resize window to phone size
2. Loading screen:
   - Title smaller (2rem vs 3rem)
   - Brains smaller
   - Still smooth animation

3. Audio buttons:
   - Still clickable
   - Proper size for touch

4. Code editor:
   - Panels stack vertically
   - Touch-friendly buttons
   - Preview still works
```

✅ **Pass if:** Everything works and looks good on mobile

---

## ♿ Accessibility Test

### Screen Reader Test
```
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Loading screen:
   - Announces "Loading" status
   - Reads progress percentage
   
3. Audio buttons:
   - Announces "Play pronunciation for [word]"
   
4. Code editor:
   - Announces modal opening
   - Can navigate with keyboard
```

### Keyboard Navigation Test
```
1. Use only keyboard (no mouse)
2. Tab through all interactive elements
3. Verify: All buttons accessible
4. Verify: Can open/close editor with keyboard
5. Verify: Can trigger audio with Enter/Space
```

✅ **Pass if:** All features accessible via keyboard and screen reader

---

## 🐛 Error Handling Test

### Audio Error Test
```
1. Disconnect internet
2. Try Yoruba/Igbo/Hausa audio (Spitch API)
3. Expected: No audio (graceful skip)
4. Expected: No error popup
5. Check console: Error logged but app continues
```

### Code Error Test
```
1. Open code editor
2. Write invalid JavaScript:
   const x =    // syntax error
3. Click Run
4. Expected: Browser console shows error
5. Expected: Editor still functional
```

✅ **Pass if:** Errors handled gracefully, no crashes

---

## 📊 Performance Test

### Loading Speed
```
1. Refresh page multiple times
2. Verify: Loading screen appears immediately
3. Verify: Progress bar smooth (60fps)
4. Verify: No stuttering in brain animations
```

### Audio Caching
```
1. Click 🔊 on a language question
2. Wait for audio to finish
3. Click 🔊 again
4. Expected: Instant playback (cached)
```

### Editor Performance
```
1. Open code editor
2. Type rapidly in all panels
3. Verify: No lag
4. Click Run multiple times
5. Verify: Responsive
```

✅ **Pass if:** Everything smooth, no lag, caching works

---

## 🎯 Integration Test

### Full Workflow Test
```
1. Open EVERMIND
2. Watch loading screen (3 seconds)
3. Click Languages → try audio
4. Click Programming → try editor
5. Start Global Revision
6. Use audio during revision
7. Use editor during revision
8. Switch themes
9. Complete revision session
```

✅ **Pass if:** Complete workflow smooth, all features work together

---

## 📝 Final Checklist

- [ ] Loading screen appears and completes in ~3 seconds
- [ ] All 6 languages play audio correctly
- [ ] Code editor opens and runs code
- [ ] Quick symbol buttons work
- [ ] Keyboard shortcuts functional
- [ ] Red theme darker and professional
- [ ] Blue theme darker and professional
- [ ] All checkboxes pre-selected on homepage
- [ ] Mobile responsive on all features
- [ ] Keyboard navigation works
- [ ] Error handling graceful
- [ ] Performance smooth (60fps)
- [ ] No console errors (except expected API failures)

---

## 🆘 If Something Fails

### Audio Not Working:
1. Check browser console for errors
2. Verify internet connection (Spitch needs it)
3. Check if language name is lowercase in JSON
4. Confirm `word` and `language` fields present

### Editor Not Working:
1. Check browser console for errors
2. Verify all script files loaded
3. Try refreshing the page
4. Check if question has code in answer

### Loading Screen Issues:
1. Clear browser cache
2. Verify loading_screen.js loaded
3. Check console for JavaScript errors
4. Try different browser

### Theme Issues:
1. Check if CSS variables defined
2. Verify style.css loaded completely
3. Try hard refresh (Ctrl+F5)

---

## ✅ Success Criteria

**All tests pass if:**
- ✅ Loading screen smooth and branded
- ✅ Audio plays in all 6 languages
- ✅ Code editor fully functional
- ✅ Themes darker and accessible
- ✅ Mobile responsive
- ✅ Keyboard accessible
- ✅ No breaking errors

---

**Test Report:**
- Date: ____________
- Browser: ____________
- Device: ____________
- Result: ☐ Pass ☐ Fail
- Notes: ____________

---

**Happy Testing! 🧪✨**

