const random = require("lodash").random;
const Player = require("../Player/Player");
const {
  emitMessageToRoom,
  emitGameScores
} = require("../../middleware/socketEmitter");

class Game {
  constructor(name, io, isPrivate = false) {
    this.name = name;
    this.io = io;
    this.players = [];
    this.pieces = [];
    this.interval = null;
    this.isPrivate = isPrivate;
    this.startTime = null;
    this.clock = null;
    this.nbGames = 0;
    this.scores = {};
    this.playersHistory = {};
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
    this.playersHistory[name] = 0;
    this.players.push(player);
    emitMessageToRoom(
      this.io,
      this.name,
      "Game Master: ",
      `${name} joined the game.`
    );
    return player;
  }

  removePlayer(name) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === name) {
        this.players.splice(i, 1);
        emitMessageToRoom(
          this.io,
          this.name,
          "Game Master: ",
          `${name} left the game.`
        );
        break;
      }
    }
  }

  startGame() {
    if (this.players.length > 0) {
      this.nbGames++;
      this.scores[this.nbGames] = {};
      this.generatePieces(20);
      this.startTime = new Date().getTime();
      this.players.forEach(p => {
        p.initValues();
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
    emitGameScores(this.io, this.name, this.scores, this.playersHistory);
    emitMessageToRoom(this.io, this.name, "Game Master: ", `end of the game!`);
    clearInterval(this.interval);
    this.pieces = [];
    this.startTime = null;
    this.clock = null;
    this.interval = null;
  }
}

module.exports = Game;
