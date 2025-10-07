# 🔧 EVERMIND V.3 - Troubleshooting Guide

## Common Issues & Solutions

---

### 🚫 Problem: Questions Not Showing Up

#### Possible Causes & Solutions:

**1. JSON File Not Found**
- ✅ Check that JSON file is in `data/` folder
- ✅ Verify filename matches exactly (case-sensitive)
- ✅ Should be: `languages.json` not `Languages.json`

**2. JSON Syntax Error**
```
Error: Unexpected token...
```
- ✅ Use online JSON validator (google "JSON validator")
- ✅ Common mistakes:
  - Missing comma between objects
  - Extra comma after last object
  - Single quotes instead of double quotes
  - Missing closing bracket `]`

**3. Browser Cache**
- ✅ Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- ✅ Clear browser cache
- ✅ Open in incognito/private mode

---

### 🖼️ Problem: Images Not Loading

#### Solutions:

**1. Check Image Path**
```json
// ✅ Correct
"image": "assets/country_flags/usa.png"

// ❌ Wrong
"image": "assets\country_flags\usa.png"  // Don't use backslashes
"image": "/assets/country_flags/usa.png"  // Don't start with /
```

**2. Verify File Exists**
- ✅ Check image is actually in the specified folder
- ✅ Check filename spelling (case-sensitive!)
- ✅ Supported formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`

**3. Check File Permissions**
- ✅ Ensure you have read permissions for the image
- ✅ Try opening image directly in browser

---

### 🔊 Problem: Audio Not Playing

#### Solutions:

**1. Check Audio Format**
- ✅ Supported: `.mp3`, `.wav`, `.ogg`, `.m4a`
- ✅ MP3 is most universally supported

**2. Verify Path**
```json
// ✅ Correct
"audio": "assets/languages/hello.mp3"

// ❌ Wrong
"audio": "hello.mp3"  // Must include full path
```

**3. Browser Support**
- ✅ Try different browser
- ✅ Check browser console for errors (F12 → Console tab)

---

### 🎨 Problem: Theme Not Changing

#### Solutions:

**1. Clear Browser Data**
- ✅ Clear localStorage
- ✅ Try incognito mode
- ✅ Check browser console for errors

**2. JavaScript Disabled**
- ✅ Enable JavaScript in browser settings
- ✅ Check for browser extensions blocking JS

**3. Manual Theme Set**
```javascript
// Open browser console (F12) and type:
localStorage.setItem('evermind-theme', 'dark');
location.reload();
```

---

### 🔄 Problem: Revision Mode Not Working

#### Solutions:

**1. No Questions Selected (Global Revision)**
- ✅ Check at least one checkbox before clicking "Start Global Revision"
- ✅ Verify selected sections have questions

**2. Questions Array Empty**
- ✅ Check JSON files have questions
- ✅ Verify JSON is valid (no syntax errors)

**3. Stuck on Same Question**
- ✅ Refresh the page
- ✅ Check browser console for errors

---

### ⌨️ Problem: Keyboard Shortcuts Not Working

#### Solutions:

**1. Focus Issue**
- ✅ Click on the page first
- ✅ Ensure you're in revision mode, not browsing

**2. Other App Intercepting**
- ✅ Close other applications
- ✅ Check browser extensions

**3. Supported Keys**
- ✅ Only works in Revision Mode
- ✅ Keys: `Space`, `←`, `→`, `↓`, `Enter`

---

### 📱 Problem: Not Mobile-Friendly

#### Solutions:

**1. Viewport Not Set**
- ✅ Should be automatically set in `<head>`
- ✅ Check: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**2. Zoom Issues**
- ✅ Pinch to zoom should work
- ✅ Try landscape orientation

**3. Buttons Too Small**
- ✅ On touch devices, buttons auto-enlarge
- ✅ Minimum touch target: 60px

---

### 🐌 Problem: Slow Performance

#### Solutions:

**1. Too Many Questions**
- ✅ Split large JSON files into smaller sections
- ✅ Each section should have < 500 questions

**2. Large Images**
- ✅ Optimize images (compress, resize)
- ✅ Recommended: < 500KB per image
- ✅ Use tools like TinyPNG or ImageOptim

**3. Browser Issues**
- ✅ Close other tabs
- ✅ Clear cache
- ✅ Try different browser

---

### 💾 Problem: Changes Not Saving

#### Solutions:

**1. JSON Not Saved**
- ✅ Ensure you saved the file (Ctrl+S)
- ✅ Check file modification date

**2. Wrong File Edited**
- ✅ Verify you edited the correct JSON file
- ✅ Check file is in `data/` folder

**3. Syntax Error**
- ✅ Validate JSON before saving
- ✅ One error breaks the entire file

---

### 🔍 Problem: Search Not Working

**Note:** Search feature not implemented in V.3
- This is a future enhancement
- Current workaround: Use browser's Find (Ctrl+F)

---

### 📊 Problem: Progress Not Tracking

**Note:** Progress is session-based only
- Progress resets when you exit revision mode
- This is by design for spaced repetition
- Future versions may add persistent tracking

---

## 🛠️ Debug Mode

### Enable Browser Developer Tools

**Chrome/Edge:**
1. Press `F12`
2. Go to "Console" tab
3. Look for red error messages

**Firefox:**
1. Press `F12`
2. Go to "Console" tab
3. Look for errors

**Safari:**
1. Enable Developer menu (Preferences → Advanced)
2. Press `Cmd+Option+C`
3. Check console

### Common Console Errors

**"Failed to fetch"**
- File not found
- Check path and filename

**"Unexpected token in JSON"**
- JSON syntax error
- Use JSON validator

**"Cannot read property of undefined"**
- JavaScript error
- Check browser console for line number

---

## 🔄 Reset Everything

### Complete Reset

1. **Clear All Data:**
```javascript
// Open browser console (F12):
localStorage.clear();
location.reload();
```

2. **Restore Default Files:**
- Delete `data/` folder
- Re-extract from backup or recreate

3. **Fresh Start:**
- Close all browser tabs
- Clear cache: `Ctrl+Shift+Delete`
- Reopen `index.html`

---

## 📋 Pre-Flight Checklist

Before reporting an issue, check:

- [ ] JSON files are valid (use validator)
- [ ] Files are in correct folders
- [ ] Paths use forward slashes `/`
- [ ] Images/audio files exist
- [ ] Browser JavaScript is enabled
- [ ] Page is refreshed (Ctrl+F5)
- [ ] Browser console checked for errors
- [ ] Tried in incognito mode
- [ ] Tried different browser

---

## 🆘 Still Having Issues?

### Manual Verification

**1. Test JSON File:**
```bash
# Open in browser:
file:///path/to/data/languages.json
# Should display JSON if valid
```

**2. Check File Structure:**
```
✅ index.html (in root)
✅ main.js (in root)
✅ style.css (in root)
✅ data/languages.json
✅ data/programming.json
... etc
```

**3. Verify Permissions:**
- Can you open files in text editor?
- Can you view images directly?

---

## 💡 Pro Tips

### Prevent Issues

1. **Always Validate JSON** before saving
   - Use: jsonlint.com or jsonformatter.org

2. **Use Consistent Paths**
   - Always: `assets/section/file.png`
   - Never: `./assets` or `../assets`

3. **Test After Each Change**
   - Add one question → test
   - Don't add 50 questions then test

4. **Keep Backups**
   - Copy `data/` folder regularly
   - Save working versions

5. **Use Version Control**
   - Consider using Git
   - Track changes over time

---

## 🔧 Advanced Troubleshooting

### Check State Object

Open console and type:
```javascript
console.log(state);
// Shows current app state
```

### Force Reload Section

```javascript
state.allQuestions['languages'] = null;
loadSectionData('languages');
```

### Reset Revision

```javascript
resetRevision();
backToHome();
```

---

## 📞 Quick Fixes Cheat Sheet

| Problem | Quick Fix |
|---------|-----------|
| Questions not showing | Hard refresh (Ctrl+F5) |
| JSON error | Validate at jsonlint.com |
| Image not loading | Check path & file exists |
| Theme stuck | `localStorage.clear()` in console |
| Buttons not working | Enable JavaScript |
| Slow performance | Optimize images |
| Changes not visible | Clear cache |

---

## ✅ System Requirements

**Minimum:**
- Modern browser (2020+)
- JavaScript enabled
- 50MB free disk space

**Recommended:**
- Chrome/Edge/Firefox latest version
- 100MB free disk space
- 1GB RAM available

**Not Required:**
- Internet connection
- Server
- Database
- Node.js/npm

---

**Most Issues Are Fixed By:**
1. Validating JSON ✅
2. Hard refresh (Ctrl+F5) ✅
3. Checking browser console ✅

If you've tried these three things, you'll solve 95% of issues!

---

*Happy Learning! 🎓*

