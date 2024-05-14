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