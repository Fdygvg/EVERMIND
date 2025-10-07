// ==================== CODE EDITOR & COMPILER ====================
// HTML/CSS/JS live code editor with preview

const CodeEditor = {
    
    // Current editor state
    currentEditor: null,
    isEditorOpen: false,
    
    /**
     * Create and show the code editor modal
     */
    openEditor(initialCode = '') {
        if (this.isEditorOpen) return;
        
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
                        <button class="editor-btn" onclick="CodeEditor.clearCode()" title="Clear Code">🗑️ Clear</button>
                        <button class="editor-btn" onclick="CodeEditor.closeEditor()" title="Close Editor">✖️ Close</button>
                    </div>
                </div>
                
                <div class="code-editor-body">
                    <div class="code-editor-panel">
                        <div class="panel-header">
                            <span>HTML</span>
                            <div class="quick-symbols">
                                <button onclick="CodeEditor.insertSymbol('html', '<div></div>')" title="Insert div">&lt;div&gt;</button>
                                <button onclick="CodeEditor.insertSymbol('html', '<p></p>')" title="Insert paragraph">&lt;p&gt;</button>
                                <button onclick="CodeEditor.insertSymbol('html', '<button></button>')" title="Insert button">&lt;btn&gt;</button>
                                <button onclick="CodeEditor.insertSymbol('html', '<input>')" title="Insert input">&lt;input&gt;</button>
                            </div>
                        </div>
                        <textarea id="htmlEditor" class="code-textarea" placeholder="Write your HTML here..." spellcheck="false"></textarea>
                    </div>
                    
                    <div class="code-editor-panel">
                        <div class="panel-header">
                            <span>CSS</span>
                            <div class="quick-symbols">
                                <button onclick="CodeEditor.insertSymbol('css', '{}')" title="Curly braces">{ }</button>
                                <button onclick="CodeEditor.insertSymbol('css', ':')" title="Colon">:</button>
                                <button onclick="CodeEditor.insertSymbol('css', ';')" title="Semicolon">;</button>
                                <button onclick="CodeEditor.insertSymbol('css', '#')" title="Hash">#</button>
                                <button onclick="CodeEditor.insertSymbol('css', '.')" title="Class">.</button>
                            </div>
                        </div>
                        <textarea id="cssEditor" class="code-textarea" placeholder="Write your CSS here..." spellcheck="false"></textarea>
                    </div>
                    
                    <div class="code-editor-panel">
                        <div class="panel-header">
                            <span>JavaScript</span>
                            <div class="quick-symbols">
                                <button onclick="CodeEditor.insertSymbol('js', '{}')" title="Curly braces">{ }</button>
                                <button onclick="CodeEditor.insertSymbol('js', '[]')" title="Square brackets">[ ]</button>
                                <button onclick="CodeEditor.insertSymbol('js', '()')" title="Parentheses">( )</button>
                                <button onclick="CodeEditor.insertSymbol('js', '=>')" title="Arrow function">=&gt;</button>
                                <button onclick="CodeEditor.insertSymbol('js', ';')" title="Semicolon">;</button>
                            </div>
                        </div>
                        <textarea id="jsEditor" class="code-textarea" placeholder="Write your JavaScript here..." spellcheck="false"></textarea>
                    </div>
                </div>
                
                <div class="code-preview-section">
                    <div class="panel-header">
                        <span>Preview</span>
                        <button class="editor-btn small" onclick="CodeEditor.refreshPreview()" title="Refresh Preview">🔄 Refresh</button>
                    </div>
                    <iframe id="codePreview" class="code-preview-iframe" sandbox="allow-scripts allow-modals"></iframe>
                </div>
            </div>
        `;
        
        document.body.appendChild(editorModal);
        this.isEditorOpen = true;
        
        // Set initial code if provided
        if (initialCode) {
            document.getElementById('htmlEditor').value = initialCode;
        }
        
        // Auto-run on first open if there's initial code
        if (initialCode) {
            this.runCode();
        }
    },
    
    /**
     * Close the code editor
     */
    closeEditor() {
        const modal = document.getElementById('codeEditorModal');
        if (modal) {
            modal.remove();
            this.isEditorOpen = false;
        }
    },
    
    /**
     * Run the code and display in preview
     */
    runCode() {
        const html = document.getElementById('htmlEditor').value;
        const css = document.getElementById('cssEditor').value;
        const js = document.getElementById('jsEditor').value;
        
        const preview = document.getElementById('codePreview');
        const previewDoc = preview.contentDocument || preview.contentWindow.document;
        
        const fullCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}<\/script>
            </body>
            </html>
        `;
        
        previewDoc.open();
        previewDoc.write(fullCode);
        previewDoc.close();
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
     * Insert symbol at cursor position
     */
    insertSymbol(editorType, symbol) {
        let editorId;
        switch(editorType) {
            case 'html': editorId = 'htmlEditor'; break;
            case 'css': editorId = 'cssEditor'; break;
            case 'js': editorId = 'jsEditor'; break;
        }
        
        const editor = document.getElementById(editorId);
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const text = editor.value;
        
        // Insert symbol
        editor.value = text.substring(0, start) + symbol + text.substring(end);
        
        // Move cursor to middle of symbol (for paired symbols like {})
        const cursorPos = start + Math.floor(symbol.length / 2);
        editor.selectionStart = editor.selectionEnd = cursorPos;
        editor.focus();
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

