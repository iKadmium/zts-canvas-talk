import { addNavigation } from "../../src/main";

const rotationSpeed = 0.005;
const colorSpeed = 0.001;

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.translate(64, 64);
  ctx.rotate(rotationSpeed * time);
  ctx.translate(-32, -32);
  ctx.rect(0, 0, 64, 64);
  ctx.stroke();

  requestAnimationFrame((time) => draw(ctx, canvas, time));
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    throw new Error("No canvas!");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No context");
  }

  draw(ctx, canvas, 0);

  addNavigation("animation2dRotateSquare");
});
