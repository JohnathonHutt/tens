import {colorMap} from "./color-map.js";
import {constants} from "./constants.js";


export class CanvasMethods {
    static drawTile(x, y, color, ctx) {
        this.drawSquare(x, y, color, ctx);

        const leftDimensions = this.getLeftTriangleDimensions(x, y);
        this.drawTriangle(leftDimensions, 'rgba(0, 0, 0, 0.1)', ctx);

        const rightDimensions = this.getRightTriangleDimensions(x, y);
        this.drawTriangle(rightDimensions, 'rgba(0, 0, 0, 0.1)', ctx);

        const bottomDimensions = this.getBottomTriangleDimensions(x, y);
        this.drawTriangle(bottomDimensions, 'rgba(0, 0, 0, 0.2)', ctx);
    }

    static drawSquare(x, y, colorNumber, ctx) {
        // todo correction if x > board width
        ctx.beginPath();
        ctx.rect(x, y, constants.BLOCK_SIZE, constants.BLOCK_SIZE);
        ctx.fillStyle = colorMap[colorNumber];
        ctx.fill();
        ctx.closePath();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeRect(x, y, constants.BLOCK_SIZE, constants.BLOCK_SIZE);
    }

    static getLeftTriangleDimensions(x,y) {
        const aX = x;
        const aY = y
        const bX = x + (0.5 * constants.BLOCK_SIZE);
        const bY = y + (0.5 * constants.BLOCK_SIZE);
        const cX = x;
        const cY = y + constants.BLOCK_SIZE;
        return {
            aX, aY, bX, bY, cX, cY
        };
    }

    static getRightTriangleDimensions(x, y) {
        const aX = x + constants.BLOCK_SIZE;
        const aY = y
        const bX = x + (0.5 * constants.BLOCK_SIZE);
        const bY = y + (0.5 * constants.BLOCK_SIZE);
        const cX = x + constants.BLOCK_SIZE;
        const cY = y + constants.BLOCK_SIZE;
        return {
            aX, aY, bX, bY, cX, cY
        };
    }

    static getBottomTriangleDimensions(x, y) {
        const aX = x;
        const aY = y + constants.BLOCK_SIZE
        const bX = x + (0.5 * constants.BLOCK_SIZE);
        const bY = y + (0.5 * constants.BLOCK_SIZE);
        const cX = x + constants.BLOCK_SIZE;
        const cY = y + constants.BLOCK_SIZE;
        return {
            aX, aY, bX, bY, cX, cY
        };
    }

    static drawTriangle(coordinates, color, ctx) {
        const { aX, aY, bX, bY, cX, cY } = coordinates;
        ctx.beginPath();
        ctx.moveTo(aX, aY);
        ctx.lineTo(bX, bY);
        ctx.lineTo(cX, cY);
        ctx.fillStyle = color;
        ctx.fill();
    }

    static drawScore(game) {
        console.log(game.score, game.breaks);
    }

    // todo wire up
    static drawGameOver(canvas, ctx, game) {
        ctx.font = "28px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER", 15, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("SCORE: " + game.score, 15, canvas.height/2 + 34);

        //hit a to restart - not great separation of concerns...
        document.getElementById('canvas').addEventListener('click', () => document.location.reload());
    }

    static drawGameState(ctx, game) {
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${game.score}`, 3, 12);
        ctx.fillText(`Breaks: ${game.breaks}`, 3, 24);
    }
}
