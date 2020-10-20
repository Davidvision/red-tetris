const random = require("lodash").random;
const Player = require("../Player/Player");

class Game {
  constructor(name, isPrivate = false) {
    this.id;
    this.name = name;
    this.players = [];
    this.playingPlayers = [];
    // this.nbPlaying = 0;
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
        if (this.players[i].isPlaying) {
          this.removePlayingPlayer(name);
        }
        this.players.splice(i, 1);
        console.log("remove player: ", name, this.players, this.playingPlayers);
        break;
      }
    }
  }

  removePlayingPlayer(name) {
    // this.nbPlaying--;
    for (let j = 0; j < this.playingPlayers.length; j++) {
      if (this.playingPlayers[j].name === name) {
        this.playingPlayers.splice(j, 1);
      }
    }
    this.players[0].leaderEmitPlayingPlayers();
  }

  startGame() {
    if (this.players.length > 0) {
      this.generatePieces(20);
      // this.nbPlaying = this.players.length;
      this.playingPlayers = this.players.map(p => p);
      this.players[0].leaderEmitPlayingPlayers();
      this.startTime = new Date().getTime();
      this.players.forEach(p => {
        p.isPlaying = true;
        p.emitFirstBoard();
      });
      this.interval = setInterval(() => {
        if (this.playingPlayers.length === 0) {
          this.endGame();
        }
        this.clock = new Date().getTime() - this.startTime;
        for (let i = 0; i < this.playingPlayers.length; i++) {
          this.playingPlayers[i].update();
        }
      }, 1000 / 20);
    }
  }

  endGame() {
    console.log("endGame");
    clearInterval(this.interval);
  }
}

module.exports = Game;
