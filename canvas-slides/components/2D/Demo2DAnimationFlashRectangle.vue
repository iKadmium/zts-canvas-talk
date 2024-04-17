<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const colorSpeed = 0.001;

const canvasRef = ref<HTMLCanvasElement | null>(null);

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) {
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.resetTransform();
    ctx.beginPath();
    ctx.translate(8, 8);
    ctx.rect(0, 0, 256, 64);
    const brightness = Math.abs(Math.sin(time * colorSpeed));
    ctx.fillStyle = `hsl(0, 0%, ${brightness * 100}%)`;
    ctx.stroke();
    ctx.fill();

    requestAnimationFrame((time) => draw(ctx, canvas, time));
}

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) {
        throw new Error("No canvas!");
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error("No context");
    }
    draw(ctx, canvas, 0);
})
</script>

<template>
    <canvas width="800" height="400" ref="canvasRef" style="background-color: white;"></canvas>
</template>