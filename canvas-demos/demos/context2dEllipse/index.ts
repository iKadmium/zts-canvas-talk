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

  ctx.beginPath();
  ctx.ellipse(40, 40, 32, 32, 0, Math.PI, 360);
  ctx.fill();

  addNavigation("context2dEllipse");
});
