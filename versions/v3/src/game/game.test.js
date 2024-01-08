import Game, { TILE_CONTENTS } from "./game";
import { beforeEach, expect, describe, it } from "vitest";
import Player from "./player";
import Position from "./position";

let game;

beforeEach(() => {
  game = new Game();
});

describe("setupBoard", () => {
  it("should create a board with the correct dimensions", () => {
    game.setupBoard(3, 3, 0);

    expect(game.getBoard().length).toBe(3);
    expect(game.getBoard()[0].length).toBe(3);

    expect(game.getBoard()[2][1]).toBe(TILE_CONTENTS.EMPTY);
  });
});

describe("setPlayer", () => {
  it("should set the player position", () => {
    game.setupBoard(3, 3, 0);
    let player = new Player(game);
    player.moveTo(2, 1);

    expect(player.position).toEqual(new Position({ x: 2, y: 1 }));
  });
});

describe("movePlayer", () => {
  it("should move the player to the new position", () => {
    game.setupBoard(3, 3, 0);
    let player = new Player(game);

    player.moveTo(1, 0);

    expect(player.position).toEqual(new Position({ x: 1, y: 0 }));

    player.moveDown();

    expect(player.position).toEqual(new Position({ x: 1, y: 1 }));
  });
});
