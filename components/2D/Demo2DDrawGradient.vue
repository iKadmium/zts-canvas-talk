<script setup lang="ts">
import { onMounted, ref } from 'vue';
const canvasRef = ref<HTMLCanvasElement | null>(null);

const padding = 8;
const size = 64;

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) {
        throw new Error("No canvas!");
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("No context");
    }

    const gradient = ctx.createLinearGradient(padding, padding, padding + size, padding + size);
    gradient.addColorStop(0.0, 'red');
    gradient.addColorStop(0.5, 'magenta');
    gradient.addColorStop(1.0, 'yellow');
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.rect(padding, padding, size, size);
    ctx.fill();
    ctx.stroke();
})
</script>
<template>
    <canvas width="800" height="200" ref="canvasRef" style="background-color: white;"></canvas>
</template>