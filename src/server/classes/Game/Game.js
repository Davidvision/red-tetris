// const random = require("lodash.random");
const random = require("lodash").random;
const { Player } = require("../Player/Player");

class Game {
  constructor() {
    this.players = [];
    this.time = 0;
    this.pieces = [];
    this.isRunning = false;
    this.interval = null;
  }

  generatePieces(n) {
    for (let i = 0; i < n; i++) {
      this.pieces.push(random(0, 6));
    }
  }

  getNextPiece(i) {
    while (i > this.pieces.length - 1) {
      this.generatePieces(10);
    }
    return this.pieces[i];
  }

  addPlayer(name) {
    this.players.push(new Player(this, name));
  }

  removePlayer(id) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        this.players.splice(i, 1);
        break;
      }
    }
  }

  launchGame() {
    if (this.players.length > 0) {
      this.generatePieces(20);
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.update();
      }, 1000 / 60);
    }
  }

  endGame() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
      this.pieces.splice(0, this.pieces.length);
    }
  }

  update() {}
}

// update
// updateOnInput
// addPenalty

module.exports.Game = Game;
