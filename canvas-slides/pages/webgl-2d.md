# WebGL

- WebGL 1
  - March 2011
  - Based on OpenGL ES 2.0
  - 98.4% Availability (caniuse.com)
<v-click>

- WebGL 2
  - January 2017
  - Based on OpenGL ES 3.0
  - 96.4% Availability (caniuse.com)
  - Basically the same as 1 with some extensions
</v-click>
<v-click>

- Shader language is GLSL
</v-click>
<v-click>

- Stateful and painful to work with
</v-click>

---
transition: slide-left
---

# What does WebGL do?

It draws 
<v-click>

- lines (sometimes)
</v-click>
<v-click>

- points (sometimes)
</v-click>
<v-click>

- triangles (most of the time)
</v-click>

---
transition: slide-left
---

# How?

<v-click>
In the GPU rendering system, triangles are rendered by two separate, yet equally important programs.
</v-click>

<v-click>

- **Vertex shaders**, which calculate the position of vertices
</v-click>

<v-click>

- **Pixel/Fragment Shaders**, which calculate the colour of pixels
</v-click>

<v-click>

These are their stories.

</v-click>
---
transition: slide-left
---

# Again, how?

- Define vertices of an object
<v-click>

- Tell the vertex shader about them
  - "This is what a cube is"
</v-click>
<v-click>

- Tell the vertex shader the translation, rotation and scale
  - "This is where the cube is, how it's oriented, and how big it is"
</v-click>
<v-click>

- Tell the vertex shader about the perspective
  - Camera location, field of view, clipping planes
</v-click>
<v-click>

- Tell the pixel shader how to draw the object
  - What colour is this pixel?
</v-click>

<!-- 
Vertices is plural of vertex. So, one vertex, two vertices. 
A vertex is a point, with an X and Y location.
Any line has two vertices - a start and an end. And a triangle has three.

Clipping planes mean where we stop rendering. Anything closer than the near clip plane
will not be rendered, and anything further than the far clip plan will not be rendered.
-->


---
transition: slide-left
---

# WebGL - Setup

- Get a context
```ts
const gl = canvas.getContext('webgl2');
```

<v-click>

- Create a Vertex Shader
```ts
const shader = gl.createShader(type); // type is gl.VERTEX_SHADER
gl.shaderSource(shader, source);
gl.compileShader(shader);
```

</v-click>
<v-click>

- Create a Pixel Shader
```ts
// same again with type gl.FRAGMENT_SHADER
```

</v-click>
<v-click>

- Link the shaders to a Program
```ts
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
```

</v-click>

---
transition: slide-left
---

# WebGL - Vertices 

- Define your vertices
```ts
const vertices = [0, 0, 0, 0.5, 0.7, 0];
```

<v-click>

- Tell the program about the vertices
```ts
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
```

</v-click>
<v-click>

- Tell the vertex shader how to read the vertices
```ts
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionAttributeLocation);
const size = 2; // 2 components per iteration
const type = gl.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0; // start at the beginning of the buffer
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
```

</v-click>

<!--
This is our first big gotcha in WebGL. It's stateful. We don't get to say, "put this data in this buffer" -
we have to say, "we're talking about this buffer", and then "put this data in the buffer we last talked about".
We just have to pray that another thread didn't start talking about a different buffer in the meantime. That's
on you to deal with.

Attributes are one type of property a vertex shader can have. An attribute is a variable that's passed to the shader,
and there's a different one *per call*.
-->

---
transition: slide-left
---

# WebGL - Vertex Shaders 

- Write the Vertex Shader
```glsl
#version 300 es
 
in vec4 a_position;
 
void main() {
  gl_Position = a_position;
}
```

<!-- 
Input attributes are labeled with the in keyword.

Vectors are a data type used often in shaders. It just means a fixed size array - in this case, a 4 dimensional one.

In WebGL, all shaders have a main function.

gl_Position is a special variable a vertex shader
is responsible for setting
-->

---
transition: slide-left
---

# WebGL - Pixel Shader 

- Write the Fragment (Pixel) Shader

```glsl
#version 300 es
 
precision highp float;
 
out vec4 outColor;
 
void main() {
  outColor = vec4(1, 0, 0, 1);
}
```

<!--
Fragment shaders don't have a default precision so we need
to pick one. highp is a good default. It means "high precision"

We need to declare an output for the fragment shader.
-->

---
transition: slide-left
---

# WebGL - Draw Function

```ts
function draw(gl: WebGL2RenderingContext) {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const offset = 0;
  const count = vertices.length / size;

  gl.drawArrays(gl.TRIANGLES, offset, count);
}
```

---
transition: slide-left
---

# WebGL - Demo

<DemoWebGLTriangle />