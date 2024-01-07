# Gamish

## Principles

### Goal

My goal here is to create a simple tactical game in the browser, from scratch, with the battle part of Kings Bounty or Heroes of Might and Magic as a direction (no intention to get to that point, but that give some kind of horizon) using modern JavaScript.

To take those one by one:

- Simple tactical game: We're talking turn by turn fight between two groups of units on a battlefield made of squares
- In the browser: I'll use the browser to display/interact with the player. I'm no against having a backend, but only if needed
- Step by step: I'll only build what I need (hence the "no backend" initially)
- From scratch: No game engine. I don't say no dependencies at all, but no engine, no tile manager, etc.

This is mainly an exercise for me as I expect interesting questions to get out of that process.

Thanks to [Christer "McFunkypants" Kaitila](https://christerkaitila.com/) for telling me on now defunct social media "Twitter" that I did not need any engine and "just put a game loop & the canvas API and get started".

### Technology

Things I want

- Modern JavaScript. Think "import" - no React or other, mainly because I don't see how it would help here.
- Possibility to write tests - at least Jest.

### Design

Nothign special in mind, but I intend to keep the UI and "engine" clearly separated. Why?

- Easier to update them separately
- Keep the "engine" easy to test for the day things become complex

### Graphism

I'm no graphic designer. I'll start with boxes then move to finding a free set of tiles to play with.

## And now, my lords, to France!

### Project setup and Parcel

Let's get started. In order to get my "Modern stack", I'll need some kind of build tool. After a little resarch I found [Parcel](https://parceljs.org/). This looks exactly what I want:

- No/low config - can start with just using `npx parcel src/index`
- Don't do more than I need - which is not that much

I initially added Tailwind CSS (as a reflex I guess?) before realizing I did not need it at all

So:

- git init
- npm init
- Put a ".gitignore" with:

```gitignore
node_modules
.parcel-cache
dist
```

Basic structure:

- src/index.html
- src/app.js

### Main page

Let's keep this as simple as possible

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Gamish</title>
    <script type="module" src="app.js"></script>
  </head>
  <body></body>
</html>
```

In order to test that everything is working I'll create a function in a separate JavaScript file just to see that I can call it properly.

```javascript
// utils.js
export function show() {
  return "lalala";
}
```

```javascript
// app.js
import { show } from "./utils.js";
console.log(show());
```

I can now start my project:

`npx parcel src/index`

and check that I see the "lalala" message in the console - all good!

### Tests

I say I wanted tests - I added vitest for that

`npm i vitest --save-dev`

Then I created a `utils.test.js` file:

```javascript
import { expect, test } from "vitest";
import { show } from "./utils";

test("show", () => {
  expect(show()).toBe("lalala");
});
```

Runing vitest show it works - good timing to move away from the npx stuff and use parcel directly

```json
  "scripts": {
    "build": "parcel build src/index.html",
    "test": "vitest"
  }
```

`npm run test`

This runs vitest in watch mode where it runs the tests after each change.

## That's it for today

Not the fanciest part of the job - but needed, it works, and I understand all the parts which matters to me.
