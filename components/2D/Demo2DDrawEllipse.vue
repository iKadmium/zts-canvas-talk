<script setup lang="ts">
import { onMounted, ref } from 'vue';
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) {
        throw new Error("No canvas!");
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("No context");
    }

    ctx.beginPath();
    ctx.ellipse(40, 40, 32, 32, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(120, 40, 32, 32, 0, 0, Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(200, 40, 32, 32, Math.PI * 0.5, 0, Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(280, 40, 32, 32, 0, 0, Math.PI * 0.75);
    ctx.fill();
})
</script>
<template>
    <canvas width="800" height="200" ref="canvasRef" style="background-color: white;"></canvas>
</template>