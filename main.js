// ==================== STATE MANAGEMENT ====================
const state = {
    currentSection: null,
    allQuestions: {},
    revisionQuestions: [],
    currentQuestionIndex: 0,
    wrongAnswers: [],
    isAnswerShown: false,
    revisionMode: 'section', // 'section' or 'global'
};

// ==================== LOADING SCREEN ====================
async function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Set aria-busy on body
    document.body.setAttribute('aria-busy', 'true');
    
    const startTime = performance.now();
    const duration = 3000; // 3 seconds
    let dataLoaded = false;
    
    // Load data in parallel with animation
    loadAllSections().then(() => {
        dataLoaded = true;
    });
    
    function updateProgress(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        const roundedProgress = Math.round(progress);
        
        // Update progress bar
        progressFill.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', roundedProgress);
        progressText.textContent = `${roundedProgress}%`;
        
        if (progress < 100 || !dataLoaded) {
            requestAnimationFrame(updateProgress);
        } else {
            // Loading complete - fade out
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                document.body.removeAttribute('aria-busy');
                
                // Remove loading screen from DOM after fade completes
                setTimeout(() => {
                    loadingScreen.remove();
                }, 300);
            }, 250);
        }
    }
    
    requestAnimationFrame(updateProgress);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initLoadingScreen();
});

// ==================== THEME MANAGEMENT ====================
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('evermind-theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('evermind-theme') || 'light';
    setTheme(savedTheme);
}

// ==================== DATA LOADING ====================
const sections = [
    { id: 'languages', name: 'Languages', icon: '🌍' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'bible', name: 'Bible', icon: '📖' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'history', name: 'History', icon: '🏛️' },
    { id: 'facts', name: 'Random Facts', icon: '💡' },
    { id: 'country_flags', name: 'Country Flags', icon: '🚩' },
];

async function loadAllSections() {
    for (const section of sections) {
        try {
            const response = await fetch(`data/${section.id}.json`);
            if (response.ok) {
                state.allQuestions[section.id] = await response.json();
                console.log(`✅ Loaded ${section.id}: ${state.allQuestions[section.id].length} questions`);
            } else {
                state.allQuestions[section.id] = [];
                console.warn(`⚠️ Could not load ${section.id}.json - Status: ${response.status}`);
            }
        } catch (error) {
            state.allQuestions[section.id] = [];
            console.error(`❌ Error loading ${section.id}:`, error);
        }
    }
    console.log('📊 All sections loaded:', state.allQuestions);
}

async function loadSectionData(sectionId) {
    if (!state.allQuestions[sectionId]) {
        try {
            const response = await fetch(`data/${sectionId}.json`);
            state.allQuestions[sectionId] = await response.json();
        } catch (error) {
            console.error(`Error loading ${sectionId}:`, error);
            state.allQuestions[sectionId] = [];
        }
    }
    return state.allQuestions[sectionId];
}

// ==================== NAVIGATION ====================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function backToHome() {
    showPage('homepage');
    state.currentSection = null;
}

function exitRevision() {
    if (state.revisionMode === 'section') {
        openSection(state.currentSection);
    } else {
        backToHome();
    }
    resetRevision();
}

// ==================== SECTION VIEW ====================
async function openSection(sectionId) {
    state.currentSection = sectionId;
    const section = sections.find(s => s.id === sectionId);
    
    document.getElementById('sectionTitle').textContent = `${section.icon} ${section.name}`;
    
    const questions = await loadSectionData(sectionId);
    console.log(`🔍 Opening ${sectionId} section with ${questions ? questions.length : 0} questions`);
    displayQuestions(questions);
    
    showPage('sectionView');
}

function displayQuestions(questions) {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    
    console.log(`📝 Displaying ${questions ? questions.length : 0} questions`);
    
    if (!questions || questions.length === 0) {
        questionsList.innerHTML = '<p style="text-align: center; padding: 40px; font-size: 1.2rem;">No questions found in this section.</p>';
        return;
    }
    
    questions.forEach((q, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.onclick = () => toggleAnswer(index);
        
        let content = `<h3>Q${index + 1}: ${escapeHtml(q.question)}</h3>`;
        
        // Add speaker button for language questions
        if (state.currentSection === 'languages' && q.language && q.word) {
            const speakerBtn = AudioPlayer.addSpeakerButton(questionItem, q.word, q.language);
            questionItem.querySelector('h3').appendChild(speakerBtn);
        }
        
        // Add code editor button for programming questions
        if (state.currentSection === 'programming') {
            const codeBtn = CodeEditor.addCodeButton(questionItem);
            if (!questionItem.querySelector('h3').querySelector('.code-editor-btn')) {
                questionItem.querySelector('h3').appendChild(codeBtn);
            }
        }
        
        if (q.image) {
            content = `<h3>Q${index + 1}: ${escapeHtml(q.question)}</h3>`;
            content += `<img src="${q.image}" alt="Question image" class="question-image">`;
        }
        
        content += `<div class="answer">`;
        
        if (q.answer) {
            // Check if answer contains code (multiple lines with special characters)
            if (q.answer.includes('\n') && (q.answer.includes('{') || q.answer.includes('<') || q.answer.includes('def ') || q.answer.includes('function'))) {
                content += `<pre><code>${escapeHtml(q.answer)}</code></pre>`;
            } else {
                content += `<strong>Answer:</strong><br>${escapeHtml(q.answer)}`;
            }
        }
        
        if (q.audio) {
            content += `<br><audio controls src="${q.audio}"></audio>`;
        }
        
        content += `</div>`;
        
        questionItem.innerHTML = content;
        
        // Re-add buttons after innerHTML is set
        const h3 = questionItem.querySelector('h3');
        
        if (state.currentSection === 'languages' && q.language && q.word) {
            const speakerBtn = AudioPlayer.addSpeakerButton(questionItem, q.word, q.language);
            h3.appendChild(speakerBtn);
        }
        
        if (state.currentSection === 'programming') {
            const codeBtn = CodeEditor.addCodeButton(questionItem);
            h3.appendChild(codeBtn);
        }
        
        questionsList.appendChild(questionItem);
    });
}

function toggleAnswer(index) {
    const items = document.querySelectorAll('.question-item');
    items[index].classList.toggle('revealed');
}

// ==================== REVISION MODE ====================
function startSectionRevision() {
    if (!state.currentSection) return;
    
    state.revisionMode = 'section';
    state.revisionQuestions = [...state.allQuestions[state.currentSection]];
    shuffleArray(state.revisionQuestions);
    state.currentQuestionIndex = 0;
    state.wrongAnswers = [];
    
    startRevision();
}

function startGlobalRevision() {
    const checkboxes = document.querySelectorAll('#sectionCheckboxes input[type="checkbox"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one section for revision!');
        return;
    }
    
    state.revisionMode = 'global';
    state.revisionQuestions = [];
    
    checkboxes.forEach(checkbox => {
        const sectionId = checkbox.value;
        if (state.allQuestions[sectionId]) {
            state.revisionQuestions.push(...state.allQuestions[sectionId]);
        }
    });
    
    shuffleArray(state.revisionQuestions);
    state.currentQuestionIndex = 0;
    state.wrongAnswers = [];
    
    startRevision();
}

function startRevision() {
    showPage('revisionMode');
    displayCurrentQuestion();
    updateProgress();
}

function displayCurrentQuestion() {
    if (state.revisionQuestions.length === 0) {
        showCompletionMessage();
        return;
    }
    
    const question = state.revisionQuestions[0];
    const questionContent = document.getElementById('questionContent');
    const answerContent = document.getElementById('answerContent');
    
    // Display question
    let questionHtml = escapeHtml(question.question);
    
    // Add speaker button for language questions in revision mode
    if (question.language && question.word) {
        questionHtml += ` <button class="speaker-btn" onclick="AudioPlayer.playAudio('${escapeHtml(question.word)}', '${escapeHtml(question.language)}')" title="Play pronunciation">🔊</button>`;
    }
    
    if (question.image) {
        questionHtml += `<br><img src="${question.image}" alt="Question" class="question-image">`;
    }
    
    questionContent.innerHTML = questionHtml;
    
    // Prepare answer
    let answerHtml = '';
    
    if (question.answer) {
        if (question.answer.includes('\n') && (question.answer.includes('{') || question.answer.includes('<') || question.answer.includes('def ') || question.answer.includes('function'))) {
            answerHtml = `<pre><code>${escapeHtml(question.answer)}</code></pre>`;
        } else {
            answerHtml = escapeHtml(question.answer);
        }
    }
    
    // Add code editor button for programming questions in revision mode
    if (question.answer && (question.answer.includes('{') || question.answer.includes('<') || question.answer.includes('function'))) {
        answerHtml += `<br><button class="code-editor-btn" onclick="CodeEditor.openEditor(\`${escapeHtml(question.answer).replace(/`/g, '\\`')}\`)">💻 Try This Code</button>`;
    }
    
    if (question.audio) {
        answerHtml += `<br><audio controls src="${question.audio}"></audio>`;
    }
    
    answerContent.innerHTML = answerHtml;
    
    // Reset UI
    answerContent.style.display = 'none';
    document.getElementById('showAnswerBtn').style.display = 'inline-block';
    document.getElementById('answerControls').style.display = 'none';
    state.isAnswerShown = false;
}

function showAnswer() {
    document.getElementById('answerContent').style.display = 'block';
    document.getElementById('showAnswerBtn').style.display = 'none';
    document.getElementById('answerControls').style.display = 'flex';
    state.isAnswerShown = true;
}

function markCorrect() {
    // Remove the question from the list (correct answer)
    state.revisionQuestions.shift();
    state.currentQuestionIndex = 0;
    
    updateProgress();
    displayCurrentQuestion();
}

function markWrong() {
    // Move question to wrongAnswers queue
    const question = state.revisionQuestions.shift();
    state.wrongAnswers.push(question);
    
    // If we have 5 or more wrong answers, add the oldest one back to the queue
    if (state.wrongAnswers.length >= 5) {
        const oldQuestion = state.wrongAnswers.shift();
        state.revisionQuestions.push(oldQuestion);
    }
    
    state.currentQuestionIndex = 0;
    
    updateProgress();
    displayCurrentQuestion();
}

function skipQuestion() {
    // Move current question to end of queue
    const question = state.revisionQuestions.shift();
    state.revisionQuestions.push(question);
    
    state.currentQuestionIndex = 0;
    
    displayCurrentQuestion();
}

function updateProgress() {
    const totalQuestions = state.revisionQuestions.length + state.wrongAnswers.length;
    const questionsLeft = state.revisionQuestions.length;
    
    document.getElementById('questionsLeft').textContent = questionsLeft;
    document.getElementById('totalQuestions').textContent = totalQuestions;
}

function showCompletionMessage() {
    const questionCard = document.getElementById('questionCard');
    questionCard.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="font-size: 3rem; margin-bottom: 20px;">🎉 Congratulations!</h2>
            <p style="font-size: 1.5rem;">You've completed all questions in this revision session!</p>
        </div>
    `;
    
    document.getElementById('answerControls').style.display = 'none';
    document.getElementById('showAnswerBtn').style.display = 'none';
    
    // Optionally auto-exit after a few seconds
    setTimeout(() => {
        exitRevision();
    }, 3000);
}

function resetRevision() {
    state.revisionQuestions = [];
    state.wrongAnswers = [];
    state.currentQuestionIndex = 0;
    state.isAnswerShown = false;
}

// ==================== UTILITY FUNCTIONS ====================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    const currentPage = document.querySelector('.page.active');
    
    if (currentPage && currentPage.id === 'revisionMode') {
        if (e.key === ' ' && !state.isAnswerShown) {
            e.preventDefault();
            showAnswer();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
            e.preventDefault();
            if (state.isAnswerShown) {
                markCorrect();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (state.isAnswerShown) {
                markWrong();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            skipQuestion();
        }
    }
});

// ==================== EXPORT FUNCTIONS TO GLOBAL SCOPE ====================
window.setTheme = setTheme;
window.openSection = openSection;
window.backToHome = backToHome;
window.startSectionRevision = startSectionRevision;
window.startGlobalRevision = startGlobalRevision;
window.exitRevision = exitRevision;
window.showAnswer = showAnswer;
window.markCorrect = markCorrect;
window.markWrong = markWrong;
window.skipQuestion = skipQuestion;

