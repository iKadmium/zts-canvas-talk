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
