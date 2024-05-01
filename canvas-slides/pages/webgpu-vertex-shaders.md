# Vertex Shaders

What can be done with Vertex Shaders?

<ul>
    <li v-click>Waving flags</li>
    <li v-click>Water</li>
    <li v-click>Grass bending in the breeze</li>
    <li v-click>Particles</li>
    <li v-click>Displacement mapping</li>
    <li v-click>Instancing</li>
</ul>

---
transition: slide-left
---

# WebGPU Uniforms

Let's pass in some more data.

```ts
const uniformData = new Uint32Array(1);
const uniformBuffer = device.createBuffer({
    label: "Uniform buffer",
    size: uniformData.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
});

const uniformBindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
        {
            binding: 0, 
            resource: { buffer: uniformBuffer }
        }
    ]
});
```

---
transition: slide-left
---
# WebGPU Uniforms Cont...

Then in our render function...
```ts
uniformData[0] = time;
//...
pass.setBindGroup(0, uniformBindGroup);
//...
device.queue.writeBuffer(uniformBuffer, 0, uniformData);
```

---
transition: slide-left
---

# Vertex Shader

```wgsl
@group(0) @binding(0) var<uniform> time: u32;

const speed: f32 = 4.0 / 1000.0;
const offsetWeight: f32 = 50.0 / 1000.0;

@vertex
fn vs(@location(0) position: vec2f) -> @builtin(position) vec4f {
    let offset = sin(f32(time) * speed);
    let x = position.x + (offset * offsetWeight);
    let y = position.y + (offset * offsetWeight);
    return vec4f(x, y, 0.0, 1.0);
}
```

---
transition: slide-left
---

# Demo
<DemoWebGPUVertexShader1 />

---
transition: slide-left
---

# Adding some variation

```wgsl
@group(0) @binding(0) var<uniform> time: u32;

const indexWeight: u32 = 250;
const speed: f32 = 4.0 / 1000.0;
const offsetWeight: f32 = 50.0 / 1000.0;

@vertex
fn vs(
    @location(0) position: vec2f,
    @builtin(vertex_index) vertexIndex: u32
) -> @builtin(position) vec4f {
    let offset = sin(f32(time + (vertexIndex * indexWeight)) * speed);
    let x = position.x + (offset * offsetWeight);
    let y = position.y + (offset * offsetWeight);
    return vec4f(x, y, 0.0, 1.0);
}
```

---
transition: slide-left
---

# Demo
<DemoWebGPUVertexShader2 />