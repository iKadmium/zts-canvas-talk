import { addNavigation } from "../../src/main";
import vertexShaderSource from "./vertex-shader.vert?raw";
import fragmentShaderSource from "./fragment-shader.frag?raw";

// 2d points
const vertices = [0, 0, 0, 0.5, 0.7, 0];
const size = 2; // 2 components per iteration

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Failed to create shader");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  throw new Error("Failed to create shader");
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram();
  if (!program) {
    throw new Error("Could not create program");
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  throw new Error("Could not create program");
}

function draw(gl: WebGL2RenderingContext) {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const offset = 0;
  const count = vertices.length / size;

  gl.drawArrays(gl.TRIANGLES, offset, count);
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    throw new Error("No canvas!");
  }

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("No context");
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  draw(gl);

  addNavigation("webgl");
});
