<script lang="ts" setup>
/// <reference types="@webgpu/types" />
import { onMounted, ref } from 'vue';
import vertexShaderSource from "./vertex-shader.wgsl?raw";
import fragmentShaderSource from "./fragment-shader.wgsl?raw";
import { getImage } from '../../getImage.ts';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let enabled = defineModel<boolean>("enabled", { default: false });

onMounted(async () => {
    const canvas = canvasRef.value;
    if (!canvas) {
        throw new Error("No canvas!");
    }
    const maybeCtx = canvas.getContext('webgpu');
    if (!maybeCtx) {
        throw new Error("No context");
    }
    const context = maybeCtx!;
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) {
        throw new Error("need a browser that supports WebGPU");
    }
    const device = await adapter.requestDevice();
    if (!device) {
        throw new Error("need a browser that supports WebGPU");
    }

    function setup(image: HTMLImageElement) {
        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device,
            format: presentationFormat,
        });

        const vertexModule = device.createShaderModule({
            label: "Vertex Shader",
            code: vertexShaderSource,
        });
        const fragmentModule = device.createShaderModule({
            label: "Fragment Shader",
            code: fragmentShaderSource,
        });

        const vertexBufferLayout: GPUVertexBufferLayout = {
            arrayStride: 2 * 4,
            attributes: [
                {
                    shaderLocation: 0,
                    offset: 0,
                    format: "float32x2",
                },
            ],
        };

        const pipeline = device.createRenderPipeline({
            label: "Fragment Shader 1 Pipeline",
            layout: "auto",
            vertex: {
                module: vertexModule,
                entryPoint: "vs",
                buffers: [vertexBufferLayout],
            },
            fragment: {
                module: fragmentModule,
                entryPoint: "fs",
                targets: [{ format: presentationFormat }]
            },
        });

        const renderPassDescriptor: GPURenderPassDescriptor = {
            label: "our basic canvas renderPass",
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    clearValue: [1, 1, 1, 1],
                    loadOp: "clear",
                    storeOp: "store",
                },
            ],
        };

        const uniformData = new Float32Array(4);
        const uniformBuffer = device.createBuffer({
            label: "Uniform buffer",
            size: uniformData.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });

        const vertices = new Float32Array([-1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1, -1]);

        const vertexBuffer = device.createBuffer({
            label: "Vertex buffer",
            size: vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });

        device.queue.writeBuffer(vertexBuffer, 0, vertices);

        const texture = device.createTexture({
            size: [image.naturalWidth, image.naturalHeight],
            format: 'rgba8unorm',
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        });

        const textureCanvas = document.createElement('canvas');
        textureCanvas.width = image.naturalWidth;
        textureCanvas.height = image.naturalHeight;
        const textureCtx = textureCanvas.getContext('2d');
        if (!textureCtx) {
            throw new Error('Could not create texture canvas');
        }
        textureCtx.drawImage(image, 0, 0);
        const imageData = textureCtx.getImageData(0, 0, textureCanvas.width, textureCanvas.height)

        device.queue.writeTexture(
            { texture },
            imageData.data,
            { bytesPerRow: imageData.width * 4 },
            { width: imageData.width, height: imageData.height },
        );

        const sampler = device.createSampler();

        const uniformBindGroup = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(0),
            entries: [
                { binding: 0, resource: { buffer: uniformBuffer } },
                { binding: 1, resource: sampler },
                { binding: 2, resource: texture.createView() },
            ]
        });

        return { renderPassDescriptor, pipeline, vertexBuffer, uniformBindGroup, uniformData, uniformBuffer };
    }

    const img = await getImage('smw.png');
    const { renderPassDescriptor, pipeline, vertexBuffer, uniformBindGroup, uniformBuffer, uniformData } = setup(img);

    let lastTime = 0;
    uniformData[0] = canvas.width;
    uniformData[1] = canvas.height;

    function render(time: number) {
        const dt = (time - lastTime) / 1000;
        uniformData[2] = (time / 1000);
        uniformData[3] = enabled.value ? 1 : 0;

        renderPassDescriptor.colorAttachments[0].view = context?.getCurrentTexture().createView();

        // make a command encoder to start encoding commands
        const encoder = device.createCommandEncoder({ label: "our encoder" });

        // make a render pass encoder to encode render specific commands
        const pass = encoder.beginRenderPass(renderPassDescriptor);
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, uniformBindGroup);
        pass.setVertexBuffer(0, vertexBuffer);
        pass.draw(6); // call our vertex shader 6 times
        pass.end();

        const commandBuffer = encoder.finish();
        device.queue.writeBuffer(uniformBuffer, 0, uniformData);
        device.queue.submit([commandBuffer]);

        requestAnimationFrame(render);
    }

    render(0);
});

</script>

<template>
    <canvas width="512" height="384" ref="canvasRef" style="background-color: white;"></canvas>
    <input type="checkbox" v-model="enabled"><label>Enabled</label></input>
</template>