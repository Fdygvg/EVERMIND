// ==================== CODE EDITOR & COMPILER ====================
// HTML/CSS/JS live code editor with preview

const CodeEditor = {
    
    // Current editor state
    currentEditor: null,
    isEditorOpen: false,
    
    /**
     * Create and show the code editor modal
     * @param {string} initialCode - Initial code to load
     * @param {string} codeType - Type of code (html, css, javascript, python, c, shell)
     * @param {string} sectionId - Current section ID for persistence
     * @param {number} questionIndex - Question index for persistence
     */
    openEditor(initialCode = '', codeType = 'html', sectionId = null, questionIndex = null) {
        if (this.isEditorOpen) return;
        
        // Store context for code persistence
        this.currentSection = sectionId;
        this.currentQuestionIndex = questionIndex;
        
        // Create editor modal
        const editorModal = document.createElement('div');
        editorModal.id = 'codeEditorModal';
        editorModal.className = 'code-editor-modal';
        editorModal.innerHTML = `
            <div class="code-editor-container">
                <div class="code-editor-header">
                    <h3>💻 Code Editor</h3>
                    <div class="editor-controls">
                        <button class="editor-btn" onclick="CodeEditor.runCode()" title="Run Code">▶️ Run</button>
                        <button class="editor-btn" onclick="CodeEditor.testCode()" title="Test with Sample Code">🧪 Test</button>
                        <button class="editor-btn" onclick="CodeEditor.clearCode()" title="Clear Code">🗑️ Clear</button>
                        <button class="editor-btn" onclick="CodeEditor.closeEditor()" title="Close Editor">✖️ Close</button>
                    </div>
                </div>
                
                <div class="code-snippets-bar">
                    <div class="snippets-label">Quick Insert:</div>
                    <div class="snippets-container">
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('{}')" title="Curly braces">{ }</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('[]')" title="Square brackets">[ ]</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('()')" title="Parentheses">( )</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('<>')" title="Angle brackets">&lt; &gt;</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol(':')" title="Colon">:</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol(';')" title="Semicolon">;</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('=')" title="Equals">=</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('+')" title="Plus">+</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('-')" title="Minus">-</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('*')" title="Multiply">*</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('/')" title="Divide">/</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol('\"\"')" title="Quotes">&quot; &quot;</button>
                        <button class="snippet-btn" onclick="CodeEditor.insertSymbol(\"''\")" title="Single quotes">' '</button>
                    </div>
                </div>
                
                <div class="code-editor-body">
                    <div class="code-editor-panel">
                        <div class="panel-header">
                            <span>HTML</span>
                        </div>
                        <textarea id="htmlEditor" class="code-textarea" placeholder="Write your HTML here..." spellcheck="false"></textarea>
                    </div>
                    
                    <div class="code-editor-panel">
                        <div class="panel-header">
                            <span>CSS</span>
                        </div>
                        <textarea id="cssEditor" class="code-textarea" placeholder="Write your CSS here..." spellcheck="false"></textarea>
                    </div>
                    
                    <div class="code-editor-panel">
                        <div class="panel-header">
                            <span>JavaScript</span>
                        </div>
                        <textarea id="jsEditor" class="code-textarea" placeholder="Write your JavaScript here..." spellcheck="false"></textarea>
                    </div>
                </div>
                
                <div class="code-preview-section">
                    <div class="panel-header">
                        <span>Preview</span>
                        <button class="editor-btn small" onclick="CodeEditor.refreshPreview()" title="Refresh Preview">🔄 Refresh</button>
                    </div>
                    <iframe id="codePreview" class="code-preview-iframe" sandbox="allow-scripts allow-same-origin"></iframe>
                </div>
            </div>
        `;
        
        document.body.appendChild(editorModal);
        this.isEditorOpen = true;
        
        // Wait for iframe to be ready
        const preview = document.getElementById('codePreview');
        if (preview) {
            preview.onload = () => {
                console.log('Iframe loaded and ready');
                // Don't auto-run here to prevent blinking
            };
        }
        
        // Load code into correct panel based on type
        if (initialCode) {
            const normalizedType = codeType.toLowerCase();
            
            if (normalizedType === 'javascript' || normalizedType === 'js') {
                document.getElementById('jsEditor').value = initialCode;
            } else if (normalizedType === 'css') {
                document.getElementById('cssEditor').value = initialCode;
            } else if (normalizedType === 'python' || normalizedType === 'c' || normalizedType === 'shell') {
                // For non-web languages, put in JS editor with comment
                document.getElementById('jsEditor').value = `/* ${normalizedType.toUpperCase()} Code:\n${initialCode}\n*/\n\n// Note: This is ${normalizedType} code. Run it in a ${normalizedType} environment.`;
            } else {
                // Default to HTML
                document.getElementById('htmlEditor').value = initialCode;
            }
        }
    },
    
    /**
     * Close the code editor
     */
    closeEditor() {
        // Save code to localStorage before closing
        if (this.currentSection !== null && this.currentQuestionIndex !== null) {
            const html = document.getElementById('htmlEditor').value;
            const css = document.getElementById('cssEditor').value;
            const js = document.getElementById('jsEditor').value;
            
            // Combine all code to save
            const combinedCode = html || css || js;
            
            if (combinedCode.trim()) {
                const storageKey = `code_${this.currentSection}_${this.currentQuestionIndex}`;
                localStorage.setItem(storageKey, combinedCode);
            }
        }
        
        const modal = document.getElementById('codeEditorModal');
        if (modal) {
            modal.remove();
            this.isEditorOpen = false;
        }
        
        // Clear context
        this.currentSection = null;
        this.currentQuestionIndex = null;
    },
    
    /**
     * Run the code and display in preview
     */
    runCode() {
        const html = document.getElementById('htmlEditor').value;
        const css = document.getElementById('cssEditor').value;
        const js = document.getElementById('jsEditor').value;
        
        console.log('Running code:', { html, css, js }); // Debug log
        
        const preview = document.getElementById('codePreview');
        if (!preview) {
            console.error('Preview iframe not found');
            return;
        }
        
        // Prevent unnecessary refreshes if content hasn't changed
        const currentContent = html + css + js;
        if (this.lastContent === currentContent) {
            console.log('Content unchanged, skipping refresh');
            return;
        }
        this.lastContent = currentContent;
        
        const fullCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}</script>
</body>
</html>`;
        
        try {
            // Method 1: Try srcdoc first (most stable)
            preview.srcdoc = fullCode;
            console.log('Code executed successfully using srcdoc');
        } catch (error) {
            console.error('srcdoc failed:', error);
            
            try {
                // Method 2: Try data URL
                const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(fullCode);
                preview.src = dataUrl;
                console.log('Code executed successfully using data URL');
            } catch (dataError) {
                console.error('Data URL failed:', dataError);
                
                try {
                    // Method 3: Try document.write method
                    const previewDoc = preview.contentDocument || preview.contentWindow.document;
                    previewDoc.open();
                    previewDoc.write(fullCode);
                    previewDoc.close();
                    console.log('Code executed successfully using document.write');
                } catch (fallbackError) {
                    console.error('All methods failed:', fallbackError);
                }
            }
        }
    },
    
    /**
     * Refresh the preview (same as runCode)
     */
    refreshPreview() {
        this.runCode();
    },
    
    /**
     * Test with sample code to verify compiler works
     */
    testCode() {
        document.getElementById('htmlEditor').value = '<h1>Hello World!</h1><p>This is a test.</p>';
        document.getElementById('cssEditor').value = 'h1 { color: blue; } p { color: green; }';
        document.getElementById('jsEditor').value = 'console.log("JavaScript is working!"); document.body.style.backgroundColor = "#f0f0f0";';
        
        // Run the test code
        setTimeout(() => {
            this.runCode();
        }, 100);
    },
    
    /**
     * Debug function to test iframe directly
     */
    debugIframe() {
        const preview = document.getElementById('codePreview');
        console.log('Iframe element:', preview);
        console.log('Iframe src:', preview.src);
        console.log('Iframe srcdoc:', preview.srcdoc);
        
        // Test simple HTML
        preview.srcdoc = '<h1>Test</h1><p>If you see this, iframe works!</p>';
        console.log('Set simple test HTML');
    },
    
    /**
     * Simple test to verify iframe works
     */
    simpleTest() {
        const preview = document.getElementById('codePreview');
        if (!preview) {
            console.error('No iframe found');
            return;
        }
        
        // Test with minimal HTML
        const testHTML = '<h1 style="color: red;">Hello!</h1><p>Iframe is working!</p>';
        
        try {
            preview.srcdoc = testHTML;
            console.log('Simple test HTML set');
        } catch (e) {
            console.error('Error setting srcdoc:', e);
        }
    },
    
    /**
     * Clear all code
     */
    clearCode() {
        if (confirm('Clear all code?')) {
            document.getElementById('htmlEditor').value = '';
            document.getElementById('cssEditor').value = '';
            document.getElementById('jsEditor').value = '';
            this.runCode();
        }
    },
    
    /**
     * Refresh preview
     */
    refreshPreview() {
        this.runCode();
    },
    
    /**
     * Insert symbol at cursor position in the currently focused editor
     */
    insertSymbol(symbol) {
        // Find which editor is currently focused
        const editors = ['htmlEditor', 'cssEditor', 'jsEditor'];
        let activeEditor = null;
        
        for (const editorId of editors) {
            const editor = document.getElementById(editorId);
            if (editor === document.activeElement) {
                activeEditor = editor;
                break;
            }
        }
        
        // If no editor is focused, default to HTML editor
        if (!activeEditor) {
            activeEditor = document.getElementById('htmlEditor');
        }
        
        const start = activeEditor.selectionStart;
        const end = activeEditor.selectionEnd;
        const text = activeEditor.value;
        
        // Insert symbol
        activeEditor.value = text.substring(0, start) + symbol + text.substring(end);
        
        // Move cursor to middle of symbol (for paired symbols like {})
        const cursorPos = start + Math.floor(symbol.length / 2);
        activeEditor.selectionStart = activeEditor.selectionEnd = cursorPos;
        activeEditor.focus();
    },
    
    /**
     * Add "Try Code" button to programming questions
     */
    addCodeButton(questionElement) {
        const codeBtn = document.createElement('button');
        codeBtn.className = 'code-editor-btn';
        codeBtn.innerHTML = '💻 Try Code';
        codeBtn.title = 'Open code editor';
        
        codeBtn.onclick = (e) => {
            e.stopPropagation();
            
            // Try to extract code from the answer
            const answerElement = questionElement.querySelector('.answer');
            let initialCode = '';
            
            if (answerElement) {
                const codeElement = answerElement.querySelector('code');
                if (codeElement) {
                    initialCode = codeElement.textContent;
                }
            }
            
            this.openEditor(initialCode);
        };
        
        return codeBtn;
    },
    
    /**
     * Initialize keyboard shortcuts
     */
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to run code
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && this.isEditorOpen) {
                e.preventDefault();
                this.runCode();
            }
            
            // Escape to close editor
            if (e.key === 'Escape' && this.isEditorOpen) {
                e.preventDefault();
                this.closeEditor();
            }
        });
    }
};

// Initialize keyboard shortcuts when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        CodeEditor.initKeyboardShortcuts();
    });
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.CodeEditor = CodeEditor;
}

