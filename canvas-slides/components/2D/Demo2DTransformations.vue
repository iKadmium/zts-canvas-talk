<script setup lang="ts">
import { onMounted, ref } from 'vue';
const canvasRef = ref<HTMLCanvasElement | null>(null);

let translationXBefore = defineModel<number>("translationXBefore", { default: 0 });
let translationYBefore = defineModel<number>("translationYBefore", { default: 0 });
let rotation = defineModel<number>("rotation", { default: 0 });
let translationXAfter = defineModel<number>("translationXAfter", { default: 0 });
let translationYAfter = defineModel<number>("translationYAfter", { default: 0 });

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

    function draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.translate(translationXBefore.value, translationYBefore.value);
        ctx.rotate((rotation.value / 360) * Math.PI * 2);
        ctx.translate(translationXAfter.value, translationYAfter.value);
        ctx.rect(0, 0, 64, 64);
        ctx.stroke();
        ctx.resetTransform();

        requestAnimationFrame(() => draw(ctx));
    }

    draw(ctx);
})
</script>
<template>
    <canvas width="800" height="200" ref="canvasRef" style="background-color: white;"></canvas>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; column-gap: 2em;">
        <label for="translationXBefore">X Translation Before</label>
        <input type="range" min="-128" max="128" v-model="translationXBefore" @dblclick="translationXBefore = 0"
            id="translationXBefore">
        <span>{{ translationXBefore }}</span>
        <label for="translationYBefore">Y Translation Before</label>
        <input type="range" min="-128" max="128" v-model="translationYBefore" @dblclick="translationYBefore = 0"
            id="translationYBefore">
        <span>{{ translationYBefore }}</span>
        <label for="rotation">Rotation</label>
        <input type="range" min="0" max="360" step="0.1" v-model="rotation" @dblclick="rotation = 0" id="rotation">
        <span>{{ rotation }}</span>
        <label for="translationXAfter">X Translation After</label>
        <input type="range" min="-128" max="128" v-model="translationXAfter" @dblclick="translationXAfter = 0"
            id="translationXAfter">
        <span>{{ translationXAfter }}</span>
        <label for="translationYAfter">Y Translation After</label>
        <input type="range" min="-128" max="128" v-model="translationYAfter" @dblclick="translationYAfter = 0"
            id="translationYAfter">
        <span>{{ translationYAfter }}</span>
    </div>
</template>