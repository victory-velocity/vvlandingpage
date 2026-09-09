import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const shift = readFileSync("components/sections/Shift.tsx", "utf8");
const css = readFileSync("app/globals.css", "utf8");

test("Sound Elite attribution links safely to the client website", () => {
  assert.match(shift, /href="https:\/\/soundelitetheatres\.com\/"/);
  assert.match(shift, /target="_blank"/);
  assert.match(shift, /rel="noopener noreferrer"/);
  assert.match(shift, /className="testimonial-link"/);
  assert.match(shift, /className="testimonial-link-arrow"/);
  assert.match(shift, /aria-hidden="true">↗<\/span>/);
});

test("Sound Elite link has interaction and accessibility styles", () => {
  assert.match(css, /\.testimonial-link\s*\{/);
  assert.match(css, /text-decoration:\s*underline/);
  assert.match(css, /\.testimonial-link:hover/);
  assert.match(css, /\.testimonial-link:focus-visible/);
  assert.match(css, /\.testimonial-link-arrow/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
