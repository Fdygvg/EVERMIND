// ==================== STUDY STATISTICS SYSTEM ====================
class StudyStatistics {
    constructor() {
        this.stats = {
            daily: {},
            weekly: {
                currentStreak: 0,
                maxStreak: 0,
                totalCorrect: 0,
                totalWrong: 0,
                totalSessions: 0
            },
            achievements: []
        };
        this.init();
    }

    init() {
        this.loadStats();
        this.updateDailyStats();
        this.updateUI();
    }

    loadStats() {
        const saved = localStorage.getItem('evermind-stats');
        if (saved) {
            try {
                this.stats = JSON.parse(saved);
                // Ensure all required properties exist
                if (!this.stats.achievements) {
                    this.stats.achievements = [];
                }
                if (!this.stats.weekly) {
                    this.stats.weekly = {
                        currentStreak: 0,
                        maxStreak: 0,
                        totalCorrect: 0,
                        totalWrong: 0,
                        totalSessions: 0
                    };
                }
                if (!this.stats.daily) {
                    this.stats.daily = {};
                }
            } catch (e) {
                console.error('Error loading statistics:', e);
                this.stats = this.getDefaultStats();
            }
        } else {
            // No saved stats, use defaults
            this.stats = this.getDefaultStats();
        }
    }

    saveStats() {
        localStorage.setItem('evermind-stats', JSON.stringify(this.stats));
    }

    getDefaultStats() {
        return {
            daily: {},
            weekly: {
                currentStreak: 0,
                maxStreak: 0,
                totalCorrect: 0,
                totalWrong: 0,
                totalSessions: 0
            },
            achievements: []
        };
    }

    recordAnswer(section, isCorrect) {
        const today = this.getTodayString();
        
        // Initialize today's data if not exists
        if (!this.stats.daily[today]) {
            this.stats.daily[today] = {
                correct: 0,
                wrong: 0,
                sections: {},
                sessions: [],
                timestamp: Date.now()
            };
        }

        // Record the answer
        if (isCorrect) {
            this.stats.daily[today].correct++;
            this.stats.weekly.totalCorrect++;
        } else {
            this.stats.daily[today].wrong++;
            this.stats.weekly.totalWrong++;
        }

        // Record by section
        if (!this.stats.daily[today].sections[section]) {
            this.stats.daily[today].sections[section] = { correct: 0, wrong: 0 };
        }
        
        if (isCorrect) {
            this.stats.daily[today].sections[section].correct++;
        } else {
            this.stats.daily[today].sections[section].wrong++;
        }

        // Record session timestamp
        this.stats.daily[today].sessions.push(Date.now());

        this.updateDailyStats();
        this.saveStats();
        this.updateUI();
    }

    updateDailyStats() {
        const today = this.getTodayString();
        const yesterday = this.getYesterdayString();
        
        // Check if it's Sunday (day 0) for weekly reset
        const todayDate = new Date();
        if (todayDate.getDay() === 0) { // Sunday
            this.resetWeeklyStats();
        }
        
        // Check if user studied yesterday
        const studiedYesterday = this.stats.daily[yesterday] && 
            (this.stats.daily[yesterday].correct > 0 || this.stats.daily[yesterday].wrong > 0);
        
        // Check if user studied today
        const studiedToday = this.stats.daily[today] && 
            (this.stats.daily[today].correct > 0 || this.stats.daily[today].wrong > 0);

        if (studiedToday) {
            if (studiedYesterday) {
                // Continue streak
                this.stats.weekly.currentStreak++;
            } else {
                // Start new streak
                this.stats.weekly.currentStreak = 1;
            }
            
            // Update max streak
            if (this.stats.weekly.currentStreak > this.stats.weekly.maxStreak) {
                this.stats.weekly.maxStreak = this.stats.weekly.currentStreak;
            }
        } else if (!studiedYesterday) {
            // Reset streak if no study for 2 days
            this.stats.weekly.currentStreak = 0;
        }
    }

    resetWeeklyStats() {
        // Reset weekly totals but keep streaks
        this.stats.weekly.totalCorrect = 0;
        this.stats.weekly.totalWrong = 0;
        this.stats.weekly.totalSessions = 0;
        
        console.log('📅 Weekly stats reset (Sunday)');
    }



    getTodayString() {
        return new Date().toISOString().split('T')[0];
    }

    getYesterdayString() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }

    getWeekData() {
        const weekData = [];
        const today = new Date();
        
        // Get the most recent Sunday
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const daysSinceSunday = currentDay;
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - daysSinceSunday);
        
        // Generate data for Sunday through Saturday (7 days)
        for (let i = 0; i < 7; i++) {
            const date = new Date(sunday);
            date.setDate(sunday.getDate() + i);
            const dateString = date.toISOString().split('T')[0];
            const dayData = this.stats.daily[dateString] || { correct: 0, wrong: 0 };
            
            weekData.push({
                date: dateString,
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                correct: dayData.correct,
                wrong: dayData.wrong,
                total: dayData.correct + dayData.wrong
            });
        }
        
        return weekData;
    }

    getSectionStats() {
        const sectionStats = {};
        const today = this.getTodayString();
        
        // Only include valid sections
        const validSections = ['languages', 'programming', 'bible', 'science', 'history', 'facts', 'country_flags'];
        
        if (this.stats.daily[today] && this.stats.daily[today].sections) {
            Object.keys(this.stats.daily[today].sections).forEach(section => {
                // Skip invalid sections
                if (!validSections.includes(section) || section === 'null' || section === 'undefined') {
                    return;
                }
                
                const sectionData = this.stats.daily[today].sections[section];
                const total = sectionData.correct + sectionData.wrong;
                const accuracy = total > 0 ? (sectionData.correct / total) * 100 : 0;
                
                sectionStats[section] = {
                    correct: sectionData.correct,
                    wrong: sectionData.wrong,
                    total: total,
                    accuracy: accuracy
                };
            });
        }
        
        return sectionStats;
    }

    updateUI() {
        // Update stats summary on homepage
        const totalAnswered = this.stats.weekly.totalCorrect + this.stats.weekly.totalWrong;
        const statsSummary = document.getElementById('stats-summary');
        if (statsSummary) {
            statsSummary.textContent = `${totalAnswered} answered`;
        }
    }

    openStatistics() {
        // Create statistics dashboard
        const dashboard = document.createElement('div');
        dashboard.className = 'stats-dashboard';
        dashboard.innerHTML = `
            <div class="stats-overlay">
                <div class="stats-container">
                    <div class="stats-header">
                        <h2>📊 Study Statistics</h2>
                        <button class="close-stats" onclick="this.closest('.stats-dashboard').remove()">✕</button>
                    </div>
                    
                    <div class="stats-content">
                        <div class="stats-overview">
                            <div class="stat-card">
                                <div class="stat-icon">📚</div>
                                <div class="stat-value">${this.stats.weekly.totalCorrect + this.stats.weekly.totalWrong}</div>
                                <div class="stat-label">Total Questions</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">🔥</div>
                                <div class="stat-value">${this.stats.weekly.currentStreak}</div>
                                <div class="stat-label">Current Streak</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">🎯</div>
                                <div class="stat-value">${this.getOverallAccuracy()}%</div>
                                <div class="stat-label">Overall Accuracy</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon">📅</div>
                                <div class="stat-value">${this.stats.weekly.totalSessions}</div>
                                <div class="stat-label">Study Sessions</div>
                            </div>
                        </div>
                        
                        <div class="stats-section">
                            <h3>This Week</h3>
                            <div class="week-progress-bars">
                                ${this.createWeekProgressBars()}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
        
        // Animate in
        setTimeout(() => {
            dashboard.classList.add('show');
            this.animateProgressBars();
        }, 100);
        
        // Play sound effect
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('click');
        }
    }

    getOverallAccuracy() {
        const total = this.stats.weekly.totalCorrect + this.stats.weekly.totalWrong;
        return total > 0 ? Math.round((this.stats.weekly.totalCorrect / total) * 100) : 0;
    }

    createWeekProgressBars() {
        const weekData = this.getWeekData();
        const maxQuestions = 200; // 200 questions = 100% fill
        
        return weekData.map((day, index) => {
            const questionsAnswered = day.total;
            const fillPercentage = Math.min(100, (questionsAnswered / maxQuestions) * 100);
            
            // Determine color based on fill level
            let colorClass = 'low';
            if (fillPercentage >= 67) colorClass = 'high';
            else if (fillPercentage >= 34) colorClass = 'medium';
            
            return `
                <div class="progress-bar-column">
                    <div class="progress-bar-outer">
                        <div class="progress-bar-inner ${colorClass}" 
                             data-fill="${fillPercentage}%"
                             data-index="${index}">
                        </div>
                        <div class="progress-bar-day">${day.day}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    animateProgressBars() {
        // Animate bars with staggered delays
        setTimeout(() => {
            const bars = document.querySelectorAll('.progress-bar-inner');
            console.log('🎯 Found progress bars:', bars.length);
            
            bars.forEach((bar, index) => {
                const fillPercentage = bar.getAttribute('data-fill');
                console.log(`🎯 Bar ${index}: fill = ${fillPercentage}`);
                
                if (fillPercentage) {
                    // Set the height with transition
                    setTimeout(() => {
                        bar.style.height = fillPercentage;
                        console.log(`🎯 Animating bar ${index} to ${fillPercentage}`);
                    }, index * 150); // 150ms delay between each bar
                }
            });
        }, 500); // Delay to ensure DOM is ready
    }




}

// Initialize statistics system
window.StudyStatistics = new StudyStatistics();

// Global function to open statistics
function openStatistics() {
    window.StudyStatistics.openStatistics();
}
