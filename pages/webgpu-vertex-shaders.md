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

# Vertex Shader - Instancing

```wgsl
const bladeCount: f32 = 20.0;
const bladeDistance: f32 = 0.04;

@vertex
fn vs(
    @location(0) position: vec2f,
    @builtin(instance_index) instanceIdx: u32
) -> @builtin(position) vec4f {
    var instanceOffsetX = f32(instanceIdx) * bladeDistance;
    instanceOffsetX -= (bladeCount * bladeDistance) / 2.0;
    
    let x = position.x + instanceOffsetX;
    let y = position.y;
    return vec4f(x, y, 0.0, 1.0);
}
```

---
transition: slide-left
---

# Vertex Shader - Instancing Demo

<DemoWebGPUVertexShader0 />

---
transition: slide-left
---

# Passing data to shaders

Attributes
<ul>
    <li v-click>Passed to a vertex shader</li>
    <li v-click>Specific data per-vertex</li>
    <li v-click>Position, colour, normals, etc</li>
</ul>

<v-click>

Uniforms
</v-click>

<ul>
    <li v-click>Passed to all kinds of shader</li>
    <li v-click>Common to all shader passes</li>
    <li v-click>Camera positions, lights, time, material properties, etc</li>
</ul>

<v-click>

Samplers
</v-click>

<ul>
    <li v-click>Passed to all kinds of shader, but usually used in fragment shaders</li>
    <li v-click>Used to access texture data within a shader</li>
    <li v-click>2D Textures, Cube Maps, etc</li>
</ul>

---
transition: slide-left
---

# Vertex Shader - Waving

Let's wave some grass in the breeze.

```wgsl
@group(0) @binding(0) var<uniform> time: f32;

const speed: f32 = 2.0;
const bladeCount: f32 = 20.0;
const bladeDistance: f32 = 0.04;
const offsetWeight: f32 = 0.05;

@vertex
fn vs(
    @location(0) position: vec2f,
    @builtin(instance_index) instanceIdx: u32
) -> @builtin(position) vec4f {
    let instanceOffsetX = (f32(instanceIdx) - (bladeCount / 2.0)) * bladeDistance;

    let offset = sin(time * speed) * position.y;
    let x = position.x + (offset * offsetWeight) + instanceOffsetX;
    let y = position.y;
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
@group(0) @binding(0) var<uniform> time: f32;

const speed: f32 = 2.0;
const bladeCount: f32 = 20.0;
const bladeDistance: f32 = 0.04;
const offsetWeight: f32 = 0.05;
const indexOffsetWeight: f32 = 0.1;

@vertex
fn vs(
    @location(0) position: vec2f,
    @builtin(instance_index) instanceIdx: u32
) -> @builtin(position) vec4f {
    let instanceOffsetX = (f32(instanceIdx) - (bladeCount / 2.0)) * bladeDistance;

    let offset = sin((time + f32(instanceIdx) * indexOffsetWeight) * speed) * position.y;
    let x = position.x + (offset * offsetWeight) + instanceOffsetX;
    let y = position.y;
    return vec4f(x, y, 0.0, 1.0);
}
```

---
transition: slide-left
---

# Demo
<DemoWebGPUVertexShader2 />