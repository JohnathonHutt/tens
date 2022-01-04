export class Controller {
    constructor(piece, board, game) {
        this.init(piece, board, game);
    }

    init(piece, board, game) {
        document.addEventListener('keydown', (event) => this.handleKeyInput(event, piece, board, game));
        document.addEventListener('keyup', (event) => this.handleKeyInput(event, piece, board, game));
    }

    handleKeyInput(event, piece, board, game) {
        const { type, key } = event;
        if (type === 'keydown') {
            const gameBoard = board.getGameBoard();
            switch (key) {
                case 'ArrowLeft':
                    const pieceLeft = piece.moveLeft();
                    this.updateOrLockPiece(board, piece, pieceLeft, game)
                    break;
                case 'ArrowRight':
                    const pieceRight = piece.moveRight();
                    this.updateOrLockPiece(board, piece, pieceRight, game)
                    break;
                case 'ArrowDown':
                    const pieceDown = piece.moveDown(gameBoard);
                    if (piece.hasBoardCollision(pieceDown, gameBoard)) {
                        board.savePieceToBoard(piece.currentPiece, game);
                        if (piece.isPieceInTopRow()) game.endGame();
                        piece.createNewBlock();
                    } else {
                        piece.updatePieceLocation(pieceDown);
                    }
                    break;
                case 'a':
                case 'd':
                    piece.breakPiece(key, game);
                    break;
            }
        }
    }

    updateOrLockPiece(board, piece, movedPiece, game) {
        const gameBoard = board.getGameBoard();
        if (piece.hasBoardCollision(movedPiece, gameBoard)) {
            // pieces 'stick' if pressed against other vertical surfaces
            board.savePieceToBoard(piece.currentPiece, game);
            if (piece.isPieceInTopRow()) game.endGame();
            piece.createNewBlock();
        } else {
            piece.updatePieceLocation(movedPiece);
        }
    }
}
