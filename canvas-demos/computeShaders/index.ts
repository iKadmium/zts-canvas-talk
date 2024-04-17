/// <reference types="@webgpu/types" />
import { addNavigation } from "../src/main";
import computeShaderSource from "./compute-shader.wgsl?raw";

document.addEventListener("DOMContentLoaded", async () => {
  const adapter = await navigator.gpu?.requestAdapter();
  if (!adapter) {
    throw new Error("need a browser that supports WebGPU");
  }
  const device = await adapter.requestDevice();
  if (!device) {
    throw new Error("need a browser that supports WebGPU");
  }

  const module = device.createShaderModule({
    label: "Compute Shader Module",
    code: computeShaderSource,
  });
  const pipeline = device.createComputePipeline({
    label: "Compute Shader Pipeline",
    layout: "auto",
    compute: {
      module,
      entryPoint: "compute",
    },
  });
  const input = new Float32Array([1, 3, 5]);
  const workBuffer = device.createBuffer({
    label: "Work Buffer",
    size: input.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(workBuffer, 0, input);

  const resultBuffer = device.createBuffer({
    label: "Result buffer",
    size: input.byteLength,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
  });

  const bindGroup = device.createBindGroup({
    label: "BindGroup for work buffer",
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: workBuffer } }],
  });

  function compute() {
    const encoder = device.createCommandEncoder({
      label: "Compute encoder",
    });
    const pass = encoder.beginComputePass({
      label: "Compute pass",
    });
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(input.length);
    pass.end();

    encoder.copyBufferToBuffer(workBuffer, 0, resultBuffer, 0, resultBuffer.size);

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
  }

  compute();

  await resultBuffer.mapAsync(GPUMapMode.READ);
  const result = new Float32Array(resultBuffer.getMappedRange());

  const inputPre = document.querySelector<HTMLPreElement>("#input");
  const outputPre = document.querySelector<HTMLPreElement>("#output");
  if (inputPre && outputPre) {
    inputPre.textContent = input.toString();
    outputPre.textContent = result.toString();
  }
  resultBuffer.unmap();

  addNavigation("computeShaders");
});
