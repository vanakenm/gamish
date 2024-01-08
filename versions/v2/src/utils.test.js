import { expect, test } from "vitest";
import { show } from "./utils";

test("show", () => {
  expect(show()).toBe("lalala");
});
