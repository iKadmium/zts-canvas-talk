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

# Vertex Shader

```wgsl
@group(0) @binding(0) var<uniform> time: f32;

const speed: f32 = 4.0;
const offsetWeight: f32 = 0.05;

@vertex
fn vs(@location(0) position: vec2f) -> @builtin(position) vec4f {
    let offset = sin(time * speed);
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
@group(0) @binding(0) var<uniform> time: f32;

const indexWeight: f32 = 250;
const speed: f32 = 4.0;
const offsetWeight: f32 = 0.05;

@vertex
fn vs(
    @location(0) position: vec2f,
    @builtin(vertex_index) vertexIndex: u32
) -> @builtin(position) vec4f {
    let offset = sin((time + f32(vertexIndex) * indexWeight) * speed);
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