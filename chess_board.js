// ==================== CHESS BOARD COMPONENT ====================
// Interactive chess board for learning chess moves and strategies

window.ChessBoard = {
    board: null,
    selectedSquare: null,
    currentQuestion: null,

    // Initialize chess board
    createChessBoard() {
        const container = document.getElementById('chessBoard');
        if (!container) return;

        container.innerHTML = '';
        
        const board = document.createElement('div');
        board.className = 'chess-board';
        board.id = 'chessBoardGrid';

        // Create 8x8 grid
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                square.dataset.position = this.getPositionFromCoords(row, col);
                
                // Add click handler
                square.addEventListener('click', (e) => this.handleSquareClick(e));
                
                board.appendChild(square);
            }
        }

        container.appendChild(board);
        this.board = board;
        console.log('♟️ Chess board created');
    },

    // Convert coordinates to chess notation (e.g., 0,0 -> a8)
    getPositionFromCoords(row, col) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
        return files[col] + ranks[row];
    },

    // Convert chess notation to coordinates (e.g., e4 -> 4,4)
    getCoordsFromPosition(position) {
        const file = position[0].charCodeAt(0) - 97; // a=0, b=1, etc.
        const rank = 8 - parseInt(position[1]); // 8=0, 7=1, etc.
        return { row: rank, col: file };
    },

    // Place a piece on the board
    renderPiece(type, position, color = 'white') {
        const coords = this.getCoordsFromPosition(position);
        const square = this.board.children[coords.row * 8 + coords.col];
        
        // Clear existing piece
        square.innerHTML = '';
        
        // Add piece
        const piece = document.createElement('div');
        piece.className = 'chess-piece';
        piece.textContent = this.getPieceSymbol(type, color);
        piece.dataset.type = type;
        piece.dataset.color = color;
        
        square.appendChild(piece);
    },

    // Get Unicode symbol for piece
    getPieceSymbol(type, color) {
        const symbols = {
            white: {
                king: '♔',
                queen: '♕',
                rook: '♖',
                bishop: '♗',
                knight: '♘',
                pawn: '♙'
            },
            black: {
                king: '♚',
                queen: '♛',
                rook: '♜',
                bishop: '♝',
                knight: '♞',
                pawn: '♟'
            }
        };
        return symbols[color][type] || '?';
    },

    // Highlight possible moves
    highlightMoves(positions) {
        this.clearHighlights();
        
        positions.forEach(pos => {
            const coords = this.getCoordsFromPosition(pos);
            const square = this.board.children[coords.row * 8 + coords.col];
            square.classList.add('highlight');
        });
    },

    // Clear all highlights
    clearHighlights() {
        const squares = this.board.querySelectorAll('.chess-square');
        squares.forEach(square => {
            square.classList.remove('highlight', 'selected');
        });
    },

    // Handle square click
    handleSquareClick(event) {
        const square = event.currentTarget;
        const position = square.dataset.position;
        
        if (this.selectedSquare) {
            // If clicking on a highlighted move, animate the move
            if (square.classList.contains('highlight')) {
                this.animateMove(this.selectedSquare.dataset.position, position);
                this.clearHighlights();
                this.selectedSquare = null;
            } else {
                // Select new square
                this.clearHighlights();
                this.selectSquare(square);
            }
        } else {
            // Select square if it has a piece
            if (square.querySelector('.chess-piece')) {
                this.selectSquare(square);
            }
        }
    },

    // Select a square and show its moves
    selectSquare(square) {
        this.selectedSquare = square;
        square.classList.add('selected');
        
        const piece = square.querySelector('.chess-piece');
        if (piece && this.currentQuestion) {
            // Show possible moves for this piece
            this.highlightMoves(this.currentQuestion.possibleMoves || []);
        }
    },

    // Animate piece movement
    animateMove(fromPos, toPos) {
        const fromCoords = this.getCoordsFromPosition(fromPos);
        const toCoords = this.getCoordsFromPosition(toPos);
        
        const fromSquare = this.board.children[fromCoords.row * 8 + fromCoords.col];
        const toSquare = this.board.children[toCoords.row * 8 + toCoords.col];
        
        const piece = fromSquare.querySelector('.chess-piece');
        if (!piece) return;

        // Add moving animation
        piece.classList.add('moving');
        
        // Move piece after animation
        setTimeout(() => {
            toSquare.innerHTML = '';
            toSquare.appendChild(piece);
            piece.classList.remove('moving');
        }, 250);
        
        console.log(`♟️ Animated move: ${fromPos} → ${toPos}`);
    },

    // Show chess demo for a question
    showChessDemo(questionData) {
        this.currentQuestion = questionData;
        
        // Create board if it doesn't exist
        if (!this.board) {
            this.createChessBoard();
        }
        
        // Clear board
        this.clearBoard();
        
        // Place the piece at start position
        if (questionData.startPosition && questionData.pieceType) {
            this.renderPiece(questionData.pieceType, questionData.startPosition, 'white');
        }
        
        // Auto-demo moves if specified
        if (questionData.demoMoves && questionData.demoMoves.length > 0) {
            setTimeout(() => {
                this.runDemoMoves(questionData.demoMoves);
            }, 1000);
        }
        
        console.log('♟️ Chess demo initialized for:', questionData.pieceType);
    },

    // Run demo moves automatically
    runDemoMoves(moves) {
        moves.forEach((move, index) => {
            setTimeout(() => {
                this.animateMove(move.from, move.to);
            }, index * 2000); // 2 seconds between moves
        });
    },

    // Clear the board
    clearBoard() {
        const squares = this.board.querySelectorAll('.chess-square');
        squares.forEach(square => {
            square.innerHTML = '';
        });
        this.clearHighlights();
        this.selectedSquare = null;
    },

    // Reset board to initial state
    resetBoard() {
        this.clearBoard();
        if (this.currentQuestion) {
            this.showChessDemo(this.currentQuestion);
        }
    }
};

console.log('♟️ Chess Board component loaded');
