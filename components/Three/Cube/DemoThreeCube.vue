<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as THREE from "three";
import { vertexColors } from "./colors";
import { allVertices } from "./vertices";

const rotationPerSecond = Math.PI / 4;

const canvasRef = ref<HTMLCanvasElement | null>(null);


onMounted(() => {
    const canvas = canvasRef.value!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(1, 1, 1);
    const dimensions = [800, 400];
    const camera = new THREE.PerspectiveCamera(45, dimensions[0] / dimensions[1], 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(dimensions[0], dimensions[1]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(allVertices, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(vertexColors, 4));
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.z = -10;
    cube.rotation.x = Math.PI / 8;
    let lastTime = 0;

    function draw(time: number) {
        const dt = (time - lastTime) / 1000;
        cube.rotation.y += rotationPerSecond * dt;

        renderer.render(scene, camera);
        lastTime = time;
        requestAnimationFrame(draw);
    }

    draw(0);
})
</script>

<template>
    <canvas width="800" height="400" ref="canvasRef" style="background-color: white;"></canvas>
</template>