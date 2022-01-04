export class Game {
    score = 0;
    breaks = 5;

    timeGap = 600;
    timeGapDecrementRate = 20;
    minimumTimeGap = 200;
    isGameOver = false;

    constructor() {}

    endGame() {
        this.isGameOver = true;
    }

    isGameOver() {
        return this.isGameOver;
    }

    get timeGap() {
        return this.timeGap;
    }

    canBreak() {
        return this.breaks > 0;
    }

    incrementScore() {
        this.score = this.score += 10;
    }

    incrementBreak() {
        this.breaks += 1;
    }

    completeRow() {
        this.incrementBreak();
        this.incrementScore();
    }

    useBreak() {
        if (this.breaks > 0) {
            this.breaks -= 1;
        }
    }

    // todo wire up when score hits 100
    decrementTimeGap() {
        if (this.timeGap > this.minimumTimeGap) {
            const newTimeGap = this.timeGap - this.timeGapDecrementRate;
            this.timeGap = newTimeGap < this.minimumTimeGap ? this.minimumTimeGap : newTimeGap;
        }
    }
}
