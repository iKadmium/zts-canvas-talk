---
transition: slide-left
---

# Compute Shaders

- General purpose program that runs on the GPU

Why though?

- GPUs are fast... 
  - A GPU core is 10-75% as fast as a CPU core (at 32-bit floating point maths, at least)
    - And there are squillions of them
    - A fast CPU (M3, for example) has 8-16 cores
    - A fast GPU (RTX 4090) has 16384 cores
- They're not good at everything
- Working with them is painful
  - No debugger
  - No trace

---
transition: slide-left
---

# Using Compute Shaders

- Setup
```ts
const adapter = await navigator.gpu?.requestAdapter();
const device = await adapter?.requestDevice();
const module = device.createShaderModule({
    label: 'Compute Shader Module',
    code: computeShaderCode,
});
const pipeline = device.createComputePipeline({
    label: 'Compute Shader Pipeline',
    layout: 'auto',
    compute: {
      module,
      entryPoint: 'compute',
    },
});
const input = new Float32Array([1, 3, 5]);
const workBuffer = device.createBuffer({
    label: 'Work Buffer',
    size: input.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
});

device.queue.writeBuffer(workBuffer, 0, input);
```

---
transition: slide-left
---

# Using Compute Shaders Cont...

- Create a buffer to get a copy of the results
```ts
const resultBuffer = device.createBuffer({
    label: 'Result buffer',
    size: input.byteLength,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
});
```

- Create a bind group to tell the shader which buffer to use for the work
```ts
const bindGroup = device.createBindGroup({
    label: 'BindGroup for work buffer',
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: workBuffer } },
    ],
});
```

---
transition: slide-left
---

# Using Compute Shaders Cont...

- Encode the commands
```ts
const encoder = device.createCommandEncoder({
    label: 'Compute encoder',
});
const pass = encoder.beginComputePass({
    label: 'Compute pass',
});
pass.setPipeline(pipeline);
pass.setBindGroup(0, bindGroup);
pass.dispatchWorkgroups(input.length);
pass.end();
```

- Copy the results to a mappable buffer.
```ts
encoder.copyBufferToBuffer(workBuffer, 0, resultBuffer, 0, resultBuffer.size);
```

- Finish up
```ts
const commandBuffer = encoder.finish();
device.queue.submit([commandBuffer]);
```

---
transition: slide-left
---

# Using Compute Shaders Cont...

- Read our results
```ts
await resultBuffer.mapAsync(GPUMapMode.READ);
const result = new Float32Array(resultBuffer.getMappedRange());

console.log('input', input);
console.log('result', result);

resultBuffer.unmap();
```

- The shader
```wgsl
@group(0) @binding(0) var<storage, read_write> data: array<f32>;

@compute @workgroup_size(1)
fn compute(@builtin(global_invocation_id) id: vec3<u32>) {
    let i = id.x;
    data[i] = data[i] * 2.0;
}
```