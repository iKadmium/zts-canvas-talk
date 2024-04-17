/// <reference types="@webgpu/types" />
import { addNavigation } from "../../src/main";
import vertexShaderSource from "./vertex-shader.wgsl?raw";
import fragmentShaderSource from "./fragment-shader.wgsl?raw";

document.addEventListener("DOMContentLoaded", async () => {
  const adapter = await navigator.gpu?.requestAdapter();
  if (!adapter) {
    throw new Error("need a browser that supports WebGPU");
  }
  const device = await adapter.requestDevice();
  if (!device) {
    throw new Error("need a browser that supports WebGPU");
  }

  const canvas = document.querySelector<HTMLCanvasElement>("canvas");
  if (!canvas) {
    throw new Error("Could not get canvas");
  }

  const context = canvas.getContext("webgpu");
  if (!context) {
    throw new Error("Could not get context");
  }

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
    label: "our hardcoded red triangle pipeline",
    layout: "auto",
    vertex: {
      module: vertexModule,
      entryPoint: "vs",
      buffers: [vertexBufferLayout],
    },
    fragment: {
      module: fragmentModule,
      entryPoint: "fs",
      targets: [{ format: presentationFormat }],
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

  const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);

  const vertexBuffer = device.createBuffer({
    label: "Vertex buffer",
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(vertexBuffer, 0, vertices);

  function render() {
    renderPassDescriptor.colorAttachments[0].view = context?.getCurrentTexture().createView();

    // make a command encoder to start encoding commands
    const encoder = device.createCommandEncoder({ label: "our encoder" });

    // make a render pass encoder to encode render specific commands
    const pass = encoder.beginRenderPass(renderPassDescriptor);
    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, vertexBuffer);
    pass.draw(3); // call our vertex shader 3 times
    pass.end();

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);

    requestAnimationFrame(() => render());
  }

  render();

  addNavigation("webgpu");
});
