import {CanvasMethods} from "./canvas-methods.js";
import {constants} from "./constants.js";


export class Board {
    ctx;
    gameBoard = [];

    constructor(ctx) {
        this.ctx = ctx;
        this.createEmptyGameBoard();
    }

    createEmptyGameBoard() {
        for (let rowIndex = 0; rowIndex < constants.ROWS; rowIndex++) {
            this.gameBoard.push([]);
            this.createRow(rowIndex);
        }
    }

    createRow(rowIndex) {
        for(let j = 0; j < constants.COLUMNS; j++) {
            // todo dummy data remove
            // const color = Math.floor(Math.random() * 9 + 1);
            // this.gameBoard[i].push(color);
            this.gameBoard[rowIndex].push(0);
        }
    }

    getGameBoard() {
        return this.gameBoard;
    }

    savePieceToBoard(piece, game) {
        for (const tile of piece) {
            const xBoardLocation = tile.x / constants.BLOCK_SIZE;
            const yBoardLocation = tile.y / constants.BLOCK_SIZE;
            this.gameBoard[yBoardLocation][xBoardLocation] = tile.sizeAndColor;
        }
        this.checkForRowCompletions(game);

    }

    checkForRowCompletions(game) {
        for (let i = 0; i < this.gameBoard.length; i++) {
            if (!this.gameBoard[i].includes(0)) { // todo use enum for 0
                this.clearRow(i);
                console.log('completing row');
                game.completeRow();
            }
        }
    }

    clearRow(rowIndex) {
        this.gameBoard.splice(rowIndex, 1);
        this.gameBoard.unshift([]);
        this.createRow(0); // todo where is this going?
    }

    drawBoard() {
        for (let boardX = 0; boardX < this.gameBoard.length; boardX++) {
            for (let boardY = 0; boardY < this.gameBoard[boardX].length; boardY++) {
                const pxX = boardY * constants.BLOCK_SIZE;
                const pxY = boardX * constants.BLOCK_SIZE;
                if (this.gameBoard[boardX][boardY] > 0) {
                    const colorNumber = this.gameBoard[boardX][boardY];
                    CanvasMethods.drawTile(pxX, pxY, colorNumber, this.ctx);
                }
            }
        }
    }
}
