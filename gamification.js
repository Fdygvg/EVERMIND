// ==================== GAMIFICATION SYSTEM ====================
class GamificationSystem {
    constructor() {
        this.points = parseInt(localStorage.getItem('evermind-points')) || 0;
        this.level = this.calculateLevel(this.points);
        this.streak = parseInt(localStorage.getItem('evermind-streak')) || 0;
        this.maxStreak = parseInt(localStorage.getItem('evermind-max-streak')) || 0;
        this.totalCorrect = parseInt(localStorage.getItem('evermind-total-correct')) || 0;
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.createNotificationContainer();
    }
    
    calculateLevel(points) {
        if (points < 100) return 1;
        if (points < 300) return 2;
        if (points < 600) return 3;
        if (points < 1000) return 4;
        return Math.floor((points - 1000) / 500) + 5;
    }
    
    getLevelInfo(level) {
        const levelData = {
            1: { name: 'Bronze', color: '#CD7F32', threshold: 0 },
            2: { name: 'Silver', color: '#C0C0C0', threshold: 100 },
            3: { name: 'Gold', color: '#FFD700', threshold: 300 },
            4: { name: 'Diamond', color: '#B9F2FF', threshold: 600 },
        };
        
        if (level >= 5) {
            return { name: 'Master', color: '#8B5CF6', threshold: 1000 };
        }
        
        return levelData[level] || { name: 'Bronze', color: '#CD7F32', threshold: 0 };
    }
    
    awardPoints(type, isCorrect = false) {
        let pointsEarned = 0;
        
        if (type === 'correct') {
            pointsEarned = 10;
            this.streak++;
            this.totalCorrect++;
            
            // Bonus points for streaks
            if (this.streak >= 3) {
                pointsEarned += 5;
            }
            if (this.streak >= 5) {
                pointsEarned += 5;
            }
            if (this.streak >= 10) {
                pointsEarned += 10;
            }
            
            this.maxStreak = Math.max(this.maxStreak, this.streak);
        } else if (type === 'wrong') {
            this.streak = 0; // Reset streak on wrong answer
        }
        
        if (pointsEarned > 0) {
            const oldLevel = this.level;
            this.points += pointsEarned;
            this.level = this.calculateLevel(this.points);
            
            this.saveProgress();
            this.updateDisplay();
            
            // Show floating points animation
            this.showFloatingPoints(pointsEarned);
            
            // Check for level up
            if (this.level > oldLevel) {
                this.showLevelUpNotification(oldLevel, this.level);
            }
        }
    }
    
    showFloatingPoints(points) {
        const questionCard = document.getElementById('questionCard');
        if (!questionCard) return;
        
        const floatingPoints = document.createElement('div');
        floatingPoints.className = 'floating-points';
        floatingPoints.textContent = `+${points} XP`;
        floatingPoints.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #10b981;
            font-weight: bold;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 2s ease-out forwards;
        `;
        
        questionCard.style.position = 'relative';
        questionCard.appendChild(floatingPoints);
        
        setTimeout(() => {
            if (floatingPoints.parentNode) {
                floatingPoints.parentNode.removeChild(floatingPoints);
            }
        }, 2000);
    }
    
    showLevelUpNotification(oldLevel, newLevel) {
        const notification = this.createNotification(
            `🎉 Level Up!`,
            `You reached Level ${newLevel} (${this.getLevelInfo(newLevel).name})!`,
            'level-up'
        );
        
        // Play special level-up sound
        if (window.SoundEffects && typeof window.SoundEffects.playSound === 'function') {
            window.SoundEffects.playSound('complete');
        }
        
        // Show confetti effect
        this.showConfetti();
    }
    
    createNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        const container = document.getElementById('notificationContainer');
        container.appendChild(notification);
        
        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
        
        return notification;
    }
    
    createNotificationContainer() {
        if (document.getElementById('notificationContainer')) return;
        
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(container);
    }
    
    showConfetti() {
        const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                this.createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 20);
        }
    }
    
    createConfettiPiece(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${color};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 10001;
            animation: confettiFall 3s linear forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 3000);
    }
    
    updateDisplay() {
        const levelInfo = this.getLevelInfo(this.level);
        const nextLevelThreshold = this.level >= 5 ? 
            (this.level - 4) * 500 + 1000 : 
            this.getLevelInfo(this.level + 1).threshold;
        
        const currentLevelProgress = this.level >= 5 ? 
            (this.points - 1000) % 500 : 
            this.points - levelInfo.threshold;
        
        const levelProgress = this.level >= 5 ? 
            500 : 
            nextLevelThreshold - levelInfo.threshold;
        
        const progressPercentage = Math.min(100, (currentLevelProgress / levelProgress) * 100);
        
        // Update XP bar
        const xpBar = document.getElementById('xpBar');
        if (xpBar) {
            xpBar.style.width = `${progressPercentage}%`;
        }
        
        // Update level display
        const levelDisplay = document.getElementById('levelDisplay');
        if (levelDisplay) {
            levelDisplay.innerHTML = `
                <div class="level-badge" style="background: ${levelInfo.color}">
                    Level ${this.level}
                </div>
                <div class="level-name">${levelInfo.name}</div>
            `;
        }
        
        // Update points display
        const pointsDisplay = document.getElementById('pointsDisplay');
        if (pointsDisplay) {
            pointsDisplay.textContent = `${this.points} XP`;
        }
        
        // Update streak display
        const streakDisplay = document.getElementById('streakDisplay');
        if (streakDisplay) {
            streakDisplay.textContent = `🔥 ${this.streak}`;
        }
    }
    
    saveProgress() {
        localStorage.setItem('evermind-points', this.points.toString());
        localStorage.setItem('evermind-streak', this.streak.toString());
        localStorage.setItem('evermind-max-streak', this.maxStreak.toString());
        localStorage.setItem('evermind-total-correct', this.totalCorrect.toString());
    }
    
    resetProgress() {
        this.points = 0;
        this.level = 1;
        this.streak = 0;
        this.maxStreak = 0;
        this.totalCorrect = 0;
        this.saveProgress();
        this.updateDisplay();
    }
    
    getStats() {
        return {
            points: this.points,
            level: this.level,
            levelName: this.getLevelInfo(this.level).name,
            streak: this.streak,
            maxStreak: this.maxStreak,
            totalCorrect: this.totalCorrect
        };
    }
}

// Create global instance
window.Gamification = new GamificationSystem();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150px) scale(1.2);
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .notification {
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 10px;
        backdrop-filter: blur(20px);
        pointer-events: auto;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    }
    
    .notification-level-up {
        border-color: #10b981;
        background: rgba(16, 185, 129, 0.1);
    }
    
    .notification-content {
        color: white;
    }
    
    .notification-title {
        font-weight: bold;
        font-size: 1.1rem;
        margin-bottom: 5px;
    }
    
    .notification-message {
        font-size: 0.9rem;
        opacity: 0.9;
    }
    
    .notification-close {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.7;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('🎮 Gamification System initialized:', window.Gamification);
