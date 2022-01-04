import {Piece} from "./module/piece.js";
import {Controller} from "./module/controller.js";
import {Board} from "./module/board.js";
import {Game} from "./module/game.js";
import {CanvasMethods} from "./module/canvas-methods.js";

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

// todo move this logic and canvas creation into it's own class
const canvasDimensions = {
    height: 400,
    width: 200,
    border: 4,
};
function resizeCanvas() {
    const aspectRatio = canvasDimensions.width / canvasDimensions.height;

    const height = window.innerHeight * 0.95; // ideally subtract margin -- having extra margin from body issues

    if (height * aspectRatio <= (window.innerWidth - canvasDimensions.border)) {
        canvas.style.height = `${height}px`;
        canvas.style.width = `${height * aspectRatio}px`;
    } else {
        canvas.style.width = `${window.innerWidth - canvasDimensions.border}px`;
        canvas.style.height = `${(window.innerWidth - canvasDimensions.border) / aspectRatio}px`;
    }
}
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

const game = new Game();
const board = new Board(ctx);
const piece = new Piece(ctx);
new Controller(piece, board, game);

let lastMoveTime = 0;

function gameLoop(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timestamp >= lastMoveTime + game.timeGap) {
        // todo need to abstract this out more
        const gameBoard = board.getGameBoard();
        const pieceDown = piece.moveDown(gameBoard);
        // todo could use controller.moveDownLogic or something here
        if (piece.hasBoardCollision(pieceDown, gameBoard)) {
            board.savePieceToBoard(piece.currentPiece, game);

            if (piece.isPieceInTopRow()) game.endGame();

            piece.createNewBlock();
        } else { // no board collisions
            piece.updatePieceLocation(pieceDown);
        }
        lastMoveTime = timestamp;
    }
    piece.drawPiece();
    // todo draw animation here?? -- make independent animation for block breaking
    board.drawBoard();
    CanvasMethods.drawGameState(ctx, game);

    if (!game.isGameOver) {
        requestAnimationFrame(gameLoop);
    }
    if (game.isGameOver) {
        console.log('in the game over sequence');
        CanvasMethods.drawGameOver(canvas, ctx, game);
    }
}

// Add a start screen to initialize game loop
window.requestAnimationFrame(gameLoop);







