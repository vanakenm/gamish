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
- [x] Move player around
- [x] Obstacles
  - Array
  - Terrain vs units in board?
  - Extract Board to own class
- [x] Replace square by tiles
- [] Turns
  - currentTurn on Game
  - Player has a movement score
  - When depleted, need to wait for next turn
- [] Units
  - Units have movement
  - Units block move of other units
  - UI need the concept of a "selected unit" (Game does not care, can move any of them any number of time as long as they don't deplete)
- [] Enemy units
  - Array
  - Block movement
- [] Enemy
  - Direction of the player
  - Manage obstacles (basic first)

## Sources

- [Game loop](https://www.sitepoint.com/quick-tip-game-loop-in-javascript/)
