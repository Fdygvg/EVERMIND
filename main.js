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
        'Initializing...',
        'Loading questions...',
        'Preparing interface...',
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
        content += `<div class="bookmark-section-info">From: ${q.section.charAt(0).toUpperCase() + q.section.slice(1)}</div>`;
        
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
    
    // Set up revision mode for bookmarked questions
    state.revisionQuestions = bookmarkedQuestions;
    state.currentQuestionIndex = 0;
    state.revisionMode = 'bookmarked';
    state.currentSection = 'bookmarked';
    state.isAnswerShown = false;
    
    // Show revision interface
    showPage('revisionMode');
    
    // Update header
    document.getElementById('revisionTitle').textContent = '📌 Bookmarked Questions';
    document.getElementById('revisionSubtitle').textContent = `Review your flagged questions (${bookmarkedQuestions.length} total)`;
    
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
    
    console.log('📌 Bookmarked revision started');
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
    updateHomepageCounts(); // Update homepage question counts
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
    console.log('🚪 Exiting revision mode:', state.revisionMode);
    
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
    state.currentSection = sectionId;
    const section = sections.find(s => s.id === sectionId);
    
    document.getElementById('sectionTitle').textContent = `${section.icon} ${section.name}`;
    
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
        if (q.word) {
            // New Words section
            content += `<h3 style="font-size: 1.8rem; margin-bottom: 10px;">${escapeHtml(q.word)}</h3>`;
            content += `<p style="font-style: italic; opacity: 0.8;">Pronunciation: ${escapeHtml(q.pronunciation)}</p>`;
            content += `<div class="answer">`;
            content += `<p><strong>Meaning:</strong> ${escapeHtml(q.meaning)}</p>`;
            content += `<p style="margin-top: 10px;"><em>"${escapeHtml(q.example)}"</em></p>`;
        } else if (q.title && q.summary) {
            // YouTube Knowledge section
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
            // Memes & Brain Rot section
            content += `<h3 style="font-size: 1.8rem; margin-bottom: 10px;">💀 ${escapeHtml(q.term)}</h3>`;
            content += `<div class="answer">`;
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
    
    // Reset revision state
    resetRevision();
    
    state.revisionMode = 'section';
    state.revisionQuestions = [...state.allQuestions[state.currentSection]];
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
    
    // Reset revision state
    resetRevision();
    
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
    
    // Initialize enhanced progress tracking
    state.correctCount = 0;
    state.wrongCount = 0;
    state.totalQuestions = state.revisionQuestions.length;
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('click');
    }
    startRevision();
}

function startRevision() {
    showPage('revisionMode');
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
    displayCurrentQuestion();
    updateProgress();
    }, 100);
    
    // Initialize swipe gestures for mobile
    initSwipeGestures();
}

function displayCurrentQuestion() {
    console.log('📝 Displaying current question...');
    console.log('📝 Revision questions length:', state.revisionQuestions.length);
    console.log('📝 Current section:', state.currentSection);
    console.log('📝 Current question index:', state.currentQuestionIndex);
    
    if (state.revisionQuestions.length === 0) {
        showCompletionMessage();
        return;
    }
    
    const question = state.revisionQuestions[0];
    const questionContent = document.getElementById('questionContent');
    const answerContent = document.getElementById('answerContent');
    
    console.log('📝 Question object:', question);
    console.log('📝 Question content element:', questionContent);
    
    // Add section label for global and bookmark revision modes
    let questionHtml = '';
    if (state.revisionMode === 'global' || state.revisionMode === 'bookmarked') {
        const sectionInfo = getSectionInfo(question.section || state.currentSection);
        questionHtml += `<div class="question-section-label">${sectionInfo.icon} From ${sectionInfo.name}</div>`;
    }
    
    // Handle different question types
    if (question.word) {
        // New Words section
        questionHtml += `<h3 style="font-size: 2rem; margin-bottom: 10px;">${escapeHtml(question.word)}</h3>`;
        questionHtml += `<p style="font-style: italic; opacity: 0.8; margin-bottom: 15px;">Pronunciation: ${escapeHtml(question.pronunciation)}</p>`;
        questionHtml += `<p><strong>Meaning:</strong> ${escapeHtml(question.meaning)}</p>`;
        questionHtml += `<p style="margin-top: 10px;"><em>"${escapeHtml(question.example)}"</em></p>`;
        
        // Add speaker button for new words
        questionHtml = `<button class="speaker-btn" onclick="speakWord('${escapeHtml(question.word)}')" title="Hear pronunciation">🔊</button>` + questionHtml;
    } else if (question.title && question.summary) {
        // YouTube Knowledge section
        questionHtml += `<h3 style="font-size: 1.5rem; margin-bottom: 15px;">🎥 ${escapeHtml(question.title)}</h3>`;
        questionHtml += `<p style="line-height: 1.8;">${escapeHtml(question.summary)}</p>`;
        if (question.source) {
            questionHtml += `<p style="margin-top: 15px; opacity: 0.7;"><strong>Source:</strong> ${escapeHtml(question.source)}</p>`;
        }
        if (question.videoLink && question.videoLink.trim()) {
            questionHtml += `<br><a href="${escapeHtml(question.videoLink)}" target="_blank" class="btn btn--primary" style="margin-top: 10px;">Watch Video 🔗</a>`;
        }
    } else if (question.term) {
        // Memes & Brain Rot section
        questionHtml += `<h3 style="font-size: 2rem; margin-bottom: 15px;">💀 ${escapeHtml(question.term)}</h3>`;
        questionHtml += `<p><strong>Meaning:</strong> ${escapeHtml(question.meaning)}</p>`;
        questionHtml += `<p style="margin-top: 10px;"><strong>When to use:</strong> ${escapeHtml(question.usage)}</p>`;
        questionHtml += `<p style="margin-top: 10px;"><em>"${escapeHtml(question.example)}"</em></p>`;
        if (question.origin) {
            questionHtml += `<p style="margin-top: 15px; opacity: 0.7; font-size: 0.9rem;"><strong>Origin:</strong> ${escapeHtml(question.origin)}</p>`;
        }
    } else {
        // Standard question format
        questionHtml += escapeHtml(question.question || question.q || '');
        
        // Add speaker button for language questions in revision mode (only Web Speech API languages)
        if (question.language && question.word) {
            const webSpeechLanguages = ['french', 'spanish', 'japanese'];
            if (webSpeechLanguages.includes(question.language.toLowerCase())) {
                const safeWord = question.word.replace(/'/g, "\\'").replace(/"/g, '\\"');
                const safeLang = question.language.replace(/'/g, "\\'").replace(/"/g, '\\"');
                questionHtml += ` <button class="speaker-btn" onclick="AudioPlayer.playAudio('${safeWord}', '${safeLang}')" title="Play pronunciation">🔊</button>`;
            }
        }
        
        if (question.image) {
            questionHtml += `<br><img src="${question.image}" alt="Question" class="question-image">`;
        }
    }
    
    questionContent.innerHTML = questionHtml;
    
    // Update bookmark button
    console.log('📝 Updating bookmark button...');
    updateBookmarkButton();
    
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
        const questionId = `revision_${state.revisionMode}_${state.revisionQuestions.indexOf(question)}`;
        const savedCode = localStorage.getItem(`code_${questionId}`);
        const codeToUse = savedCode || question.answer;
        const codeType = question.type || 'html';
        answerHtml += `<br><button class="code-editor-btn" onclick="openRevisionCodeEditor('${questionId}', '${codeType}')">💻 Try This Code</button>`;
    }
    
    if (question.audio) {
        answerHtml += `<br><audio controls src="${question.audio}"></audio>`;
    }
    
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
    
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('correct');
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
    if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
        window.SoundEffects.playSound('wrong');
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
    
    displayCurrentQuestion();
}

function nextQuestion() {
    // Move to next question without marking current one
    if (state.revisionQuestions.length > 1) {
        const question = state.revisionQuestions.shift();
        state.revisionQuestions.push(question);
        state.currentQuestionIndex = 0;
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
    state.currentQuestionIndex = 0;
    state.isAnswerShown = false;
    
    // Clear any completion message from previous sessions
    const questionCard = document.getElementById('questionCard');
    if (questionCard) {
        questionCard.innerHTML = `
            <div class="question-content" id="questionContent">
                <!-- Question will be displayed here -->
            </div>
            <div class="answer-content" id="answerContent" style="display: none;">
                <!-- Answer will be displayed here -->
            </div>
        `;
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

// Helper function to get section info
function getSectionInfo(sectionId) {
    return sections.find(s => s.id === sectionId) || { name: sectionId, icon: '📚' };
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

window.speakWord = speakWord;

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

