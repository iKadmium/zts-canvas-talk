import { addNavigation } from "../../src/main";
import { TransformVar } from "./transformVar";

type InputEvent = Event & { currentTarget: HTMLInputElement };

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    throw new Error("No canvas!");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No context");
  }

  const inputs = {
    rotation: new TransformVar("rotation"),
    translationXBefore: new TransformVar("translationXBefore"),
    translationYBefore: new TransformVar("translationYBefore"),
    translationXAfter: new TransformVar("translationXAfter"),
    translationYAfter: new TransformVar("translationYAfter"),
  };

  ctx.strokeStyle = "2px solid black";

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.translate(inputs.translationXBefore.lastValue, inputs.translationYBefore.lastValue);
    ctx.rotate((inputs.rotation.lastValue / 360) * Math.PI * 2);
    ctx.translate(inputs.translationXAfter.lastValue, inputs.translationYAfter.lastValue);
    ctx.rect(0, 0, 64, 64);
    ctx.stroke();
    ctx.resetTransform();

    requestAnimationFrame(() => draw(ctx));
  }

  draw(ctx);

  addNavigation("context2dTransformations");
});
