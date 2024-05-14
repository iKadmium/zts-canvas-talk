const bladeCount: f32 = 20.0;
const bladeDistance: f32 = 0.04;

@vertex
fn vs(
    @location(0) position: vec2f,
    @builtin(instance_index) instanceIdx: u32
) -> @builtin(position) vec4f {
    let instanceOffsetX = (f32(instanceIdx) - (bladeCount / 2.0)) * bladeDistance;
    
    let x = position.x + instanceOffsetX;
    let y = position.y;
    return vec4f(x, y, 0.0, 1.0);
}