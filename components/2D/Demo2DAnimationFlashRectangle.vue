<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const colorSpeed = 2;

const canvasRef = ref<HTMLCanvasElement | null>(null);

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

    let running = 0;
    function draw(time: number) {
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        ctx.resetTransform();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        running += dt * colorSpeed;

        ctx.resetTransform();
        ctx.beginPath();
        ctx.translate(8, 8);
        ctx.rect(0, 0, 256, 64);
        const brightness = Math.abs(Math.sin(running));
        ctx.fillStyle = `hsl(0, 0%, ${brightness * 100}%)`;
        ctx.stroke();
        ctx.fill();

        requestAnimationFrame(draw);
    }

    draw(0);
})
</script>

<template>
    <canvas width="800" height="400" ref="canvasRef" style="background-color: white;"></canvas>
</template>