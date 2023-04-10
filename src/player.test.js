import Game from "./game";
import Player from "./player";
import Position from "./position";
import { beforeEach, expect, describe, it } from "vitest";

let game, player;

beforeEach(() => {
  game = new Game();
  game.setupBoard(3, 3);
  player = new Player(game);
});

describe("createPlayer", () => {
  it("should create a player on the given board", () => {
    expect(player.game).toBe(game);
    expect(player.position).toEqual(new Position({ x: 0, y: 0 }));
  });
});
describe("movePlayer", () => {
  it("should move the player to the new position", () => {
    player.moveTo(1, 0);
    expect(player.position).toEqual(new Position({ x: 1, y: 0 }));
  });
});
