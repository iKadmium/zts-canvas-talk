struct Uniforms {
    iResolution: vec2<f32>,
    iTime: f32,
    enabled: f32
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var ourSampler: sampler;
@group(0) @binding(2) var ourTexture: texture_2d<f32>;

@fragment
fn fs(@builtin(position) coordinates: vec4<f32>) -> @location(0) vec4<f32> {
    var uv: vec2<f32> = coordinates.xy / uniforms.iResolution.xy;
    var color = textureSample(ourTexture, ourSampler, uv);
    if(uniforms.enabled == 1.0) {
        color *= coordinates.y % 2.0;
    }

    return color;
}