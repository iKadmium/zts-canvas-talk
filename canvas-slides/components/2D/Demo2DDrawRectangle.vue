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

    ctx.strokeStyle = "2px solid black";
    ctx.beginPath();
    ctx.rect(8, 8, 64, 64);
    ctx.stroke();
})
</script>
<template>
    <canvas width="800" height="200" ref="canvasRef" style="background-color: white;"></canvas>
</template>