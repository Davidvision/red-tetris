const random = require("lodash").random;
const Player = require("../Player/Player");

class Game {
  constructor(name, isPrivate = false) {
    this.name = name;
    this.players = [];
    this.pieces = [];
    this.interval = null;
    this.isPrivate = isPrivate;
    this.startTime = null;
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
        console.log("remove player: ", name, this.players);
        break;
      }
    }
  }

  startGame() {
    if (this.players.length > 0) {
      this.generatePieces(20);
      this.startTime = new Date().getTime();
      this.players.forEach(p => {
        p.isPlaying = true;
        p.emitFirstBoard();
      });
      this.interval = setInterval(() => {
        this.clock = new Date().getTime() - this.startTime;
        let nbPlaying = 0;
        for (let i = 0; i < this.players.length; i++) {
          if (this.players[i].isPlaying) {
            this.players[i].update();
            nbPlaying++;
          }
        }
        if (nbPlaying === 0) {
          this.endGame();
        }
      }, 1000 / 20);
    }
  }

  endGame() {
    console.log("endGame");
    clearInterval(this.interval);
    this.pieces = [];
    this.startTime = null;
    this.clock = null;
    this.interval = null;
  }
}

module.exports = Game;
