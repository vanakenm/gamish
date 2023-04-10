# Gamish

Modern javascript setup for playing with web based game dev.

## How to

Run

    npx parcel src/index.html

Test

    npx vitest run # once
    npx vitest # watch

## Todo

- [x] Board
- [x] Player
- [] Move player around
- [] Obstacles
  - Array
  - Terrain vs units in board?
  - Extract Board to own class
- [] Replace square by tiles
- [] Turns
  - currentTurn on Game
  - Player has a movement score
  - When depleted, need to wait for next turn
- [] Enemy units
  - Array
  - Block movement
- [] Move enemy units
  - Direction of the player
  - Manage obstacles (basic first)

## Sources

- [Game loop](https://www.sitepoint.com/quick-tip-game-loop-in-javascript/)
