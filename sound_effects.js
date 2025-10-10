// ==================== SOUND EFFECTS SYSTEM ====================
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.isMuted = localStorage.getItem('evermind-muted') === 'true';
        this.volume = 0.3; // Default volume
        
        this.initAudioContext();
        this.updateMuteButton();
    }
    
    initAudioContext() {
        try {
            // Create audio context (will be resumed on first user interaction)
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }
    
    async ensureAudioContext() {
        if (!this.audioContext) return false;
        
        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (error) {
                console.warn('Could not resume audio context:', error);
                return false;
            }
        }
        return true;
    }
    
    // Initialize audio context on first user interaction
    initAudioOnUserInteraction() {
        if (!this.audioContext) {
            this.initAudioContext();
        }
    }
    
    // Generate different types of sounds using Web Audio API
    playSound(type) {
        if (this.isMuted || !this.audioContext) return;
        
        this.ensureAudioContext().then(ready => {
            if (!ready) return;
            
            switch (type) {
                case 'click':
                    this.playClickSound();
                    break;
                case 'showAnswer':
                    this.playShowAnswerSound();
                    break;
                case 'next':
                    this.playNextSound();
                    break;
                case 'skip':
                    this.playSkipSound();
                    break;
                case 'correct':
                    this.playCorrectSound();
                    break;
                case 'wrong':
                    this.playWrongSound();
                    break;
                case 'complete':
                    this.playCompleteSound();
                    break;
                default:
                    this.playClickSound();
            }
        });
    }
    
    playClickSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Neutral, subtle click sound
        oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.05);
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.08);
    }
    
    playShowAnswerSound() {
        // Neutral, subtle sound that signals information delivery
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Gentle bell-like tone
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5
        oscillator.frequency.setValueAtTime(1046.50, this.audioContext.currentTime + 0.05); // C6
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime + 0.1); // A5
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.25, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    
    playNextSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Pleasant ascending tone
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.2);
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    playSkipSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Quick whoosh sound
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.05);
        oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.15);
        
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.25, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }
    
    playCorrectSound() {
        // Bright, ascending tone that conveys success
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Pleasant ascending major chord progression
        oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.08); // E5
        oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.16); // G5
        oscillator.frequency.setValueAtTime(1046.50, this.audioContext.currentTime + 0.24); // C6
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.4);
    }
    
    playWrongSound() {
        // Soft, descending chime that indicates correction without discouragement
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Gentle descending tone
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4
        oscillator.frequency.setValueAtTime(392, this.audioContext.currentTime + 0.1); // G4
        oscillator.frequency.setValueAtTime(349.23, this.audioContext.currentTime + 0.2); // F4
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.35);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.35);
    }
    
    playCompleteSound() {
        // Play a celebratory chord
        const frequencies = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            const delay = index * 0.1;
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + delay);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + delay + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + delay + 0.5);
            
            oscillator.start(this.audioContext.currentTime + delay);
            oscillator.stop(this.audioContext.currentTime + delay + 0.5);
        });
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('evermind-muted', this.isMuted.toString());
        this.updateMuteButton();
        
        // Play a sound to indicate mute state change
        if (!this.isMuted) {
            this.playClickSound();
        }
    }
    
    updateMuteButton() {
        const muteBtn = document.getElementById('muteBtn');
        if (muteBtn) {
            const icon = muteBtn.querySelector('.mute-icon');
            if (this.isMuted) {
                muteBtn.classList.add('muted');
                icon.textContent = '🔇';
            } else {
                muteBtn.classList.remove('muted');
                icon.textContent = '🔊';
            }
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
}

// Create global instance
window.SoundEffects = new SoundEffects();

// Initialize audio on first user interaction
document.addEventListener('click', () => {
    if (window.SoundEffects) {
        window.SoundEffects.initAudioOnUserInteraction();
    }
}, { once: true });

// Ensure the instance is ready
console.log('🔊 SoundEffects initialized:', window.SoundEffects);