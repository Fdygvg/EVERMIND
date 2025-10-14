# Add Timer Mode Feature to Revision

## Feature Overview
Add a timer mode that automatically skips questions after a user-selected time limit, marking them as wrong if not answered.

## Requirements

### Timer Mode Button
- **Location**: Top of revision screen (near correct/wrong/remaining counters)
- **States**:
  - **Disabled (Blue)**: Timer mode is OFF
  - **Enabled (Red)**: Timer mode is ON
- **Functionality**: Click to toggle timer mode on/off

### Timer Configuration
- **Trigger**: Click timer mode button when disabled
- **UI**: Show scroll dropdown with values 1-60 (seconds)
- **Action**: User selects time (1-60 sec) and clicks "Start" button
- **Result**: Timer mode activates, button turns red

### Timer Behavior
- **Auto-skip**: When timer reaches selected time (e.g., 30 sec), automatically:
  1. Mark question as wrong
  2. Move to next question
  3. Restart timer for new question
- **Manual actions**: If user marks correct/wrong before timer expires:
  1. Stop current timer
  2. Move to next question
  3. Restart timer for new question
- **Visual indicator**: Show countdown timer on screen

### Stopping Timer Mode
- **Action**: Click red timer mode button
- **Result**: 
  1. Timer mode deactivates
  2. Button turns blue
  3. Timer resets
  4. Normal revision continues

## Implementation Plan

### Step 1: Add Timer Mode Button (index.html)

**Location**: Revision mode header, next to stats
```html
<div class="timer-mode-container">
    <button id="timerModeBtn" class="timer-mode-btn disabled" onclick="toggleTimerMode()">
        <span class="timer-icon">⏱️</span>
        <span class="timer-text">Timer Mode</span>
    </button>
</div>
```

### Step 2: Add Timer Configuration Modal (index.html)

```html
<div id="timerConfigModal" class="modal" style="display: none;">
    <div class="modal-content">
        <h3>Set Timer Duration</h3>
        <label for="timerDuration">Time per question (seconds):</label>
        <select id="timerDuration">
            <!-- Options 1-60 -->
        </select>
        <button onclick="startTimerMode()">Start Timer Mode</button>
        <button onclick="closeTimerConfig()">Cancel</button>
    </div>
</div>
```

### Step 3: Add Timer Display (index.html)

**Location**: Inside question card
```html
<div id="timerDisplay" class="timer-display" style="display: none;">
    <span class="timer-countdown">30</span>
    <span class="timer-label">seconds left</span>
</div>
```

### Step 4: Add CSS Styling (style.css)

```css
/* Timer Mode Button */
.timer-mode-btn {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.timer-mode-btn.disabled {
    background: #3B82F6; /* Blue */
    color: white;
}

.timer-mode-btn.enabled {
    background: #EF4444; /* Red */
    color: white;
}

/* Timer Display */
.timer-display {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(239, 68, 68, 0.9);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    animation: timerPulse 1s ease-in-out infinite;
}

@keyframes timerPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

/* Timer Config Modal */
#timerConfigModal select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    margin: 10px 0;
}
```

### Step 5: Add JavaScript Logic (main.js)

**State Variables:**
```javascript
state.timerMode = {
    enabled: false,
    duration: 30, // default 30 seconds
    currentTimer: null,
    timeLeft: 0
};
```

**Functions to Add:**

1. **toggleTimerMode()** - Toggle timer mode on/off
```javascript
function toggleTimerMode() {
    if (state.timerMode.enabled) {
        // Disable timer mode
        disableTimerMode();
    } else {
        // Show config modal
        showTimerConfig();
    }
}
```

2. **showTimerConfig()** - Show timer configuration modal
```javascript
function showTimerConfig() {
    const modal = document.getElementById('timerConfigModal');
    const select = document.getElementById('timerDuration');
    
    // Populate select with 1-60
    select.innerHTML = '';
    for (let i = 1; i <= 60; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} second${i > 1 ? 's' : ''}`;
        if (i === state.timerMode.duration) option.selected = true;
        select.appendChild(option);
    }
    
    modal.style.display = 'flex';
}
```

3. **startTimerMode()** - Start timer mode
```javascript
function startTimerMode() {
    const duration = parseInt(document.getElementById('timerDuration').value);
    state.timerMode.duration = duration;
    state.timerMode.enabled = true;
    
    // Update button appearance
    const btn = document.getElementById('timerModeBtn');
    btn.classList.remove('disabled');
    btn.classList.add('enabled');
    
    // Close modal
    closeTimerConfig();
    
    // Start timer for current question
    startQuestionTimer();
}
```

4. **startQuestionTimer()** - Start countdown for current question
```javascript
function startQuestionTimer() {
    if (!state.timerMode.enabled) return;
    
    // Clear any existing timer
    if (state.timerMode.currentTimer) {
        clearInterval(state.timerMode.currentTimer);
    }
    
    state.timerMode.timeLeft = state.timerMode.duration;
    
    // Show timer display
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.style.display = 'flex';
    updateTimerDisplay();
    
    // Start countdown
    state.timerMode.currentTimer = setInterval(() => {
        state.timerMode.timeLeft--;
        updateTimerDisplay();
        
        if (state.timerMode.timeLeft <= 0) {
            // Time's up - auto mark as wrong
            clearInterval(state.timerMode.currentTimer);
            autoMarkWrong();
        }
    }, 1000);
}
```

5. **updateTimerDisplay()** - Update countdown display
```javascript
function updateTimerDisplay() {
    const countdown = document.querySelector('.timer-countdown');
    if (countdown) {
        countdown.textContent = state.timerMode.timeLeft;
        
        // Change color based on time left
        const display = document.getElementById('timerDisplay');
        if (state.timerMode.timeLeft <= 5) {
            display.style.background = 'rgba(239, 68, 68, 1)'; // Bright red
        } else if (state.timerMode.timeLeft <= 10) {
            display.style.background = 'rgba(251, 146, 60, 0.9)'; // Orange
        } else {
            display.style.background = 'rgba(239, 68, 68, 0.9)'; // Normal red
        }
    }
}
```

6. **autoMarkWrong()** - Auto mark question as wrong when time expires
```javascript
function autoMarkWrong() {
    // Same logic as marking wrong manually
    markWrong();
}
```

7. **disableTimerMode()** - Turn off timer mode
```javascript
function disableTimerMode() {
    state.timerMode.enabled = false;
    
    // Stop current timer
    if (state.timerMode.currentTimer) {
        clearInterval(state.timerMode.currentTimer);
        state.timerMode.currentTimer = null;
    }
    
    // Update button appearance
    const btn = document.getElementById('timerModeBtn');
    btn.classList.remove('enabled');
    btn.classList.add('disabled');
    
    // Hide timer display
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.style.display = 'none';
}
```

8. **Modify markCorrect() and markWrong()** - Restart timer after marking
```javascript
// Add to both functions:
if (state.timerMode.enabled) {
    clearInterval(state.timerMode.currentTimer);
    // Timer will restart in displayCurrentQuestion()
}
```

9. **Modify displayCurrentQuestion()** - Start timer for new question
```javascript
// Add at the end of displayCurrentQuestion():
if (state.timerMode.enabled) {
    setTimeout(() => startQuestionTimer(), 200);
}
```

### Step 6: Integrate with Existing Code

**Files to modify:**
1. `index.html` - Add timer button, config modal, timer display
2. `style.css` - Add timer styling
3. `main.js` - Add timer logic and integrate with existing functions

## Testing Checklist

After implementation:
1. ✅ Timer mode button shows in revision mode
2. ✅ Button is blue when disabled
3. ✅ Clicking button shows dropdown with 1-60 seconds
4. ✅ Selecting time and clicking Start activates timer mode
5. ✅ Button turns red when enabled
6. ✅ Timer countdown displays for each question
7. ✅ Timer auto-skips and marks wrong when time expires
8. ✅ Timer resets when user manually marks correct/wrong
9. ✅ Timer restarts for next question
10. ✅ Clicking red button disables timer mode
11. ✅ Button turns blue when disabled
12. ✅ Timer persists across questions until manually disabled

## Visual Design

**Timer Mode Disabled (Blue):**
```
┌─────────────────┐
│ ⏱️ Timer Mode  │ (Blue background)
└─────────────────┘
```

**Timer Mode Enabled (Red):**
```
┌─────────────────┐
│ ⏱️ Timer Mode  │ (Red background)
└─────────────────┘

Question card with:
┌──────────────┐
│   30         │ (Countdown in top right)
│ seconds left │
└──────────────┘
```

**Config Modal:**
```
┌─────────────────────────────┐
│  Set Timer Duration         │
│                             │
│  Time per question:         │
│  [30 seconds ▼]            │
│                             │
│  [Start] [Cancel]          │
└─────────────────────────────┘
```

