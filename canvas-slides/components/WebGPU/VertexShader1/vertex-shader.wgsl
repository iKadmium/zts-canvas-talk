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
