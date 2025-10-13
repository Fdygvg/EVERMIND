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
    loadAllSections().then(() => {
        dataLoaded = true;
        console.log('✅ Data loading complete');
    }).catch(error => {
        console.error('❌ Error loading data:', error);
        dataLoaded = true; // Continue anyway
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
                }, 500);
            }, 300);
        }
    }
    
    console.log('🎬 Starting progress animation...');
    requestAnimationFrame(updateProgress);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
    
    // Small delay to ensure SoundEffects is loaded
    setTimeout(() => {
    loadTheme();
        console.log('🎨 Theme loaded');
        
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
            questionId = generateQuestionId(state.currentSection || currentQuestion.section, state.currentQuestionIndex);
            section = state.currentSection || currentQuestion.section;
            index = state.currentQuestionIndex;
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
    
    // Search through all sections
    Object.keys(state.allQuestions).forEach(sectionName => {
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
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function initSwipeGestures() {
    const questionCard = document.getElementById('questionCard');
    if (!questionCard) return;
    
    questionCard.addEventListener('touchstart', handleTouchStart, { passive: true });
    questionCard.addEventListener('touchend', handleTouchEnd, { passive: true });
}

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50;
    
    // Check if it's a horizontal swipe (more horizontal than vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            // Swipe right = Correct
            showSwipeFeedback('correct');
            markCorrect();
        } else {
            // Swipe left = Wrong
            showSwipeFeedback('wrong');
            markWrong();
        }
    }
    // Check if it's a vertical swipe down
    else if (deltaY > minSwipeDistance && Math.abs(deltaY) > Math.abs(deltaX)) {
        // Swipe down = Skip
        showSwipeFeedback('skip');
        skipQuestion();
    }
}

function showSwipeFeedback(type) {
    const questionCard = document.getElementById('questionCard');
    if (!questionCard) return;
    
    // Remove existing feedback classes
    questionCard.classList.remove('swipe-correct', 'swipe-wrong', 'swipe-skip');
    
    // Add appropriate feedback class
    questionCard.classList.add(`swipe-${type}`);
    
    // Remove feedback after animation
    setTimeout(() => {
        questionCard.classList.remove(`swipe-${type}`);
    }, 300);
    
    // Play sound effect
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound(type);
    }
}
const sections = [
    { id: 'languages', name: 'Languages', icon: '🌍' },
    { id: 'programming', name: 'Programming', icon: '💻' },
    { id: 'bible', name: 'Bible', icon: '📖' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'history', name: 'History', icon: '🏛️' },
    { id: 'facts', name: 'Random Facts', icon: '💡' },
    { id: 'country_flags', name: 'Country Flags', icon: '🚩' },
    { id: 'new_words', name: 'New Words', icon: '📝' },
    { id: 'youtube_knowledge', name: 'YouTube Knowledge', icon: '🎥' },
    { id: 'memes_brainrot', name: 'Memes & Brain Rot', icon: '🧠' },
];

async function loadAllSections() {
    const API_BASE_URL = 'http://localhost:5000/api';
    
    for (const section of sections) {
        try {
            // Try to load from API first
            console.log(`🔄 Attempting to load ${section.id} from API...`);
            const response = await fetch(`${API_BASE_URL}/questions?section=${section.id}`);
            console.log(`📡 API response for ${section.id}:`, response.status, response.ok);
            if (response.ok) {
                const data = await response.json();
                console.log(`📊 API data for ${section.id}:`, data.success, data.count, 'questions');
                if (data.success) {
                    state.allQuestions[section.id] = data.data;
                    console.log(`✅ Loaded ${section.id} from API: ${state.allQuestions[section.id].length} questions`);
                    continue;
                }
            }
            
            // Fallback to local JSON if API fails
            console.log(`⚠️ API failed for ${section.id}, trying local JSON...`);
            const localResponse = await fetch(`data/${section.id}.json`);
            if (localResponse.ok) {
                state.allQuestions[section.id] = await localResponse.json();
                console.log(`✅ Loaded ${section.id} from local JSON: ${state.allQuestions[section.id].length} questions`);
            } else {
                state.allQuestions[section.id] = [];
                console.warn(`⚠️ Could not load ${section.id}.json - Status: ${localResponse.status}`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${section.id}:`, error);
            // Try local JSON as last resort
            try {
                const localResponse = await fetch(`data/${section.id}.json`);
                if (localResponse.ok) {
                    state.allQuestions[section.id] = await localResponse.json();
                    console.log(`✅ Fallback loaded ${section.id} from local JSON: ${state.allQuestions[section.id].length} questions`);
                } else {
                    state.allQuestions[section.id] = [];
                }
            } catch (fallbackError) {
                console.error(`❌ Fallback also failed for ${section.id}:`, fallbackError);
                state.allQuestions[section.id] = [];
            }
        }
    }
    console.log('📊 All sections loaded:', state.allQuestions);
    updateHomepageCounts(); // Update homepage question counts
}

async function loadSectionData(sectionId) {
    if (!state.allQuestions[sectionId]) {
        const API_BASE_URL = 'http://localhost:5000/api';
        
        try {
            // Try to load from API first
            const response = await fetch(`${API_BASE_URL}/questions?section=${sectionId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    state.allQuestions[sectionId] = data.data;
                    console.log(`✅ Loaded ${sectionId} from API: ${state.allQuestions[sectionId].length} questions`);
                    return state.allQuestions[sectionId];
                }
            }
            
            // Fallback to local JSON
            const localResponse = await fetch(`data/${sectionId}.json`);
            state.allQuestions[sectionId] = await localResponse.json();
            console.log(`✅ Loaded ${sectionId} from local JSON: ${state.allQuestions[sectionId].length} questions`);
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
    checkSavedProgress(); // Check for saved progress when returning to homepage
}

function exitRevision() {
    console.log('🚪 Exiting revision mode:', state.revisionMode);
    
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

function startRevision() {
    showPage('revisionMode');
    
    // Start timer for all revision modes
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
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.textContent = timeString;
}

function stopRevisionTimer() {
    if (state.revisionTimerInterval) {
        clearInterval(state.revisionTimerInterval);
        state.revisionTimerInterval = null;
    }
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
        questionHtml += `<div class="question-section-label">${sectionInfo.icon} From ${sectionInfo.name}</div>`;
            console.log('✅ DEBUG: Section label HTML added:', questionHtml);
        } else {
            console.log('⚠️ DEBUG: No section label added - sectionId:', sectionId);
        }
    } else {
        console.log('❌ DEBUG: Not in global/bookmarked mode, revisionMode:', state.revisionMode);
    }
    
    // Handle different question types
    console.log('🔍 DEBUG: Checking question type conditions...');
    
    // Extract word and language from database structure for language questions
    let extractedWord = null;
    let extractedLanguage = null;
    
    if (question.type === 'languages' && question.answer) {
        // Extract the translated word from the answer field
        // Format: "Translated: お元気ですか | Pronounced: oh-gen-kee dess ka"
        const translatedMatch = question.answer.match(/Translated:\s*([^|]+)/);
        if (translatedMatch) {
            extractedWord = translatedMatch[1].trim();
        }
        
        // Extract language from the question text
        // Format: "How do you say 'How are you?' in Japanese?"
        const languageMatch = question.question.match(/in\s+(\w+)\?/i);
        if (languageMatch) {
            extractedLanguage = languageMatch[1].toLowerCase();
        }
        
        console.log('🔍 DEBUG: Extracted from database:', { 
            extractedWord, 
            extractedLanguage, 
            originalAnswer: question.answer,
            originalQuestion: question.question 
        });
    }
    
    if (question.type === 'languages' && extractedWord && extractedLanguage) {
        console.log('✅ DEBUG: Language question detected - extracted word and language');
        // Languages section - special styling for revision mode
        // Show only the English question, hide the translation and pronunciation until answer is revealed
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">${escapeHtml(question.question || '')}</h3>`;
        
        // Add speaker button for language questions in revision mode
        console.log('🔊 Adding speaker button for language question:', extractedWord, extractedLanguage);
        const safeWord = extractedWord.replace(/'/g, "\\'").replace(/"/g, '\\"');
        const safeLang = extractedLanguage.replace(/'/g, "\\'").replace(/"/g, '\\"');
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
    } else {
        console.log('✅ DEBUG: Standard question detected - using default format');
        // Standard question format - apply consistent styling to all sections
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px; font-weight: 600;">${escapeHtml(question.question || question.q || '')}</h3>`;
        
        if (question.image) {
            questionHtml += `<br><img src="${question.image}" alt="Question" class="question-image">`;
        }
        
        // Audio handled by specific question types above
    }
    
    // Add copy button for question
    questionHtml += `<div class="question-copy-section" style="margin-top: 15px;">
        <button class="btn btn--primary btn-copy-question" onclick="copyQuestion()" title="Copy question">
            📋 Copy Question
        </button>
    </div>`;
    
    console.log('🔍 DEBUG: Final question HTML before setting innerHTML:', questionHtml);
    questionContent.innerHTML = questionHtml;
    
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
    
    // Add copy buttons for answer
    answerHtml += `<div class="answer-copy-section" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
        <button class="btn btn--success btn-copy-answer" onclick="copyAnswer()" title="Copy answer">
            📋 Copy Answer
        </button>
        <button class="btn btn--primary btn-copy-qa" onclick="copyQuestionAndAnswer()" title="Copy question and answer">
            📋 Copy Q+A
        </button>
    </div>`;
    
    answerContent.innerHTML = answerHtml;
    
    // Hide answer initially, show Show Answer button
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
    
    // Insert question at position 5 (or at end if less than 5 questions remain)
    const insertPosition = Math.min(5, state.revisionQuestions.length);
    state.revisionQuestions.splice(insertPosition, 0, question);
    
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
}

function skipQuestion() {
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
                    <button class="btn btn--primary" onclick="exitRevision()" style="font-size: 1.1rem; padding: 15px 30px;">
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
                <button class="btn btn--primary" onclick="exitRevision()" style="font-size: 1.1rem; padding: 15px 30px;">
                    Close
                </button>
            </div>
        </div>
    `;
    }
    
    questionCard.innerHTML = completionHTML;
    
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
                <button class="btn btn--nav" onclick="exitRevision()" style="font-size: 1rem; padding: 12px 24px;">
                    Close Session
                </button>
            </div>
        </div>
    `;
    
    questionCard.innerHTML = inactivityHTML;
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
    state.revisionStartTime = null;
    
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
    }
    
    showPage('aiChatPage');
    if (window.SoundEffects) window.SoundEffects.playSound('click');
    
    // Add welcome message if empty
    const messagesContainer = document.getElementById('aiChatMessages');
    if (messagesContainer.children.length === 0) {
        addAIMessage('assistant', 'Hello! I\'m your AI study assistant. I can help you with:\n\n• Explaining study questions and answers\n• Generating practice questions\n• General Q&A about any topic\n• Study tips and learning strategies\n\nHow can I help you today?');
    }
}

function closeAIChat() {
    // Return to the previous page instead of always going to homepage
    showPage(previousPage);
    if (window.SoundEffects) window.SoundEffects.playSound('click');
}

function addAIMessage(role, content) {
    const messagesContainer = document.getElementById('aiChatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    
    // Format content with proper paragraphing and code blocks
    const formattedContent = formatAIContent(content);
    messageDiv.innerHTML = formattedContent;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatAIContent(content) {
    if (!content) return '';
    
    // Split content into paragraphs (double newlines)
    const paragraphs = content.split(/\n\s*\n/);
    
    let formatted = '';
    
    for (let paragraph of paragraphs) {
        if (paragraph.trim()) {
            // Check if paragraph contains code blocks
            if (paragraph.includes('```')) {
                // Handle code blocks
                const parts = paragraph.split('```');
                let processedParagraph = '';
                
                for (let i = 0; i < parts.length; i++) {
                    if (i % 2 === 0) {
                        // Regular text - convert single newlines to <br>
                        processedParagraph += parts[i].replace(/\n/g, '<br>');
                    } else {
                        // Code block
                        const code = parts[i].trim();
                        const language = code.split('\n')[0] || '';
                        const codeContent = code.split('\n').slice(1).join('\n');
                        
                        processedParagraph += `<pre class="ai-codeblock"><code class="language-${language}">${escapeHtml(codeContent)}</code></pre>`;
                    }
                }
                
                formatted += `<p class="ai-paragraph">${processedParagraph}</p>`;
            } else {
                // Regular paragraph - convert single newlines to <br>
                const processedParagraph = paragraph.replace(/\n/g, '<br>');
                formatted += `<p class="ai-paragraph">${processedParagraph}</p>`;
            }
        }
    }
    
    return formatted;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // Add user message to UI
    addAIMessage('user', userMessage);
    input.value = '';
    
    // Add to conversation history
    conversationHistory.push({ role: 'user', content: userMessage });
    
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-message assistant loading';
    loadingDiv.textContent = 'Thinking...';
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
    }
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('aiChatInput');
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendAIMessage();
            }
        });
    }
});

// Export functions
window.openAIChat = openAIChat;
window.closeAIChat = closeAIChat;
window.sendAIMessage = sendAIMessage;

// Helper function to get section info
function getSectionInfo(sectionId) {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
        return section;
    }
    
    // Handle special cases and format section names
    const nameMap = {
        'memes_brainrot': 'Memes & Brain Rot',
        'youtube_knowledge': 'YouTube Knowledge',
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
                } else if (lang === 'igbo') {
                    languageCode = 'ig-NG';
                } else if (lang === 'yoruba') {
                    languageCode = 'yo-NG';
                } else if (lang === 'hausa') {
                    languageCode = 'ha-NG';
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
    startRevision();
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
    startRevision();
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
    startRevision();
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
function copyQuestion() {
    const question = state.revisionQuestions[0];
    if (!question) return;
    
    let questionText = '';
    
    // Build question text based on question type
    if (question.word && question.language) {
        questionText = `Question: ${question.question || ''}`;
    } else if (question.word && !question.language) {
        questionText = `Question: ${question.question || ''}`;
    } else if (question.title && question.summary) {
        questionText = `Question: ${question.title}`;
    } else if (question.term) {
        questionText = `Question: ${question.question || ''}`;
    } else {
        questionText = `Question: ${question.question || question.q || ''}`;
    }
    
    copyToClipboard(questionText, 'Question copied to clipboard!');
}

function copyAnswer() {
    const question = state.revisionQuestions[0];
    if (!question || !question.answer) return;
    
    let answerText = `Answer: ${question.answer}`;
    copyToClipboard(answerText, 'Answer copied to clipboard!');
}

function copyQuestionAndAnswer() {
    const question = state.revisionQuestions[0];
    if (!question) return;
    
    let questionText = '';
    let answerText = '';
    
    // Build question text based on question type
    if (question.word && question.language) {
        questionText = `Question: ${question.question || ''}`;
    } else if (question.word && !question.language) {
        questionText = `Question: ${question.question || ''}`;
    } else if (question.title && question.summary) {
        questionText = `Question: ${question.title}`;
    } else if (question.term) {
        questionText = `Question: ${question.question || ''}`;
    } else {
        questionText = `Question: ${question.question || question.q || ''}`;
    }
    
    if (question.answer) {
        answerText = `Answer: ${question.answer}`;
    }
    
    const fullText = `${questionText}\n\n${answerText}`;
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
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
async function fetchAttendanceData() {
    try {
        const response = await fetch(`${API_BASE}/attendance`, {
            headers: {
                'x-user-id': 'default-user-id'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        calendarState.attendanceData = data.data.attendance || [];
        calendarState.stats = data.data.stats || { totalDays: 0, currentStreak: 0, thisMonth: 0 };
        
        updateCalendarStats();
        renderCalendar();
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        showToast('Failed to load attendance data', 'error');
    }
}

async function markAttendance(date, source = 'manual') {
    try {
        const response = await fetch(`${API_BASE}/attendance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ date, source })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
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
        showToast('Attendance marked successfully!', 'success');
    } catch (error) {
        console.error('Error marking attendance:', error);
        showToast('Failed to mark attendance', 'error');
    }
}

// Calendar UI functions
function openCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'flex';
    fetchAttendanceData();
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'none';
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
        dayDiv.addEventListener('click', () => {
            if (hasAttendance) {
                // Remove attendance
                removeAttendance(currentDate);
            } else {
                // Add attendance
                markAttendance(currentDate.toISOString().split('T')[0]);
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
    calendarState.currentDate.setMonth(calendarState.currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    calendarState.currentDate.setMonth(calendarState.currentDate.getMonth() + 1);
    renderCalendar();
}

async function removeAttendance(date) {
    try {
        // Find the attendance record for this date
        const attendance = calendarState.attendanceData.find(a => {
            const attendanceDate = new Date(a.date);
            return attendanceDate.toDateString() === date.toDateString();
        });
        
        if (!attendance) return;
        
        const response = await fetch(`${API_BASE}/attendance/${attendance._id}`, {
            method: 'DELETE',
            headers: {
                'x-user-id': 'default-user-id'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Update local state
        calendarState.attendanceData = calendarState.attendanceData.filter(a => a._id !== attendance._id);
        
        // Refresh calendar and stats
        await fetchAttendanceData();
        showToast('Attendance removed', 'success');
    } catch (error) {
        console.error('Error removing attendance:', error);
        showToast('Failed to remove attendance', 'error');
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
const API_BASE = 'http://localhost:5001/api';

// Notes API functions
async function fetchNotes() {
    try {
        notesState.isLoading = true;
        showNotesLoading();
        
        const response = await fetch(`${API_BASE}/notes`, {
            headers: {
                'x-user-id': 'default-user-id' // In production, this would come from auth
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        notesState.notes = data.data || [];
        renderNotes();
    } catch (error) {
        console.error('Error fetching notes:', error);
        showNotesError('Failed to load notes. Please try again.');
    } finally {
        notesState.isLoading = false;
        hideNotesLoading();
    }
}

async function createNote(content) {
    try {
        const response = await fetch(`${API_BASE}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ content })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        notesState.notes.unshift(data.data);
        renderNotes();
        showToast('Note created successfully!', 'success');
    } catch (error) {
        console.error('Error creating note:', error);
        showToast('Failed to create note. Please try again.', 'error');
    }
}

async function updateNote(noteId, content) {
    try {
        const response = await fetch(`${API_BASE}/notes/${noteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': 'default-user-id'
            },
            body: JSON.stringify({ content })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const index = notesState.notes.findIndex(note => note._id === noteId);
        if (index !== -1) {
            notesState.notes[index] = data.data;
            renderNotes();
        }
        showToast('Note updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating note:', error);
        showToast('Failed to update note. Please try again.', 'error');
    }
}

async function deleteNote(noteId) {
    try {
        const response = await fetch(`${API_BASE}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'x-user-id': 'default-user-id'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        notesState.notes = notesState.notes.filter(note => note._id !== noteId);
        renderNotes();
        showToast('Note deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting note:', error);
        showToast('Failed to delete note. Please try again.', 'error');
    }
}

// Notes UI functions
function openNotesModal() {
    const modal = document.getElementById('notesModal');
    modal.style.display = 'flex';
    fetchNotes();
}

function closeNotesModal() {
    const modal = document.getElementById('notesModal');
    modal.style.display = 'none';
    notesState.currentNote = null;
}

function createNewNote() {
    notesState.currentNote = null;
    document.getElementById('noteEditContent').value = '';
    document.getElementById('noteEditTitle').textContent = 'New Note';
    document.getElementById('noteEditModal').style.display = 'flex';
}

function editNote(noteId) {
    const note = notesState.notes.find(n => n._id === noteId);
    if (!note) return;
    
    notesState.currentNote = note;
    document.getElementById('noteEditContent').value = note.content;
    document.getElementById('noteEditTitle').textContent = 'Edit Note';
    document.getElementById('noteEditModal').style.display = 'flex';
}

function closeNoteEditModal() {
    document.getElementById('noteEditModal').style.display = 'none';
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
const style = document.createElement('style');
style.textContent = toastCSS;
document.head.appendChild(style);

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
});

