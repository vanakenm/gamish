import Position from "./position";
import { beforeEach, expect, describe, it } from "vitest";

describe("newPosition", () => {
  it("should create a valid position", () => {
    const position = new Position({ x: 1, y: 2 });
    expect(position.x).toBe(1);
    expect(position.y).toBe(2);
  });
});

describe("movePosition", () => {
  it("should move the position", () => {
    const position = new Position({ x: 1, y: 2 });
    position.moveTo({ x: 2, y: 3 });
    expect(position.x).toBe(2);
    expect(position.y).toBe(3);
  });

  it("should move left", () => {
    const position = new Position({ x: 1, y: 2 });
    position.moveLeft();
    expect(position.x).toBe(0);
    expect(position.y).toBe(2);
  });

  it("should move right", () => {
    const position = new Position({ x: 1, y: 2 });
    position.moveRight();
    expect(position.x).toBe(2);
    expect(position.y).toBe(2);
  });

  it("should move up", () => {
    const position = new Position({ x: 1, y: 2 });
    position.moveUp();
    expect(position.x).toBe(1);
    expect(position.y).toBe(1);
  });

  it("should move down", () => {
    const position = new Position({ x: 1, y: 2 });
    position.moveDown();
    expect(position.x).toBe(1);
    expect(position.y).toBe(3);
  });
});
