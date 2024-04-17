import { addNavigation } from "../../src/main";
import vertexShaderSource from "./vertex-shader.vert?raw";
import fragmentShaderSource from "./fragment-shader.frag?raw";
import { mat4, vec3 } from "gl-matrix";
import { vertexColors } from "./colors";
import { allVertices } from "./vertices";

let rotation = 0;
const rotationPerSecond = Math.PI / 4;
const projectionMatrix = mat4.create();
const modelViewMatrix = mat4.create();

const location = vec3.create();
location[2] = -10;

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

let lastTime = 0;

function draw(gl: WebGL2RenderingContext, modelViewLocation: WebGLUniformLocation, time: number) {
  const dt = (time - lastTime) / 1000;
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // construct our Model View Matrix
  mat4.identity(modelViewMatrix);
  mat4.translate(modelViewMatrix, modelViewMatrix, location);
  mat4.rotateY(modelViewMatrix, modelViewMatrix, rotation);
  mat4.rotateX(modelViewMatrix, modelViewMatrix, -Math.PI / 8);
  gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, allVertices.length / 3);

  rotation += rotationPerSecond * dt;
  lastTime = time;
  window.requestAnimationFrame((time) => draw(gl, modelViewLocation, time));
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
  if (!positionBuffer) {
    throw new Error("No position buffer");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allVertices), gl.STATIC_DRAW);

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

  const colorAttributeLocation = gl.getAttribLocation(program, "a_vertexColor");
  gl.enableVertexAttribArray(colorAttributeLocation);
  gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

  const modelViewLocation = gl.getUniformLocation(program, "a_modelViewMatrix");
  if (!modelViewLocation) {
    throw new Error("No model view location");
  }

  const projectionLocation = gl.getUniformLocation(program, "a_projectionMatrix");
  mat4.perspective(projectionMatrix, (45 * Math.PI) / 180, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
  gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  draw(gl, modelViewLocation, 0);

  addNavigation("webgl2");
});
