---
transition: slide-left
---

# Shaders in WebGPU

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

# Shaders in WebGPU Cont...

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