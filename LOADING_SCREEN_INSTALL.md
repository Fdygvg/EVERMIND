#  LOADING SCREEN INSTALLATION GUIDE

## Step 1: Update index.html

Open index.html and find this line (line 9):
`
<body>
`

Right after <body>, add this loading screen code:
`html
<!-- Loading Screen -->
<div id="loadingScreen" class="loading-screen active">
    <div class="loading-content">
        <div class="loading-logo"></div>
        <h1 class="loading-title">EVERMIND V.3</h1>
        <p class="loading-subtitle">Loading your personal learning system...</p>
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
        <div class="loading-progress">
            <div class="progress-bar"></div>
        </div>
    </div>
</div>

`

Then find this line (line 11):
`
<div id="homepage" class="page active">
`

Change it to (remove "active"):
`
<div id="homepage" class="page">
`

---

## Step 2: Update style.css

Open style.css and add this at the END of the file:

`css
/* ==================== LOADING SCREEN (DARK THEME) ==================== */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease-out;
}

.loading-screen.active {
    opacity: 1;
}

.loading-screen.fade-out {
    opacity: 0;
    pointer-events: none;
}

.loading-content {
    text-align: center;
    color: #e0e0e0;
}

.loading-logo {
    font-size: 5rem;
    margin-bottom: 25px;
    animation: pulse 2s infinite;
    filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.5));
}

.loading-title {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.loading-subtitle {
    font-size: 1.1rem;
    margin-bottom: 45px;
    opacity: 0.7;
    color: #b0b0b0;
}

.loading-spinner {
    margin-bottom: 35px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(102, 126, 234, 0.2);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

.loading-progress {
    width: 250px;
    height: 3px;
    background: rgba(102, 126, 234, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    animation: progress 2s ease-in-out;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.08); opacity: 0.9; }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
}
`

---

## Step 3: Update main.js

Open main.js and find this section (around line 15):
`javascript
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadAllSections();
});
`

Replace it with:
`javascript
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    showLoadingScreen();
    loadAllSections();
    
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});
`

Then add these two functions right AFTER the loadTheme() function (around line 24):

`javascript
// ==================== LOADING SCREEN ====================
function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('active');
    const homepage = document.getElementById('homepage');
    if (homepage) homepage.classList.remove('active');
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.getElementById('homepage').classList.add('active');
    }, 500);
}
`

---

##  Done!

Save all three files and refresh your browser (Ctrl+F5)

You'll now see a beautiful dark loading screen with:
- Pulsing brain icon 
- Gradient purple title
- Spinning loader
- Smooth progress bar
- 2-second duration
- Fade-out transition

The colors are dark and sophisticated (black/dark blue gradient with purple accents)!
