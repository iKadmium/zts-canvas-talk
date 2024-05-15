# Fragment Shaders

What can be done with Fragment Shaders?

<ul>
    <li v-click>Lighting</li>
    <li v-click>Materials</li>
    <li v-click>Visual Effects</li>
</ul>

---
transition: slide-left
---

# Demo

<DemoWebGPUFragmentShader1 />

---
transition: slide-left
---

# Simple Scanline Shader

```wgsl {*|9|}
@group(0) @binding(0) var<uniform> resolution: vec2<f32>;
@group(0) @binding(1) var ourSampler: sampler;
@group(0) @binding(2) var ourTexture: texture_2d<f32>;

@fragment
fn fs(@builtin(position) coordinates: vec4<f32>) -> @location(0) vec4<f32> {
    var uv: vec2<f32> = coordinates / resolution;
    var color = textureSample(ourTexture, ourSampler, uv);
    color *= coordinates.y % 2.0;

    return color;
}
```

---
transition: slide-left
---

# Simple Scanline Shader Demo

<DemoWebGPUFragmentShader2 />