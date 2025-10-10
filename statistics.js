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
            }
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
            } catch (e) {
                console.error('Error loading statistics:', e);
                this.stats = this.getDefaultStats();
            }
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
            }
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
        this.checkAchievements();
        this.saveStats();
        this.updateUI();
    }

    updateDailyStats() {
        const today = this.getTodayString();
        const yesterday = this.getYesterdayString();
        
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

    checkAchievements() {
        const achievements = this.stats.achievements;
        
        // Week Warrior (7-day streak)
        if (this.stats.weekly.currentStreak >= 7 && !achievements.includes('week_warrior')) {
            achievements.push('week_warrior');
            this.showAchievement('🔥 Week Warrior', 'You studied for 7 days in a row!');
        }
        
        // Perfect Week (95%+ accuracy)
        const today = this.getTodayString();
        if (this.stats.daily[today]) {
            const total = this.stats.daily[today].correct + this.stats.daily[today].wrong;
            const accuracy = total > 0 ? (this.stats.daily[today].correct / total) * 100 : 0;
            
            if (accuracy >= 95 && total >= 10 && !achievements.includes('perfect_week')) {
                achievements.push('perfect_week');
                this.showAchievement('🎯 Perfect Week', 'You achieved 95%+ accuracy!');
            }
        }
        
        // Section Master (100% in any section)
        if (this.stats.daily[today] && this.stats.daily[today].sections) {
            Object.keys(this.stats.daily[today].sections).forEach(section => {
                const sectionData = this.stats.daily[today].sections[section];
                const total = sectionData.correct + sectionData.wrong;
                const accuracy = total > 0 ? (sectionData.correct / total) * 100 : 0;
                
                if (accuracy === 100 && total >= 5 && !achievements.includes(`section_master_${section}`)) {
                    achievements.push(`section_master_${section}`);
                    this.showAchievement('💯 Section Master', `Perfect score in ${section}!`);
                }
            });
        }
        
        // Speed Demon (50+ questions in one day)
        const todayTotal = this.stats.daily[today] ? 
            this.stats.daily[today].correct + this.stats.daily[today].wrong : 0;
        
        if (todayTotal >= 50 && !achievements.includes('speed_demon')) {
            achievements.push('speed_demon');
            this.showAchievement('⚡ Speed Demon', 'You answered 50+ questions today!');
        }
        
        // Dedicated Learner (30-day streak)
        if (this.stats.weekly.currentStreak >= 30 && !achievements.includes('dedicated_learner')) {
            achievements.push('dedicated_learner');
            this.showAchievement('📚 Dedicated Learner', '30-day study streak!');
        }
        
        // Knowledge Seeker (100 total questions answered)
        const totalAnswered = this.stats.weekly.totalCorrect + this.stats.weekly.totalWrong;
        if (totalAnswered >= 100 && !achievements.includes('knowledge_seeker')) {
            achievements.push('knowledge_seeker');
            this.showAchievement('🎓 Knowledge Seeker', 'You answered 100+ questions!');
        }
        
        // Rising Star (5-day streak)
        if (this.stats.weekly.currentStreak >= 5 && !achievements.includes('rising_star')) {
            achievements.push('rising_star');
            this.showAchievement('🌟 Rising Star', '5-day study streak!');
        }
        
        // Diamond Mind (200 total questions answered)
        if (totalAnswered >= 200 && !achievements.includes('diamond_mind')) {
            achievements.push('diamond_mind');
            this.showAchievement('💎 Diamond Mind', 'You answered 200+ questions!');
        }
        
        // On Fire (10-day streak)
        if (this.stats.weekly.currentStreak >= 10 && !achievements.includes('on_fire')) {
            achievements.push('on_fire');
            this.showAchievement('🔥 On Fire', '10-day study streak!');
        }
        
        // Master Mind (500 total questions answered)
        if (totalAnswered >= 500 && !achievements.includes('master_mind')) {
            achievements.push('master_mind');
            this.showAchievement('🏆 Master Mind', 'You answered 500+ questions!');
        }
    }

    showAchievement(title, description) {
        // Create achievement notification
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">🏆</div>
                <div class="achievement-text">
                    <div class="achievement-title">${title}</div>
                    <div class="achievement-desc">${description}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Play sound effect
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('correct');
        }
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
        
        // Get the start of the week (Sunday)
        const startOfWeek = new Date(today);
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        startOfWeek.setDate(today.getDate() - dayOfWeek);
        
        // Generate 7 days starting from Sunday
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
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
        
        // Only include valid sections
        const validSections = ['languages', 'programming', 'bible', 'science', 'history', 'facts', 'country_flags', 'new_words', 'youtube_knowledge', 'memes_brainrot'];
        
        // Initialize all valid sections
        validSections.forEach(section => {
            sectionStats[section] = {
                correct: 0,
                wrong: 0,
                total: 0,
                accuracy: 0
            };
        });
        
        // Aggregate data from all days
        Object.keys(this.stats.daily).forEach(date => {
            if (this.stats.daily[date].sections) {
                Object.keys(this.stats.daily[date].sections).forEach(section => {
                    // Skip invalid sections
                    if (!validSections.includes(section) || section === 'null' || section === 'undefined') {
                        return;
                    }
                    
                    const sectionData = this.stats.daily[date].sections[section];
                    sectionStats[section].correct += sectionData.correct || 0;
                    sectionStats[section].wrong += sectionData.wrong || 0;
                });
            }
        });
        
        // Calculate totals and accuracy
        Object.keys(sectionStats).forEach(section => {
            const stats = sectionStats[section];
            stats.total = stats.correct + stats.wrong;
            stats.accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
        });
        
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
                            <h3>📈 This Week</h3>
                            <div class="week-chart">
                                ${this.createWeekChart()}
                            </div>
                        </div>
                        
                        <div class="stats-section">
                            <h3>📊 By Section</h3>
                            <div class="section-stats">
                                ${this.createSectionStats()}
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

    createWeekChart() {
        const weekData = this.getWeekData();
        const maxQuestions = Math.max(...weekData.map(d => d.total), 1);
        
        return weekData.map(day => {
            const height = (day.total / maxQuestions) * 100;
            return `
                <div class="day-bar">
                    <div class="bar-container">
                        <div class="bar-fill" style="height: ${height}%"></div>
                    </div>
                    <div class="day-label">${day.day}</div>
                    <div class="day-count">${day.total}</div>
                </div>
            `;
        }).join('');
    }

    createSectionStats() {
        const sectionStats = this.getSectionStats();
        const sections = Object.keys(sectionStats);
        
        if (sections.length === 0) {
            return '<p style="text-align: center; opacity: 0.7;">No section data yet</p>';
        }
        
        return sections.map(section => {
            const stats = sectionStats[section];
            return `
                <div class="section-stat">
                    <div class="section-name">${section.charAt(0).toUpperCase() + section.slice(1)}</div>
                    <div class="section-bar">
                        <div class="section-fill" style="width: ${stats.accuracy}%"></div>
                    </div>
                    <div class="section-accuracy">${Math.round(stats.accuracy)}%</div>
                    <div class="section-count">${stats.total} questions</div>
                </div>
            `;
        }).join('');
    }

}

// Initialize statistics system
window.StudyStatistics = new StudyStatistics();

// Global function to open statistics
function openStatistics() {
    window.StudyStatistics.openStatistics();
}
