import { addNavigation } from "../../src/main";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    throw new Error("No canvas!");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No context");
  }

  ctx.fillStyle = "black";
  ctx.font = "48px sans-serif";
  ctx.fillText("I am text", 0, 48);

  addNavigation("context2dText");
});
