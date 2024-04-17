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

  ctx.strokeStyle = "2px solid black";
  ctx.beginPath();
  ctx.moveTo(40, 8);
  ctx.lineTo(72, 72);
  ctx.lineTo(8, 72);
  ctx.lineTo(40, 8);
  ctx.stroke();

  addNavigation("context2dAbstractShapes");
});
