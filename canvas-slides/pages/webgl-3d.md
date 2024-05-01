# WebGL 3D - Vertices

- Define our vertices, this time in 3D
```ts
const vertices = [
  // front face
  1, 1, -1, // front top right
  -1, 1, -1, // front top left
  -1, -1, -1, // front bottom left
  -1, -1, -1, // front bottom left (again)
  1, 1, -1, // front bottom right
  1, 1, -1, // front top right
  // ...
];
```

<v-click>

- Define our colours, one per vertex
```ts
const colors = [
  1, 0, 0, 1, // red front top right
  1, 0, 0, 1, // red front top left
  // ...
  0, 1, 0, 1, // green back top left
  0, 1, 0, 1, // green back top right
  // ...
];
```
</v-click>

<!-- 
Another gotcha here. When you define 3D triangles, they have a facing direction, based on the order
in which you define the vertices.
If you define them in counter-clockwise order, they are facing you.
-->

---
transition: slide-left
---

# WebGL 3D - Vertex Buffer

- Create and fill our position buffer
```ts
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allVertices), gl.STATIC_DRAW);
```

<v-click>

- Tell our vertex shader about it
```ts
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
```
</v-click>
<v-click>

- And repeat, for the colour buffer
```ts
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

const colorAttributeLocation = gl.getAttribLocation(program, "a_vertexColor");
gl.enableVertexAttribArray(colorAttributeLocation);
gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);
```
</v-click>

---
transition: slide-left
---

# WebGL 3D - Matrices

<div style="display: grid; grid-template-columns: 1fr 1fr;">
<div>

- A matrix is a fixed-size, two-dimensional array
<v-click>

- Usually square but not always
</v-click>
<v-click>

- The plural of matrix is matrices
</v-click>
<v-click>

- They are everywhere in graphics programming
</v-click>
<v-click>

- We can use them to apply transformations to geometry
  - in particular, translation, rotation and scaling
</v-click>
<v-click>

- Not multiplicatively commutative 
  - (a &times; b DOES NOT EQUAL b &times; a) 
</v-click>
</div>
  <img src="/images/matrix.svg" style="width: 100%;">
</div>


---
transition: slide-left
---

# WebGL 3D - Projection Matrix

- Tell WebGL how we want to simulate 3D
- Think of this as the 'camera'

```ts
import { mat4 } from "gl-matrix";

const projectionMatrix = mat4.create();
mat4.perspective(projectionMatrix, (45 * Math.PI) / 180, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
const projectionLocation = gl.getUniformLocation(program, "a_projectionMatrix");
gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);
```

<!-- 
Now we have to project a 3D scene onto a 2D canvas. There are a few ways to do this, so we need to be explicit. 
Orthographic is an option, but most of the time we'll want a perspective projection.

We refer to a uniform here for the first time. A uniform is a variable in a shader which is the same for all instances, like a global.
We don't have one camera per vertex - there's only one camera in the whole scene. So, we use a uniform to tell the shader about the camera.
-->

---
transition: slide-left
---

# WebGL 3D - Model View Matrix

- Rotate and translate our model 
```ts
const modelViewMatrix = mat4.create();
let rotation = 0;
const location = vec3.create();
location[2] = -10; // we want our model to move 10 units in the z axis

// inside our draw function
mat4.identity(modelViewMatrix);
mat4.translate(modelViewMatrix, modelViewMatrix, location);
mat4.rotateY(modelViewMatrix, modelViewMatrix, rotation);
mat4.rotateX(modelViewMatrix, modelViewMatrix, Math.PI / 8);

const modelViewLocation = gl.getUniformLocation(program, "a_modelViewMatrix");
gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);
```


---
transition: slide-left
---

# WebGL 3D - Our new Draw Function

```ts
let lastTime = 0;

function draw(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  rotation += rotationSpeed * dt;

  mat4.identity(modelViewMatrix);
  mat4.translate(modelViewMatrix, modelViewMatrix, location);
  mat4.rotateY(modelViewMatrix, modelViewMatrix, rotation);
  mat4.rotateX(modelViewMatrix, modelViewMatrix, Math.PI / 8);
  gl.uniformMatrix4fv(modelViewLocation, false, modelViewMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, allVertices.length / 3);

  window.requestAnimationFrame(draw);
}
```

<!-- Talk about delta time -->

---
transition: slide-left
---

# WebGL 3D - Our new Vertex Shader

```glsl
#version 300 es

in vec4 a_position;
in vec4 a_vertexColor;

uniform mat4 a_modelViewMatrix;
uniform mat4 a_projectionMatrix;

out vec4 vColor;

void main() {
	gl_Position = a_projectionMatrix * a_modelViewMatrix * a_position;
	vColor = a_vertexColor;
}
```

---
transition: slide-left
---

# WebGL 3D - Our new Fragment Shader

```glsl
#version 300 es

precision highp float;

out vec4 outColor;

in vec4 vColor;

void main() {
  outColor = vColor;
}
```

---
transition: slide-left
---

# Demo

<DemoWebGLCube />