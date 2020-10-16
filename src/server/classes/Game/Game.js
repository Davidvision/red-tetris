const random = require("lodash").random;
const Player = require("../Player/Player");

class Game {
  constructor(name, isPrivate = false) {
    this.id;
    this.name = name;
    this.players = [];
    // this.playingPlayers = [];
    this.nbPlaying = 0;
    this.time = 0;
    this.pieces = [];
    this.interval = null;
    this.isPrivate = isPrivate;
    this.startTime;
    this.clock = null;
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

  addPlayer(name, socketInfo) {
    const player = new Player(this, socketInfo, name);
    this.players.push(player);
    return player;
  }

  removePlayer(name) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === name) {
        this.players.splice(i, 1);
        break;
      }
    }
  }

  startGame() {
    if (this.players.length > 0) {
      this.generatePieces(20);
      this.nbPlaying = this.players.length;
      this.startTime = new Date().getTime();
      this.interval = setInterval(() => {
        this.clock = new Date().getTime() - this.startTime;
        for (let i = 0; i < this.nbPlaying; i++) {
          this.players[i].update();
        }
      }, 1000 / 20);
    }
  }

  endGame() {
    if (this.nbPlaying > 0) {
      clearInterval(this.interval);
      this.nbPlaying = 0;
      this.pieces.splice(0, this.pieces.length);
    }
  }
}

module.exports = Game;
