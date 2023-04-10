import Game, { TILE_CONTENTS } from "./game";
import { beforeEach, expect, describe, it } from "vitest";

let game;

beforeEach(() => {
  game = new Game();
});

describe("setupBoard", () => {
  it("should create a board with the correct dimensions", () => {
    game.setupBoard(3, 3);

    expect(game.getBoard().length).toBe(3);
    expect(game.getBoard()[0].length).toBe(3);

    expect(game.getBoard()[2][1]).toBe(TILE_CONTENTS.EMPTY);
  });
});

describe("setPlayer", () => {
  it("should set the player position", () => {
    game.setupBoard(3, 3);
    game.setPlayer(1, 1);

    expect(game.getPlayer()).toEqual([1, 1]);
    expect(game.getTileAt(1, 1)).toBe(TILE_CONTENTS.PLAYER);
  });
});

describe("movePlayer", () => {
  it("should move the player to the new position", () => {
    game.setupBoard(3, 3);
    game.setPlayer(1, 1);

    game.movePlayer(1, 0);

    expect(game.getPlayer()).toEqual([1, 0]);
    expect(game.getTileAt(1, 0)).toBe(TILE_CONTENTS.PLAYER);
  });
});
