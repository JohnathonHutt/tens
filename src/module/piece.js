import { colorMap } from "./color-map.js";
import { CanvasMethods } from "./canvas-methods.js";
import { constants } from "./constants.js";

export class Piece {
    ctx;

    piece = [];

    constructor(ctx) {
        this.ctx = ctx;
        this.createNewBlock();
    }

    get currentPiece() {
        return this.piece;
    }

    hasBoardCollision(newPiece, gameBoard) {
        for (const tile of newPiece) {
            const xBoardLocation = tile.x / constants.BLOCK_SIZE;
            const yBoardLocation = tile.y / constants.BLOCK_SIZE;

            // is at bottom of board
            if (yBoardLocation === constants.ROWS) {
                return true;
            }
            if (gameBoard[yBoardLocation][xBoardLocation] !== 0) { // todo abstract away 0?
                return true;
            }
        }
        return false;
    }

    isPieceInTopRow() {
        return this.piece[0].y === 0;
    }

    moveLeft() {
        const newPieceLeft = this.piece.map((tile) => {
            if (tile.x === 0) {
                return {...tile, x: constants.WIDTH - constants.BLOCK_SIZE};
            }
            return {...tile, x: tile.x - constants.BLOCK_SIZE};
        });

        return newPieceLeft;
        // if (!this.hasBoardCollision(newPieceLeft, gameBoard)) {
        //     this.piece = newPieceLeft;
        //     return;
        // }
        // return this.piece;
    }

    moveRight() {
        const newPieceRight = this.piece.map((tile) => {
            if (tile.x === constants.WIDTH - constants.BLOCK_SIZE) {
                return {...tile, x: 0 };
            }
            return {...tile, x: tile.x + constants.BLOCK_SIZE};
        })

        return newPieceRight;
        // if (!this.hasBoardCollision(newPieceRight, gameBoard)) {
        //     this.piece = newPieceRight; // todo refactor into setNewPiece
        //     return;
        // }
        // return this.piece;
    }

    moveDown() {
        const newPieceDown = this.piece.map((tile) => {
                const newTile = {...tile, y: tile.y + constants.BLOCK_SIZE};
                return newTile;
        });

        return newPieceDown;
    }

    updatePieceLocation(piece) {
        this.piece = piece;
    }

    breakPiece(key, game) {
        if (this.piece.length === 1 || !game.canBreak()) {
            return;
        }

        if (key === 'a') {
            game.useBreak();
            this.piece.shift();
        }

        if (key === 'd') {
            game.useBreak();
            this.piece.pop();
        }
    }

    createNewBlock() {
        this.piece = [];
        const sizeAndColor = Math.floor(Math.random() * Object.keys(colorMap).length + 1);
        const firstBlockX = Math.ceil((10 - sizeAndColor) * 0.5) * constants.BLOCK_SIZE
        // updating it to be array of objects - make wrapping / detection cleaner
        for (let i = 0; i < sizeAndColor; i++) {
            const x = i === 0 ? firstBlockX : firstBlockX + (i * constants.BLOCK_SIZE);
            this.piece.push({
                sizeAndColor,
                x,
                y: 0,
            });
        }
    }

    drawPiece() {
        for (let tile of this.piece) {
            CanvasMethods.drawTile(tile.x, tile.y, tile.sizeAndColor, this.ctx);
        }
    }
}
