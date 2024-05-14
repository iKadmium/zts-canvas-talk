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

    ctx.fillStyle = "black";
    ctx.font = "48px sans-serif";
    ctx.fillText("I am text", 0, 48);
})
</script>
<template>
    <canvas width="800" height="200" ref="canvasRef" style="background-color: white;"></canvas>
</template>