// ==================== STATE MANAGEMENT ====================
const state = {
    currentSection: null,
    allQuestions: {},
    revisionQuestions: [],
    currentQuestionIndex: 0,
    isAnswerShown: false,
    revisionMode: 'section', // 'section' or 'global'
    tagFilter: null, // For programming section tag filtering
    // Enhanced progress tracking
    correctCount: 0,
    wrongCount: 0,
    totalQuestions: 0,
    // Timer for all revision modes
    revisionStartTime: null,
    revisionEndTime: null,
    revisionTimerInterval: null,
    // Auto-save for global revision
    autoSaveInterval: null,
    // Bookmark system
    bookmarks: [],
    currentQuestionId: null
};

// ==================== ENHANCED LOADING SCREEN ====================
async function initLoadingScreen() {
    console.log('🚀 Starting loading screen initialization...');
    
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const loadingStatus = document.getElementById('loadingStatus');
    const factText = document.getElementById('factText');
    
    // Debug: Check if elements exist
    console.log('📋 Element check:', {
        loadingScreen: !!loadingScreen,
        progressBar: !!progressBar,
        progressFill: !!progressFill,
        progressText: !!progressText,
        loadingStatus: !!loadingStatus,
        factText: !!factText
    });
    
    if (!loadingScreen || !progressBar || !progressFill || !progressText) {
        console.error('❌ Missing loading screen elements!');
        return;
    }
    
    // Set aria-busy on body
    document.body.setAttribute('aria-busy', 'true');
    
    const startTime = performance.now();
    const duration = 3000; // 3 seconds
    let dataLoaded = false;
    
    // Did You Know Facts
    const facts = [
        "The human brain contains approximately 86 billion neurons!",
        "Learning a new language can increase your brain's gray matter density.",
        "The brain uses about 20% of your body's total energy, even though it's only 2% of your weight.",
        "Memory consolidation happens during sleep - that's why good sleep helps learning!",
        "The brain can process information as fast as 120 meters per second.",
        "Practice makes perfect - repetition strengthens neural pathways in your brain.",
        "Multitasking actually reduces productivity by up to 40% according to research.",
        "The brain is more creative when you're slightly tired - that's why 'aha!' moments often come at night.",
        "Learning new skills creates new neural pathways and can help prevent cognitive decline.",
        "The brain's hippocampus is crucial for forming new memories and learning.",
        "Spaced repetition is scientifically proven to be more effective than cramming.",
        "Your brain processes visual information 60,000 times faster than text.",
        "Learning music can improve mathematical abilities and spatial reasoning.",
        "The brain releases dopamine when you learn something new - that's the 'learning high'!",
        "Regular exercise increases brain-derived neurotrophic factor (BDNF), which helps learning."
    ];
    
    // Loading status messages
    const statusMessages = [
        'Learn 📚',
        'Evolve 🚀',
        'Grow 🌱',
        'Almost ready...',
        'Welcome to EVERMIND!'
    ];
    
    // Load data in parallel with animation
    const loadingPromise = loadAllSections().then(() => {
        dataLoaded = true;
        console.log('✅ Data loading complete');
    }).catch(error => {
        console.error('❌ Error loading data:', error);
        dataLoaded = true; // Continue anyway
    });
    
    // Fallback timeout to ensure loading completes even if API hangs
    const fallbackTimeout = setTimeout(() => {
        if (!dataLoaded) {
            console.warn('⚠️ Loading timeout reached, forcing completion');
            dataLoaded = true;
        }
    }, 5000); // 5 second fallback timeout
    
    // Clear timeout when loading completes
    loadingPromise.finally(() => {
        clearTimeout(fallbackTimeout);
    });
    
    // Show one random fact at a time during loading
    let factIndex = Math.floor(Math.random() * facts.length);
    if (factText && facts.length > 0) {
        factText.textContent = facts[factIndex];
        console.log(`💡 Showing random fact: ${facts[factIndex]}`);
    } else {
        console.warn('⚠️ factText element not found or facts array empty');
    }
    
    function updateProgress(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        const roundedProgress = Math.round(progress);
        
        // Update progress bar with smooth animation
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', roundedProgress);
        }
        if (progressText) {
            progressText.textContent = `${roundedProgress}%`;
        }
        
        // Update loading status
        if (loadingStatus) {
            const statusIndex = Math.floor((progress / 100) * statusMessages.length);
            if (statusIndex < statusMessages.length) {
                loadingStatus.textContent = statusMessages[statusIndex];
            }
        }
        
        console.log(`📊 Progress: ${roundedProgress}% (${Math.round(elapsed)}ms elapsed)`);
        
        if (progress < 100 || !dataLoaded) {
            requestAnimationFrame(updateProgress);
        } else {
            // Loading complete - play completion sound
            console.log('🎉 Loading complete!');
            
            // Play completion sound if available
            if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
                window.SoundEffects.playSound('complete');
            }
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                document.body.removeAttribute('aria-busy');
                
                // Remove loading screen from DOM after fade completes
                setTimeout(() => {
                    loadingScreen.remove();
                    console.log('🚀 Loading screen removed, app ready!');
                    
                    // Load homepage sections immediately after loading screen is removed
                    loadHomepageWithArchive();
                }, 500);
            }, 300);
        }
    }
    
    console.log('🎬 Starting progress animation...');
    
    // Add secret vision trigger to loading screen
    addSecretVisionTrigger();
    
    requestAnimationFrame(updateProgress);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
    
    // Small delay to ensure SoundEffects is loaded
    setTimeout(() => {
    loadTheme();
        console.log('🎨 Theme loaded');
        
        // Check if chess board component is loaded
        console.log('♟️ ChessBoard loaded:', !!window.ChessBoard);
        console.log('♟️ ChessBoard methods:', window.ChessBoard ? Object.keys(window.ChessBoard) : 'Not loaded');
        
        // Initialize global search after data is loaded
        setTimeout(() => {
            initGlobalSearch();
            loadBookmarks(); // Initialize bookmark system
            registerServiceWorker(); // Register PWA service worker
            initBookmarkButton(); // Initialize bookmark button event listener
            initQuickLaunch(); // Initialize Quick Launch sidebar
            
            // Check for saved global revision on page load
            setTimeout(() => {
                // Only show resume prompt if there's no continue button functionality
                // The continue button replaces the resume prompt
                const globalState = loadGlobalRevisionState();
                const sectionState = loadSectionRevisionState();
                const bookmarkState = loadBookmarkRevisionState();
                
                // If there's saved progress, don't show resume prompt - let continue button handle it
                if (!globalState && !sectionState && !bookmarkState) {
                    // No saved progress, so no need to show resume prompt
                } else {
                    // There is saved progress, but we'll handle it with continue button instead
                    console.log('📋 Saved progress detected - using continue button instead of resume prompt');
                }
            }, 500);
            
            // Check for saved progress after all initialization is complete
            setTimeout(() => {
                // Clear any existing resume prompt first
                const existingPrompt = document.getElementById('resumePrompt');
                if (existingPrompt) {
                    existingPrompt.remove();
                    console.log('🧹 Removed existing resume prompt');
                }
                
                checkSavedProgress();
                initAnimatedWords();
            }, 2000);
        }, 1000);
        
        // Small delay to ensure all elements are rendered
        setTimeout(() => {
            initLoadingScreen();
        }, 100);
    }, 200);
});

// ==================== PWA SERVICE WORKER ====================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('✅ Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content is available, show update notification
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.error('❌ Service Worker registration failed:', error);
                });
        });
    } else {
        console.log('❌ Service Worker not supported');
    }
}

function showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <div class="update-icon">🔄</div>
            <div class="update-text">
                <div class="update-title">Update Available</div>
                <div class="update-desc">New version of EVERMIND is ready!</div>
            </div>
            <button class="update-btn" onclick="updateApp()">Update</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 10000);
}

function updateApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });
    }
}

function initBookmarkButton() {
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', toggleBookmark);
        console.log('✅ Bookmark button event listener added');
    } else {
        console.warn('⚠️ Bookmark button not found');
    }
}

function toggleBookmarkForSection(section, index) {
    const questionId = generateQuestionId(section, index);
    const bookmarkIndex = state.bookmarks.findIndex(b => b.id === questionId);
    
    if (bookmarkIndex >= 0) {
        // Remove bookmark
        state.bookmarks.splice(bookmarkIndex, 1);
        console.log('📌 Bookmark removed:', questionId);
    } else {
        // Add bookmark
        state.bookmarks.push({
            id: questionId,
            section: section,
            index: index,
            timestamp: Date.now()
        });
        console.log('⭐ Bookmark added:', questionId);
    }
    
    saveBookmarks();
    updateBookmarkCounts();
    updateSectionBookmarkButtons(section);
    
    // Play sound effect
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
}

function updateSectionBookmarkButtons(section) {
    const questionsList = document.getElementById('questionsList');
    if (!questionsList) return;
    
    const bookmarkButtons = questionsList.querySelectorAll('.bookmark-btn-section');
    bookmarkButtons.forEach((btn, index) => {
        const questionId = generateQuestionId(section, index);
        const isBookmarked = state.bookmarks.some(b => b.id === questionId);
        
        btn.innerHTML = isBookmarked ? '★' : '⭐';
        btn.classList.toggle('bookmarked', isBookmarked);
    });
}

function displayBookmarkedQuestions() {
    console.log('📌 Displaying bookmarked questions...');
    
    if (state.bookmarks.length === 0) {
        const questionsList = document.getElementById('questionsList');
        questionsList.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3>No bookmarked questions yet!</h3>
                <p>Click the ⭐ star on any question to bookmark it for later review.</p>
            </div>
        `;
        return;
    }
    
    // Create bookmarked questions array
    const bookmarkedQuestions = [];
    state.bookmarks.forEach(bookmark => {
        const sectionQuestions = state.allQuestions[bookmark.section];
        if (sectionQuestions && sectionQuestions[bookmark.index]) {
            bookmarkedQuestions.push({
                ...sectionQuestions[bookmark.index],
                section: bookmark.section,
                originalIndex: bookmark.index,
                bookmarkId: bookmark.id
            });
        }
    });
    
    if (bookmarkedQuestions.length === 0) {
        const questionsList = document.getElementById('questionsList');
        questionsList.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3>Bookmarked questions not found</h3>
                <p>They may have been removed from the data.</p>
            </div>
        `;
        return;
    }
    
    // Display bookmarked questions like regular section
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    
    bookmarkedQuestions.forEach((q, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.onclick = () => toggleAnswer(index);
        
        let content = `<h3>Q${index + 1}: ${escapeHtml(q.question)}</h3>`;
        const sectionInfo = getSectionInfo(q.section);
        content += `<div class="bookmark-section-info">From: ${sectionInfo.name}</div>`;
        
        if (q.image) {
            content += `<img src="${q.image}" alt="Question image" class="question-image">`;
        }
        
        content += `<div class="answer">`;
        
        if (q.answer) {
            if (q.answer.includes('\n') && (q.answer.includes('{') || q.answer.includes('<') || q.answer.includes('def ') || q.answer.includes('function'))) {
                content += `<pre><code>${escapeHtml(q.answer)}</code></pre>`;
            } else {
                content += `<strong>Answer:</strong><br>${escapeHtml(q.answer)}`;
            }
        }
        
        content += `</div>`;
        
        questionItem.innerHTML = content;
        
        // Add remove bookmark button
        const h3 = questionItem.querySelector('h3');
        const removeBookmarkBtn = document.createElement('button');
        removeBookmarkBtn.className = 'bookmark-btn-section';
        removeBookmarkBtn.innerHTML = '★';
        removeBookmarkBtn.title = 'Remove bookmark';
        removeBookmarkBtn.onclick = (e) => {
            e.stopPropagation();
            toggleBookmarkForSection(q.section, q.originalIndex);
            // Refresh the display
            displayBookmarkedQuestions();
        };
        h3.appendChild(removeBookmarkBtn);
        
        questionsList.appendChild(questionItem);
    });
    
    console.log(`📌 Displayed ${bookmarkedQuestions.length} bookmarked questions`);
}

function startBookmarkedRevision() {
    console.log('📌 Starting bookmarked revision...');
    
    if (state.bookmarks.length === 0) {
        alert('No bookmarked questions to revise!');
        return;
    }
    
    // Reset revision state completely
    resetRevision();
    
    // Create bookmarked questions array
    const bookmarkedQuestions = [];
    state.bookmarks.forEach(bookmark => {
        const sectionQuestions = state.allQuestions[bookmark.section];
        if (sectionQuestions && sectionQuestions[bookmark.index]) {
            bookmarkedQuestions.push({
                ...sectionQuestions[bookmark.index],
                section: bookmark.section,
                originalIndex: bookmark.index,
                bookmarkId: bookmark.id
            });
        }
    });
    
    if (bookmarkedQuestions.length === 0) {
        alert('Bookmarked questions not found. They may have been removed from the data.');
        return;
    }
    
    // Shuffle the questions for variety
    shuffleArray(bookmarkedQuestions);
    
    // Set up revision mode for bookmarked questions
    state.revisionQuestions = bookmarkedQuestions;
    state.currentQuestionIndex = 0;
    state.revisionMode = 'bookmarked';
    state.currentSection = 'bookmarked';
    state.isAnswerShown = false;
    
    // Initialize progress tracking for bookmarked questions
    state.correctCount = 0;
    state.wrongCount = 0;
    state.totalQuestions = bookmarkedQuestions.length;
    
    // Save initial state to localStorage
    saveRevisionState();
    
    // Start auto-save interval (every 30 seconds)
    state.autoSaveInterval = setInterval(() => {
        saveRevisionState();
    }, 30000);
    
    // Show revision interface
    showPage('revisionMode');
    
    // Update header
    const revisionTitle = document.querySelector('#revisionMode h1');
    if (revisionTitle) {
        revisionTitle.textContent = '📌 Bookmarked Questions';
    }
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        // Show first question
        displayCurrentQuestion();
        updateProgress();
    }, 100);
    
    // Play sound effect
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('next');
    }
    
    console.log('📌 Bookmarked revision started with', bookmarkedQuestions.length, 'questions');
}

// ==================== BOOKMARK SYSTEM ====================
function loadBookmarks() {
    const saved = localStorage.getItem('evermind-bookmarks');
    if (saved) {
        try {
            state.bookmarks = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading bookmarks:', e);
            state.bookmarks = [];
        }
    }
    updateBookmarkCounts();
}

function saveBookmarks() {
    localStorage.setItem('evermind-bookmarks', JSON.stringify(state.bookmarks));
}

function generateQuestionId(section, index) {
    return `${section}-${index}`;
}

function toggleBookmark() {
    // Check if we're in revision mode
    const currentPage = document.querySelector('.page.active');
    if (currentPage && currentPage.id === 'revisionMode') {
        // In revision mode, use the current revision question
        if (!state.revisionQuestions || state.revisionQuestions.length === 0 || state.currentQuestionIndex === null) {
            console.warn('No current revision question to bookmark');
            return;
        }
        
        const currentQuestion = state.revisionQuestions[state.currentQuestionIndex];
        let questionId;
        let section, index;
        
        if (state.revisionMode === 'bookmarked') {
            // For bookmarked questions, use the bookmark ID
            questionId = currentQuestion.bookmarkId || generateQuestionId(currentQuestion.section, currentQuestion.originalIndex);
            section = currentQuestion.section;
            index = currentQuestion.originalIndex;
        } else {
            // For section/global revision, generate ID based on current question
            // IMPORTANT: Use originalIndex (position in JSON) not currentQuestionIndex (position in shuffled array)
            questionId = generateQuestionId(state.currentSection || currentQuestion.section, currentQuestion.originalIndex);
            section = state.currentSection || currentQuestion.section;
            index = currentQuestion.originalIndex;
        }
        
        const bookmarkIndex = state.bookmarks.findIndex(b => b.id === questionId);
        
        if (bookmarkIndex >= 0) {
            // Remove bookmark
            state.bookmarks.splice(bookmarkIndex, 1);
            console.log('📌 Bookmark removed:', questionId);
        } else {
            // Add bookmark
            state.bookmarks.push({
                id: questionId,
                section: section,
                index: index,
                timestamp: Date.now()
            });
            console.log('⭐ Bookmark added:', questionId);
        }
        
        saveBookmarks();
        updateBookmarkButton();
        updateBookmarkCounts();
        
        // Play sound effect
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
        return;
    }
    
    // Original logic for non-revision mode
    if (!state.currentSection || state.currentQuestionIndex === null) {
        console.warn('No current question to bookmark');
        return;
    }
    
    const questionId = generateQuestionId(state.currentSection, state.currentQuestionIndex);
    const bookmarkIndex = state.bookmarks.findIndex(b => b.id === questionId);
    
    if (bookmarkIndex >= 0) {
        // Remove bookmark
        state.bookmarks.splice(bookmarkIndex, 1);
        console.log('📌 Bookmark removed:', questionId);
    } else {
        // Add bookmark
        state.bookmarks.push({
            id: questionId,
            section: state.currentSection,
            index: state.currentQuestionIndex,
            timestamp: Date.now()
        });
        console.log('⭐ Bookmark added:', questionId);
    }
    
    saveBookmarks();
    updateBookmarkButton();
    updateBookmarkCounts();
    
    // Play sound effect
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
}

function updateBookmarkButton() {
    console.log('🔍 Looking for bookmark button...');
    console.log('🔍 Current page:', document.querySelector('.page.active')?.id);
    console.log('🔍 Revision mode visible:', document.getElementById('revisionMode')?.style.display);
    
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    console.log('🔍 Looking for bookmark button:', bookmarkBtn);
    
    if (!bookmarkBtn) {
        console.warn('⚠️ Bookmark button not found in DOM');
        return;
    }
    
    // Always show bookmark button in revision mode
    const currentPage = document.querySelector('.page.active');
    if (currentPage && currentPage.id === 'revisionMode') {
        console.log('📌 Showing bookmark button in revision mode');
        bookmarkBtn.style.display = 'flex';
        
        // Generate question ID based on current revision question
        if (state.revisionQuestions && state.revisionQuestions.length > 0) {
            // Always use the first question in the array (current question being displayed)
            const currentQuestion = state.revisionQuestions[0];
            let questionId;
            
            console.log('📌 Current question:', currentQuestion);
            console.log('📌 Current question index:', state.currentQuestionIndex);
            console.log('📌 Revision mode:', state.revisionMode);
            console.log('📌 Questions remaining:', state.revisionQuestions.length);
            
            if (state.revisionMode === 'bookmarked') {
                // For bookmarked questions, use the bookmark ID
                questionId = currentQuestion.bookmarkId || generateQuestionId(currentQuestion.section, currentQuestion.originalIndex);
            } else {
                // For section/global revision, generate ID based on current question
                // Use the original index from the question data, not the current array index
                const originalIndex = currentQuestion.originalIndex !== undefined ? currentQuestion.originalIndex : state.currentQuestionIndex;
                questionId = generateQuestionId(state.currentSection || currentQuestion.section, originalIndex);
            }
            
            console.log('📌 Generated question ID:', questionId);
            console.log('📌 Question section:', currentQuestion.section);
            console.log('📌 Question originalIndex:', currentQuestion.originalIndex);
            
            const isBookmarked = state.bookmarks.some(b => b.id === questionId);
            console.log('📌 Is bookmarked:', isBookmarked);
            console.log('📌 Current bookmarks:', state.bookmarks);
            console.log('📌 Looking for bookmark with ID:', questionId);
            
            const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
            if (bookmarkIcon) {
                bookmarkIcon.textContent = isBookmarked ? '★' : '⭐';
                bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
                console.log('📌 Updated bookmark icon to:', bookmarkIcon.textContent, 'for question ID:', questionId);
            }
        }
        return;
    }
    
    if (!state.currentSection || state.currentQuestionIndex === null) {
        console.log('📌 Hiding bookmark button - no current question');
        bookmarkBtn.style.display = 'none';
        return;
    }
    
    console.log('📌 Showing bookmark button for section:', state.currentSection, 'index:', state.currentQuestionIndex);
    bookmarkBtn.style.display = 'flex';
    
    const questionId = generateQuestionId(state.currentSection, state.currentQuestionIndex);
    const isBookmarked = state.bookmarks.some(b => b.id === questionId);
    
    console.log('📌 Question ID:', questionId, 'Is bookmarked:', isBookmarked);
    
    const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
    if (bookmarkIcon) {
        bookmarkIcon.textContent = isBookmarked ? '★' : '⭐';
        bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
        console.log('📌 Updated bookmark icon to:', bookmarkIcon.textContent);
    } else {
        console.warn('⚠️ Bookmark icon not found');
    }
}

function updateBookmarkCounts() {
    // Count bookmarks per section
    const counts = {};
    state.bookmarks.forEach(bookmark => {
        counts[bookmark.section] = (counts[bookmark.section] || 0) + 1;
    });
    
    // Update homepage badges
    Object.keys(state.allQuestions).forEach(section => {
        const countElement = document.getElementById(`${section}-bookmarks`);
        if (countElement) {
            const count = counts[section] || 0;
            countElement.textContent = `${count} bookmarked`;
        }
    });
    
    // Update bookmarked section count
    const bookmarkedCountElement = document.getElementById('bookmarked-count');
    if (bookmarkedCountElement) {
        bookmarkedCountElement.textContent = `${state.bookmarks.length} bookmarked`;
    }
}

function openBookmarkedQuestions() {
    console.log('📌 Opening bookmarked questions section...');
    
    if (state.bookmarks.length === 0) {
        alert('No bookmarked questions yet! Click the ⭐ on any question to bookmark it.');
        return;
    }
    
    // Set up section view for bookmarks
    state.currentSection = 'bookmarked';
    const section = { id: 'bookmarked', name: 'Bookmarked Questions', icon: '📌' };
    
    document.getElementById('sectionTitle').textContent = `${section.icon} ${section.name}`;
    showPage('sectionView');
    
    // Update the section actions button to use the correct function
    const sectionActions = document.querySelector('.section-actions');
    if (sectionActions) {
        sectionActions.innerHTML = `
            <button class="btn btn--primary" onclick="startBookmarkedRevision()">Start Revision Mode</button>
        `;
    }
    
    // Display bookmarked questions in list format
    displayBookmarkedQuestions();
    
    console.log('📌 Bookmarked questions section opened');
}

function updateHomepageCounts() {
    // Update question counts for each section
    Object.keys(state.allQuestions).forEach(section => {
        const countElement = document.getElementById(`${section}-count`);
        if (countElement) {
            const count = state.allQuestions[section].length;
            countElement.textContent = `${count} questions`;
        }
    });
}

// ==================== GLOBAL SEARCH ====================
function initGlobalSearch() {
    console.log('🔍 Initializing global search...');
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) {
        console.error('❌ Search elements not found:', { searchInput: !!searchInput, searchResults: !!searchResults });
        return;
    }
    
    console.log('✅ Search elements found, setting up event listeners');
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performGlobalSearch(query);
        }, 300);
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
    
    // Hide results on escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.classList.remove('show');
            searchInput.blur();
        } else if (e.key === 'Enter') {
            // Handle Enter key - perform search immediately
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                // Add visual feedback
                searchInput.style.borderColor = 'var(--color-blue)';
                searchInput.style.boxShadow = '0 0 20px rgba(30, 58, 138, 0.3)';
                
                performGlobalSearch(query);
                
                // Reset visual feedback after a moment
                setTimeout(() => {
                    searchInput.style.borderColor = '';
                    searchInput.style.boxShadow = '';
                }, 300);
            } else {
                // Show message for short queries
                if (searchResults) {
                    searchResults.innerHTML = '<div class="no-results">Please enter at least 2 characters to search</div>';
                    searchResults.classList.add('show');
                }
            }
        }
    });
}

function performGlobalSearch(query) {
    console.log('🔍 Performing search for:', query);
    const searchResults = document.getElementById('searchResults');
    const results = [];
    
    // Check if data is loaded
    if (!state.allQuestions || Object.keys(state.allQuestions).length === 0) {
        console.log('⚠️ No questions loaded yet');
        if (searchResults) {
            searchResults.innerHTML = '<div class="no-results">Loading questions...</div>';
            searchResults.classList.add('show');
        }
        return;
    }
    
    console.log('📊 Available sections:', Object.keys(state.allQuestions));
    
    // Debug: Check first question structure
    const firstSection = Object.keys(state.allQuestions)[0];
    if (firstSection && state.allQuestions[firstSection][0]) {
        console.log('🔍 Sample question structure:', state.allQuestions[firstSection][0]);
    }
    
    const searchQuery = query.toLowerCase();
    
    // Search Quick Launch apps first
    quickLaunchApps.forEach(app => {
        const matchesName = app.name.toLowerCase().includes(searchQuery);
        const matchesTerms = app.searchTerms.some(term => term.includes(searchQuery));
        
        if (matchesName || matchesTerms) {
            results.push({
                type: 'app',
                app: app,
                name: app.name,
                icon: app.icon
            });
        }
    });
    
    // Search through all sections (both active and archived)
    const allSections = [...sectionConfig.active, ...sectionConfig.archived];
    allSections.forEach(sectionName => {
        if (!state.allQuestions[sectionName]) return; // Skip if section not loaded
        state.allQuestions[sectionName].forEach((question, index) => {
            // Check if question has the expected structure
            if (!question || typeof question !== 'object') {
                console.warn('⚠️ Invalid question at', sectionName, index, question);
                return;
            }
            
            // Handle all question formats
            const questionText = (
                question.q || 
                question.question || 
                question.word || 
                question.title || 
                question.term || 
                ''
            ).toLowerCase();
            const answerText = (
                question.a || 
                question.answer || 
                question.meaning || 
                question.summary || 
                ''
            ).toLowerCase();
            
            if (questionText.includes(searchQuery) || answerText.includes(searchQuery)) {
                results.push({
                    type: 'question',
                    section: sectionName,
                    question: question.q || question.question || question.word || question.title || question.term || 'No question text',
                    answer: question.a || question.answer || question.meaning || question.summary || 'No answer text',
                    index: index,
                    sectionDisplayName: getSectionDisplayName(sectionName)
                });
            }
        });
    });
    
    console.log('🎯 Found', results.length, 'results');
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found matching "' + query + '"</div>';
    } else {
        searchResults.innerHTML = results.slice(0, 10).map(result => {
            if (result.type === 'app') {
                // Quick Launch app result
                return `
                    <div class="search-result-item" onclick="launchAppFromSearch('${result.name}')">
                        <div class="search-result-question">${result.icon} <strong>Launch ${escapeHtml(result.name)}</strong></div>
                        <div class="search-result-section">Quick Launch</div>
                    </div>
                `;
            } else {
                // Regular question result
                return `
                    <div class="search-result-item" onclick="jumpToQuestion('${result.section}', ${result.index})">
                        <div class="search-result-question">${highlightText(result.question, query)}</div>
                        <div class="search-result-section">${result.sectionDisplayName}</div>
                    </div>
                `;
            }
        }).join('');
    }
    
    searchResults.classList.add('show');
}

function launchAppFromSearch(appName) {
    const app = quickLaunchApps.find(a => a.name === appName);
    if (app) {
        launchApp(app);
        // Close search results
        document.getElementById('searchResults').classList.remove('show');
        document.getElementById('globalSearchInput').value = '';
    }
}

window.launchAppFromSearch = launchAppFromSearch;

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function getSectionDisplayName(sectionId) {
    const displayNames = {
        'languages': '🌍 Languages',
        'programming': '💻 Programming',
        'bible': '📖 Bible',
        'science': '🔬 Science',
        'history': '📚 History',
        'facts': '💡 Facts',
        'country_flags': '🏳️ Country Flags'
    };
    return displayNames[sectionId] || sectionId;
}

function jumpToQuestion(sectionName, questionIndex) {
    // Close search results
    document.getElementById('searchResults').classList.remove('show');
    document.getElementById('globalSearchInput').value = '';
    
    // Open the section
    openSection(sectionName);
    
    // Scroll to the specific question
    setTimeout(() => {
        const questionItems = document.querySelectorAll('.question-item');
        if (questionItems[questionIndex]) {
            questionItems[questionIndex].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Highlight the question briefly
            questionItems[questionIndex].style.backgroundColor = 'rgba(30, 58, 138, 0.2)';
            setTimeout(() => {
                questionItems[questionIndex].style.backgroundColor = '';
            }, 2000);
        }
    }, 100);
}
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('evermind-theme', theme);
    
    // Update dropdown to show active theme
    updateThemeDropdown();
    
    // Close dropdown
    const dropdown = document.getElementById('themeDropdownMenu');
    const btn = document.querySelector('.theme-dropdown-btn');
    dropdown.classList.remove('show');
    btn.classList.remove('active');
    
    // Play sound if SoundEffects is available and has the method
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
    
    // Check for saved progress after theme change
    setTimeout(() => {
        checkSavedProgress();
    }, 100);
}

// ==================== THEME DROPDOWN ====================
function toggleThemeDropdown() {
    const dropdown = document.getElementById('themeDropdownMenu');
    const btn = document.querySelector('.theme-dropdown-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        btn.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        btn.classList.add('active');
    }
}

function updateThemeDropdown() {
    const currentTheme = localStorage.getItem('evermind-theme') || 'dark';
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === currentTheme) {
            option.classList.add('active');
        }
    });
}

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('themeDropdownMenu');
    const btn = document.querySelector('.theme-dropdown-btn');
    
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
        btn.classList.remove('active');
    }
});

function loadTheme() {
    const savedTheme = localStorage.getItem('evermind-theme') || 'light';
    setTheme(savedTheme);
}

// ==================== MOBILE SWIPE GESTURES ====================
// Old swipe variables removed - using advanced implementation below

// Old initSwipeGestures removed - using advanced implementation below

// Old touch handlers removed - using advanced implementation below

// Old showSwipeFeedback removed - using advanced implementation below
// Archive Configuration
const sectionConfig = {
    active: ['programming', 'cybersec', 'hotkeys', 'country_flags', 'igbo'],
    archived: ['bible', 'chess', 'psychology', 'new_words', 'facts', 
               'history', 'science', 'youtube_knowledge', 'anatomy', 
               'binance_futures', 'memes_brainrot', 'languages']
};

const sections = [
    { id: 'languages', name: 'Languages', icon: '🌍', status: 'archived' },
    { id: 'programming', name: 'Programming', icon: '💻', status: 'active' },
    { id: 'bible', name: 'Bible', icon: '📖', status: 'archived' },
    { id: 'science', name: 'Science', icon: '🔬', status: 'archived' },
    { id: 'history', name: 'History', icon: '🏛️', status: 'archived' },
    { id: 'facts', name: 'Random Facts', icon: '💡', status: 'archived' },
    { id: 'country_flags', name: 'Country Flags', icon: '🚩', status: 'active' },
    { id: 'new_words', name: 'New Words', icon: '📝', status: 'archived' },
    { id: 'youtube_knowledge', name: 'YouTube', icon: '🎥', status: 'archived' },
    { id: 'memes_brainrot', name: 'Memes & Brain Rot', icon: '💀', status: 'archived' },
    { id: 'binance_futures', name: 'Futures', icon: '📈', status: 'archived' },
    { id: 'psychology', name: 'Psychology', icon: '🧠', status: 'archived' },
    { id: 'chess', name: 'Chess', icon: '♟️', status: 'archived' },
    { id: 'anatomy', name: 'Anatomy', icon: '🫀', status: 'archived' },
    { id: 'hotkeys', name: 'Hotkeys', icon: '⌨️', status: 'active' },
    { id: 'cybersec', name: 'CyberSec', icon: '🔒', status: 'active' },
    { id: 'igbo', name: 'Igbo', icon: '🗣️', status: 'active' },
];

// ==================== ARCHIVE FUNCTIONALITY ====================
function renderSections(sectionList, status) {
    console.log(`🎨 Rendering ${status} sections:`, sectionList);
    
    const container = document.querySelector('.sections-grid');
    if (!container) {
        console.error('❌ Sections grid container not found');
        return;
    }
    
    let renderedCount = 0;
    sectionList.forEach(sectionId => {
        const sectionCard = createSectionCard(sectionId, status);
        if (sectionCard) {
            container.appendChild(sectionCard);
            renderedCount++;
            console.log(`✅ Rendered ${status} section: ${sectionId}`);
        } else {
            console.error(`❌ Failed to create card for ${status} section: ${sectionId}`);
        }
    });
    
    console.log(`🎯 Successfully rendered ${renderedCount}/${sectionList.length} ${status} sections`);
}

function createSectionCard(sectionId, status) {
    console.log(`🔨 Creating card for ${sectionId} with status ${status}`);
    
    const section = sections.find(s => s.id === sectionId);
    if (!section) {
        console.error(`❌ Section ${sectionId} not found in sections array:`, sections.map(s => s.id));
        return null;
    }
    
    console.log(`✅ Found section:`, section);
    
    const card = document.createElement('div');
    card.className = 'section-card';
    card.setAttribute('data-status', status);
    card.onclick = () => openSection(sectionId);
    
    // Hide archived sections by default
    if (status === 'archived') {
        card.style.display = 'none';
        console.log(`📦 Hidden archived section: ${sectionId}`);
    } else {
        console.log(`✅ Visible active section: ${sectionId}`);
    }
    
    // Get question count
    const questionCount = state.allQuestions[sectionId] ? state.allQuestions[sectionId].length : 0;
    console.log(`📊 Question count for ${sectionId}: ${questionCount}`);
    
    card.innerHTML = `
        <div class="card-icon">${section.icon}</div>
        <h2>${section.name}</h2>
        <p>${getSectionDescription(sectionId)}</p>
        <div class="section-stats">
            <span class="question-count" id="${sectionId}-count">${questionCount} questions</span>
            <span class="bookmark-count" id="${sectionId}-bookmarks">0 bookmarked</span>
        </div>
    `;
    
    console.log(`🎯 Created card for ${sectionId}:`, card);
    console.log(`🎯 Card HTML:`, card.outerHTML);
    
    return card;
}

function getSectionDescription(sectionId) {
    const descriptions = {
        'programming': 'Master code syntax and concepts',
        'cybersec': 'Cybersecurity knowledge and tools',
        'hotkeys': 'Keyboard shortcuts and productivity',
        'country_flags': 'Country flags and geography',
        'igbo': 'Learn Igbo language for cultural connection',
        'bible': 'Biblical knowledge and verses',
        'chess': 'Chess strategies and piece movements',
        'psychology': 'Human behavior and mental processes',
        'new_words': 'Expand your vocabulary',
        'facts': 'Interesting random facts',
        'history': 'Historical events and knowledge',
        'science': 'Scientific concepts and phenomena',
        'youtube_knowledge': 'Educational YouTube content',
        'anatomy': 'Human body parts and functions',
        'binance_futures': 'Cryptocurrency trading concepts',
        'memes_brainrot': 'Internet culture and memes',
        'country_flags': 'Country flags and geography',
        'languages': 'Learn translations and pronunciation'
    };
    return descriptions[sectionId] || 'Knowledge and learning';
}

function addSpecialCards() {
    const container = document.querySelector('.sections-grid');
    if (!container) return;
    
    // Create Bookmarked Questions card
    const bookmarkedCard = document.createElement('div');
    bookmarkedCard.className = 'section-card';
    bookmarkedCard.setAttribute('data-status', 'special');
    bookmarkedCard.onclick = () => openBookmarkedQuestions();
    
    const bookmarkedCount = state.bookmarks ? state.bookmarks.length : 0;
    
    bookmarkedCard.innerHTML = `
        <div class="card-icon">📌</div>
        <h2>Bookmarked Questions</h2>
        <p>Review your flagged questions</p>
        <div class="section-stats">
            <span class="question-count" id="bookmarked-count">${bookmarkedCount} bookmarked</span>
            <span class="bookmark-count">Click to review</span>
        </div>
    `;
    
    // Create Study Statistics card
    const statsCard = document.createElement('div');
    statsCard.className = 'section-card';
    statsCard.setAttribute('data-status', 'special');
    statsCard.onclick = () => openStatistics();
    
    const totalAnswered = state.correctCount + state.wrongCount;
    
    statsCard.innerHTML = `
        <div class="card-icon">📊</div>
        <h2>Study Statistics</h2>
        <p>View your learning progress</p>
        <div class="section-stats">
            <span class="question-count" id="stats-summary">${totalAnswered} answered</span>
            <span class="bookmark-count">View dashboard</span>
        </div>
    `;
    
    container.appendChild(bookmarkedCard);
    container.appendChild(statsCard);
}

function addArchiveToggle() {
    const container = document.querySelector('.sections-grid');
    if (!container) return;
    
    // Remove existing toggle if it exists
    const existingToggle = document.getElementById('archiveToggle');
    if (existingToggle) {
        existingToggle.remove();
    }
    
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'archive-toggle-btn';
    toggleBtn.id = 'archiveToggle';
    toggleBtn.innerHTML = `📦 View Archived Sections (${sectionConfig.archived.length})`;
    toggleBtn.onclick = toggleArchive;
    
    // Insert after active sections
    container.appendChild(toggleBtn);
}

function toggleArchive() {
    const archivedSections = document.querySelectorAll('.section-card[data-status="archived"]');
    const archiveHeader = document.querySelector('.archive-header');
    const toggleBtn = document.getElementById('archiveToggle');
    
    if (archivedSections.length === 0) {
        console.warn('⚠️ No archived sections found');
        return;
    }
    
    const isHidden = archivedSections[0].style.display === 'none' || 
                    archivedSections[0].style.display === '';
    
    // Toggle visibility of archived sections
    archivedSections.forEach(section => {
        section.style.display = isHidden ? 'block' : 'none';
    });
    
    // Toggle archive header visibility
    if (archiveHeader) {
        archiveHeader.style.display = isHidden ? 'block' : 'none';
    }
    
    // Toggle archived section checkboxes in Global Revision Mode
    const archivedCheckboxes = document.querySelectorAll('.checkbox-group:last-child');
    archivedCheckboxes.forEach(group => {
        group.style.display = isHidden ? 'block' : 'none';
    });
    
    // Update button text
    if (toggleBtn) {
        toggleBtn.innerHTML = isHidden 
            ? `📦 Hide Archived Sections` 
            : `📦 View Archived Sections (${sectionConfig.archived.length})`;
    }
    
    // Save state
    localStorage.setItem('archiveExpanded', isHidden ? 'true' : 'false');
}

function initializeArchiveState() {
    const wasExpanded = localStorage.getItem('archiveExpanded') === 'true';
    
    // Hide archived checkboxes by default
    const archivedCheckboxes = document.querySelectorAll('.checkbox-group:last-child');
    archivedCheckboxes.forEach(group => {
        group.style.display = 'none';
    });
    
    if (wasExpanded) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            toggleArchive();
        }, 100);
    }
}

function loadHomepageWithArchive() {
    console.log('🏠 Loading homepage with archive system...');
    
    const container = document.querySelector('.sections-grid');
    if (!container) {
        console.error('❌ Sections grid container not found');
        return;
    }
    
    // Check if data is loaded
    if (!state.allQuestions || Object.keys(state.allQuestions).length === 0) {
        console.warn('⚠️ Data not loaded yet, retrying in 100ms...');
        setTimeout(() => loadHomepageWithArchive(), 100);
        return;
    }
    
    console.log('✅ Data loaded, rendering sections:', Object.keys(state.allQuestions));
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add archive header (initially hidden)
    const archiveHeader = document.createElement('div');
    archiveHeader.className = 'archive-header';
    archiveHeader.style.display = 'none';
    archiveHeader.innerHTML = `
        <h3>📦 ARCHIVED KNOWLEDGE</h3>
        <p>These sections are preserved but not actively reviewed.</p>
    `;
    container.appendChild(archiveHeader);
    
    // Render active sections first
    console.log('🎯 Rendering active sections:', sectionConfig.active);
    renderSections(sectionConfig.active, 'active');
    
    // Add archive toggle button
    addArchiveToggle();
    
    // Render archived sections (hidden by default)
    console.log('📦 Rendering archived sections:', sectionConfig.archived);
    renderSections(sectionConfig.archived, 'archived');
    
    // Add special cards AFTER all sections are rendered
    addSpecialCards();
    
    // Debug: Check what's actually in the container
    const allCards = container.querySelectorAll('.section-card');
    console.log(`🔍 Total cards in container: ${allCards.length}`);
    allCards.forEach((card, index) => {
        const status = card.getAttribute('data-status');
        const title = card.querySelector('h2')?.textContent || 'Unknown';
        console.log(`  Card ${index + 1}: ${title} (${status})`);
    });
    
    // Initialize archive state
    initializeArchiveState();
    
    console.log('✅ Homepage loaded with archive system');
}

async function loadAllSections() {
    console.log('🔄 Loading all sections from local JSON files...');
    
    for (const section of sections) {
        try {
            // Load directly from local JSON files
            console.log(`📂 Loading ${section.id} from local JSON...`);
            const localResponse = await fetch(`data/${section.id}.json?v=${Date.now()}`);
            if (localResponse.ok) {
                state.allQuestions[section.id] = await localResponse.json();
                console.log(`✅ Loaded ${section.id} from local JSON: ${state.allQuestions[section.id].length} questions`);
            } else {
                state.allQuestions[section.id] = [];
                console.warn(`⚠️ Could not load ${section.id}.json - Status: ${localResponse.status}`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${section.id}:`, error);
            state.allQuestions[section.id] = [];
        }
    }
    console.log('📊 All sections loaded:', state.allQuestions);
    updateHomepageCounts(); // Update homepage question counts
}

// Force refresh all questions data (bypass cache)
async function refreshAllQuestions() {
    console.log('🔄 Force refreshing all questions data...');
    
    // Clear cached data
    state.allQuestions = {};
    
    // Reload all sections
    await loadAllSections();
    
    console.log('✅ All questions refreshed successfully!');
    showToast('Questions refreshed successfully!', 'success');
}

// Make refresh function available globally
window.refreshAllQuestions = refreshAllQuestions;

async function loadSectionData(sectionId) {
    if (!state.allQuestions[sectionId]) {
        try {
            // Load directly from local JSON
            console.log(`📂 Loading ${sectionId} from local JSON...`);
            const localResponse = await fetch(`data/${sectionId}.json?v=${Date.now()}`);
            if (localResponse.ok) {
                state.allQuestions[sectionId] = await localResponse.json();
                console.log(`✅ Loaded ${sectionId} from local JSON: ${state.allQuestions[sectionId].length} questions`);
            } else {
                console.warn(`⚠️ Could not load ${sectionId}.json - Status: ${localResponse.status}`);
                state.allQuestions[sectionId] = [];
            }
        } catch (error) {
            console.error(`Error loading ${sectionId}:`, error);
            state.allQuestions[sectionId] = [];
        }
    }
    return state.allQuestions[sectionId];
}

// ==================== NAVIGATION ====================
function showPage(pageId) {
    console.log('📄 Showing page:', pageId);
    
    // Validate pageId
    if (!pageId) {
        console.error('❌ Invalid pageId provided to showPage');
        pageId = 'homepage'; // Fallback to homepage
    }
    
    // Check if the page element exists
    const targetPage = document.getElementById(pageId);
    if (!targetPage) {
        console.error('❌ Page element not found:', pageId);
        pageId = 'homepage'; // Fallback to homepage
    }
    
    // Remove active class from all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        console.log('📄 Removed active from:', page.id);
    });
    
    // Add active class to target page
    const finalPage = document.getElementById(pageId);
    if (finalPage) {
        finalPage.classList.add('active');
        console.log('✅ Page shown:', pageId);
        console.log('📄 Active page element:', finalPage);
        console.log('📄 Active page classes:', finalPage.className);
        
        // Special handling for homepage with archive system
        if (pageId === 'homepage') {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                loadHomepageWithArchive();
            }, 50);
        }
        
        // Ensure copy button visibility is properly managed
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            if (pageId === 'revisionMode') {
                copyBtn.style.display = 'flex';
                console.log('📋 Copy button shown for revision mode');
            } else {
                copyBtn.style.display = 'none';
                console.log('📋 Copy button hidden for non-revision mode');
            }
        }
    } else {
        console.error('❌ Failed to show page:', pageId);
    }
}

function backToHome() {
    console.log('🏠 Back to home called');
    showPage('homepage');
    state.currentSection = null;
    checkSavedProgress(); // Check for saved progress when returning to homepage
}

function exitRevision() {
    console.log('🚪 Exiting revision mode:', state.revisionMode);
    console.log('⏰ Current timer state before exit:', state.revisionStartTime);
    
    // Save current timer state before stopping
    if (state.revisionStartTime) {
        localStorage.setItem('evermind-revision-start-time', state.revisionStartTime.toString());
        console.log('⏰ Saved timer state before exiting:', new Date(state.revisionStartTime));
    } else {
        console.log('⏰ No timer state to save');
    }
    
    // Stop timer
    stopRevisionTimer();
    
    // Stop the persistent timer
    stopTimer();
    
    if (state.revisionMode === 'bookmarked') {
        // Return to bookmark section view (not homepage)
        showPage('sectionView');
        state.currentSection = 'bookmarked';
        displayBookmarkedQuestions();
        console.log('📌 Returned to bookmark section view');
    } else if (state.revisionMode === 'section') {
        // Return to section view
        openSection(state.currentSection);
        console.log('📚 Returned to section view');
    } else {
        // Return to homepage
        backToHome();
        console.log('🏠 Returned to homepage');
    }
    
    resetRevision();
}

// ==================== SECTION VIEW ====================
async function openSection(sectionId) {
    console.log(`🔍 DEBUG: openSection called with sectionId: "${sectionId}"`);
    
    if (!sectionId) {
        console.error('❌ DEBUG: sectionId is undefined or null');
        return;
    }
    
    state.currentSection = sectionId;
    const section = sections.find(s => s.id === sectionId);
    
    if (!section) {
        console.error(`❌ DEBUG: Section "${sectionId}" not found in sections array:`, sections.map(s => s.id));
        return;
    }
    
    console.log(`✅ DEBUG: Found section:`, section);
    
    const titleElement = document.getElementById('sectionTitle');
    if (!titleElement) {
        console.error('❌ DEBUG: sectionTitle element not found');
        return;
    }
    
    titleElement.textContent = `${section.icon} ${section.name}`;
    
    // Restore the regular section actions button
    const sectionActions = document.querySelector('.section-actions');
    if (sectionActions) {
        sectionActions.innerHTML = `
            <button class="btn btn--primary" onclick="startSectionRevision()">Start Revision Mode</button>
        `;
    }
    
    const questions = await loadSectionData(sectionId);
    console.log(`🔍 Opening ${sectionId} section with ${questions ? questions.length : 0} questions`);
    displayQuestions(questions);
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
    showPage('sectionView');
}

function displayQuestions(questions) {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    
    console.log(`📝 Displaying ${questions ? questions.length : 0} questions`);
    
    // Add tag filter UI for programming section
    if (state.currentSection === 'programming') {
        addTagFilterUI(questions);
    }
    
    // Filter questions by tag if a tag is selected
    let filteredQuestions = questions;
    if (state.tagFilter && state.currentSection === 'programming') {
        filteredQuestions = questions.filter(q => q.tags && q.tags.includes(state.tagFilter));
    }
    
    if (!filteredQuestions || filteredQuestions.length === 0) {
        questionsList.innerHTML = '<p style="text-align: center; padding: 40px; font-size: 1.2rem;">No questions found.</p>';
        return;
    }
    
    filteredQuestions.forEach((q, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.onclick = () => toggleAnswer(index);
        
        let content = '';
        
        
        // Handle different section types
        if (q.language && q.word) {
            // Languages section - special styling
            // Show only the English question initially, hide translation and pronunciation until clicked
            content += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(q.question || '')}</h3>`;
            content += `<div class="answer">`;
            content += `<div class="language-info-box">`;
            content += `<h3 style="font-size: 2rem; margin-bottom: 15px; font-weight: 700;">${escapeHtml(q.word)}</h3>`;
            content += `<div class="language-translation"><strong>Translation:</strong> ${escapeHtml(q.word)}</div>`;
            content += `<div class="language-pronunciation"><strong>Pronunciation:</strong> ${escapeHtml(q.answer || '')}</div>`;
            content += `</div>`;
            content += `</div>`;
        } else if (q.word && !q.language) {
            // New Words section - show the question initially
            content += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(q.question || '')}</h3>`;
            
            // Add speaker button for new words on homepage
            const safeWord = q.word.replace(/'/g, "\\'").replace(/"/g, '\\"');
            content += ` <button class="speaker-btn" onclick="speakWord('${safeWord}')" title="Hear pronunciation">🔊</button>`;
            
            content += `<div class="answer">`;
            content += `<h3 style="font-size: 2rem; margin-bottom: 10px; font-weight: 700;">${escapeHtml(q.word)}</h3>`;
            content += `<p style="font-style: italic; opacity: 0.8;">Pronunciation: ${escapeHtml(q.pronunciation)}</p>`;
            content += `<p><strong>Meaning:</strong> ${escapeHtml(q.meaning)}</p>`;
            content += `<p style="margin-top: 10px;"><em>"${escapeHtml(q.example)}"</em></p>`;
        } else if (q.type === 'anatomy' && q.word) {
            // Anatomy section - show the question initially
            content += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(q.question || '')}</h3>`;
            
            // Add speaker button for anatomy body parts on homepage
            const safeWord = q.word.replace(/'/g, "\\'").replace(/"/g, '\\"');
            content += ` <button class="speaker-btn" onclick="speakWord('${safeWord}')" title="Hear pronunciation">🔊</button>`;
            
            content += `<div class="answer">`;
            content += `<h3 style="font-size: 2rem; margin-bottom: 15px; font-weight: 700;">${escapeHtml(q.word)}</h3>`;
            if (q.pronunciation) {
                content += `<p style="font-style: italic; opacity: 0.8; margin-bottom: 15px;">Pronunciation: ${escapeHtml(q.pronunciation)}</p>`;
            }
            if (q.meaning) {
                content += `<p style="margin-bottom: 15px;"><strong>Quick Summary:</strong> ${escapeHtml(q.meaning)}</p>`;
            }
            if (q.image) {
                content += `<img src="${q.image}" alt="${escapeHtml(q.word)} diagram" class="question-image" style="margin-bottom: 20px; max-width: 100%; border-radius: 8px;">`;
            }
            content += `<div style="line-height: 1.8; font-size: 1.1rem;">${q.answer}</div>`;
        } else if (q.title && q.summary) {
            // YouTube Knowledge section - show only the title initially
            content += `<h3 style="font-size: 1.3rem; margin-bottom: 10px;">🎥 ${escapeHtml(q.title)}</h3>`;
            content += `<div class="answer">`;
            content += `<p>${escapeHtml(q.summary)}</p>`;
            if (q.source) {
                content += `<p style="margin-top: 10px; opacity: 0.7;"><strong>Source:</strong> ${escapeHtml(q.source)}</p>`;
            }
            if (q.videoLink && q.videoLink.trim()) {
                content += `<br><a href="${escapeHtml(q.videoLink)}" target="_blank" class="btn btn--primary">Watch Video 🔗</a>`;
            }
        } else if (q.term) {
            // Memes & Brain Rot section - show the question initially
            content += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(q.question || '')}</h3>`;
            
            // Add speaker button for memes & brain rot terms on homepage
            const safeTerm = q.term.replace(/'/g, "\\'").replace(/"/g, '\\"');
            content += ` <button class="speaker-btn" onclick="speakTerm('${safeTerm}')" title="Hear term">🔊</button>`;
            
            content += `<div class="answer">`;
            content += `<h3 style="font-size: 2rem; margin-bottom: 10px; font-weight: 700;">💀 ${escapeHtml(q.term)}</h3>`;
            content += `<p><strong>Meaning:</strong> ${escapeHtml(q.meaning)}</p>`;
            content += `<p style="margin-top: 10px;"><strong>When to use:</strong> ${escapeHtml(q.usage)}</p>`;
            content += `<p style="margin-top: 10px;"><em>"${escapeHtml(q.example)}"</em></p>`;
            if (q.origin) {
                content += `<p style="margin-top: 10px; opacity: 0.7; font-size: 0.9rem;"><strong>Origin:</strong> ${escapeHtml(q.origin)}</p>`;
            }
        } else {
            // Standard question format
            content += `<h3>Q${index + 1}: ${escapeHtml(q.question || q.q || '')}</h3>`;
            
            if (q.image) {
                content += `<img src="${q.image}" alt="Question image" class="question-image">`;
            }
            
            content += `<div class="answer">`;
            
            if (q.answer) {
                // Check if this is a code question (contains commands, terminal syntax, etc.)
                const isCodeQuestion = q.answer.includes('\n') && (
                    q.answer.includes('git ') || 
                    q.answer.includes('npm ') || 
                    q.answer.includes('node ') || 
                    q.answer.includes('python') || 
                    q.answer.includes('gcc ') || 
                    q.answer.includes('g++ ') || 
                    q.answer.includes('cd ') || 
                    q.answer.includes('./') || 
                    q.answer.includes('npx ') || 
                    q.answer.includes('// ') || 
                    q.answer.includes('# ') ||
                    q.answer.includes('{') || 
                    q.answer.includes('<') || 
                    q.answer.includes('def ') || 
                    q.answer.includes('function')
                );
                
                if (isCodeQuestion) {
                    content += `<pre><code>${escapeHtml(q.answer)}</code></pre>`;
                    
                    // Add code editor button only for actual code questions
                    if (state.currentSection === 'programming') {
                        const questionId = `${state.currentSection}_${index}`;
                        const codeType = q.type || 'html';
                        content += `<br><button class="code-editor-btn" onclick="CodeEditor.openEditor('${escapeHtml(q.answer).replace(/'/g, "\\'")}', '${codeType}', '${state.currentSection}', ${index})">💻 Try This Code</button>`;
                    }
                } else {
                    content += `<strong>Answer:</strong><br>${escapeHtml(q.answer)}`;
                }
            }
            
            if (q.audio) {
                // Remove audio player - only show speaker button
                // content += `<br><audio controls src="${q.audio}"></audio>`;
            }
        }
        
        content += `</div>`;
        
        questionItem.innerHTML = content;
        
        // Add buttons after innerHTML is set
        const h3 = questionItem.querySelector('h3');
        
        if (state.currentSection === 'languages' && q.language && q.word) {
            // Only add speaker button for Web Speech API languages (not Spitch)
            const webSpeechLanguages = ['french', 'spanish', 'japanese'];
            if (webSpeechLanguages.includes(q.language.toLowerCase())) {
                const speakerBtn = AudioPlayer.addSpeakerButton(questionItem, q.word, q.language);
                h3.appendChild(speakerBtn);
            }
        }
        
        if (state.currentSection === 'anatomy' && q.type === 'anatomy' && q.word) {
            // Add speaker button for anatomy body parts
            const speakerBtn = document.createElement('button');
            speakerBtn.className = 'speaker-btn';
            speakerBtn.innerHTML = '🔊';
            speakerBtn.title = 'Hear pronunciation';
            speakerBtn.onclick = (e) => {
                e.stopPropagation();
                speakWord(q.word);
            };
            h3.appendChild(speakerBtn);
        }
        
        if (state.currentSection === 'programming' && q.answer) {
            const codeBtn = document.createElement('button');
            codeBtn.className = 'code-editor-btn';
            codeBtn.innerHTML = '💻 Try Code';
            codeBtn.title = 'Open code editor';
            codeBtn.onclick = (e) => {
                e.stopPropagation();
                const savedCode = localStorage.getItem(`code_${state.currentSection}_${index}`);
                CodeEditor.openEditor(savedCode || q.answer, q.type || 'html', state.currentSection, index);
            };
            h3.appendChild(codeBtn);
        }
        
        // Don't add bookmark buttons in section view - only in revision mode
        
        questionsList.appendChild(questionItem);
    });
}

function addTagFilterUI(questions) {
    const questionsList = document.getElementById('questionsList');
    
    // Get unique tags from questions
    const tags = new Set();
    questions.forEach(q => {
        if (q.tags) {
            q.tags.forEach(tag => tags.add(tag));
        }
    });
    
    if (tags.size === 0) return;
    
    // Create filter UI
    const filterDiv = document.createElement('div');
    filterDiv.className = 'tag-filter-container';
    filterDiv.innerHTML = `
        <div class="tag-filter-header">
            <h4>Filter by Tag:</h4>
        </div>
        <div class="tag-chips">
            <button class="tag-chip ${!state.tagFilter ? 'active' : ''}" onclick="filterByTag(null)">All</button>
            ${Array.from(tags).map(tag => 
                `<button class="tag-chip ${state.tagFilter === tag ? 'active' : ''}" onclick="filterByTag('${tag}')">#${tag}</button>`
            ).join('')}
        </div>
        <div class="tag-search">
            <input type="text" id="tagSearchInput" placeholder="Search tags... (e.g., #html)" oninput="searchTags(this.value)">
        </div>
    `;
    
    questionsList.insertBefore(filterDiv, questionsList.firstChild);
}

function filterByTag(tag) {
    state.tagFilter = tag;
    const questions = state.allQuestions[state.currentSection];
    displayQuestions(questions);
}

function searchTags(searchValue) {
    const input = searchValue.toLowerCase().replace('#', '');
    if (!input) {
        filterByTag(null);
        return;
    }
    
    // Find matching tag
    const questions = state.allQuestions[state.currentSection];
    const allTags = new Set();
    questions.forEach(q => {
        if (q.tags) {
            q.tags.forEach(tag => allTags.add(tag));
        }
    });
    
    const matchingTag = Array.from(allTags).find(tag => tag.toLowerCase().includes(input));
    if (matchingTag) {
        filterByTag(matchingTag);
    }
}

function toggleAnswer(index) {
    const items = document.querySelectorAll('.question-item');
    items[index].classList.toggle('revealed');
}

// ==================== REVISION MODE ====================
function startSectionRevision() {
    if (!state.currentSection) return;
    
    // Clear any previous section revision state before starting new one
    clearSectionRevisionState();
    
    // Reset revision state
    resetRevision();
    
    state.revisionMode = 'section';
    // Add originalIndex to each question for proper bookmark tracking
    state.revisionQuestions = state.allQuestions[state.currentSection].map((q, index) => ({
        ...q,
        originalIndex: index
    }));
    shuffleArray(state.revisionQuestions);
    state.currentQuestionIndex = 0;
    
    // Initialize enhanced progress tracking
    state.correctCount = 0;
    state.wrongCount = 0;
    state.totalQuestions = state.revisionQuestions.length;
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
    startRevision();
}

function startGlobalRevision() {
    const checkboxes = document.querySelectorAll('#sectionCheckboxes input[type="checkbox"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one section for revision!');
        return;
    }
    
    // Clear any previous global revision state before starting new one
    clearGlobalRevisionState();
    
    // Reset revision state
    resetRevision();
    
    state.revisionMode = 'global';
    state.revisionQuestions = [];
    
    // Start timer for global revision
    state.revisionStartTime = Date.now();
    
    // Get selected sections for auto-save
    const selectedSections = Array.from(checkboxes).map(cb => cb.value);
    
    checkboxes.forEach(checkbox => {
        const sectionId = checkbox.value;
        if (state.allQuestions[sectionId]) {
            // Add section information and originalIndex to each question for global revision
            const sectionQuestions = state.allQuestions[sectionId].map((q, index) => ({
                ...q,
                section: sectionId,
                originalIndex: index
            }));
            state.revisionQuestions.push(...sectionQuestions);
            console.log(`📚 DEBUG: Added ${sectionQuestions.length} questions from ${sectionId} section`);
        }
    });
    
    shuffleArray(state.revisionQuestions);
    state.currentQuestionIndex = 0;
    
    // Initialize enhanced progress tracking
    state.correctCount = 0;
    state.wrongCount = 0;
    state.totalQuestions = state.revisionQuestions.length;
    
    // Save initial state to localStorage
    saveRevisionState();
    
    // Start auto-save interval (every 30 seconds)
    state.autoSaveInterval = setInterval(() => {
        saveRevisionState();
    }, 30000);
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
    startRevision();
}

function startRevisionFromSaved() {
    showPage('revisionMode');
    
    // Restore timer from saved state instead of starting fresh
    const savedStartTime = localStorage.getItem('evermind-revision-start-time');
    if (savedStartTime) {
        state.revisionStartTime = parseInt(savedStartTime);
        console.log('⏰ Restoring timer from saved state:', new Date(state.revisionStartTime));
        startRevisionTimerFromSaved();
    } else {
        console.log('⏰ No saved timer found, starting fresh');
        startRevisionTimer();
        // Only start the API timer if no saved state
        startTimer();
    }
    
    // Reset bookmark button state
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
        if (bookmarkIcon) {
            bookmarkIcon.textContent = '⭐'; // Reset to unstarred state
            bookmarkBtn.classList.remove('bookmarked');
        }
    }
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        displayCurrentQuestion();
        updateProgress();
    }, 100);
    
    // Initialize swipe gestures for mobile
    initSwipeGestures();
}

function startRevisionTimerFromSaved() {
    // Don't reset the start time - use the saved one
    // Clear any existing timer
    if (state.revisionTimerInterval) {
        clearInterval(state.revisionTimerInterval);
    }
    
    // Start timer interval
    state.revisionTimerInterval = setInterval(() => {
        updateRevisionTimer();
    }, 1000);
    
    // Initial update
    updateRevisionTimer();
}

function startRevision() {
    showPage('revisionMode');
    
    // Start timer for all revision modes (fresh start)
    startRevisionTimer();
    
    // Start the persistent timer
    startTimer();
    
    // Reset bookmark button state
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
        if (bookmarkIcon) {
            bookmarkIcon.textContent = '⭐'; // Reset to unstarred state
            bookmarkBtn.classList.remove('bookmarked');
        }
    }
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
    displayCurrentQuestion();
    updateProgress();
    }, 100);
    
    // Initialize swipe gestures for mobile
    initSwipeGestures();
}

function startRevisionTimer() {
    state.revisionStartTime = Date.now();
    
    // Save timer start time to localStorage for persistence
    localStorage.setItem('evermind-revision-start-time', state.revisionStartTime.toString());
    
    // Clear any existing timer
    if (state.revisionTimerInterval) {
        clearInterval(state.revisionTimerInterval);
    }
    
    // Update timer every second
    state.revisionTimerInterval = setInterval(() => {
        updateRevisionTimer();
    }, 1000);
    
    // Initial update
    updateRevisionTimer();
}

function updateRevisionTimer() {
    const timerElement = document.getElementById('revisionTimer');
    if (!timerElement || !state.revisionStartTime) return;
    
    const elapsed = Math.floor((Date.now() - state.revisionStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    
    let timeString;
    if (hours > 0) {
        // Show hours:minutes:seconds format after 1 hour
        timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        // Show minutes:seconds format initially
        timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    timerElement.textContent = timeString;
}

function stopRevisionTimer() {
    if (state.revisionTimerInterval) {
        clearInterval(state.revisionTimerInterval);
        state.revisionTimerInterval = null;
    }
    
    // Don't clear localStorage here - let exitRevision handle it
    // localStorage.removeItem('evermind-revision-start-time');
    // state.revisionStartTime = null;
}

function clearRevisionTimer() {
    // Clear saved timer from localStorage when actually stopping
    localStorage.removeItem('evermind-revision-start-time');
    state.revisionStartTime = null;
}

function displayCurrentQuestion() {
    console.log('📝 Displaying current question...');
    console.log('📝 Revision questions length:', state.revisionQuestions.length);
    console.log('📝 Current section:', state.currentSection);
    console.log('📝 Current question index:', state.currentQuestionIndex);
    
    if (state.revisionQuestions.length === 0) {
        // Check if we actually completed all questions or if this is a resume issue
        const totalAnswered = state.correctCount + state.wrongCount;
        if (totalAnswered >= state.totalQuestions) {
        showCompletionMessage();
        } else {
            // This shouldn't happen - if we have no questions but haven't answered all, something went wrong
            console.error('❌ No questions left but not all answered. Resetting revision.');
            resetRevision();
            backToHome();
        }
        return;
    }
    
    const question = state.revisionQuestions[0];
    const questionContent = document.getElementById('questionContent');
    const answerContent = document.getElementById('answerContent');
    
    console.log('📝 Question object:', question);
    console.log('📝 Question content element:', questionContent);
    
    // Ensure we have a valid question
    if (!question) {
        console.error('❌ No question found at index 0');
        showCompletionMessage();
        return;
    }
    
    // Add section label for global and bookmark revision modes
    let questionHtml = '';
    let sectionLabelHtml = '';
    console.log('🔍 DEBUG: displayCurrentQuestion called with:', {
        revisionMode: state.revisionMode,
        questionData: question,
        hasQuestion: !!question,
        questionKeys: question ? Object.keys(question) : 'no question',
        hasWord: question ? !!question.word : false,
        hasLanguage: question ? !!question.language : false,
        wordValue: question ? question.word : 'no word',
        languageValue: question ? question.language : 'no language',
        typeValue: question ? question.type : 'no type'
    });
    
    if (state.revisionMode === 'global' || state.revisionMode === 'bookmarked') {
        console.log('✅ DEBUG: In global/bookmarked mode, checking for section label...');
        
        const sectionId = question.section || state.currentSection;
        console.log('🔍 DEBUG: Section label check:', { 
            sectionId, 
            hasSection: !!question.section, 
            currentSection: state.currentSection,
            questionSection: question.section,
            revisionMode: state.revisionMode
        });
        
        if (sectionId && sectionId !== 'null' && sectionId !== 'undefined') {
            const sectionInfo = getSectionInfo(sectionId);
            console.log('🏷️ DEBUG: Adding section label:', sectionInfo);
            sectionLabelHtml = `<div class="question-section-label">${sectionInfo.icon} From ${sectionInfo.name}</div>`;
            console.log('✅ DEBUG: Section label HTML added:', sectionLabelHtml);
        } else {
            console.log('⚠️ DEBUG: No section label added - sectionId:', sectionId);
        }
    } else {
        console.log('❌ DEBUG: Not in global/bookmarked mode, revisionMode:', state.revisionMode);
    }
    
    // Handle different question types
    console.log('🔍 DEBUG: Checking question type conditions...');
    
    // Check if this is a language question (has both word and language fields)
    if (question.language && question.word) {
        console.log('✅ DEBUG: Language question detected - has word and language fields');
        // Languages section - special styling for revision mode
        // Show only the English question, hide the translation and pronunciation until answer is revealed
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(question.question || '')}</h3>`;
        
        // Add speaker button for language questions in revision mode
        console.log('🔊 Adding speaker button for language question:', question.word, question.language);
        const safeWord = question.word.replace(/'/g, "\\'").replace(/"/g, '\\"');
        const safeLang = question.language.replace(/'/g, "\\'").replace(/"/g, '\\"');
        questionHtml += ` <button class="speaker-btn" onclick="AudioPlayer.playAudio('${safeWord}', '${safeLang}')" title="Play pronunciation">🔊</button>`;
    } else if (question.word && !question.language) {
        console.log('✅ DEBUG: New words question detected - word present, no language');
        // New Words section - show the question initially
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(question.question || '')}</h3>`;
        
        // Add speaker button for new words
        if (question.word) {
            const safeWord = question.word.replace(/'/g, "\\'").replace(/"/g, '\\"');
            questionHtml += ` <button class="speaker-btn" onclick="speakWord('${safeWord}')" title="Hear pronunciation">🔊</button>`;
        }
    } else if (question.type === 'anatomy' && question.word) {
        console.log('✅ DEBUG: Anatomy question detected - type anatomy with word');
        // Anatomy section - show the question initially
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(question.question || '')}</h3>`;
        
        // Add speaker button for anatomy body parts
        if (question.word) {
            const safeWord = question.word.replace(/'/g, "\\'").replace(/"/g, '\\"');
            questionHtml += ` <button class="speaker-btn" onclick="speakWord('${safeWord}')" title="Hear pronunciation">🔊</button>`;
        }
    } else if (question.title && question.summary) {
        console.log('✅ DEBUG: YouTube question detected - title and summary present');
        // YouTube Knowledge section - show only the title initially
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">🎥 ${escapeHtml(question.title)}</h3>`;
    } else if (question.term) {
        console.log('✅ DEBUG: Memes question detected - term present');
        // Memes & Brain Rot section - show the question initially
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(question.question || '')}</h3>`;
        
        // Add speaker button for memes & brain rot terms
        if (question.term) {
            const safeTerm = question.term.replace(/'/g, "\\'").replace(/"/g, '\\"');
            questionHtml += ` <button class="speaker-btn" onclick="speakTerm('${safeTerm}')" title="Hear term">🔊</button>`;
        }
    } else if (question.pieceType && question.possibleMoves) {
        console.log('✅ DEBUG: Chess question detected - has pieceType and possibleMoves');
        console.log('♟️ Chess question data:', question);
        console.log('♟️ Piece type:', question.pieceType);
        console.log('♟️ Possible moves:', question.possibleMoves);
        console.log('♟️ Start position:', question.startPosition);
        // Chess section - show interactive board
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(question.question || '')}</h3>`;
        questionHtml += `<div id="chessBoard" class="chess-board-container"></div>`;
        // Initialize chess board after rendering
        setTimeout(() => {
            console.log('♟️ Attempting to initialize chess board...');
            console.log('♟️ ChessBoard object exists:', !!window.ChessBoard);
            console.log('♟️ ChessBoard methods:', window.ChessBoard ? Object.keys(window.ChessBoard) : 'Not loaded');
            if (window.ChessBoard) {
                console.log('♟️ Calling showChessDemo with:', question);
                window.ChessBoard.showChessDemo(question);
            } else {
                console.error('♟️ ChessBoard component not loaded!');
            }
        }, 100);
    } else {
        console.log('✅ DEBUG: Standard question detected - using default format');
        // Standard question format - apply consistent styling to all sections
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px; font-weight: 600;">${escapeHtml(question.question || question.q || '')}</h3>`;
        
        if (question.image) {
            questionHtml += `<br><img src="${question.image}" alt="Question" class="question-image">`;
        }
        
        // Audio handled by specific question types above
    }
    
    // Copy button removed - using single copy button at bottom left
    
    console.log('🔍 DEBUG: Final question HTML before setting innerHTML:', questionHtml);
    questionContent.innerHTML = questionHtml;
    
    // Add section label to question card if it exists
    if (sectionLabelHtml) {
        const questionCard = document.getElementById('questionCard');
        if (questionCard) {
            // Remove any existing section label first
            const existingLabel = questionCard.querySelector('.question-section-label');
            if (existingLabel) {
                existingLabel.remove();
            }
            // Add the new section label
            questionCard.insertAdjacentHTML('afterbegin', sectionLabelHtml);
            console.log('✅ Section label added to question card');
        }
    }
    
    // Add double-click event listener to reveal answer (only on top 50% of question card)
    if (questionCard) {
        // Remove any existing double-click listeners to prevent duplicates
        const existingHandler = questionCard._doubleClickHandler;
        const existingClickHandler = questionCard._clickHandler;
        if (existingHandler) {
            questionCard.removeEventListener('dblclick', existingHandler);
        }
        if (existingClickHandler) {
            questionCard.removeEventListener('click', existingClickHandler);
            questionCard.removeEventListener('touchstart', existingClickHandler);
        }
        
        // Add reliable double-click detection using click counter (faster and mobile-friendly)
        let clickCount = 0;
        let clickTimer = null;
        
           const handleClick = function(e) {
               console.log('🖱️ Click detected - count:', clickCount + 1);
               
               // Prevent event bubbling to avoid conflicts
               e.preventDefault();
               e.stopPropagation();
               
               clickCount++;
               
               // Clear existing timer
               if (clickTimer) {
                   clearTimeout(clickTimer);
               }
               
               // Set timer for double-click detection (200ms window - faster!)
               clickTimer = setTimeout(() => {
                   if (clickCount === 2) {
                       console.log('🖱️ Double-click detected via click counter');
                       
                       // Get click position - handle both mouse and touch events
                       let clickY;
                       if (e.touches && e.touches.length > 0) {
                           // Touch event
                           clickY = e.touches[0].clientY;
                           console.log('📱 Touch event detected');
                       } else {
                           // Mouse event
                           clickY = e.clientY;
                           console.log('🖱️ Mouse event detected');
                       }
                       
                       // Get question card position and dimensions
                       const rect = questionCard.getBoundingClientRect();
                       const relativeClickY = clickY - rect.top;
                       const cardHeight = rect.height;
                       // Use a fixed height for the swipe area instead of percentage to ensure it's always accessible
                       const swipeAreaHeight = Math.min(200, cardHeight * 0.5); // Max 200px or 50% of card height
                       const top50Percent = swipeAreaHeight;
                       
                       console.log('🖱️ Position check:', {
                           clickY: clickY,
                           rectTop: rect.top,
                           relativeClickY: relativeClickY,
                           cardHeight: cardHeight,
                           top50Percent: top50Percent,
                           isInTop50: relativeClickY <= top50Percent,
                           eventType: e.type,
                           hasTouches: e.touches ? e.touches.length : 0
                       });
                       
                       // Check if position calculation is valid
                       const isValidPosition = !isNaN(relativeClickY) && relativeClickY >= 0 && relativeClickY <= cardHeight;
                       
                       if (!isValidPosition) {
                           console.log('⚠️ Invalid position calculation - ignoring double-click');
                           return;
                       }
                       
                       // Only allow double-click in top 50% of the card (same as swipe gesture)
                       
                       if (relativeClickY <= top50Percent) {
                           console.log('✅ Double-click in top 50% - showing answer');
                           if (!state.isAnswerShown) {
                               console.log('✅ Showing answer via double-click');
                               showAnswer();
                           } else {
                               console.log('⚠️ Answer already shown, ignoring double-click');
                           }
                       } else {
                           console.log('❌ Double-click outside top 50% - ignoring');
                           console.log('📱 Clicked at:', relativeClickY, 'vs allowed area:', top50Percent);
                       }
                   }
                   clickCount = 0;
               }, 200); // Faster: 200ms instead of 300ms
           };
        
        // Store reference to handler for cleanup
        questionCard._clickHandler = handleClick;
        
        // Add both click and touchstart events for mobile compatibility
        questionCard.addEventListener('click', handleClick);
        questionCard.addEventListener('touchstart', handleClick);
        console.log('✅ Fast double-click event listener added (top 50% only)');
    } else {
        console.error('❌ Question card not found for double-click listener');
    }
    
    // Add visual hint for double-click functionality
    // Note: Cursor styling is now handled in CSS for the question card
    
    // Check if section label was actually added to DOM
    const sectionLabel = document.querySelector('.question-section-label');
    console.log('🔍 DEBUG: Section label element in DOM:', sectionLabel);
    if (sectionLabel) {
        console.log('✅ DEBUG: Section label found in DOM:', sectionLabel.textContent);
    } else {
        console.log('❌ DEBUG: No section label found in DOM');
    }
    
    // Update bookmark button
    console.log('📝 Updating bookmark button...');
    updateBookmarkButton();
    
    // Force bookmark button reset by clearing and re-checking
    setTimeout(() => {
        console.log('📝 Force updating bookmark button after delay...');
        updateBookmarkButton();
    }, 100);
    
    // Prepare answer
    let answerHtml = '';
    
    if (question.language && question.word) {
        // Languages section - show translation and pronunciation in answer
        answerHtml += `<div class="language-info-box">`;
        answerHtml += `<h3 style="font-size: 2rem; margin-bottom: 15px; font-weight: 700;">${escapeHtml(question.word)}</h3>`;
        answerHtml += `<div class="language-translation"><strong>Translation:</strong> ${escapeHtml(question.word)}</div>`;
        answerHtml += `<div class="language-pronunciation"><strong>Pronunciation:</strong> ${escapeHtml(question.answer || '')}</div>`;
        answerHtml += `</div>`;
    } else if (question.word && !question.language) {
        // New Words section - show word, pronunciation, meaning, and example
        answerHtml += `<div class="language-info-box">`;
        answerHtml += `<h3 style="font-size: 2rem; margin-bottom: 10px; font-weight: 700;">${escapeHtml(question.word)}</h3>`;
        answerHtml += `<p style="font-style: italic; opacity: 0.8; margin-bottom: 15px;">Pronunciation: ${escapeHtml(question.pronunciation)}</p>`;
        answerHtml += `<p><strong>Meaning:</strong> ${escapeHtml(question.meaning)}</p>`;
        answerHtml += `<p style="margin-top: 10px;"><em>"${escapeHtml(question.example)}"</em></p>`;
        answerHtml += `</div>`;
        } else if (question.type === 'anatomy' && question.word) {
            // Anatomy section - show body part name and detailed answer
            answerHtml += `<div class="language-info-box">`;
            answerHtml += `<h3 style="font-size: 2rem; margin-bottom: 15px; font-weight: 700;">${escapeHtml(question.word)}</h3>`;
            if (question.pronunciation) {
                answerHtml += `<p style="font-style: italic; opacity: 0.8; margin-bottom: 15px;">Pronunciation: ${escapeHtml(question.pronunciation)}</p>`;
            }
            if (question.meaning) {
                answerHtml += `<p style="margin-bottom: 15px;"><strong>Quick Summary:</strong> ${escapeHtml(question.meaning)}</p>`;
            }
            if (question.image) {
                answerHtml += `<img src="${question.image}" alt="${escapeHtml(question.word)} diagram" class="question-image" style="margin-bottom: 20px; max-width: 100%; border-radius: 8px;">`;
            }
            answerHtml += `<div style="line-height: 1.8; font-size: 1.1rem;">${question.answer}</div>`;
        answerHtml += `</div>`;
    } else if (question.title && question.summary) {
        // YouTube Knowledge section - show summary, source, and video link
        answerHtml += `<div class="language-info-box">`;
        answerHtml += `<p style="line-height: 1.8;">${escapeHtml(question.summary)}</p>`;
        if (question.source) {
            answerHtml += `<p style="margin-top: 15px; opacity: 0.7;"><strong>Source:</strong> ${escapeHtml(question.source)}</p>`;
        }
        if (question.videoLink && question.videoLink.trim()) {
            answerHtml += `<br><a href="${escapeHtml(question.videoLink)}" target="_blank" class="btn btn--primary" style="margin-top: 10px;">Watch Video 🔗</a>`;
        }
        answerHtml += `</div>`;
    } else if (question.term) {
        // Memes & Brain Rot section - show term, meaning, usage, example, and origin
        answerHtml += `<div class="language-info-box">`;
        answerHtml += `<h3 style="font-size: 2rem; margin-bottom: 10px; font-weight: 700;">💀 ${escapeHtml(question.term)}</h3>`;
        answerHtml += `<p><strong>Meaning:</strong> ${escapeHtml(question.meaning)}</p>`;
        answerHtml += `<p style="margin-top: 10px;"><strong>When to use:</strong> ${escapeHtml(question.usage)}</p>`;
        answerHtml += `<p style="margin-top: 10px;"><em>"${escapeHtml(question.example)}"</em></p>`;
        if (question.origin) {
            answerHtml += `<p style="margin-top: 15px; opacity: 0.7; font-size: 0.9rem;"><strong>Origin:</strong> ${escapeHtml(question.origin)}</p>`;
        }
        answerHtml += `</div>`;
    } else if (question.answer) {
        // Check if this is a code question (contains commands, terminal syntax, etc.)
        const isCodeQuestion = question.answer.includes('\n') && (
            question.answer.includes('git ') || 
            question.answer.includes('npm ') || 
            question.answer.includes('node ') || 
            question.answer.includes('python') || 
            question.answer.includes('gcc ') || 
            question.answer.includes('g++ ') || 
            question.answer.includes('cd ') || 
            question.answer.includes('./') || 
            question.answer.includes('npx ') || 
            question.answer.includes('// ') || 
            question.answer.includes('# ') ||
            question.answer.includes('{') || 
            question.answer.includes('<') || 
            question.answer.includes('def ') || 
            question.answer.includes('function')
        );
        
        if (isCodeQuestion) {
            answerHtml = `<pre><code>${escapeHtml(question.answer)}</code></pre>`;
        } else {
            // Apply language-info-box styling to non-code answers
            answerHtml = `<div class="language-info-box"><p style="line-height: 1.8; font-size: 1.1rem;">${escapeHtml(question.answer)}</p></div>`;
        }
    }
    
    // Add code editor button for programming questions in revision mode (only for actual code questions)
    if (question.answer && (state.currentSection === 'programming' || question.section === 'programming')) {
        const isCodeQuestion = question.answer.includes('\n') && (
            question.answer.includes('git ') || 
            question.answer.includes('npm ') || 
            question.answer.includes('node ') || 
            question.answer.includes('python') || 
            question.answer.includes('gcc ') || 
            question.answer.includes('g++ ') || 
            question.answer.includes('cd ') || 
            question.answer.includes('./') || 
            question.answer.includes('npx ') || 
            question.answer.includes('// ') || 
            question.answer.includes('# ') ||
            question.answer.includes('{') || 
            question.answer.includes('<') || 
            question.answer.includes('def ') || 
            question.answer.includes('function')
        );
        
        if (isCodeQuestion) {
        const questionId = `revision_${state.revisionMode}_${state.revisionQuestions.indexOf(question)}`;
        const savedCode = localStorage.getItem(`code_${questionId}`);
        const codeToUse = savedCode || question.answer;
        const codeType = question.type || 'html';
        answerHtml += `<br><button class="code-editor-btn" onclick="openRevisionCodeEditor('${questionId}', '${codeType}')">💻 Try This Code</button>`;
        }
    }
    
        // Remove audio player from answer - only show speaker button
        // if (question.audio) {
        //     answerHtml += `<br><audio controls src="${question.audio}"></audio>`;
        // }
    
    // Copy buttons removed - using single copy button at bottom left
    
    answerContent.innerHTML = answerHtml;
    
    // Hide answer initially, show Show Answer button
    answerContent.style.display = 'none';
    document.getElementById('showAnswerBtn').style.display = 'inline-block';
    document.getElementById('answerControls').style.display = 'none';
    state.isAnswerShown = false;
    
    // Remove answer-shown class to reset swipe area visibility
    if (questionCard) {
        questionCard.classList.remove('answer-shown');
    }
    
    // Initialize timer for this question if timer mode is enabled
    if (timerMode.enabled) {
        console.log('⏱️ Timer mode enabled, initializing timer for new question');
        resetQuestionTimer();
    }
}

function showAnswer() {
    document.getElementById('answerContent').style.display = 'block';
    document.getElementById('showAnswerBtn').style.display = 'none';
    document.getElementById('answerControls').style.display = 'flex';
    state.isAnswerShown = true;
    
    // Add class to make swipe area more visible
    const questionCard = document.getElementById('questionCard');
    if (questionCard) {
        questionCard.classList.add('answer-shown');
    }
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
}

function markCorrect() {
    // Increment correct counter
    state.correctCount++;
    
    // Record statistics
    if (window.StudyStatistics && typeof window.StudyStatistics.recordAnswer === 'function') {
        window.StudyStatistics.recordAnswer(state.currentSection, true);
    }
    
    // Award points through gamification system
    if (window.Gamification && typeof window.Gamification.awardPoints === 'function') {
        window.Gamification.awardPoints('correct', true);
    }
    
    // Remove the question from the list (correct answer)
    state.revisionQuestions.shift();
    state.currentQuestionIndex = 0;
    
    // Auto-save progress for revision
    saveRevisionState();
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('correct');
    }
    
    // Reset bookmark button before displaying new question
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
        if (bookmarkIcon) {
            bookmarkIcon.textContent = '⭐'; // Reset to unstarred state
            bookmarkBtn.classList.remove('bookmarked');
        }
    }
    
    updateProgress();
    displayCurrentQuestion();
    
    // Reset timer for next question if timer mode is enabled
    resetQuestionTimer();
}

function markWrong() {
    // Increment wrong counter
    state.wrongCount++;
    
    // Record statistics
    if (window.StudyStatistics && typeof window.StudyStatistics.recordAnswer === 'function') {
        window.StudyStatistics.recordAnswer(state.currentSection, false);
    }
    
    // Reset streak through gamification system
    if (window.Gamification && typeof window.Gamification.awardPoints === 'function') {
        window.Gamification.awardPoints('wrong', false);
    }
    
    // Remove current question from front
    const question = state.revisionQuestions.shift();
    
    // Insert question at a completely random position for unpredictable reappearance
    // This makes the question come back at an unexpected time, far away from now
    const randomPosition = Math.floor(Math.random() * (state.revisionQuestions.length + 1));
    state.revisionQuestions.splice(randomPosition, 0, question);
    
    state.currentQuestionIndex = 0;
    
    // Auto-save progress for revision
    saveRevisionState();
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('wrong');
    }
    
    // Reset bookmark button before displaying new question
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
        if (bookmarkIcon) {
            bookmarkIcon.textContent = '⭐'; // Reset to unstarred state
            bookmarkBtn.classList.remove('bookmarked');
        }
    }
    
    updateProgress();
    displayCurrentQuestion();
    
    // Reset timer for next question if timer mode is enabled
    resetQuestionTimer();
}

function skipQuestion() {
    console.log('⏱️ Skip question called, timer enabled:', timerMode.enabled);
    
    // Move current question to end of queue
    const question = state.revisionQuestions.shift();
    state.revisionQuestions.push(question);
    
    state.currentQuestionIndex = 0;
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('skip');
    }
    
    // Reset bookmark button before displaying new question
    const bookmarkBtn = document.getElementById('bookmarkBtn');
    if (bookmarkBtn) {
        const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
        if (bookmarkIcon) {
            bookmarkIcon.textContent = '⭐'; // Reset to unstarred state
            bookmarkBtn.classList.remove('bookmarked');
        }
    }
    
    displayCurrentQuestion();
    
    // Reset timer for next question if timer mode is enabled
    console.log('⏱️ About to reset timer after skip');
    resetQuestionTimer();
}

function nextQuestion() {
    // Move to next question without marking current one
    if (state.revisionQuestions.length > 1) {
        const question = state.revisionQuestions.shift();
        state.revisionQuestions.push(question);
        state.currentQuestionIndex = 0;
        
        // Reset bookmark button before displaying new question
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        if (bookmarkBtn) {
            const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
            if (bookmarkIcon) {
                bookmarkIcon.textContent = '⭐'; // Reset to unstarred state
                bookmarkBtn.classList.remove('bookmarked');
            }
        }
        
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('next');
    }
        displayCurrentQuestion();
        
        // Reset timer for next question if timer mode is enabled
        resetQuestionTimer();
    }
}

function previousQuestion() {
    // Move to previous question (last in queue)
    if (state.revisionQuestions.length > 1) {
        const question = state.revisionQuestions.pop();
        state.revisionQuestions.unshift(question);
        state.currentQuestionIndex = 0;
        
        // Reset bookmark button before displaying new question
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        if (bookmarkBtn) {
            const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');
            if (bookmarkIcon) {
                bookmarkIcon.textContent = '⭐'; // Reset to unstarred state
                bookmarkBtn.classList.remove('bookmarked');
            }
        }
        
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('next');
    }
        displayCurrentQuestion();
        
        // Reset timer for next question if timer mode is enabled
        resetQuestionTimer();
    }
}

function updateProgress() {
    const questionsLeft = state.revisionQuestions.length;
    const totalAnswered = state.correctCount + state.wrongCount;
    const totalQuestions = state.totalQuestions;
    const completedQuestions = totalQuestions - questionsLeft;
    const percentage = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
    
    // Update the enhanced progress display
    document.getElementById('correctCount').textContent = state.correctCount;
    document.getElementById('wrongCount').textContent = state.wrongCount;
    document.getElementById('remainingCount').textContent = questionsLeft;
    document.getElementById('progressPercentage').textContent = `${percentage}% complete`;
    
    // Update progress bar
    const progressBarFill = document.getElementById('progressBarFill');
    if (progressBarFill) {
        progressBarFill.style.width = `${percentage}%`;
    }
}

function showCompletionMessage() {
    const questionCard = document.getElementById('questionCard');
    
    // Calculate stats for global revision
    let completionHTML = '';
    
    if (state.revisionMode === 'global' && state.revisionStartTime) {
        const endTime = Date.now();
        const elapsedTime = Math.floor((endTime - state.revisionStartTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        const timeFormatted = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        
        const totalAnswered = state.correctCount + state.wrongCount;
        const accuracy = totalAnswered > 0 ? Math.round((state.correctCount / totalAnswered) * 100) : 0;
        
        // Motivational quotes based on accuracy
        let motivationalQuote = '';
        if (accuracy >= 90) {
            motivationalQuote = "Excellent work! You're mastering EVERMIND! 🌟";
        } else if (accuracy >= 75) {
            motivationalQuote = "Great progress! Keep learning and evolving! 🚀";
        } else if (accuracy >= 60) {
            motivationalQuote = "Good effort! Practice makes perfect in EVERMIND! 💪";
        } else {
            motivationalQuote = "Every question is a step forward. Keep growing! 🌱";
        }
        
        completionHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2 style="font-size: 2.5rem; margin-bottom: 30px;">🎉 Session Complete!</h2>
                
                <div style="background: var(--card-bg); border-radius: 15px; padding: 30px; margin: 20px 0; border: 1px solid var(--border-color);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; margin-bottom: 5px;">⏱️</div>
                            <div style="font-size: 1.2rem; font-weight: 600;">Time</div>
                            <div style="font-size: 1.5rem; color: var(--color-blue);">${timeFormatted}</div>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; margin-bottom: 5px;">✅</div>
                            <div style="font-size: 1.2rem; font-weight: 600;">Correct</div>
                            <div style="font-size: 1.5rem; color: var(--color-green);">${state.correctCount}</div>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; margin-bottom: 5px;">❌</div>
                            <div style="font-size: 1.2rem; font-weight: 600;">Wrong</div>
                            <div style="font-size: 1.5rem; color: var(--color-red);">${state.wrongCount}</div>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; margin-bottom: 5px;">📊</div>
                            <div style="font-size: 1.2rem; font-weight: 600;">Accuracy</div>
                            <div style="font-size: 1.5rem; color: var(--color-purple);">${accuracy}%</div>
                        </div>
                    </div>
                    
                    <div style="font-size: 1.3rem; font-style: italic; color: var(--text-secondary); margin-top: 20px;">
                        ${motivationalQuote}
                    </div>
                </div>
                
                <p style="font-size: 1.2rem; opacity: 0.8;">You've completed all questions in this revision session!</p>
                
                <div style="margin-top: 30px;">
                    <button class="btn btn--primary" id="completionCloseBtn" style="font-size: 1.1rem; padding: 15px 30px;">
                        Close
                    </button>
                </div>
            </div>
        `;
    } else {
        // Regular completion message for non-global revisions
        completionHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="font-size: 3rem; margin-bottom: 20px;">🎉 Congratulations!</h2>
            <p style="font-size: 1.5rem;">You've completed all questions in this revision session!</p>
            
            <div style="margin-top: 30px;">
                <button class="btn btn--primary" id="completionCloseBtn" style="font-size: 1.1rem; padding: 15px 30px;">
                    Close
                </button>
            </div>
        </div>
    `;
    }
    
    questionCard.innerHTML = completionHTML;
    
    // Add event listener to the close button
    const closeBtn = document.getElementById('completionCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            console.log('🔘 Completion close button clicked');
            exitRevision();
        });
    }
    
    document.getElementById('answerControls').style.display = 'none';
    document.getElementById('showAnswerBtn').style.display = 'none';
    
    // Clear auto-save state when revision completes
    if (state.revisionMode === 'global') {
        clearGlobalRevisionState();
    } else if (state.revisionMode === 'section') {
        clearSectionRevisionState();
    } else if (state.revisionMode === 'bookmarked') {
        clearBookmarkRevisionState();
    }
    
    // Start inactivity timer (30 minutes)
    startInactivityTimer();
}

let inactivityTimer = null;

function startInactivityTimer() {
    // Clear any existing timer
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
    
    // Set timer for 30 minutes (30 * 60 * 1000 ms)
    inactivityTimer = setTimeout(() => {
        showInactivityPrompt();
    }, 30 * 60 * 1000);
}

function showInactivityPrompt() {
    const questionCard = document.getElementById('questionCard');
    const currentContent = questionCard.innerHTML;
    
    const inactivityHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">⏰ Inactivity Notice</h2>
            <p style="font-size: 1.2rem; margin-bottom: 30px;">
                You've been on the completion page for 30 minutes. Would you like to continue or close the session?
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn--primary" onclick="continueSession()" style="font-size: 1rem; padding: 12px 24px;">
                    Continue Session
                </button>
                <button class="btn btn--nav" id="inactivityCloseBtn" style="font-size: 1rem; padding: 12px 24px;">
                    Close Session
                </button>
            </div>
        </div>
    `;
    
    questionCard.innerHTML = inactivityHTML;
    
    // Add event listener to the inactivity close button
    const inactivityCloseBtn = document.getElementById('inactivityCloseBtn');
    if (inactivityCloseBtn) {
        inactivityCloseBtn.addEventListener('click', function() {
            console.log('🔘 Inactivity close button clicked');
            exitRevision();
        });
    }
}

function continueSession() {
    // Restart the inactivity timer
    startInactivityTimer();
    
    // Show the completion message again
    showCompletionMessage();
}

function resetRevision() {
    state.revisionQuestions = [];
    state.currentQuestionIndex = 0;
    state.isAnswerShown = false;
    state.correctCount = 0;
    state.wrongCount = 0;
    state.totalQuestions = 0;
    
    // Stop timer
    stopRevisionTimer();
    clearRevisionTimer();
    
    // Clear any completion message from previous sessions
    const questionCard = document.getElementById('questionCard');
    if (questionCard) {
        questionCard.innerHTML = `
            <div class="question-header">
                <button class="bookmark-btn" id="bookmarkBtn" title="Bookmark this question">
                    <span class="bookmark-icon">⭐</span>
                </button>
            </div>
            <div class="question-content" id="questionContent">
                <!-- Question will be displayed here -->
            </div>
            <div class="answer-content" id="answerContent" style="display: none;">
                <!-- Answer will be displayed here -->
            </div>
        `;
        
        // Re-initialize bookmark button
        initBookmarkButton();
    }
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
    // Handle undefined, null, or non-string values
    if (text === undefined || text === null || typeof text !== 'string') {
        return '';
    }
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function openRevisionCodeEditor(questionId, codeType) {
    const question = state.revisionQuestions[0];
    const savedCode = localStorage.getItem(`code_${questionId}`) || question.answer;
    CodeEditor.openEditor(savedCode, codeType, questionId, 0);
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

// ==================== QUICK LAUNCH SIDEBAR ====================
const quickLaunchApps = [
    {
        name: 'YouTube',
        icon: '📺',
        appScheme: 'youtube://',
        webUrl: 'https://www.youtube.com',
        searchTerms: ['you', 'youtube']
    },
    {
        name: 'ChatGPT',
        icon: '🤖',
        appScheme: 'chatgpt://',
        webUrl: 'https://chat.openai.com',
        searchTerms: ['chat', 'chatgpt']
    },
    {
        name: 'Gemini',
        icon: '✨',
        appScheme: 'gemini://',
        webUrl: 'https://gemini.google.com',
        searchTerms: ['gemini']
    },
    {
        name: 'Claude',
        icon: '🧠',
        appScheme: 'claude://',
        webUrl: 'https://claude.ai',
        searchTerms: ['claude']
    },
    {
        name: 'Perplexity',
        icon: '🔍',
        appScheme: 'perplexity://',
        webUrl: 'https://www.perplexity.ai',
        searchTerms: ['perplexity']
    },
    {
        name: 'W3Schools',
        icon: '📚',
        appScheme: null,
        webUrl: 'https://www.w3schools.com',
        searchTerms: ['w3', 'w3schools']
    },
    {
        name: 'New Tab',
        icon: '➕',
        appScheme: null,
        webUrl: 'about:blank',
        searchTerms: ['new tab', 'newtab']
    },
    {
        name: 'Admin Panel',
        icon: '⚙️',
        appScheme: null,
        webUrl: 'admin.html',
        searchTerms: ['admin', 'panel', 'manage']
    }
];

function initQuickLaunch() {
    const toggleBtn = document.getElementById('quickLaunchToggle');
    const sidebar = document.getElementById('quickLaunchSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    const launchButtons = document.querySelectorAll('.quick-launch-btn');
    
    if (!toggleBtn || !sidebar || !closeBtn) {
        console.warn('⚠️ Quick Launch elements not found');
        return;
    }
    
    // Toggle sidebar
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
    });
    
    // Close sidebar
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
    });
    
    // Launch app buttons
    launchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const appId = button.getAttribute('data-app');
            
            // Handle special cases
            if (appId === 'askai') {
                openAIChat();
                sidebar.classList.remove('open');
                return;
            }
            
            if (appId === 'home') {
                console.log('🏠 Home button clicked from quick launch');
                showPage('homepage');
                sidebar.classList.remove('open');
                return;
            }
            
            const app = quickLaunchApps.find(a => 
                a.name.toLowerCase().replace(/\s/g, '') === appId
            );
            
            if (app) {
                launchApp(app);
                sidebar.classList.remove('open');
            }
        });
    });
    
    console.log('✅ Quick Launch initialized');
}

function launchApp(appConfig) {
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('correct');
    }
    
    if (appConfig.appScheme) {
        // Try app scheme first with fallback
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = appConfig.appScheme;
        document.body.appendChild(iframe);
        
        // Fallback to web after 1 second if app didn't open
        setTimeout(() => {
            window.open(appConfig.webUrl, '_blank');
            if (iframe.parentNode) {
                document.body.removeChild(iframe);
            }
        }, 1000);
    } else {
        // Direct web link
        window.open(appConfig.webUrl, '_blank');
    }
    
    console.log(`🚀 Launched ${appConfig.name}`);
}

// ==================== GROQ AI CHAT ====================
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

let conversationHistory = [];
let previousPage = 'homepage'; // Track the page before opening AI chat

function openAIChat() {
    // Store the current active page before opening AI chat
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        previousPage = activePage.id;
        console.log('🤖 Opening AI chat from page:', previousPage);
    }
    
    showPage('aiChatPage');
    console.log('🤖 AI chat page should now be active');
    if (window.SoundEffects) window.SoundEffects.playSound('click');
    
    // Add welcome message if empty
    const messagesContainer = document.getElementById('aiChatMessages');
    if (messagesContainer.children.length === 0) {
        addAIMessage('assistant', 'Hello! I\'m your AI study assistant. I can help you with:\n\n• Explaining study questions and answers\n• Generating practice questions\n• General Q&A about any topic\n• Study tips and learning strategies\n\nHow can I help you today?');
    }
    
    // Focus input after a short delay to ensure DOM is ready
    setTimeout(() => {
        const chatInput = document.getElementById('aiChatInput');
        if (chatInput) {
            chatInput.focus();
        }
    }, 100);
}

function closeAIChat() {
    console.log('🔙 Closing AI chat, returning to:', previousPage);
    
    // Ensure we have a valid previous page, fallback to homepage
    const targetPage = previousPage || 'homepage';
    console.log('🎯 Target page:', targetPage);
    
    // Return to the previous page instead of always going to homepage
    showPage(targetPage);
    console.log('🔙 Should have returned to:', targetPage);
    if (window.SoundEffects) window.SoundEffects.playSound('click');
}

function addAIMessage(role, content) {
    const messagesContainer = document.getElementById('aiChatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    
    // Create message content wrapper
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-message-content';
    
    // Format content with proper paragraphing and code blocks
    const formattedContent = formatAIContent(content);
    contentDiv.innerHTML = formattedContent;
    
    // Add timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'ai-message-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
}

function formatAIContent(content) {
    if (!content) return '';
    
    // First, handle code blocks with ``` syntax
    let formatted = content.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, language, code) => {
        const lang = language || '';
        const cleanCode = code.trim();
        const uniqueId = 'code_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        return `<div class="ai-code-block">
            <pre><code class="language-${lang}">${escapeHtml(cleanCode)}</code></pre>
            <button class="ai-code-copy-btn" onclick="copyAICode('${uniqueId}')" data-code-id="${uniqueId}">📋 Copy</button>
        </div>`;
    });
    
    // Then handle inline code with single backticks
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Split into paragraphs and format
    const paragraphs = formatted.split(/\n\s*\n/);
    let result = '';
    
    for (let paragraph of paragraphs) {
        if (paragraph.trim()) {
            // Check if it's already formatted (contains HTML)
            if (paragraph.includes('<div class="ai-code-block">') || paragraph.includes('<code>')) {
                result += paragraph;
                    } else {
                // Regular paragraph
                result += `<p>${paragraph}</p>`;
            }
        }
    }
    
    return result;
}

// Function to copy code from AI messages
function copyAICode(buttonOrId) {
    let button, codeElement;
    
    if (typeof buttonOrId === 'string') {
        // Called with ID
        button = document.querySelector(`[data-code-id="${buttonOrId}"]`);
        codeElement = button ? button.parentElement.querySelector('code') : null;
            } else {
        // Called with button element
        button = buttonOrId;
        codeElement = button.parentElement.querySelector('code');
    }
    
    if (!codeElement) {
        console.error('Code element not found');
        return;
    }
    
    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        // Show success feedback
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
        
        // Show toast notification
        if (window.showToast) {
            showToast('Code copied to clipboard!', 'success');
        }
    }).catch(err => {
        console.error('Failed to copy code:', err);
        if (window.showToast) {
            showToast('Failed to copy code', 'error');
        }
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const sendBtn = document.getElementById('aiSendBtn');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // Disable input and button while sending
    input.disabled = true;
    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '⏳';
    }
    
    // Add user message to UI
    addAIMessage('user', userMessage);
    input.value = '';
    autoResizeTextarea(input);
    
    // Add to conversation history
    conversationHistory.push({ role: 'user', content: userMessage });
    
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-message assistant loading';
    loadingDiv.innerHTML = `
        <div class="ai-message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    loadingDiv.id = 'ai-loading';
    document.getElementById('aiChatMessages').appendChild(loadingDiv);
    
    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: conversationHistory,
                temperature: 0.7,
                max_tokens: 1024
            })
        });
        
        // Remove loading indicator
        document.getElementById('ai-loading')?.remove();
        
        if (!response.ok) {
            const errorData = await response.json();
            addAIMessage('assistant', `Error: ${errorData.error?.message || 'Failed to get response'}`);
            return;
        }
        
        const data = await response.json();
        const aiReply = data.choices[0].message.content;
        
        // Add AI response to conversation history
        conversationHistory.push({ role: 'assistant', content: aiReply });
        
        // Add AI response to UI
        addAIMessage('assistant', aiReply);
        
        if (window.SoundEffects) window.SoundEffects.playSound('correct');
        
    } catch (error) {
        document.getElementById('ai-loading')?.remove();
        addAIMessage('assistant', `Request failed: ${error.message}`);
        console.error('AI Chat error:', error);
    } finally {
        // Re-enable input and button
        input.disabled = false;
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '➤';
        }
        input.focus();
    }
}

// Auto-resize textarea function
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// Enhanced event listeners for AI chat
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('aiChatInput');
    const sendBtn = document.getElementById('aiSendBtn');
    
    if (chatInput) {
        // Auto-resize textarea
        chatInput.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
        
        // Send on Enter (but allow Shift+Enter for new lines)
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendAIMessage();
            }
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendAIMessage);
    }
});

// Export functions
window.openAIChat = openAIChat;
window.closeAIChat = closeAIChat;
window.sendAIMessage = sendAIMessage;
window.copyAICode = copyAICode;
window.openCalendarModal = openCalendarModal;
window.closeCalendarModal = closeCalendarModal;
window.previousMonth = previousMonth;
window.nextMonth = nextMonth;
window.openSecretVisionModal = openSecretVisionModal;
window.closeSecretVisionModal = closeSecretVisionModal;

// Helper function to get section info
function getSectionInfo(sectionId) {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
        return section;
    }
    
    // Handle special cases and format section names
    const nameMap = {
        'memes_brainrot': 'Memes & Brain Rot',
        'youtube_knowledge': 'YouTube',
        'country_flags': 'Country Flags',
        'new_words': 'New Words',
        'bookmarked': 'Bookmarked Questions'
    };
    
    const formattedName = nameMap[sectionId] || 
        sectionId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    return { name: formattedName, icon: '📚' };
}

// Speak word using Web Speech API for New Words section
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
        
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
    } else {
        console.warn('⚠️ Speech synthesis not supported');
    }
}

function speakTerm(term) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(term);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        speechSynthesis.speak(utterance);
        
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
    } else {
        console.warn('⚠️ Speech synthesis not supported');
    }
}

/**
 * Play audio from URL (for database audio field) - Use Web Speech API with translated word
 */
function playQuestionAudio(audioUrl) {
    try {
        // Use Web Speech API to speak the translated word from the answer
        if ('speechSynthesis' in window) {
            // Get the current question from state
            const question = state.revisionQuestions[0];
            if (!question) return;
            
            // Extract the translated word from the answer
            let wordToSpeak = '';
            let languageCode = 'en-US'; // Default
            
            if (question.word && question.language) {
                // For language questions, use the translated word
                wordToSpeak = question.word;
                
                // Set language code based on the language
                const lang = question.language.toLowerCase();
                if (lang === 'spanish') {
                    languageCode = 'es-ES';
                } else if (lang === 'french') {
                    languageCode = 'fr-FR';
                } else if (lang === 'japanese') {
                    languageCode = 'ja-JP';
                }
            } else if (question.word && !question.language) {
                // For new words, speak the word
                wordToSpeak = question.word;
                languageCode = 'en-US';
            } else if (question.term) {
                // For memes, speak the term
                wordToSpeak = question.term;
                languageCode = 'en-US';
            }
            
            if (wordToSpeak) {
                const utterance = new SpeechSynthesisUtterance(wordToSpeak);
                utterance.lang = languageCode;
                utterance.rate = 0.8;
                utterance.pitch = 1.0;
                speechSynthesis.speak(utterance);
            }
        }
        
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
    } catch (error) {
        console.error('Error playing audio:', error);
    }
}

window.speakWord = speakWord;
window.speakTerm = speakTerm;
window.playQuestionAudio = playQuestionAudio;

// ==================== AUTO-SAVE FOR GLOBAL REVISION ====================
function saveRevisionState() {
    if (state.revisionMode !== 'global' && state.revisionMode !== 'section' && state.revisionMode !== 'bookmarked') return;
    
    const saveData = {
        revisionMode: state.revisionMode,
        currentSection: state.currentSection,
        revisionQuestions: state.revisionQuestions,
        currentQuestionIndex: state.currentQuestionIndex,
        correctCount: state.correctCount,
        wrongCount: state.wrongCount,
        totalQuestions: state.totalQuestions,
        startTime: state.revisionStartTime,
        answeredQuestions: [], // Track which questions have been answered
        bookmarkedInSession: [] // Questions bookmarked during this session
    };
    
    // Add answered questions tracking
    for (let i = 0; i < state.currentQuestionIndex; i++) {
        saveData.answeredQuestions.push(i);
    }
    
    // For global revision, also save selected sections
    if (state.revisionMode === 'global') {
        const savedState = loadGlobalRevisionState();
        if (savedState && savedState.selectedSections) {
            saveData.selectedSections = savedState.selectedSections;
        }
    }
    
    const storageKey = state.revisionMode === 'global' ? 'evermind-global-revision' : 
                      state.revisionMode === 'section' ? 'evermind-section-revision' : 
                      'evermind-bookmark-revision';
    localStorage.setItem(storageKey, JSON.stringify(saveData));
    console.log(`💾 Auto-saved ${state.revisionMode} revision progress`);
}

function loadGlobalRevisionState() {
    const saved = localStorage.getItem('evermind-global-revision');
    if (!saved) return null;
    
    try {
        return JSON.parse(saved);
    } catch (e) {
        console.error('Error loading saved revision state:', e);
        return null;
    }
}

function loadSectionRevisionState() {
    const saved = localStorage.getItem('evermind-section-revision');
    if (!saved) return null;
    
    try {
        return JSON.parse(saved);
    } catch (e) {
        console.error('Error loading saved section revision state:', e);
        return null;
    }
}

function loadBookmarkRevisionState() {
    const saved = localStorage.getItem('evermind-bookmark-revision');
    if (!saved) return null;
    
    try {
        return JSON.parse(saved);
    } catch (e) {
        console.error('Error loading saved bookmark revision state:', e);
        return null;
    }
}

function clearGlobalRevisionState() {
    localStorage.removeItem('evermind-global-revision');
    if (state.autoSaveInterval) {
        clearInterval(state.autoSaveInterval);
        state.autoSaveInterval = null;
    }
    console.log('🗑️ Cleared global revision state');
}

function clearSectionRevisionState() {
    localStorage.removeItem('evermind-section-revision');
    console.log('🗑️ Cleared section revision state');
}

function clearBookmarkRevisionState() {
    localStorage.removeItem('evermind-bookmark-revision');
    console.log('🗑️ Cleared bookmark revision state');
}

function resumeGlobalRevision() {
    const savedState = loadGlobalRevisionState();
    if (!savedState) return false;
    
    // Restore state
    state.revisionMode = 'global';
    state.revisionQuestions = savedState.revisionQuestions;
    state.currentQuestionIndex = savedState.currentQuestionIndex;
    state.correctCount = savedState.correctCount;
    state.wrongCount = savedState.wrongCount;
    state.totalQuestions = savedState.totalQuestions;
    state.revisionStartTime = savedState.startTime;
    
    // If no questions left but we haven't completed all, regenerate questions
    if (state.revisionQuestions.length === 0 && (state.correctCount + state.wrongCount) < state.totalQuestions) {
        console.log('🔄 Regenerating questions for global revision...');
        // Regenerate questions from selected sections
        const selectedSections = savedState.selectedSections || [];
        state.revisionQuestions = [];
        
        selectedSections.forEach(sectionId => {
            if (state.allQuestions[sectionId]) {
                const sectionQuestions = state.allQuestions[sectionId].map((q, index) => ({
                    ...q,
                    section: sectionId,
                    originalIndex: index
                }));
                state.revisionQuestions.push(...sectionQuestions);
            }
        });
        
        shuffleArray(state.revisionQuestions);
        console.log(`🔄 Regenerated ${state.revisionQuestions.length} questions`);
    }
    
    // Restart auto-save
    state.autoSaveInterval = setInterval(() => {
        saveRevisionState();
    }, 30000);
    
    console.log(`🔄 Resumed global revision from question ${state.currentQuestionIndex + 1}/${state.totalQuestions}`);
    startRevisionFromSaved();
    return true;
}

function resumeSectionRevision() {
    const savedState = loadSectionRevisionState();
    if (!savedState) return false;
    
    // Restore state
    state.revisionMode = 'section';
    state.currentSection = savedState.currentSection;
    state.revisionQuestions = savedState.revisionQuestions;
    state.currentQuestionIndex = savedState.currentQuestionIndex;
    state.correctCount = savedState.correctCount;
    state.wrongCount = savedState.wrongCount;
    state.totalQuestions = savedState.totalQuestions;
    state.revisionStartTime = savedState.startTime;
    
    // If no questions left but we haven't completed all, regenerate questions
    if (state.revisionQuestions.length === 0 && (state.correctCount + state.wrongCount) < state.totalQuestions) {
        console.log('🔄 Regenerating questions for section revision...');
        if (state.allQuestions[state.currentSection]) {
            state.revisionQuestions = state.allQuestions[state.currentSection].map((q, index) => ({
                ...q,
                originalIndex: index
            }));
            shuffleArray(state.revisionQuestions);
            console.log(`🔄 Regenerated ${state.revisionQuestions.length} questions`);
        }
    }
    
    console.log(`🔄 Resumed section revision from question ${state.currentQuestionIndex + 1}/${state.totalQuestions}`);
    startRevisionFromSaved();
    return true;
}

function resumeBookmarkRevision() {
    const savedState = loadBookmarkRevisionState();
    if (!savedState) return false;
    
    // Restore state
    state.revisionMode = 'bookmarked';
    state.currentSection = savedState.currentSection;
    state.revisionQuestions = savedState.revisionQuestions;
    state.currentQuestionIndex = savedState.currentQuestionIndex;
    state.correctCount = savedState.correctCount;
    state.wrongCount = savedState.wrongCount;
    state.totalQuestions = savedState.totalQuestions;
    state.revisionStartTime = savedState.startTime;
    
    // If no questions left but we haven't completed all, regenerate questions
    if (state.revisionQuestions.length === 0 && (state.correctCount + state.wrongCount) < state.totalQuestions) {
        console.log('🔄 Regenerating questions for bookmark revision...');
        // Regenerate bookmarked questions
        const bookmarkedQuestions = [];
        state.bookmarks.forEach(bookmark => {
            const sectionQuestions = state.allQuestions[bookmark.section];
            if (sectionQuestions && sectionQuestions[bookmark.index]) {
                bookmarkedQuestions.push({
                    ...sectionQuestions[bookmark.index],
                    section: bookmark.section,
                    originalIndex: bookmark.index,
                    bookmarkId: bookmark.id
                });
            }
        });
        
        state.revisionQuestions = bookmarkedQuestions;
        shuffleArray(state.revisionQuestions);
        console.log(`🔄 Regenerated ${state.revisionQuestions.length} bookmarked questions`);
    }
    
    console.log(`🔄 Resumed bookmark revision from question ${state.currentQuestionIndex + 1}/${state.totalQuestions}`);
    startRevisionFromSaved();
    return true;
}

function showResumePrompt() {
    const globalState = loadGlobalRevisionState();
    const sectionState = loadSectionRevisionState();
    const bookmarkState = loadBookmarkRevisionState();
    
    if (!globalState && !sectionState && !bookmarkState) return;
    
    // Prioritize global revision if multiple exist
    const savedState = globalState || sectionState || bookmarkState;
    const isGlobal = !!globalState;
    const isSection = !!sectionState && !globalState;
    const isBookmark = !!bookmarkState && !globalState && !sectionState;
    
    const elapsedTime = Math.floor((Date.now() - savedState.startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const timeFormatted = minutes > 0 ? `${minutes}m` : `${elapsedTime}s`;
    
    const answeredCount = savedState.answeredQuestions.length;
    const progressText = `${answeredCount}/${savedState.totalQuestions} questions answered`;
    
    const title = isGlobal ? '📚 Resume Global Revision?' : 
                 isSection ? '📖 Resume Section Revision?' : 
                 '⭐ Resume Bookmark Revision?';
    const sectionInfo = isGlobal ? 
        `Sections: ${savedState.selectedSections.map(s => getSectionInfo(s).name).join(', ')}` :
        `Section: ${getSectionInfo(savedState.currentSection).name}`;
    
    const resumeHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="font-size: 2rem; margin-bottom: 20px;">${title}</h2>
            
            <div style="background: var(--card-bg); border-radius: 15px; padding: 25px; margin: 20px 0; border: 1px solid var(--border-color);">
                <div style="margin-bottom: 15px;">
                    <strong>Progress:</strong> ${progressText}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Time elapsed:</strong> ${timeFormatted}
                </div>
                <div style="margin-bottom: 20px;">
                    <strong>${sectionInfo}</strong>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button onclick="${isGlobal ? 'resumeGlobalRevision' : isSection ? 'resumeSectionRevision' : 'resumeBookmarkRevision'}(); hideResumePrompt();" class="btn btn--primary">
                    ✅ Resume
                </button>
                <button onclick="${isGlobal ? 'clearGlobalRevisionState' : isSection ? 'clearSectionRevisionState' : 'clearBookmarkRevisionState'}(); hideResumePrompt();" class="btn btn--secondary">
                    🗑️ Start Fresh
                </button>
            </div>
        </div>
    `;
    
    // Show as overlay
    const overlay = document.createElement('div');
    overlay.id = 'resumePrompt';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        padding: 20px;
    `;
    overlay.innerHTML = resumeHTML;
    document.body.appendChild(overlay);
}

function hideResumePrompt() {
    const overlay = document.getElementById('resumePrompt');
    if (overlay) {
        overlay.remove();
    }
}



// Auto-save on page unload
window.addEventListener('beforeunload', () => {
    if (state.revisionMode === 'global' || state.revisionMode === 'section' || state.revisionMode === 'bookmarked') {
        saveRevisionState();
    }
});


// ==================== ANIMATED WORDS ====================
function initAnimatedWords() {
    const words = [
        "Learning 📚",
        "Growing 🌱", 
        "Evolving 🚀",
        "Mastering 🎯",
        "Exploring 🔍",
        "Discovering 💡",
        "Achieving ⭐",
        "Progressing 📈"
    ];
    
    const animatedSubtitle = document.getElementById('animatedSubtitle');
    if (!animatedSubtitle) return;
    
    // Clear existing content
    animatedSubtitle.innerHTML = '';
    
    // Create all word elements
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'animated-word';
        span.textContent = word;
        span.setAttribute('data-text', word);
        if (index === 0) span.classList.add('active');
        animatedSubtitle.appendChild(span);
    });
    
    // Start cycling through words
    let currentIndex = 0;
    setInterval(() => {
        const words = animatedSubtitle.querySelectorAll('.animated-word');
        words.forEach(word => word.classList.remove('active'));
        
        currentIndex = (currentIndex + 1) % words.length;
        words[currentIndex].classList.add('active');
    }, 3000); // Change every 3 seconds
}

// ==================== EXPORT FUNCTIONS TO GLOBAL SCOPE ====================
window.toggleThemeDropdown = toggleThemeDropdown;
window.openSection = openSection;
window.backToHome = backToHome;
window.startSectionRevision = startSectionRevision;
window.startGlobalRevision = startGlobalRevision;
window.exitRevision = exitRevision;
window.showAnswer = showAnswer;
window.markCorrect = markCorrect;
window.markWrong = markWrong;
window.skipQuestion = skipQuestion;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.filterByTag = filterByTag;
window.searchTags = searchTags;
window.openRevisionCodeEditor = openRevisionCodeEditor;
// ==================== STATISTICS FUNCTION ====================
function openStatistics() {
    console.log('🔍 DEBUG: openStatistics called');
    if (window.StudyStatistics && typeof window.StudyStatistics.openStatistics === 'function') {
        window.StudyStatistics.openStatistics();
    } else {
        console.error('❌ DEBUG: StudyStatistics not available');
        console.log('Available on window:', Object.keys(window).filter(k => k.includes('Statistics')));
    }
}

window.openStatistics = openStatistics;
window.resumeSavedProgress = resumeSavedProgress;
window.openSecretAffirmationPage = openSecretAffirmationPage;
window.closeSecretAffirmationPage = closeSecretAffirmationPage;
window.checkSecretPin = checkSecretPin;
window.closeSecretPinModal = closeSecretPinModal;

// ==================== SAVED PROGRESS CONTINUE BUTTON ====================
function checkSavedProgress() {
    const globalState = loadGlobalRevisionState();
    const sectionState = loadSectionRevisionState();
    const bookmarkState = loadBookmarkRevisionState();
    
    const continueBtn = document.getElementById('continueBtn');
    console.log('🔍 Continue button element:', continueBtn);
    if (!continueBtn) return;
    
    // Prioritize global revision if multiple exist
    const savedState = globalState || sectionState || bookmarkState;
    console.log('🔍 Saved states:', { globalState, sectionState, bookmarkState, savedState });
    
    if (!savedState) {
        // No saved progress - hide button
        console.log('🔍 No saved progress - hiding button');
        continueBtn.style.display = 'none';
        return;
    }
    
    // Check for corrupted saved state (like 0/0 questions or invalid time)
    const answeredCount = savedState.correctCount + savedState.wrongCount;
    const totalCount = savedState.totalQuestions;
    const timeElapsed = savedState.startTime ? Math.floor((Date.now() - savedState.startTime) / 1000) : 0;
    
    // If state is corrupted (0/0 questions or extremely long time), clear it
    if (totalCount === 0 || timeElapsed > 86400) { // More than 24 hours
        console.log('🧹 Clearing corrupted saved state');
        if (globalState) clearGlobalRevisionState();
        if (sectionState) clearSectionRevisionState();
        if (bookmarkState) clearBookmarkRevisionState();
        continueBtn.style.display = 'none';
        return;
    }
    
    console.log('📋 Valid saved state found:', { answeredCount, totalCount, timeElapsed });
    
    // Determine revision type and section info
    let revisionType, sectionName;
    
    if (globalState) {
        revisionType = 'Global';
        const sections = savedState.selectedSections || [];
        sectionName = sections.length > 0 ? sections.map(s => getSectionInfo(s).name).join(', ') : 'Multiple Sections';
    } else if (sectionState) {
        revisionType = getSectionInfo(savedState.currentSection).name;
        sectionName = getSectionInfo(savedState.currentSection).name;
    } else if (bookmarkState) {
        revisionType = 'Bookmark';
        sectionName = 'Bookmarked';
    }
    
    // Update button text and show
    const continueText = continueBtn.querySelector('.continue-text');
    continueText.textContent = `${revisionType} ${answeredCount}/${totalCount}`;
    
    // Add tooltip with detailed info
    continueBtn.title = `Continue ${revisionType} - ${sectionName} (${answeredCount}/${totalCount} questions)`;
    
    continueBtn.style.display = 'flex';
}

function resumeSavedProgress() {
    const globalState = loadGlobalRevisionState();
    const sectionState = loadSectionRevisionState();
    const bookmarkState = loadBookmarkRevisionState();
    
    // Prioritize global revision if multiple exist
    if (globalState) {
        resumeGlobalRevision();
    } else if (sectionState) {
        resumeSectionRevision();
    } else if (bookmarkState) {
        resumeBookmarkRevision();
    }
    
    // Hide the continue button since we're now in revision mode
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.style.display = 'none';
    }
}

// ==================== COPY FUNCTIONALITY ====================
// copyQuestion function removed - using single copyQuestionAndAnswer function

// copyAnswer function removed - using single copyQuestionAndAnswer function

function copyQuestionAndAnswer() {
    const question = state.revisionQuestions[0];
    if (!question) return;
    
    // Get section name - prioritize question's section over state's currentSection
    let sectionName = 'Unknown Section';
    
    console.log('📋 Copy function debug:', {
        questionSection: question.section,
        stateCurrentSection: state.currentSection,
        revisionMode: state.revisionMode,
        questionKeys: Object.keys(question)
    });
    
    if (question.section) {
        // For global revision, use the question's section
        const sectionInfo = getSectionInfo(question.section);
        sectionName = sectionInfo.name;
        console.log('📋 Using question.section:', sectionInfo);
    } else if (state.currentSection && state.currentSection !== 'bookmarked') {
        // For section revision, use state's currentSection
        const sectionInfo = getSectionInfo(state.currentSection);
        sectionName = sectionInfo.name;
        console.log('📋 Using state.currentSection:', sectionInfo);
    } else if (state.revisionMode === 'bookmarked') {
        sectionName = 'Bookmarked Questions';
        console.log('📋 Using bookmarked mode');
    }
    
    // Build question text based on question type
    let questionText = '';
    if (question.word && question.language) {
        questionText = question.question || '';
    } else if (question.word && !question.language) {
        questionText = question.question || '';
    } else if (question.title && question.summary) {
        questionText = question.title;
    } else if (question.term) {
        questionText = question.question || '';
    } else {
        questionText = question.question || question.q || '';
    }
    
    // Get answer text
    let answerText = '';
    if (question.answer) {
        answerText = question.answer;
    } else {
        answerText = 'No answer available';
    }
    
    // Format the complete text as requested: "from section\n\nquestion: what is backend\n\nanswer: backend is this"
    const fullText = `from ${sectionName}\n\nquestion: ${questionText}\n\nanswer: ${answerText}`;
    
    console.log('📋 Final copied text:', fullText);
    copyToClipboard(fullText, 'Question and answer copied to clipboard!');
}

function copyToClipboard(text, successMessage) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage, 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(successMessage, 'success');
    });
}

// ==================== TIMER FUNCTIONALITY ====================
let timerState = {
    sessionId: null,
    startTime: null,
    accumulatedMs: 0,
    isRunning: false,
    intervalId: null,
    lastSyncTime: null
};

// Timer API functions
async function startTimer() {
    try {
        const sessionId = `revision_${Date.now()}`;
        timerState.sessionId = sessionId;
        
        const response = await fetch(`${API_BASE}/timers/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ sessionId })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        timerState.startTime = new Date(data.data.startedAt);
        timerState.accumulatedMs = data.data.accumulatedMs || 0;
        timerState.isRunning = true;
        timerState.lastSyncTime = Date.now();
        
        startTimerInterval();
        console.log('Timer started successfully');
    } catch (error) {
        console.error('Error starting timer:', error);
        // Fallback to local timer
        timerState.startTime = new Date();
        timerState.accumulatedMs = 0;
        timerState.isRunning = true;
        startTimerInterval();
    }
}

async function pauseTimer() {
    try {
        if (!timerState.sessionId) return;
        
        const response = await fetch(`${API_BASE}/timers/pause`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ sessionId: timerState.sessionId })
        });
        
        if (response.ok) {
            const data = await response.json();
            timerState.accumulatedMs = data.data.accumulatedMs;
        }
    } catch (error) {
        console.error('Error pausing timer:', error);
    }
    
    timerState.isRunning = false;
    if (timerState.intervalId) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
    }
}

async function resumeTimer() {
    try {
        if (!timerState.sessionId) return;
        
        const response = await fetch(`${API_BASE}/timers/resume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ sessionId: timerState.sessionId })
        });
        
        if (response.ok) {
            const data = await response.json();
            timerState.startTime = new Date(data.data.startedAt);
            timerState.accumulatedMs = data.data.accumulatedMs;
        }
    } catch (error) {
        console.error('Error resuming timer:', error);
        // Fallback to local timer
        timerState.startTime = new Date();
    }
    
    timerState.isRunning = true;
    startTimerInterval();
}

async function stopTimer() {
    try {
        if (!timerState.sessionId) return;
        
        const response = await fetch(`${API_BASE}/timers/stop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ sessionId: timerState.sessionId })
        });
        
        if (response.ok) {
            const data = await response.json();
            timerState.accumulatedMs = data.data.accumulatedMs;
        }
    } catch (error) {
        console.error('Error stopping timer:', error);
    }
    
    timerState.isRunning = false;
    if (timerState.intervalId) {
        clearInterval(timerState.intervalId);
        timerState.intervalId = null;
    }
}

function startTimerInterval() {
    if (timerState.intervalId) {
        clearInterval(timerState.intervalId);
    }
    
    timerState.intervalId = setInterval(() => {
        updateTimerDisplay();
        
        // Sync with server every 15 seconds
        if (Date.now() - timerState.lastSyncTime > 15000) {
            syncTimerWithServer();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('revisionTimer');
    if (!timerElement) return;
    
    const now = new Date();
    const elapsedMs = timerState.isRunning ? (now - timerState.startTime) : 0;
    const totalMs = timerState.accumulatedMs + elapsedMs;
    
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
    
    let timeString;
    if (hours > 0) {
        // Show hours:minutes:seconds format after 1 hour
        timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        // Show minutes:seconds format initially
        timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    timerElement.textContent = timeString;
}

async function syncTimerWithServer() {
    if (!timerState.sessionId || !timerState.isRunning) return;
    
    try {
        const now = new Date();
        const elapsedMs = now - timerState.startTime;
        const totalMs = timerState.accumulatedMs + elapsedMs;
        
        // Update accumulated time
        timerState.accumulatedMs = totalMs;
        timerState.startTime = now;
        timerState.lastSyncTime = Date.now();
        
        console.log('Timer synced with server');
    } catch (error) {
        console.error('Error syncing timer:', error);
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause timer
        if (timerState.isRunning) {
            pauseTimer();
        }
    } else {
        // Page is visible, resume timer
        if (timerState.sessionId && !timerState.isRunning) {
            resumeTimer();
        }
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (timerState.isRunning) {
        stopTimer();
    }
});

// ==================== SWIPE GESTURES FUNCTIONALITY ====================
let swipeState = {
    startX: 0,
    startY: 0,
    startTime: 0,
    isDragging: false,
    ghostElement: null,
    debounceTimer: null
};

// Swipe sensitivity thresholds - improved for better UX
const SWIPE_THRESHOLDS = {
    horizontal: 60, // pixels - increased for better sensitivity
    vertical: 80,   // pixels - increased for better sensitivity
    velocity: 0.15, // pixels per millisecond - reduced for easier triggering
    angle: 30       // degrees - increased angle tolerance
};

// Debounce delay
const SWIPE_DEBOUNCE = 150; // milliseconds

// Helper function to check if touch is in the central swipe zone (top 50% height, middle 40% width)
function isTouchInTopHalf(touch) {
    const questionCard = document.getElementById('questionCard');
    if (!questionCard) return false;
    
    const rect = questionCard.getBoundingClientRect();
    const cardHeight = rect.height;
    const cardWidth = rect.width;
    const cardTop = rect.top;
    const cardLeft = rect.left;
    
    // Calculate the central swipe zone boundaries
    // Use a fixed height for the swipe area instead of percentage to ensure it's always accessible
    const swipeAreaHeight = Math.min(200, cardHeight * 0.5); // Max 200px or 50% of card height
    const cardMiddle = cardTop + swipeAreaHeight;
    const leftBoundary = cardLeft + (cardWidth * 0.3); // Remove 30% from left
    const rightBoundary = cardLeft + (cardWidth * 0.7); // Remove 30% from right (keep middle 40%)
    
    // Check if touch is within the central swipe zone
    return touch.clientY >= cardTop && touch.clientY <= cardMiddle && 
           touch.clientX >= leftBoundary && touch.clientX <= rightBoundary;
}

// Helper function to check if mouse click is in the central swipe zone (top 50% height, middle 40% width)
function isMouseInTopHalf(mouseEvent) {
    const questionCard = document.getElementById('questionCard');
    if (!questionCard) return false;
    
    const rect = questionCard.getBoundingClientRect();
    const cardHeight = rect.height;
    const cardWidth = rect.width;
    const cardTop = rect.top;
    const cardLeft = rect.left;
    
    // Calculate the central swipe zone boundaries
    // Use a fixed height for the swipe area instead of percentage to ensure it's always accessible
    const swipeAreaHeight = Math.min(200, cardHeight * 0.5); // Max 200px or 50% of card height
    const cardMiddle = cardTop + swipeAreaHeight;
    const leftBoundary = cardLeft + (cardWidth * 0.3); // Remove 30% from left
    const rightBoundary = cardLeft + (cardWidth * 0.7); // Remove 30% from right (keep middle 40%)
    
    // Check if mouse click is within the central swipe zone
    return mouseEvent.clientY >= cardTop && mouseEvent.clientY <= cardMiddle && 
           mouseEvent.clientX >= leftBoundary && mouseEvent.clientX <= rightBoundary;
}

function initSwipeGestures() {
    const questionCard = document.getElementById('questionCard');
    if (!questionCard) return;
    
    // Add touch event listeners
    questionCard.addEventListener('touchstart', handleTouchStart, { passive: false });
    questionCard.addEventListener('touchmove', handleTouchMove, { passive: false });
    questionCard.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Add mouse event listeners for desktop testing
    questionCard.addEventListener('mousedown', handleMouseDown);
    questionCard.addEventListener('mousemove', handleMouseMove);
    questionCard.addEventListener('mouseup', handleMouseUp);
    questionCard.addEventListener('mouseleave', handleMouseUp);
    
    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyboardSwipe);
    
    // Hide swipe hint after first interaction
    hideSwipeHintAfterDelay();
    
    console.log('Swipe gestures initialized');
}

// Hide swipe hint after a delay or first interaction
function hideSwipeHintAfterDelay() {
    const questionCard = document.getElementById('questionCard');
    if (!questionCard) return;
    
    // Hide hint after 5 seconds
    setTimeout(() => {
        const hint = questionCard.querySelector('.swipe-hint');
        if (hint) {
            hint.style.opacity = '0';
        }
    }, 5000);
    
    // Hide hint immediately when user starts swiping
    const hideHintOnSwipe = () => {
        const hint = questionCard.querySelector('.swipe-hint');
        if (hint) {
            hint.style.opacity = '0';
        }
        // Remove event listeners after hiding
        questionCard.removeEventListener('touchstart', hideHintOnSwipe);
        questionCard.removeEventListener('mousedown', hideHintOnSwipe);
    };
    
    questionCard.addEventListener('touchstart', hideHintOnSwipe);
    questionCard.addEventListener('mousedown', hideHintOnSwipe);
}

function handleTouchStart(e) {
    const touch = e.touches[0];
    
    // Check if touch is in the top 50% of the question card
    if (!isTouchInTopHalf(touch)) {
        return; // Ignore touches in bottom half
    }
    
    swipeState.startX = touch.clientX;
    swipeState.startY = touch.clientY;
    swipeState.startTime = Date.now();
    swipeState.isDragging = true;
    
    // Prevent default to avoid scrolling
    e.preventDefault();
}

function handleTouchMove(e) {
    if (!swipeState.isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    
    // Show ghost preview
    showSwipeGhost(deltaX, deltaY);
    
    // Prevent default to avoid scrolling
    e.preventDefault();
}

function handleTouchEnd(e) {
    if (!swipeState.isDragging) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    const deltaTime = Date.now() - swipeState.startTime;
    
    processSwipe(deltaX, deltaY, deltaTime);
    
    // Clean up
    swipeState.isDragging = false;
    hideSwipeGhost();
    
    e.preventDefault();
}

function handleMouseDown(e) {
    // Check if mouse click is in the top 50% of the question card
    if (!isMouseInTopHalf(e)) {
        return; // Ignore clicks in bottom half
    }
    
    swipeState.startX = e.clientX;
    swipeState.startY = e.clientY;
    swipeState.startTime = Date.now();
    swipeState.isDragging = true;
    
    e.preventDefault();
}

function handleMouseMove(e) {
    if (!swipeState.isDragging) return;
    
    const deltaX = e.clientX - swipeState.startX;
    const deltaY = e.clientY - swipeState.startY;
    
    showSwipeGhost(deltaX, deltaY);
}

function handleMouseUp(e) {
    if (!swipeState.isDragging) return;
    
    const deltaX = e.clientX - swipeState.startX;
    const deltaY = e.clientY - swipeState.startY;
    const deltaTime = Date.now() - swipeState.startTime;
    
    processSwipe(deltaX, deltaY, deltaTime);
    
    // Clean up
    swipeState.isDragging = false;
    hideSwipeGhost();
}

function handleKeyboardSwipe(e) {
    // Only handle keyboard swipes in revision mode
    if (document.getElementById('revisionMode').style.display === 'none') return;
    
    let action = null;
    
    switch(e.key) {
        case 'ArrowLeft':
            action = 'wrong';
            break;
        case 'ArrowRight':
            action = 'correct';
            break;
        case 'ArrowDown':
            action = 'skip';
            break;
        default:
            return;
    }
    
    e.preventDefault();
    executeSwipeAction(action);
}

function processSwipe(deltaX, deltaY, deltaTime) {
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = distance / deltaTime;
    const angle = Math.atan2(Math.abs(deltaY), Math.abs(deltaX)) * (180 / Math.PI);
    
    console.log('🔄 Processing swipe:', { deltaX, deltaY, distance, velocity, angle });
    
    // More lenient swipe detection
    const isHorizontalSwipe = Math.abs(deltaX) > SWIPE_THRESHOLDS.horizontal && 
                             Math.abs(deltaY) < SWIPE_THRESHOLDS.vertical * 1.5 && // More lenient vertical tolerance
                             angle < SWIPE_THRESHOLDS.angle;
    
    const isVerticalSwipe = Math.abs(deltaY) > SWIPE_THRESHOLDS.vertical && 
                           Math.abs(deltaX) < SWIPE_THRESHOLDS.horizontal * 1.5 && // More lenient horizontal tolerance
                           angle > (90 - SWIPE_THRESHOLDS.angle);
    
    const hasEnoughVelocity = velocity > SWIPE_THRESHOLDS.velocity;
    
    console.log('📊 Swipe analysis:', { isHorizontalSwipe, isVerticalSwipe, hasEnoughVelocity });
    
    if ((isHorizontalSwipe || isVerticalSwipe) && hasEnoughVelocity) {
        // Debounce the action
        if (swipeState.debounceTimer) {
            clearTimeout(swipeState.debounceTimer);
        }
        
        swipeState.debounceTimer = setTimeout(() => {
            let action = null;
            
            if (isHorizontalSwipe) {
                action = deltaX > 0 ? 'correct' : 'wrong';
            } else if (isVerticalSwipe && deltaY > 0) {
                action = 'skip';
            }
            
            if (action) {
                console.log('✅ Executing swipe action:', action);
                executeSwipeAction(action);
            }
        }, SWIPE_DEBOUNCE);
    }
}

function showSwipeGhost(deltaX, deltaY) {
    if (swipeState.ghostElement) {
        swipeState.ghostElement.remove();
    }
    
    const questionCard = document.getElementById('questionCard');
    const ghost = document.createElement('div');
    ghost.className = 'swipe-ghost';
    
    // Calculate swipe direction and intensity
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const intensity = Math.min(distance / 100, 1); // Normalize to 0-1
    
    // Determine action based on swipe direction
    let actionText = '';
    let backgroundColor = '';
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            actionText = '✓ Correct';
            backgroundColor = `rgba(16, 185, 129, ${intensity * 0.3})`;
        } else {
            actionText = '✗ Wrong';
            backgroundColor = `rgba(239, 68, 68, ${intensity * 0.3})`;
        }
    } else if (deltaY > 0) {
        actionText = '⏭️ Skip';
        backgroundColor = `rgba(245, 158, 11, ${intensity * 0.3})`;
    }
    
    // Only show ghost if there's a clear action
    if (actionText && distance > 30) {
    ghost.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
            background: ${backgroundColor};
        border-radius: 10px;
        pointer-events: none;
        z-index: 1000;
            transform: translate(${deltaX * 0.1}px, ${deltaY * 0.1}px);
            transition: all 0.1s ease;
            backdrop-filter: blur(2px);
        `;
        
        ghost.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        font-size: 1.8rem; font-weight: bold; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                        opacity: ${intensity};">
                ${actionText}
            </div>
        `;
    
    questionCard.style.position = 'relative';
    questionCard.appendChild(ghost);
    swipeState.ghostElement = ghost;
    }
}

function hideSwipeGhost() {
    if (swipeState.ghostElement) {
        swipeState.ghostElement.remove();
        swipeState.ghostElement = null;
    }
}

function executeSwipeAction(action) {
    // Add haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Add sound feedback
    if (window.SoundEffects) {
        window.SoundEffects.playSound('click');
    }
    
    // Execute the action
    switch(action) {
        case 'correct':
            markCorrect();
            break;
        case 'wrong':
            markWrong();
            break;
        case 'skip':
            skipQuestion();
            break;
    }
    
    // Show visual feedback
    showSwipeFeedback(action);
}

function showSwipeFeedback(action) {
    const questionCard = document.getElementById('questionCard');
    const feedback = document.createElement('div');
    feedback.className = 'swipe-feedback';
    
    let text = '';
    let color = '';
    
    switch(action) {
        case 'correct':
            text = '✓ Correct!';
            color = 'var(--btn-success)';
            break;
        case 'wrong':
            text = '✗ Wrong';
            color = 'var(--btn-danger)';
            break;
        case 'skip':
            text = '⏭️ Skipped';
            color = 'var(--btn-primary)';
            break;
    }
    
    feedback.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${color};
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 1001;
        pointer-events: none;
        animation: swipeFeedback 0.5s ease-out;
    `;
    feedback.textContent = text;
    
    questionCard.appendChild(feedback);
    
    // Remove after animation
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 500);
}

// Add CSS for swipe feedback animation
const swipeCSS = `
@keyframes swipeFeedback {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1);
    }
}
`;

// Add swipe CSS to head
const swipeStyle = document.createElement('style');
swipeStyle.textContent = swipeCSS;
document.head.appendChild(swipeStyle);

// ==================== OFFLINE MODE FUNCTIONALITY ====================
let offlineState = {
    isOnline: navigator.onLine,
    queueCount: 0,
    lowDataMode: false
};

// Initialize offline mode
function initOfflineMode() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration);
                
                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    }
    
    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Listen for Service Worker messages
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    }
    
    // Initialize offline queue
    updateOfflineQueueCount();
    
    console.log('Offline mode initialized');
}

function handleOnline() {
    offlineState.isOnline = true;
    console.log('App is online');
    
    // Trigger background sync
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then((registration) => {
            return registration.sync.register('evermind-sync');
        });
    }
    
    // Update UI
    updateOfflineIndicator();
    showToast('Back online! Syncing data...', 'success');
}

function handleOffline() {
    offlineState.isOnline = false;
    console.log('App is offline');
    
    // Update UI
    updateOfflineIndicator();
    showToast('You are offline. Changes will sync when back online.', 'info');
}

function handleServiceWorkerMessage(event) {
    const { type, successful, failed, total } = event.data;
    
    switch (type) {
        case 'SYNC_RESULT':
            updateOfflineQueueCount();
            if (successful > 0) {
                showToast(`Synced ${successful} items successfully`, 'success');
            }
            if (failed > 0) {
                showToast(`${failed} items failed to sync`, 'error');
            }
            break;
    }
}

function updateOfflineIndicator() {
    const indicator = document.getElementById('offlineIndicator');
    if (!indicator) return;
    
    if (offlineState.isOnline) {
        indicator.style.display = 'none';
    } else {
        indicator.style.display = 'block';
    }
}

async function updateOfflineQueueCount() {
    try {
        const queue = await getOfflineQueue();
        offlineState.queueCount = queue.length;
        
        // Update UI if there's a queue indicator
        const queueIndicator = document.getElementById('queueCount');
        if (queueIndicator) {
            queueIndicator.textContent = offlineState.queueCount;
            queueIndicator.style.display = offlineState.queueCount > 0 ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Failed to update offline queue count:', error);
    }
}

// Offline queue management
async function getOfflineQueue() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('evermind-offline', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['queue'], 'readonly');
            const store = transaction.objectStore('queue');
            const getAllRequest = store.getAll();
            
            getAllRequest.onsuccess = () => resolve(getAllRequest.result || []);
            getAllRequest.onerror = () => reject(getAllRequest.error);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('queue')) {
                db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

async function addToOfflineQueue(item) {
    try {
        const queue = await getOfflineQueue();
        queue.push({
            ...item,
            timestamp: Date.now()
        });
        
        await setOfflineQueue(queue);
        await updateOfflineQueueCount();
        
        console.log('Added to offline queue:', item);
    } catch (error) {
        console.error('Failed to add to offline queue:', error);
    }
}

async function setOfflineQueue(queue) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('evermind-offline', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['queue'], 'readwrite');
            const store = transaction.objectStore('queue');
            
            // Clear existing queue
            store.clear();
            
            // Add new items
            queue.forEach(item => store.add(item));
            
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('queue')) {
                db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

// Enhanced API calls with offline support
async function apiCall(url, options = {}) {
    const { method = 'GET', body, headers = {} } = options;
    
    // Add user ID to headers
    headers['x-user-id'] = 'default-user-id';
    
    if (body && typeof body === 'object') {
        headers['Content-Type'] = 'application/json';
    }
    
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        // If offline or network error, queue the request
        if (!offlineState.isOnline || error.name === 'TypeError') {
            console.log('Queueing request for offline sync:', url);
            
            await addToOfflineQueue({
                method,
                url,
                body,
                headers
            });
            
            // Return a mock response for offline mode
            return {
                success: true,
                message: 'Queued for offline sync',
                offline: true
            };
        }
        
        throw error;
    }
}

// Low Data Mode toggle
function toggleLowDataMode() {
    offlineState.lowDataMode = !offlineState.lowDataMode;
    
    // Update UI
    const toggle = document.getElementById('lowDataToggle');
    if (toggle) {
        toggle.textContent = offlineState.lowDataMode ? 'Low Data: ON' : 'Low Data: OFF';
        toggle.className = offlineState.lowDataMode ? 'btn btn--danger' : 'btn btn--nav';
    }
    
    // Apply low data mode settings
    if (offlineState.lowDataMode) {
        // Disable animations, reduce image quality, etc.
        document.body.classList.add('low-data-mode');
    } else {
        document.body.classList.remove('low-data-mode');
    }
    
    showToast(`Low Data Mode ${offlineState.lowDataMode ? 'enabled' : 'disabled'}`, 'info');
}

function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div style="background: var(--btn-primary); color: white; padding: 15px; border-radius: 8px; 
                    margin: 10px; text-align: center; position: fixed; top: 0; left: 0; right: 0; z-index: 10000;">
            <p style="margin: 0 0 10px 0;">App update available!</p>
            <button class="btn btn--success" onclick="updateApp()" style="margin-right: 10px;">Update</button>
            <button class="btn btn--nav" onclick="this.parentElement.parentElement.remove()">Later</button>
        </div>
    `;
    
    document.body.appendChild(notification);
}

function updateApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });
    }
}

// ==================== SECRET VISION BOARD FUNCTIONALITY ====================
let secretVisionState = {
    isAuthenticated: false,
    items: [],
    currentSlide: 0,
    isPlaying: false,
    playInterval: null,
    pinAttempts: 0,
    lockoutUntil: 0
};

// Secret Vision Board API functions
async function verifySecretPin(pin) {
    try {
        const data = await apiCall(`${API_BASE}/secret/verify-pin`, {
            method: 'POST',
            body: { pin }
        });
        
        if (data.success) {
            secretVisionState.isAuthenticated = true;
            secretVisionState.pinAttempts = 0;
            return true;
        } else {
            secretVisionState.pinAttempts++;
            return false;
        }
    } catch (error) {
        console.error('Error verifying PIN:', error);
        return false;
    }
}

async function setSecretPin(pin) {
    try {
        const data = await apiCall(`${API_BASE}/secret/set-pin`, {
            method: 'POST',
            body: { pin }
        });
        
        return data.success;
    } catch (error) {
        console.error('Error setting PIN:', error);
        return false;
    }
}

async function fetchSecretItems() {
    try {
        const data = await apiCall(`${API_BASE}/secret/items`);
        secretVisionState.items = data.data || [];
        return data.data || [];
    } catch (error) {
        console.error('Error fetching secret items:', error);
        return [];
    }
}

async function createSecretItem(itemData) {
    try {
        const data = await apiCall(`${API_BASE}/secret/items`, {
            method: 'POST',
            body: itemData
        });
        
        if (data.success) {
            secretVisionState.items.push(data.data);
        }
        
        return data.success;
    } catch (error) {
        console.error('Error creating secret item:', error);
        return false;
    }
}

async function updateSecretItem(itemId, itemData) {
    try {
        const data = await apiCall(`${API_BASE}/secret/items/${itemId}`, {
            method: 'PATCH',
            body: itemData
        });
        
        if (data.success) {
            const index = secretVisionState.items.findIndex(item => item._id === itemId);
            if (index !== -1) {
                secretVisionState.items[index] = data.data;
            }
        }
        
        return data.success;
    } catch (error) {
        console.error('Error updating secret item:', error);
        return false;
    }
}

async function deleteSecretItem(itemId) {
    try {
        const data = await apiCall(`${API_BASE}/secret/items/${itemId}`, {
            method: 'DELETE'
        });
        
        if (data.success) {
            secretVisionState.items = secretVisionState.items.filter(item => item._id !== itemId);
        }
        
        return data.success;
    } catch (error) {
        console.error('Error deleting secret item:', error);
        return false;
    }
}

// Secret Vision Board UI functions
function openSecretVisionModal() {
    const modal = document.getElementById('secretVisionModal');
    modal.style.display = 'flex';
    
    if (secretVisionState.isAuthenticated) {
        showSecretVisionContent();
    } else {
        showSecretPinPrompt();
    }
}

function closeSecretVisionModal() {
    const modal = document.getElementById('secretVisionModal');
    modal.style.display = 'none';
    secretVisionState.isAuthenticated = false;
}

function showSecretPinPrompt() {
    const content = document.getElementById('secretVisionContent');
    content.innerHTML = `
        <div class="pin-setup">
            <h3>🔐 Secret Vision Board</h3>
            <p>This is your private space for personal affirmations and vision board items.</p>
            <div class="pin-actions">
                <button class="btn btn--primary" onclick="showPinInput()">Enter PIN</button>
                <button class="btn btn--nav" onclick="showPinSetup()">Set Up PIN</button>
            </div>
        </div>
    `;
}

function showPinInput() {
    document.getElementById('secretPinModal').style.display = 'flex';
    document.getElementById('secretPinInput').focus();
}

function closeSecretPinModal() {
    document.getElementById('secretPinModal').style.display = 'none';
    document.getElementById('secretPinInput').value = '';
    document.getElementById('pinError').style.display = 'none';
}

async function verifySecretPin() {
    const pin = document.getElementById('secretPinInput').value;
    
    if (!pin) {
        showPinError('Please enter a PIN');
        return;
    }
    
    // Check lockout
    if (secretVisionState.lockoutUntil > Date.now()) {
        const remainingTime = Math.ceil((secretVisionState.lockoutUntil - Date.now()) / 1000);
        showPinError(`Too many failed attempts. Try again in ${remainingTime} seconds.`);
        return;
    }
    
    const isValid = await verifySecretPin(pin);
    
    if (isValid) {
        closeSecretPinModal();
        await showSecretVisionContent();
    } else {
        secretVisionState.pinAttempts++;
        
        if (secretVisionState.pinAttempts >= 3) {
            secretVisionState.lockoutUntil = Date.now() + (5 * 60 * 1000); // 5 minutes
            showPinError('Too many failed attempts. Locked for 5 minutes.');
        } else {
            showPinError(`Invalid PIN. ${3 - secretVisionState.pinAttempts} attempts remaining.`);
        }
    }
}

function showPinError(message) {
    const errorDiv = document.getElementById('pinError');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function showPinSetup() {
    const content = document.getElementById('secretVisionContent');
    content.innerHTML = `
        <div class="pin-setup">
            <h3>🔐 Set Up Secret PIN</h3>
            <p>Create a 4-20 character PIN to secure your Secret Vision Board.</p>
            <div class="pin-input-group">
                <input type="password" id="newPinInput" placeholder="Enter new PIN" maxlength="20">
                <input type="password" id="confirmPinInput" placeholder="Confirm PIN" maxlength="20">
                <div id="pinSetupError" class="pin-error" style="display: none;"></div>
                <div class="pin-actions">
                    <button class="btn btn--primary" onclick="setupSecretPin()">Set PIN</button>
                    <button class="btn btn--nav" onclick="showSecretPinPrompt()">Back</button>
                </div>
            </div>
        </div>
    `;
}

async function setupSecretPin() {
    const pin = document.getElementById('newPinInput').value;
    const confirmPin = document.getElementById('confirmPinInput').value;
    
    if (!pin || pin.length < 4) {
        showPinSetupError('PIN must be at least 4 characters long');
        return;
    }
    
    if (pin !== confirmPin) {
        showPinSetupError('PINs do not match');
        return;
    }
    
    const success = await setSecretPin(pin);
    
    if (success) {
        secretVisionState.isAuthenticated = true;
        await showSecretVisionContent();
    } else {
        showPinSetupError('Failed to set PIN. Please try again.');
    }
}

function showPinSetupError(message) {
    const errorDiv = document.getElementById('pinSetupError');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

async function showSecretVisionContent() {
    const content = document.getElementById('secretVisionContent');
    
    await fetchSecretItems();
    
    if (secretVisionState.items.length === 0) {
        content.innerHTML = `
            <div class="empty-vision-board">
                <h3>🔮 Your Secret Vision Board</h3>
                <p>Add affirmations and images to create your personal vision board.</p>
                <button class="btn btn--primary" onclick="addSecretItem()">Add First Item</button>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="vision-board-controls">
                <h3>🔮 Your Secret Vision Board</h3>
                <div class="vision-board-actions">
                    <button class="btn btn--primary" onclick="startSlideshow()">View Slideshow</button>
                    <button class="btn btn--nav" onclick="manageSecretItems()">Manage Items</button>
                </div>
            </div>
        `;
    }
}

function startSlideshow() {
    document.getElementById('secretSlideshow').style.display = 'flex';
    secretVisionState.currentSlide = 0;
    renderSlideshow();
    startAutoPlay();
}

function closeSecretSlideshow() {
    document.getElementById('secretSlideshow').style.display = 'none';
    stopAutoPlay();
}

function renderSlideshow() {
    const content = document.getElementById('slideshowContent');
    const counter = document.getElementById('slideCounter');
    
    if (secretVisionState.items.length === 0) {
        content.innerHTML = '<div class="empty-slideshow">No items to display</div>';
        counter.textContent = '0 / 0';
        return;
    }
    
    const currentItem = secretVisionState.items[secretVisionState.currentSlide];
    let slideHTML = '';
    
    if (currentItem.type === 'affirmation') {
        slideHTML = `
            <div class="slide affirmation-slide">
                <div class="affirmation-content">
                    <h2>${currentItem.text}</h2>
                    ${currentItem.tags.length > 0 ? `<div class="tags">${currentItem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
                </div>
            </div>
        `;
    } else if (currentItem.type === 'image') {
        slideHTML = `
            <div class="slide image-slide">
                <img src="${currentItem.imageUrl}" alt="Vision item" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="image-placeholder" style="display: none;">
                    <p>Image failed to load</p>
                    <button class="btn btn--primary" onclick="editSecretItem('${currentItem._id}')">Edit</button>
                </div>
                ${currentItem.tags.length > 0 ? `<div class="tags">${currentItem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
            </div>
        `;
    }
    
    content.innerHTML = slideHTML;
    counter.textContent = `${secretVisionState.currentSlide + 1} / ${secretVisionState.items.length}`;
}

function nextSlide() {
    if (secretVisionState.items.length === 0) return;
    
    secretVisionState.currentSlide = (secretVisionState.currentSlide + 1) % secretVisionState.items.length;
    renderSlideshow();
}

function previousSlide() {
    if (secretVisionState.items.length === 0) return;
    
    secretVisionState.currentSlide = secretVisionState.currentSlide === 0 
        ? secretVisionState.items.length - 1 
        : secretVisionState.currentSlide - 1;
    renderSlideshow();
}

function startAutoPlay() {
    if (secretVisionState.isPlaying) return;
    
    secretVisionState.isPlaying = true;
    secretVisionState.playInterval = setInterval(() => {
        nextSlide();
    }, 5000); // 5 seconds per slide
}

function stopAutoPlay() {
    secretVisionState.isPlaying = false;
    if (secretVisionState.playInterval) {
        clearInterval(secretVisionState.playInterval);
        secretVisionState.playInterval = null;
    }
}

function manageSecretItems() {
    const content = document.getElementById('secretVisionContent');
    content.innerHTML = `
        <div class="items-management">
            <h3>Manage Secret Items</h3>
            <div class="items-list" id="secretItemsList">
                ${secretVisionState.items.map(item => `
                    <div class="secret-item-card">
                        <div class="item-content">
                            ${item.type === 'affirmation' ? 
                                `<div class="affirmation-preview">${item.text}</div>` :
                                `<img src="${item.imageUrl}" alt="Vision item" class="image-preview">`
                            }
                            ${item.tags.length > 0 ? `<div class="tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
                        </div>
                        <div class="item-actions">
                            <button class="btn btn--primary" onclick="editSecretItem('${item._id}')">Edit</button>
                            <button class="btn btn--danger" onclick="deleteSecretItem('${item._id}')">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="management-actions">
                <button class="btn btn--primary" onclick="addSecretItem()">Add New Item</button>
                <button class="btn btn--nav" onclick="showSecretVisionContent()">Back</button>
            </div>
        </div>
    `;
}

function addSecretItem() {
    secretVisionState.editingItem = null;
    document.getElementById('secretItemTitle').textContent = 'Add Secret Item';
    document.getElementById('secretItemForm').reset();
    document.getElementById('deleteItemBtn').style.display = 'none';
    document.getElementById('secretItemModal').style.display = 'flex';
}

function editSecretItem(itemId) {
    const item = secretVisionState.items.find(i => i._id === itemId);
    if (!item) return;
    
    secretVisionState.editingItem = item;
    document.getElementById('secretItemTitle').textContent = 'Edit Secret Item';
    document.getElementById('itemType').value = item.type;
    document.getElementById('itemText').value = item.text || '';
    document.getElementById('itemImageUrl').value = item.imageUrl || '';
    document.getElementById('itemTags').value = item.tags.join(', ');
    document.getElementById('deleteItemBtn').style.display = 'inline-block';
    document.getElementById('secretItemModal').style.display = 'flex';
    
    toggleItemFields();
}

function closeSecretItemModal() {
    document.getElementById('secretItemModal').style.display = 'none';
    secretVisionState.editingItem = null;
}

function toggleItemFields() {
    const type = document.getElementById('itemType').value;
    const textField = document.getElementById('textField');
    const imageField = document.getElementById('imageField');
    
    if (type === 'affirmation') {
        textField.style.display = 'block';
        imageField.style.display = 'none';
    } else {
        textField.style.display = 'none';
        imageField.style.display = 'block';
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('secretItemForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const type = document.getElementById('itemType').value;
            const text = document.getElementById('itemText').value;
            const imageUrl = document.getElementById('itemImageUrl').value;
            const tags = document.getElementById('itemTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
            
            const itemData = {
                type,
                text: type === 'affirmation' ? text : undefined,
                imageUrl: type === 'image' ? imageUrl : undefined,
                tags
            };
            
            let success = false;
            
            if (secretVisionState.editingItem) {
                success = await updateSecretItem(secretVisionState.editingItem._id, itemData);
            } else {
                success = await createSecretItem(itemData);
            }
            
            if (success) {
                closeSecretItemModal();
                manageSecretItems(); // Refresh the management view
                showToast(secretVisionState.editingItem ? 'Item updated successfully!' : 'Item created successfully!', 'success');
            } else {
                showToast('Failed to save item. Please try again.', 'error');
            }
        });
    }
});

// Secret Affirmation Page with PIN Protection
const SECRET_PIN = '2314'; // Hardcoded PIN - not editable

function openSecretAffirmationPage() {
    console.log('🔐 Opening Secret Affirmation Page');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('secretPinModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create PIN input modal with better performance
    const pinModal = document.createElement('div');
    pinModal.id = 'secretPinModal';
    pinModal.className = 'modal';
    pinModal.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: rgba(0, 0, 0, 0.8) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 10000 !important;
        backdrop-filter: blur(5px) !important;
    `;
    
    pinModal.innerHTML = `
        <div class="modal-content" style="max-width: 400px; text-align: center; background: var(--bg-primary); border-radius: 12px; padding: 0; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
            <div class="modal-header" style="padding: 20px 20px 0 20px;">
                <h2 style="margin: 0; color: var(--text-primary);">🔐 Secret Access</h2>
            </div>
            <div class="modal-body" style="padding: 20px;">
                <p style="margin-bottom: 20px; color: var(--text-primary);">Enter PIN:</p>
                <input type="password" id="secretPinInput" placeholder="Enter PIN" maxlength="4" style="
                    width: 100%;
                    padding: 15px;
                    font-size: 1.2rem;
                    text-align: center;
                    border: 2px solid var(--border-color);
                    border-radius: 8px;
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    margin-bottom: 20px;
                    box-sizing: border-box;
                ">
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="checkSecretPin()" class="btn btn--primary" style="flex: 1;">Access</button>
                    <button onclick="closeSecretPinModal()" class="btn btn--secondary" style="flex: 1;">Cancel</button>
                </div>
                <div id="pinError" style="color: var(--btn-danger); margin-top: 10px; display: none;">
                    ❌ Invalid PIN
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(pinModal);
    
    // Focus on input immediately
    const pinInput = document.getElementById('secretPinInput');
    pinInput.focus();
    
    // Add event listeners with better performance
    pinInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkSecretPin();
        }
    });
    
    // Close on escape key
    pinInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeSecretPinModal();
        }
    });
    
    // Close on backdrop click
    pinModal.addEventListener('click', function(e) {
        if (e.target === pinModal) {
            closeSecretPinModal();
        }
    });
}

function checkSecretPin() {
    const pinInput = document.getElementById('secretPinInput');
    const pinError = document.getElementById('pinError');
    const enteredPin = pinInput.value.trim(); // Add trim to remove any whitespace
    
    console.log('🔐 Checking PIN:', enteredPin, 'Expected:', SECRET_PIN);
    
    if (enteredPin === SECRET_PIN) {
        console.log('🔐 Correct PIN entered, opening secret page');
        
        // Play success sound
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('complete'); // Sweet success sound
        }
        
        closeSecretPinModal();
        showSecretAffirmationPage();
    } else {
        console.log('🔐 Invalid PIN entered:', enteredPin);
        
        // Play error sound
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('error'); // Dupdup error sound
        }
        
        pinError.style.display = 'block';
        pinInput.value = '';
        pinInput.focus();
        
        // Shake animation
        pinInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            pinInput.style.animation = '';
        }, 500);
    }
}

function closeSecretPinModal() {
    const pinModal = document.getElementById('secretPinModal');
    if (pinModal) {
        // Play cancel sound
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
        
        pinModal.remove();
    }
}

function showSecretAffirmationPage() {
    console.log('🔐 Showing Secret Affirmation Page');
    
    // Create secret page
    const secretPage = document.createElement('div');
    secretPage.id = 'secretAffirmationPage';
    secretPage.className = 'page';
    secretPage.innerHTML = `
        <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; position: relative;">
            <button class="btn btn--nav" onclick="closeSecretAffirmationPage()" style="position: absolute; left: 20px; top: 20px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);">← Back</button>
            <h1 style="margin: 0; font-size: 2.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🌟 MY VISION BOARD</h1>
            <p style="opacity: 0.9; margin-top: 10px; font-size: 1.1rem;">Manifesting My Dreams Into Reality</p>
        </header>
        
        <div class="secret-content" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); min-height: calc(100vh - 120px); position: relative; overflow: hidden;">
            
            <!-- Luxury Carousel -->
            <div class="luxury-carousel" style="position: relative; height: 300px; overflow: hidden; margin-bottom: 40px;">
                <div class="carousel-container" style="display: flex; animation: slideShow 20s infinite; width: 2000%;">
                    <!-- Braces -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #ff6b6b, #ffa500); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="https://orthodonticproductsonline.com/wp-content/uploads/2018/06/WildSmiles-Star-DesignerBraces-1200x900.jpg" alt="Perfect Smile" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Perfect Smile</div>
                        </div>
                    </div>
                    
                    <!-- iPhone 17 Pro Max -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8oS28AAYx2VMZ_vXOfMv27Nek5DF-5RgxlucvkdmpzxFoR0zoDJwclQ&s=10" alt="iPhone 17 Pro Max" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>iPhone 17 Pro Max</div>
                        </div>
                    </div>
                    
                    <!-- Samsung Galaxy Z Fold 7 -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="https://i.pinimg.com/736x/1c/66/68/1c666840b4e9c08989b77a2307471735.jpg" alt="Galaxy Z Fold 7" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Galaxy Z Fold 7</div>
                        </div>
                    </div>
                    
                    <!-- Elegant Men -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #2c3e50, #34495e); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsflWF-rHeNtpry4my3jyE7vChM17sh1xDdEjrxZgxA&s=10" alt="Elegant Style" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Elegant Style</div>
                        </div>
                    </div>
                    
                    <!-- Mercedes -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #c0392b, #e74c3c); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHg0El8lzEQXRByXBdZ8kOTg2Gsr2kr16tC9s3ZbBUuhThexbM5sc94rA&s=10" alt="Mercedes-Benz" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Mercedes-Benz</div>
                        </div>
                    </div>
                    
                    <!-- Lamborghini -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #f39c12, #e67e22); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0kmVaGtMmkp2p90M3f7QQIzD3_JloJBHA6UArgQ4ht7rLk2fq5kAXCOQ&s=10" alt="Lamborghini" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Lamborghini</div>
                        </div>
                    </div>
                    
                    <!-- Ferrari -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #e74c3c, #c0392b); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="#" alt="Ferrari" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Ferrari</div>
                        </div>
                    </div>
                    
                    <!-- Porsche -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #8e44ad, #9b59b6); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="#" alt="Porsche" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Porsche</div>
                        </div>
                    </div>
                    
                    <!-- Lexus RX 350 -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #16a085, #1abc9c); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="#" alt="Lexus RX 350" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Lexus RX 350</div>
                        </div>
                    </div>
                    
                    <!-- Big Pickup Truck -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #2c3e50, #34495e); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="#" alt="Mega Pickup" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Mega Pickup</div>
                        </div>
                    </div>
                    
                    <!-- Mansions -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #f1c40f, #f39c12); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="#" alt="Mega Mansions" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Mega Mansions</div>
                        </div>
                    </div>
                    
                    <!-- Beautiful Houses -->
                    <div class="carousel-item" style="flex: 0 0 5%; background: linear-gradient(45deg, #27ae60, #2ecc71); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <div style="text-align: center;">
                            <img src="#" alt="Dream Houses" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div>Dream Houses</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Affirmations Container -->
            <div class="affirmations-container" style="max-width: 900px; margin: 0 auto; padding: 0 20px;">
                <div class="affirmations-content" style="background: rgba(255, 255, 255, 0.95); border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); backdrop-filter: blur(10px);">
                    
                    <!-- Main Title -->
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h2 style="color: #2c3e50; font-size: 2.5rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">I AM AN OVERCOMER</h2>
                        <div style="width: 100px; height: 4px; background: linear-gradient(45deg, #667eea, #764ba2); margin: 20px auto; border-radius: 2px;"></div>
                    </div>
                    
                    <!-- Affirmations Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        
                        <!-- Wealth & Success -->
                        <div class="affirmation-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.3rem; text-align: center;">💰 WEALTH & SUCCESS</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="margin-bottom: 8px;">✨ I will never be poor</li>
                                <li style="margin-bottom: 8px;">💎 I will have hundreds of MILLIONS in my bank account</li>
                                <li style="margin-bottom: 8px;">👑 I will be RICH</li>
                                <li style="margin-bottom: 8px;">🏆 I will turn my life around for the better</li>
                                <li style="margin-bottom: 8px;">🌍 I will explore the world</li>
                                <li style="margin-bottom: 8px;">🎯 I deserve every good thing life has to offer</li>
                                <li style="margin-bottom: 8px;">👑 No one is above me</li>
                                <li style="margin-bottom: 8px;">💪 I am rich, I am smart, I am blessed</li>
                            </ul>
                        </div>
                        
                        <!-- Programming Excellence -->
                        <div class="affirmation-card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.3rem; text-align: center;">💻 PROGRAMMING GOD</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="margin-bottom: 8px;">🚀 I must become a literal programming God</li>
                                <li style="margin-bottom: 8px;">🧠 My knowledge will be out of this world</li>
                                <li style="margin-bottom: 8px;">⭐ I will be the best among my peers</li>
                                <li style="margin-bottom: 8px;">🌟 I will stand out and be special</li>
                                <li style="margin-bottom: 8px;">💡 My ideas are unique and extraordinary</li>
                                <li style="margin-bottom: 8px;">🌐 I will become a multilingual programming God</li>
                                <li style="margin-bottom: 8px;">🏆 I will be well known, respected and highly sought after</li>
                                <li style="margin-bottom: 8px;">⚡ Every hour coding today is one step away from being broke tomorrow</li>
                            </ul>
                        </div>
                        
                        <!-- Personal Growth -->
                        <div class="affirmation-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.3rem; text-align: center;">🌱 PERSONAL GROWTH</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="margin-bottom: 8px;">📚 I will read for my exams and get good grades</li>
                                <li style="margin-bottom: 8px;">🙏 I will start praying at night</li>
                                <li style="margin-bottom: 8px;">📖 I will start reading my Bible</li>
                                <li style="margin-bottom: 8px;">⏰ There is no time, I will rush everything like it's last minute</li>
                                <li style="margin-bottom: 8px;">🎯 Grace follows me everywhere I go</li>
                                <li style="margin-bottom: 8px;">✨ Everything happens for a reason</li>
                                <li style="margin-bottom: 8px;">🛑 I will stop anticipating</li>
                                <li style="margin-bottom: 8px;">💪 I would rather die before I quit</li>
                            </ul>
                        </div>
                        
                        <!-- Material Dreams -->
                        <div class="affirmation-card" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.3rem; text-align: center;">🏠 MATERIAL DREAMS</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="margin-bottom: 8px;">🏡 I will build a house for myself</li>
                                <li style="margin-bottom: 8px;">👨‍👩‍👧‍👦 I will build a house for my parents</li>
                                <li style="margin-bottom: 8px;">🔑 I will never pay rent - I will own my own house</li>
                                <li style="margin-bottom: 8px;">🚗 I will buy my dream car - Lexus RX 350 2022</li>
                                <li style="margin-bottom: 8px;">🚙 I will buy cars for my parents</li>
                                <li style="margin-bottom: 8px;">🏘️ I will be a landlord with multiple houses</li>
                                <li style="margin-bottom: 8px;">🚗 I will own multiple cars</li>
                                <li style="margin-bottom: 8px;">💰 I will invest & multiply every naira and dollar I earn</li>
                            </ul>
                        </div>
                        
                        <!-- Physical & Spiritual -->
                        <div class="affirmation-card" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.3rem; text-align: center;">👨‍💼 PHYSICAL & SPIRITUAL</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="margin-bottom: 8px;">😎 I am tall, handsome, confident with great facial features</li>
                                <li style="margin-bottom: 8px;">🧔 My beard makes me look matured and handsome</li>
                                <li style="margin-bottom: 8px;">💇‍♂️ My long rattled hair increases my aura</li>
                                <li style="margin-bottom: 8px;">👥 Everyone wants to be my friend</li>
                                <li style="margin-bottom: 8px;">🙏 I am a steward of the manifold Grace of God</li>
                                <li style="margin-bottom: 8px;">✝️ I can do all things through Christ who strengthens me</li>
                                <li style="margin-bottom: 8px;">👑 I am a paradigm of Greatness</li>
                                <li style="margin-bottom: 8px;">🎯 I will serve God in good times, bad times, perilous times</li>
                            </ul>
                        </div>
                        
                        <!-- Systems & Learning -->
                        <div class="affirmation-card" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #2c3e50; padding: 25px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.3rem; text-align: center;">🔧 SYSTEMS & LEARNING</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8;">
                                <li style="margin-bottom: 8px;">🏗️ I will build systems for freedom</li>
                                <li style="margin-bottom: 8px;">📚 I will learn forever & aggressively</li>
                                <li style="margin-bottom: 8px;">💪 I choose discomfort now for future ease</li>
                                <li style="margin-bottom: 8px;">⚡ I will rush everything like it's last minute</li>
                                <li style="margin-bottom: 8px;">🎯 Ngawin will pay and surprise me</li>
                                <li style="margin-bottom: 8px;">🌟 I will be favored everywhere I go</li>
                                <li style="margin-bottom: 8px;">💎 I will have so much money I won't know what to do with it</li>
                                <li style="margin-bottom: 8px;">🚫 I can get any girl I want but choose not to</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Bottom Quote -->
                    <div style="text-align: center; margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; color: white;">
                        <h3 style="margin: 0; font-size: 1.8rem; font-style: italic;">"I will praise, worship and pray to Him till the day I die"</h3>
                        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 1.1rem;">Manifesting greatness through faith, hard work, and divine grace</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(secretPage);
    showPage('secretAffirmationPage');
}

function closeSecretAffirmationPage() {
    const secretPage = document.getElementById('secretAffirmationPage');
    if (secretPage) {
        secretPage.remove();
    }
    showPage('homepage');
}

// Add hidden trigger for Secret Affirmation Page
function addSecretVisionTrigger() {
    // Add trigger to loading screen title
    const loadingTitle = document.querySelector('.loading-title');
    if (loadingTitle) {
        console.log('🔐 Secret Affirmation Page trigger added to loading title:', loadingTitle.textContent);
        loadingTitle.addEventListener('click', function(e) {
            console.log('🔐 Loading EVERMIND title clicked');
            openSecretAffirmationPage();
        });
    } else {
        console.warn('⚠️ Loading title not found for Secret Affirmation Page trigger');
    }
    
    // Add trigger to main page title
    const evermindTitle = document.querySelector('h1:not(.loading-title)');
    if (evermindTitle) {
        console.log('🔐 Secret Affirmation Page trigger added to main title:', evermindTitle.textContent);
        evermindTitle.addEventListener('click', function(e) {
            console.log('🔐 Main EVERMIND title clicked');
            openSecretAffirmationPage();
        });
    } else {
        console.warn('⚠️ Main EVERMIND title not found for Secret Affirmation Page trigger');
    }
}

// ==================== CALENDAR AND ATTENDANCE FUNCTIONALITY ====================
let calendarState = {
    currentDate: new Date(),
    attendanceData: [],
    stats: {
        totalDays: 0,
        currentStreak: 0,
        thisMonth: 0
    }
};

// Calendar API functions
// Calendar API functions
async function fetchAttendanceData() {
    try {
        // Get current month and year for the API call
        const year = calendarState.currentDate.getFullYear();
        const month = calendarState.currentDate.getMonth() + 1; // JavaScript months are 0-based
        
        console.log('📡 Fetching attendance data for:', year, month);
        console.log('📅 Calendar current date:', calendarState.currentDate.toDateString());
        console.log('📅 Calendar year:', year, 'month:', month);
        
        const response = await fetch(`${API_BASE}/attendance?year=${year}&month=${month}`, {
            headers: {
                'x-user-id': 'default-user-id'
            }
        });
        
        console.log('📡 Attendance API response:', response.status, response.ok);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📊 Attendance data received:', data);
        
        calendarState.attendanceData = data.data.attendance || [];
        calendarState.stats = data.data.stats || { totalDays: 0, currentStreak: 0, thisMonth: 0 };
        
        updateCalendarStats();
        renderCalendar();
    } catch (error) {
        console.error('❌ Error fetching attendance data:', error);
        showToast('Failed to load attendance data. Make sure the backend server is running.', 'error');
        
        // Initialize with empty data if API fails
        calendarState.attendanceData = [];
        calendarState.stats = { totalDays: 0, currentStreak: 0, thisMonth: 0 };
        updateCalendarStats();
        renderCalendar();
    }
    
    // Always render calendar, even if data fetch fails
    renderCalendar();
}

async function markAttendance(date, source = 'manual') {
    try {
        console.log('📝 Marking attendance for:', date, 'Source:', source);
        
        const response = await fetch(`${API_BASE}/attendance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ date, source })
        });
        
        console.log('📝 Mark attendance response:', response.status, response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Mark attendance error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('✅ Attendance marked successfully:', data);
        
        // Update local state
        const existingIndex = calendarState.attendanceData.findIndex(a => 
            new Date(a.date).toDateString() === new Date(date).toDateString()
        );
        
        if (existingIndex === -1) {
            calendarState.attendanceData.push(data.data);
        } else {
            calendarState.attendanceData[existingIndex] = data.data;
        }
        
        // Refresh calendar and stats
        await fetchAttendanceData();
        showToast('✅ Attendance marked successfully!', 'success');
    } catch (error) {
        console.error('❌ Error marking attendance:', error);
        showToast(`❌ Failed to mark attendance: ${error.message}`, 'error');
    }
}

// Calendar UI functions
function openCalendarModal() {
    // Store the current active page before opening calendar
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        previousPage = activePage.id;
        console.log('📅 Opening calendar from page:', previousPage);
    }
    
    showPage('calendarPage');
    console.log('📅 Calendar page should now be active');
    
    // Always reset to current date when opening calendar
    calendarState.currentDate = new Date();
    console.log('📅 Calendar opened with current date:', calendarState.currentDate.toDateString());
    
    // Fetch attendance data and render calendar
    fetchAttendanceData();
}

function closeCalendarModal() {
    console.log('🔙 Closing calendar, returning to:', previousPage);
    
    // Ensure we have a valid previous page, fallback to homepage
    const targetPage = previousPage || 'homepage';
    console.log('🎯 Target page:', targetPage);
    
    showPage(targetPage);
    console.log('🔙 Should have returned to:', targetPage);
}

function updateCalendarStats() {
    document.getElementById('totalDays').textContent = calendarState.stats.totalDays;
    document.getElementById('currentStreak').textContent = calendarState.stats.currentStreak;
    document.getElementById('thisMonth').textContent = calendarState.stats.thisMonth;
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('calendarMonthYear');
    
    const year = calendarState.currentDate.getFullYear();
    const month = calendarState.currentDate.getMonth();
    
    monthYear.textContent = calendarState.currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Clear previous content
    calendarGrid.innerHTML = '';
    
    // Add day names header
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayNameDiv = document.createElement('div');
        dayNameDiv.className = 'day-name';
        dayNameDiv.textContent = day;
        calendarGrid.appendChild(dayNameDiv);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;
        
        const currentDate = new Date(year, month, day);
        const today = new Date();
        
        // Check if this is today
        if (currentDate.toDateString() === today.toDateString()) {
            dayDiv.classList.add('today');
        }
        
        // Check if this day has attendance
        const hasAttendance = calendarState.attendanceData.some(attendance => {
            const attendanceDate = new Date(attendance.date);
            return attendanceDate.toDateString() === currentDate.toDateString();
        });
        
        if (hasAttendance) {
            dayDiv.classList.add('visited');
        }
        
        // Add click handler to toggle attendance
        dayDiv.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Don't allow clicking on other month days
            if (dayDiv.classList.contains('other-month')) {
                return;
            }
            
            console.log('📅 Calendar day clicked:', day, 'Date:', currentDate.toISOString().split('T')[0]);
            
            try {
            if (hasAttendance) {
                    // Show confirmation popup for deselection
                    const confirmed = confirm(`Are you sure you want to remove attendance for ${currentDate.toLocaleDateString()}?\n\nThis will reduce your monthly count.`);
                    if (confirmed) {
                        console.log('🗑️ Removing attendance for:', currentDate.toISOString().split('T')[0]);
                        await removeAttendance(currentDate);
                    }
            } else {
                // Add attendance
                    console.log('✅ Adding attendance for:', currentDate.toISOString().split('T')[0]);
                    await markAttendance(currentDate.toISOString().split('T')[0]);
                }
            } catch (error) {
                console.error('❌ Error handling calendar click:', error);
                showToast('Failed to update attendance. Please try again.', 'error');
            }
        });
        
        calendarGrid.appendChild(dayDiv);
    }
    
    // Add empty cells for days after the last day of the month
    const totalCells = calendarGrid.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days = 42 cells
    for (let i = 0; i < remainingCells; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
}

function previousMonth() {
    console.log('📅 Before previous month - current date:', calendarState.currentDate.toDateString());
    const currentDate = new Date(calendarState.currentDate);
    console.log('📅 Created new date object:', currentDate.toDateString());
    currentDate.setMonth(currentDate.getMonth() - 1);
    console.log('📅 After setMonth -1:', currentDate.toDateString());
    calendarState.currentDate = currentDate;
    console.log('📅 Updated calendarState.currentDate:', calendarState.currentDate.toDateString());
    // Fetch fresh data for the new month
    fetchAttendanceData();
}

function nextMonth() {
    console.log('📅 Before next month - current date:', calendarState.currentDate.toDateString());
    const currentDate = new Date(calendarState.currentDate);
    console.log('📅 Created new date object:', currentDate.toDateString());
    currentDate.setMonth(currentDate.getMonth() + 1);
    console.log('📅 After setMonth +1:', currentDate.toDateString());
    calendarState.currentDate = currentDate;
    console.log('📅 Updated calendarState.currentDate:', calendarState.currentDate.toDateString());
    // Fetch fresh data for the new month
    fetchAttendanceData();
}

async function removeAttendance(date) {
    try {
        console.log('🗑️ Removing attendance for:', date.toISOString().split('T')[0]);
        
        // Find the attendance record for this date
        const attendance = calendarState.attendanceData.find(a => {
            const attendanceDate = new Date(a.date);
            return attendanceDate.toDateString() === date.toDateString();
        });
        
        if (!attendance) {
            console.log('⚠️ No attendance record found for this date');
            showToast('No attendance record found for this date', 'warning');
            return;
        }
        
        console.log('🗑️ Found attendance record:', attendance._id);
        
        const response = await fetch(`${API_BASE}/attendance/${attendance._id}`, {
            method: 'DELETE',
            headers: {
                'x-user-id': 'default-user-id'
            }
        });
        
        console.log('🗑️ Remove attendance response:', response.status, response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Remove attendance error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        // Update local state
        calendarState.attendanceData = calendarState.attendanceData.filter(a => a._id !== attendance._id);
        
        // Refresh calendar and stats
        await fetchAttendanceData();
        showToast('✅ Attendance removed successfully!', 'success');
    } catch (error) {
        console.error('❌ Error removing attendance:', error);
        showToast(`❌ Failed to remove attendance: ${error.message}`, 'error');
    }
}

// Auto-mark attendance when user visits the workspace
function markDailyAttendance() {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('lastVisitDate');
    
    if (lastVisit !== today) {
        markAttendance(today, 'auto');
        localStorage.setItem('lastVisitDate', today);
    }
}

// ==================== NOTES FUNCTIONALITY ====================
let notesState = {
    notes: [],
    currentNote: null,
    searchQuery: '',
    isLoading: false
};

// API base URL
const API_BASE = 'http://localhost:5000/api';

// Notes localStorage functions
function fetchNotes() {
    try {
        notesState.isLoading = true;
        showNotesLoading();
        
        // Load notes from localStorage
        const savedNotes = localStorage.getItem('evermind-notes');
        if (savedNotes) {
            notesState.notes = JSON.parse(savedNotes);
        } else {
            notesState.notes = [];
        }
        
        renderNotes();
        console.log('📝 Loaded notes from localStorage:', notesState.notes.length);
    } catch (error) {
        console.error('Error loading notes:', error);
        showNotesError('Failed to load notes. Please try again.');
    } finally {
        notesState.isLoading = false;
        hideNotesLoading();
    }
}

function createNote(content) {
    try {
        const newNote = {
            _id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            content: content.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        notesState.notes.unshift(newNote);
        saveNotesToStorage();
            renderNotes();
        
        showToast('Note created successfully!', 'success');
        console.log('📝 Created note:', newNote._id);
    } catch (error) {
        console.error('Error creating note:', error);
        showToast('Failed to create note. Please try again.', 'error');
    }
}

function updateNote(noteId, content) {
    try {
            const index = notesState.notes.findIndex(note => note._id === noteId);
            if (index !== -1) {
            notesState.notes[index].content = content.trim();
            notesState.notes[index].updatedAt = new Date().toISOString();
            
            saveNotesToStorage();
                renderNotes();
            
            showToast('Note updated successfully!', 'success');
            console.log('📝 Updated note:', noteId);
        } else {
            showToast('Note not found!', 'error');
        }
    } catch (error) {
        console.error('Error updating note:', error);
        showToast('Failed to update note. Please try again.', 'error');
    }
}

function deleteNote(noteId) {
    try {
        const initialLength = notesState.notes.length;
            notesState.notes = notesState.notes.filter(note => note._id !== noteId);
        
        if (notesState.notes.length < initialLength) {
            saveNotesToStorage();
            renderNotes();
            showToast('Note deleted successfully!', 'success');
            console.log('📝 Deleted note:', noteId);
        } else {
            showToast('Note not found!', 'error');
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        showToast('Failed to delete note. Please try again.', 'error');
    }
}

function saveNotesToStorage() {
    try {
        localStorage.setItem('evermind-notes', JSON.stringify(notesState.notes));
        console.log('📝 Saved notes to localStorage:', notesState.notes.length);
    } catch (error) {
        console.error('Error saving notes to localStorage:', error);
    }
}

// Notes UI functions
function openNotesModal() {
    // Store the current active page before opening notes
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        previousPage = activePage.id;
        console.log('📝 Opening notes from page:', previousPage);
    }
    
    showPage('notesPage');
    console.log('📝 Notes page should now be active');
    fetchNotes();
}

function closeNotesModal() {
    console.log('🔙 Closing notes, returning to:', previousPage);
    
    // Ensure we have a valid previous page, fallback to homepage
    const targetPage = previousPage || 'homepage';
    console.log('🎯 Target page:', targetPage);
    
    showPage(targetPage);
    console.log('🔙 Should have returned to:', targetPage);
    notesState.currentNote = null;
}

function createNewNote() {
    notesState.currentNote = null;
    document.getElementById('noteEditContent').value = '';
    document.getElementById('noteEditTitle').textContent = 'New Note';
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.notes-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'notes-modal-overlay';
        overlay.onclick = closeNoteEditModal;
        document.body.appendChild(overlay);
    }
    
    const modal = document.getElementById('noteEditModal');
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function editNote(noteId) {
    const note = notesState.notes.find(n => n._id === noteId);
    if (!note) return;
    
    notesState.currentNote = note;
    document.getElementById('noteEditContent').value = note.content;
    document.getElementById('noteEditTitle').textContent = 'Edit Note';
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.notes-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'notes-modal-overlay';
        overlay.onclick = closeNoteEditModal;
        document.body.appendChild(overlay);
    }
    
    const modal = document.getElementById('noteEditModal');
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeNoteEditModal() {
    // Remove overlay
    const overlay = document.querySelector('.notes-modal-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    const modal = document.getElementById('noteEditModal');
    modal.style.display = 'none';
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    notesState.currentNote = null;
}

function saveNote() {
    const content = document.getElementById('noteEditContent').value.trim();
    
    if (!content) {
        showToast('Note content cannot be empty!', 'error');
        return;
    }
    
    if (notesState.currentNote) {
        updateNote(notesState.currentNote._id, content);
    } else {
        createNote(content);
    }
    
    closeNoteEditModal();
}

function deleteNote() {
    if (!notesState.currentNote) return;
    
    if (confirm('Are you sure you want to delete this note?')) {
        deleteNote(notesState.currentNote._id);
        closeNoteEditModal();
    }
}

function copyNoteContent(noteId) {
    const note = notesState.notes.find(n => n._id === noteId);
    if (!note) return;
    
    navigator.clipboard.writeText(note.content).then(() => {
        showToast('Note copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = note.content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Note copied to clipboard!', 'success');
    });
}

function searchNotes() {
    const query = document.getElementById('notesSearch').value.toLowerCase();
    notesState.searchQuery = query;
    renderNotes();
}

function renderNotes() {
    const container = document.getElementById('notesList');
    if (!container) return;
    
    let filteredNotes = notesState.notes;
    
    if (notesState.searchQuery) {
        filteredNotes = notesState.notes.filter(note => 
            note.content.toLowerCase().includes(notesState.searchQuery)
        );
    }
    
    if (filteredNotes.length === 0) {
        container.innerHTML = `
            <div class="empty-notes">
                <h3>${notesState.searchQuery ? 'No notes found' : 'No notes yet'}</h3>
                <p>${notesState.searchQuery ? 'Try a different search term' : 'Create your first note to get started!'}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredNotes.map(note => `
        <div class="note-card">
            <div class="note-content">${formatNoteContent(note.content)}</div>
            <div class="note-meta">
                <span>Created: ${formatDate(note.createdAt)}</span>
                <span>Updated: ${formatDate(note.updatedAt)}</span>
            </div>
            <div class="note-toolbar">
                <button class="btn-copy" onclick="copyNoteContent('${note._id}')">Copy</button>
                <button class="btn-edit" onclick="editNote('${note._id}')">Edit</button>
                <button class="btn-delete" onclick="deleteNote('${note._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function formatNoteContent(content) {
    // Convert markdown-like formatting to HTML
    return content
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function showNotesLoading() {
    const loading = document.getElementById('notesLoading');
    if (loading) loading.style.display = 'block';
}

function hideNotesLoading() {
    const loading = document.getElementById('notesLoading');
    if (loading) loading.style.display = 'none';
}

function showNotesError(message) {
    const container = document.getElementById('notesList');
    if (container) {
        container.innerHTML = `
            <div class="empty-notes">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--btn-success)' : type === 'error' ? 'var(--btn-danger)' : 'var(--btn-primary)'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add CSS for toast animations
const toastCSS = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

// Add toast CSS to head
const toastStyle = document.createElement('style');
toastStyle.textContent = toastCSS;
document.head.appendChild(toastStyle);

// Initialize Notes functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler for Notes button
    const notesBtn = document.getElementById('notesBtn');
    if (notesBtn) {
        notesBtn.addEventListener('click', openNotesModal);
    }
    
    // Add click handlers for modal close buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            if (e.target.id === 'notesModal') {
                closeNotesModal();
            } else if (e.target.id === 'noteEditModal') {
                closeNoteEditModal();
            } else if (e.target.id === 'calendarModal') {
                closeCalendarModal();
            }
        }
    });
    
    // Add keyboard handlers
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('noteEditModal').style.display === 'flex') {
                closeNoteEditModal();
            } else if (document.getElementById('notesModal').style.display === 'flex') {
                closeNotesModal();
            } else if (document.getElementById('calendarModal').style.display === 'flex') {
                closeCalendarModal();
            }
        }
    });
    
    // Auto-mark daily attendance
    markDailyAttendance();
    
    // Initialize offline mode
    initOfflineMode();
    
    // Initialize Secret Vision Board
    addSecretVisionTrigger();
    
    // Initialize Timer Mode
    initTimerMode();
});

// ==================== TIMER MODE FUNCTIONALITY ====================
let timerMode = {
    enabled: false,
    duration: 30,
    currentTime: 0,
    interval: null,
    questionStartTime: null
};

// Initialize timer mode
function initTimerMode() {
    console.log('⏱️ Initializing timer mode...');
    
    // Populate timer duration dropdown
    const durationSelect = document.getElementById('timerDuration');
    if (durationSelect) {
        durationSelect.innerHTML = '';
        for (let i = 1; i <= 60; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i} second${i !== 1 ? 's' : ''}`;
            durationSelect.appendChild(option);
        }
        durationSelect.value = 30; // Default to 30 seconds
    }
    
    console.log('⏱️ Timer mode initialized');
    
    // Debug timer button on page load
    setTimeout(() => {
        const timerBtn = document.getElementById('timerModeBtn');
        console.log('⏱️ Timer button on page load:', timerBtn);
        console.log('⏱️ Timer button classes:', timerBtn?.className);
        console.log('⏱️ Timer button computed styles:', timerBtn ? window.getComputedStyle(timerBtn) : 'Button not found');
        console.log('⏱️ Timer button parent:', timerBtn?.parentElement);
        console.log('⏱️ Progress stats container:', document.querySelector('.progress-stats'));
    }, 1000);
    
    // Test function to force modal visibility
    function testTimerModal() {
        console.log('🧪 Testing timer modal visibility');
        const modal = document.getElementById('timerConfigModal');
        if (modal) {
            // Force all styles inline
            modal.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(0, 0, 0, 0.8) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 10000 !important;
                visibility: visible !important;
                opacity: 1 !important;
            `;
            console.log('🧪 Modal forced to show with inline styles');
            console.log('🧪 Modal element:', modal);
            console.log('🧪 Modal computed styles:', window.getComputedStyle(modal));
        } else {
            console.error('🧪 Modal not found!');
        }
    }
    
    // Make test function available globally
    window.testTimerModal = testTimerModal;
}

// Toggle timer mode on/off
function toggleTimerMode() {
    console.log('⏱️ Toggle timer mode clicked');
    console.log('⏱️ Current timer mode state:', timerMode);
    console.log('⏱️ Timer mode button element:', document.getElementById('timerModeBtn'));
    console.log('⏱️ Timer mode button classes:', document.getElementById('timerModeBtn')?.className);
    console.log('⏱️ Timer mode button computed styles:', window.getComputedStyle(document.getElementById('timerModeBtn')));
    
    if (timerMode.enabled) {
        // Stop timer mode
        console.log('⏱️ Stopping timer mode');
        stopTimerMode();
    } else {
        // Show configuration modal
        console.log('⏱️ Showing timer config modal');
        showTimerConfig();
    }
}

// Show timer configuration modal
function showTimerConfig() {
    console.log('⏱️ Showing timer config modal');
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.timer-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'timer-modal-overlay';
        overlay.onclick = closeTimerConfig;
        document.body.appendChild(overlay);
    }
    
    const modal = document.getElementById('timerConfigModal');
    console.log('⏱️ Modal element found:', !!modal);
    if (modal) {
        console.log('⏱️ Setting modal display to flex');
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.style.zIndex = '10000';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0, 0, 0, 0.8)';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.backdropFilter = 'blur(5px)';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log('⏱️ Modal display set to:', modal.style.display);
        console.log('⏱️ Modal visibility set to:', modal.style.visibility);
        console.log('⏱️ Modal opacity set to:', modal.style.opacity);
        console.log('⏱️ Modal z-index set to:', modal.style.zIndex);
        console.log('⏱️ Modal position set to:', modal.style.position);
        console.log('⏱️ Modal computed styles:', window.getComputedStyle(modal));
        
        // Add click-outside-to-close functionality
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeTimerConfig();
            }
        };
        
        // Force a reflow to ensure styles are applied
        modal.offsetHeight;
        console.log('⏱️ Modal should now be visible');
    } else {
        console.error('⏱️ Timer config modal not found!');
    }
}

// Close timer configuration modal
function closeTimerConfig() {
    console.log('⏱️ Closing timer config modal');
    
    // Remove overlay
    const overlay = document.querySelector('.timer-modal-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    const modal = document.getElementById('timerConfigModal');
    if (modal) {
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('⏱️ Modal closed');
    }
}

// Start timer mode with selected duration
function startTimerMode() {
    console.log('⏱️ Starting timer mode');
    
    const durationSelect = document.getElementById('timerDuration');
    if (durationSelect) {
        timerMode.duration = parseInt(durationSelect.value);
    }
    
    // Enable timer mode
    timerMode.enabled = true;
    updateTimerModeButton();
    
    // Close modal
    closeTimerConfig();
    
    // Start timer for current question
    startQuestionTimer();
    
    console.log(`⏱️ Timer mode enabled with ${timerMode.duration} seconds per question`);
}

// Stop timer mode
function stopTimerMode() {
    console.log('⏱️ Stopping timer mode');
    
    timerMode.enabled = false;
    clearInterval(timerMode.interval);
    hideTimerDisplay();
    updateTimerModeButton();
    
    console.log('⏱️ Timer mode disabled');
}

// Update timer mode button appearance
function updateTimerModeButton() {
    console.log('⏱️ Updating timer mode button');
    console.log('⏱️ Timer mode enabled:', timerMode.enabled);
    
    const btn = document.getElementById('timerModeBtn');
    const text = document.getElementById('timerModeText');
    
    console.log('⏱️ Button element:', btn);
    console.log('⏱️ Text element:', text);
    console.log('⏱️ Button current classes:', btn?.className);
    
    if (btn && text) {
        if (timerMode.enabled) {
            btn.classList.remove('disabled');
            btn.classList.add('enabled');
            text.textContent = 'Timer ON';
            console.log('⏱️ Set button to enabled state');
        } else {
            btn.classList.remove('enabled');
            btn.classList.add('disabled');
            text.textContent = 'Timer';
            console.log('⏱️ Set button to disabled state');
        }
        
        console.log('⏱️ Button new classes:', btn.className);
        console.log('⏱️ Button computed styles after update:', window.getComputedStyle(btn));
    } else {
        console.error('⏱️ Timer mode button or text element not found!');
    }
}

// Start timer for current question
function startQuestionTimer() {
    if (!timerMode.enabled) return;
    
    console.log(`⏱️ Starting timer for question: ${timerMode.duration} seconds`);
    
    // Clear any existing interval first
    if (timerMode.interval) {
        clearInterval(timerMode.interval);
        timerMode.interval = null;
    }
    
    timerMode.currentTime = timerMode.duration;
    timerMode.questionStartTime = Date.now();
    
    // Show timer display
    showTimerDisplay();
    
    // Start countdown
    timerMode.interval = setInterval(() => {
        timerMode.currentTime--;
        updateTimerDisplay();
        
        if (timerMode.currentTime <= 0) {
            // Time's up - mark as wrong and move to next
            console.log('⏱️ Time up! Marking question as wrong');
            clearInterval(timerMode.interval);
            timerMode.interval = null;
            markWrong();
        }
    }, 1000);
}

// Show timer display
function showTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    if (display) {
        display.style.display = 'flex';
        updateTimerDisplay();
    }
}

// Hide timer display
function hideTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    if (display) {
        display.style.display = 'none';
    }
}

// Update timer display
function updateTimerDisplay() {
    const countdown = document.querySelector('.timer-countdown');
    if (countdown) {
        countdown.textContent = timerMode.currentTime;
    }
}

// Reset timer when question changes
function resetQuestionTimer() {
    if (timerMode.enabled) {
        console.log('⏱️ Resetting question timer');
        
        // Clear any existing timer interval
        if (timerMode.interval) {
            clearInterval(timerMode.interval);
            timerMode.interval = null;
        }
        
        // Small delay to ensure the interval is fully cleared before starting new one
        setTimeout(() => {
            startQuestionTimer();
        }, 50);
    }
}

// ==================== END TIMER MODE FUNCTIONALITY ====================

