# Shaders

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

# Vertex Shaders

A vertex shader exists to answer one question: 

<v-click>

*Where is this vertex, in clip-space?*
</v-click>

<v-click>
We can pass information to the shader to help it answer.
</v-click>

<ul>
    <li v-click>Where the vertex is relative to the object</li>
    <li v-click>Where the object is in the world (translation)</li>
    <li v-click>Which direction the object is pointing (rotation)</li>
    <li v-click>How big the object is (scale)</li>
    <li v-click>Where the camera is in the world</li>
    <li v-click>The camera's field of view</li>
</ul>

<!-- 
A vertex is a point, with an X and Y location.
Vertices is plural of vertex. So, one vertex, two vertices. 
Any line has two vertices - a start and an end. And a triangle has three.

Clipping planes mean where we stop rendering. Anything closer than the near clip plane
will not be rendered, and anything further than the far clip plan will not be rendered.
-->

---
transition: slide-left
---

# Fragment (Pixel) Shaders

A fragment shader exists to answer one question: 

<v-click>

*What colour is this pixel?*
</v-click>

<v-click>
We can pass information to the shader to help it answer.
</v-click>

<ul>
    <li v-click>Where the current pixel is in the world</li>
    <li v-click>Where the light sources are</li>
    <li v-click>How strong the light sources are</li>
    <li v-click>The base colour of the object</li>
</ul>