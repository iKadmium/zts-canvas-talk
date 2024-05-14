struct Uniforms {
    iResolution: vec2<f32>,
    iTime: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

fn palette(t: f32) -> vec3<f32> {
    let a: vec3<f32> = vec3<f32>(0.5, 0.5, 0.5);
    let b: vec3<f32> = vec3<f32>(0.5, 0.5, 0.5);
    let c: vec3<f32> = vec3<f32>(1.0, 1.0, 1.0);
    let d: vec3<f32> = vec3<f32>(0.263, 0.416, 0.557);

    return a + b * cos(6.28318 * (c * t + d));
}

@fragment
fn fs(@builtin(position) FragCoord: vec4<f32>) -> @location(0) vec4<f32> {
    let fragCoord: vec2<f32> = FragCoord.xy;
    var uv: vec2<f32> = (fragCoord * 2.0 - uniforms.iResolution.xy) / uniforms.iResolution.y;
    let uv0: vec2<f32> = uv;
    var finalColor: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);

    for (var i: f32 = 0.0; i < 4.0; i = i + 1.0) {
        uv = fract(uv * 1.5) - 0.5;
        var d: f32 = length(uv) * exp(-length(uv0));
        let col: vec3<f32> = palette(length(uv0) + i * 0.4 + uniforms.iTime * 0.4);

        d = sin(d * 8.0 + uniforms.iTime) / 8.0;
        d = abs(d);
        d = pow(0.01 / d, 1.2);

        finalColor = finalColor + (col * d);
    }

    return vec4<f32>(finalColor, 1.0);
}