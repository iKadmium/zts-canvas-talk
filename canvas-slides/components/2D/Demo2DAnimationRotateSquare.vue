<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

const rotationSpeed = 5;

let lastTime = 0;

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) {
        throw new Error("No canvas!");
    }
    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) {
        throw new Error("No context");
    }
    const ctx = maybeCtx!;

    let rotation = 0;
    function draw(time: number) {
        const dt = (time - lastTime) / 1000;
        lastTime = time;

        ctx.resetTransform();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        rotation += dt * rotationSpeed;

        ctx.beginPath();
        ctx.translate(64, 64);
        ctx.rotate(rotation);
        ctx.translate(-32, -32);
        ctx.rect(0, 0, 64, 64);
        ctx.stroke();

        requestAnimationFrame((time) => draw(time));
    }

    draw(0);
})
</script>

<template>
    <canvas width="800" height="400" ref="canvasRef" style="background-color: white;"></canvas>
</template>