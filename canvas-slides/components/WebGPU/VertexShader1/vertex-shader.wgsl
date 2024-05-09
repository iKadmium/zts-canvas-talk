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
