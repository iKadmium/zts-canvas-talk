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
