const { describe, expect, test } = require("@jest/globals");
const { fn } = require("jest");
const { Player } = require("../../../src/server/classes/Player/Player");
const { Game } = require("../../../src/server/classes/Game/Game");

describe("Player class", () => {
  test("new Player without name has his id as name", () => {
    const game = new Game();
    const player = new Player(game);
    expect(player.name).toEqual(player.id);
  });
  test("new Player has 4 pieces", () => {
    const game = new Game();
    const player = new Player(game);
    expect(player.pieces.length).toEqual(4);
  });
  test("new Player with valid name", () => {
    const game = new Game();
    const player = new Player(game, "Hugo");
    expect(player.name).toEqual("Hugo");
  });
  test("Player asks for new pieces", () => {
    const game = new Game();
    const player = new Player(game, "Hugo");
    const spy = jest.spyOn(game, "generatePieces");
    for (let i = 0; i < 20; i++) {
      player.createNextPiece();
    }
    expect(spy).toHaveBeenCalled();
  });
  test("Player has empty board", () => {
    const game = new Game();
    const player = new Player(game);
    const isNotEmpty = player.board.grid.some(l => l.some(e => e !== 0));
    expect(isNotEmpty).toEqual(false);
  });
});
