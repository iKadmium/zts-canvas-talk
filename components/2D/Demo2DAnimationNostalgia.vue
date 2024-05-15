<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

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

    let lastTime = 0;

    const speed = 100;
    const scale = 0.5;
    const size = [0, 0];

    const position = [0, 0];
    const velocity = [speed, speed];

    const logo = document.createElement("img");
    logo.src = "images/logo.svg";
    logo.addEventListener("load", () => {
        size[0] = logo.naturalWidth * scale;
        size[1] = logo.naturalHeight * scale;

        draw(0);
    });

    function draw(time: number) {
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        ctx.resetTransform();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const maxPosition = [ctx.canvas.width - size[0], ctx.canvas.height - size[1]];

        for (let dimension = 0; dimension < position.length; dimension++) {
            position[dimension] += velocity[dimension] * dt;
            if (position[dimension] > maxPosition[dimension]) {
                position[dimension] = maxPosition[dimension];
                velocity[dimension] = -velocity[dimension];
            } else if (position[dimension] < 0) {
                position[dimension] = 0;
                velocity[dimension] = -velocity[dimension];
            }
        }

        ctx.drawImage(logo, position[0], position[1], size[0], size[1]);

        requestAnimationFrame(draw);
    }
})
</script>

<template>
    <canvas width="800" height="400" ref="canvasRef" style="background-color: white;"></canvas>
</template>