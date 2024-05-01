@group(0) @binding(0) var<uniform> time: u32;

const redSpeed: f32 = 1.0 / 1000.0; 
const greenSpeed: f32 = 1.8 / 1000.0; 
const blueSpeed: f32 = 0.7 / 1000.0; 

const dimensions = vec2f(800.0, 400.0);

fn sdCircle(p: vec2f, r: f32) -> f32 {
    return length(p) - r;
}

@fragment 
fn fs(@builtin(position) position: vec4<f32>) -> @location(0) vec4f {
    let uv = position.xy / dimensions - vec2f(0.5, 0.5);
    let distance = sdCircle(uv, 0.1);
    
    var red = abs(sin(f32(time) * redSpeed)) * distance;
    var green = abs(sin(f32(time) * greenSpeed)) * distance;
    var blue = abs(sin(f32(time) * blueSpeed)) * distance;

    red = smoothstep(red, 0.1, 0.4);
    green = smoothstep(green, 0.1, 0.3);
    blue = smoothstep(blue, 0.1, 0.2);

    return vec4f(red, green, blue, 1.0);
}
