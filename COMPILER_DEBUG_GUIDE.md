# 🔧 Compiler Debug Guide

## 🚨 Current Issue
The code editor loads but the preview panel shows empty (white rectangle) instead of executing the code.

## 🧪 Debug Steps

### Step 1: Open Code Editor
1. Go to **Programming** section
2. Click any **"💻 Try Code"** button
3. Click **"🧪 Test"** button to load sample code

### Step 2: Check Browser Console
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for these messages:
   - `"Running code: {html: '...', css: '...', js: '...'}"`
   - `"Iframe loaded and ready"`
   - `"Code executed successfully using srcdoc"`

### Step 3: Manual Debug Commands
In the browser console, try these commands:

```javascript
// Test 1: Check if iframe exists
document.getElementById('codePreview')

// Test 2: Simple iframe test
CodeEditor.simpleTest()

// Test 3: Debug iframe properties
CodeEditor.debugIframe()

// Test 4: Manual code execution
CodeEditor.runCode()
```

### Step 4: Expected Results

**If working correctly:**
- Console shows: `"Code executed successfully using srcdoc"`
- Preview panel shows: Blue "Hello World!" heading, green text, light gray background
- Console shows: `"JavaScript is working!"` message

**If broken:**
- Console shows errors
- Preview panel remains white/empty
- No JavaScript console messages

## 🔍 Possible Issues & Solutions

### Issue 1: Iframe Security
**Problem:** Browser blocks iframe content due to security policies.

**Test:** Try `CodeEditor.simpleTest()` in console.

**Solution:** If this works, the issue is with the complex HTML structure.

### Issue 2: Timing Issue
**Problem:** Code runs before iframe is ready.

**Test:** Wait 2 seconds, then click **"▶️ Run"** button.

**Solution:** Already added `onload` event listener.

### Issue 3: Sandbox Restrictions
**Problem:** Iframe sandbox blocks JavaScript execution.

**Current sandbox:** `allow-scripts allow-same-origin`

**Test:** Try removing sandbox temporarily.

### Issue 4: Content Security Policy
**Problem:** Browser CSP blocks inline scripts.

**Test:** Check browser console for CSP errors.

## 🛠️ Quick Fixes to Try

### Fix 1: Remove Sandbox Temporarily
```javascript
// In console:
const iframe = document.getElementById('codePreview');
iframe.removeAttribute('sandbox');
CodeEditor.runCode();
```

### Fix 2: Use Different Method
```javascript
// In console:
const iframe = document.getElementById('codePreview');
iframe.src = 'data:text/html,<h1>Test</h1>';
```

### Fix 3: Check Browser Compatibility
- **Chrome/Edge:** Should work
- **Firefox:** May have different iframe behavior
- **Safari:** May block srcdoc

## 📊 Debug Information Needed

Please run these commands in console and share the results:

```javascript
// 1. Check iframe element
console.log('Iframe:', document.getElementById('codePreview'));

// 2. Check iframe properties
const iframe = document.getElementById('codePreview');
console.log('src:', iframe.src);
console.log('srcdoc:', iframe.srcdoc);
console.log('sandbox:', iframe.sandbox);

// 3. Test simple content
iframe.srcdoc = '<h1>Test</h1>';

// 4. Check for errors
CodeEditor.runCode();
```

## 🎯 Expected Working Behavior

1. **Open code editor** → Iframe loads
2. **Click "Test"** → Sample code loads in panels
3. **Click "Run"** → Preview shows:
   - Blue "Hello World!" heading
   - Green paragraph text
   - Light gray background
4. **Console shows** → "JavaScript is working!" message

## 🚀 Next Steps

1. **Run the debug commands** above
2. **Share console output** (any errors or messages)
3. **Test on different browser** (Chrome vs Firefox)
4. **Check if simple test works** (`CodeEditor.simpleTest()`)

Once we identify the specific issue, I can provide a targeted fix!

---

**Test URL:** http://localhost:8000/index.html  
**Debug Commands:** Copy/paste the JavaScript commands above into browser console
