import { addNavigation } from "../../src/main";

const speed = 1;

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, logo: CanvasImageSource, position: number[], velocity: number[], size: number[]) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxPosition = [canvas.width - size[0], canvas.height - size[1]];

  for (let dimension = 0; dimension < position.length; dimension++) {
    position[dimension] += velocity[dimension];
    if (position[dimension] > maxPosition[dimension]) {
      position[dimension] = maxPosition[dimension];
      velocity[dimension] = -velocity[dimension];
    } else if (position[dimension] < 0) {
      position[dimension] = 0;
      velocity[dimension] = -velocity[dimension];
    }
  }

  ctx.drawImage(logo, position[0], position[1], size[0], size[1]);

  requestAnimationFrame(() => draw(ctx, canvas, logo, position, velocity, size));
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

  const logo = document.createElement("img");
  logo.src = "logo.svg";
  logo.addEventListener("load", () => {
    const position = [0, 0];
    const velocity = [speed, speed];
    const size = [logo.naturalWidth, logo.naturalHeight];

    draw(ctx, canvas, logo, position, velocity, size);
  });

  addNavigation("animation2dNostalgia");
});
