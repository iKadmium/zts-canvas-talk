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
  ctx.rect(8, 8, 64, 64);
  ctx.stroke();

  addNavigation("context2dRectangle");
});
