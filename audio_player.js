// ==================== AUDIO PLAYER SYSTEM ====================
// Handles both Web Speech API and Spitch API for language pronunciation

const AudioPlayer = {
    // API Configuration
    SPITCH_API_KEY: 'sk_yaxeQ5VVO8ZBXl7ACEyzJZZfQ3Ojafb0PLtDELhl',
    SPITCH_API_URL: 'https://api.spitch.ai/v1/text-to-speech',
    
    // Language routing
    webSpeechLanguages: ['japanese', 'spanish', 'french'],
    spitchLanguages: ['yoruba', 'igbo', 'hausa'],
    
    // Language codes for Web Speech API
    webSpeechCodes: {
        'japanese': 'ja-JP',
        'spanish': 'es-ES',
        'french': 'fr-FR'
    },
    
    // Cache for audio files
    audioCache: new Map(),
    
    /**
     * Main function to play audio for a given text and language
     */
    async playAudio(text, language) {
        language = language.toLowerCase();
        
        // Check if audio is already cached
        const cacheKey = `${language}_${text}`;
        if (this.audioCache.has(cacheKey)) {
            this.playFromCache(cacheKey);
            return;
        }
        
        // Route to appropriate API
        if (this.webSpeechLanguages.includes(language)) {
            this.playWithWebSpeech(text, language, cacheKey);
        } else if (this.spitchLanguages.includes(language)) {
            await this.playWithSpitch(text, language, cacheKey);
        } else {
            console.warn(`Language "${language}" not supported`);
        }
    },
    
    /**
     * Play audio using Web Speech API (French, Spanish, Japanese)
     */
    playWithWebSpeech(text, language, cacheKey) {
        if (!('speechSynthesis' in window)) {
            console.error('Web Speech API not supported');
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.webSpeechCodes[language];
        
        // Get available voices
        const voices = speechSynthesis.getVoices();
        
        // Try to find female voice first
        let femaleVoice = voices.find(voice => 
            voice.lang.startsWith(this.webSpeechCodes[language].split('-')[0]) && 
            (voice.name.toLowerCase().includes('female') || 
             voice.name.toLowerCase().includes('woman') ||
             voice.name.toLowerCase().includes('zira') ||
             voice.name.toLowerCase().includes('hazel'))
        );
        
        // If no female voice, try any voice for that language
        if (!femaleVoice) {
            femaleVoice = voices.find(voice => 
                voice.lang.startsWith(this.webSpeechCodes[language].split('-')[0])
            );
        }
        
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }
        
        utterance.rate = 0.9; // Slightly slower for learning
        utterance.pitch = 1.0;
        
        // Cache this for future use
        this.audioCache.set(cacheKey, {
            type: 'web_speech',
            text: text,
            language: language
        });
        
        speechSynthesis.speak(utterance);
    },
    
    /**
     * Play audio using Spitch API (Yoruba, Igbo, Hausa)
     */
    async playWithSpitch(text, language, cacheKey) {
        try {
            const response = await fetch(this.SPITCH_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.SPITCH_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    language: language,
                    voice: 'female', // Prefer female voice
                    speed: 0.9
                })
            });
            
            if (!response.ok) {
                console.error('Spitch API error:', response.status);
                return; // Skip audio if API fails
            }
            
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Cache the audio
            this.audioCache.set(cacheKey, {
                type: 'spitch',
                url: audioUrl,
                blob: audioBlob
            });
            
            // Play the audio
            const audio = new Audio(audioUrl);
            audio.play();
            
        } catch (error) {
            console.error('Spitch API failed:', error);
            // Skip audio on error as requested
        }
    },
    
    /**
     * Play audio from cache
     */
    playFromCache(cacheKey) {
        const cached = this.audioCache.get(cacheKey);
        
        if (cached.type === 'web_speech') {
            this.playWithWebSpeech(cached.text, cached.language, cacheKey);
        } else if (cached.type === 'spitch') {
            const audio = new Audio(cached.url);
            audio.play();
        }
    },
    
    /**
     * Initialize voices for Web Speech API
     */
    initializeVoices() {
        if ('speechSynthesis' in window) {
            // Load voices
            speechSynthesis.getVoices();
            
            // Some browsers need this event
            speechSynthesis.onvoiceschanged = () => {
                speechSynthesis.getVoices();
            };
        }
    },
    
    /**
     * Add speaker button to a question element
     */
    addSpeakerButton(questionElement, text, language) {
        const speakerBtn = document.createElement('button');
        speakerBtn.className = 'speaker-btn';
        speakerBtn.innerHTML = '🔊';
        speakerBtn.title = 'Play pronunciation';
        speakerBtn.setAttribute('aria-label', `Play pronunciation for ${text}`);
        
        speakerBtn.onclick = (e) => {
            e.stopPropagation();
            this.playAudio(text, language);
        };
        
        return speakerBtn;
    }
};

// Initialize voices when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        AudioPlayer.initializeVoices();
    });
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.AudioPlayer = AudioPlayer;
}

