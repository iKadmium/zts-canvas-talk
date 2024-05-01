---
transition: slide-left
---

# Getting started with WebGPU

- Get the Graphics Adapter
```ts
const adapter = await navigator.gpu?.requestAdapter();
```

- Get the rendering device
```ts
const device = await adapter.requestDevice();
```

- Create our shader modules
```ts
const vertexModule = device.createShaderModule({
    label: "Vertex Shader",
    code: vertexShaderSource,
});
const fragmentModule = device.createShaderModule({
    label: "Fragment Shader",
    code: fragmentShaderSource,
});
```

- Get our WebGPU Context
```ts
const context = canvas.getContext("webgpu");
```

---
transition: slide-left
---
# Getting started with WebGPU Cont...

- Define our vertex buffer layout

```ts
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
```
---
transition: slide-left
---

# Getting started with WebGPU Cont...

- Define our pipeline
```ts
const pipeline = device.createRenderPipeline({
    label: "Our red triangle pipeline",
    layout: "auto",
    vertex: {
      module: vertexModule,
      entryPoint: "vs",
      buffers: [vertexBufferLayout],
    },
    fragment: {
      module: fragmentModule,
      entryPoint: "fs",
      targets: [{ format: navigator.gpu.getPreferredCanvasFormat() }],
    },
});
```

---
transition: slide-left
---

# Getting started with WebGPU Cont...

- Define our render pass
```ts
const renderPassDescriptor: GPURenderPassDescriptor = {
    label: "Our basic canvas renderPass",
    colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        clearValue: [1, 1, 1, 1],
        loadOp: "clear",
        storeOp: "store",
    }],
};
```

---
transition: slide-left
---

# Getting started with WebGPU Cont...

- Tell the GPU about our vertices
```ts
const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);

const vertexBuffer = device.createBuffer({
    label: "Vertex buffer",
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});

device.queue.writeBuffer(vertexBuffer, 0, vertices);
```
---
transition: slide-left
---

# Getting started with WebGPU Cont...

- Send the commands to the device
```ts
function render() {
    // make a command encoder to start encoding commands
    const encoder = device.createCommandEncoder({ label: "our encoder" });

    // make a render pass encoder to encode render specific commands
    const pass = encoder.beginRenderPass(renderPassDescriptor);
    pass.setPipeline(pipeline);
    pass.draw(3); // call our vertex shader 3 times
    pass.end();

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
}
```

---
transition: slide-left
---

# Getting started with WebGPU Cont...

- Our first vertex shader

```wgsl
@vertex
fn vs(@location(0) position: vec2f) -> @builtin(position) vec4f {
    return vec4f(position, 0.0, 1.0);
}
```

---
transition: slide-left
---

# Getting started with WebGPU Cont...

- Our first fragment shader
```wgsl
@fragment 
fn fs() -> @location(0) vec4f {
    return vec4f(1.0, 0.0, 0.0, 1.0);
}
```

---
transition: slide-left
---

# Demo

<DemoWebGPURedTriangle />