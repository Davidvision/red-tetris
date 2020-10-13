const { describe, expect, test } = require("@jest/globals");
const Game = require("../../../src/server/classes/Game/Game");

describe("Game class", () => {
  test("generate 1 random pieces", () => {
    const game = new Game();
    const initialPiecesNb = game.pieces.length;
    game.generatePieces(1);
    expect(game.pieces.length).toEqual(initialPiecesNb + 1);
  });

  test("generate 15 random pieces", () => {
    const game = new Game();
    const initialPiecesNb = game.pieces.length;
    game.generatePieces(15);
    expect(game.pieces.length).toEqual(initialPiecesNb + 15);
  });
  test("add Player", () => {
    const game = new Game();
    game.addPlayer("Axel");
    expect(game.players.length).toEqual(1);
  });
  test("remove Player", () => {
    const game = new Game();
    game.addPlayer("Axel");
    game.addPlayer("Hugo");
    game.removePlayer(game.players[1].id);
    expect(game.players[0].name).toEqual("Axel");
  });
  test("Launch Game", () => {
    const game = new Game();
    game.addPlayer("Axel");
    game.addPlayer("Hugo");
    game.launchGame();
    expect(game.isRunning).toEqual(true);
  });
  test("Launch Game - no player", () => {
    const game = new Game();
    game.launchGame();
    expect(game.isRunning).toEqual(false);
  });
  test("End Game", () => {
    jest.useFakeTimers();
    const game = new Game();
    game.addPlayer("Axel");
    game.addPlayer("Hugo");
    game.launchGame();
    setTimeout(() => {
      game.endGame();
      expect(game.isRunning).toEqual(false);
    }, 50);
    jest.runOnlyPendingTimers();
  });
  test("End Game - not launched", () => {
    const game = new Game();
    game.addPlayer("Axel");
    game.addPlayer("Hugo");
    game.endGame();
    expect(game.isRunning).toEqual(false);
  });
});
