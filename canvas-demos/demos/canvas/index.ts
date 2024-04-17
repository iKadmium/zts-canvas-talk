import { addNavigation } from "../../src/main";

document.addEventListener("DOMContentLoaded", () => {
  const canvases = document.querySelectorAll("canvas");
  for (const canvas of canvases) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No context!");
    }
    ctx.fillStyle = "black";
    ctx.font = "48px sans-serif";
    ctx.fillText("I am text", 0, 48);
  }

  addNavigation("canvas");
});
