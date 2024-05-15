# 2D Context

- The boring one
```ts
const ctx = canvas.getContext("2d");
```
<v-click>

- Sometimes drawn on the GPU (and sometimes not)
</v-click>

---
transition: slide-left
---

# 2D Contex - Text

- We can draw text
```ts
ctx.fillStyle = "black";
ctx.font = "48px sans-serif";
ctx.fillText(text, x, y);
```

<v-click>
<Demo2DDrawText />
</v-click>

---
transition: slide-left
---

# 2D Contex - Rectangles

- We can draw rectangles
```ts
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.stroke();
```

<v-click>
<Demo2DDrawRectangle />
</v-click>

---
transition: slide-left
---

# 2D Contex - Ellipses

- We can draw ellipses
```ts
ctx.beginPath();
ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
ctx.fill();
```
<v-click>
<Demo2DDrawEllipse />
</v-click>

---
transition: slide-left
---

# 2D Context - LineTo and MoveTo

- We can draw abstract shapes
```ts
ctx.beginPath();
ctx.moveTo(40, 208);
ctx.lineTo(72, 272);
ctx.lineTo(8, 272);
ctx.lineTo(40, 208);
ctx.stroke();
```

<v-click>
<Demo2DDrawAbstractShapes />
</v-click>

---
transition: slide-left
---

# 2D Context - Gradients

```ts
const gradient = ctx.createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd);
// linear and conic gradients are also available
gradient.addColorStop(position, color); // position is a number from 0 to 1
gradient.addColorStop(position, color); 
// ...
ctx.fillStyle = gradient;
```

<v-click>
<Demo2DDrawGradient />
</v-click>
---
transition: slide-left
---

# 2D Context - Transformations


- We can apply transformations
```ts
ctx.beginPath();
ctx.translate(64, 280);
ctx.rotate(Math.PI / 4);
ctx.rect(0, 0, 64, 64);
ctx.stroke();
ctx.resetTransform();
```

<!-- 
  Transformations are super handy because they mean you don't have to calculate
  the position (or rotation or scale) of your objects when you draw them. You can 
  just draw them in local world space and then position, rotate and scale them with 
  a transform.
  SWITCH TO THE OTHER TAB FOR THIS
-->

---
transition: slide-left
---
# 2D Context - Transformations Demo

<Demo2DTransformations />

---
transition: slide-left
---

# 2D Animation - Back in the day...

Setup:
```ts
function draw(time: number) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // update the logic

  // draw a frame

  requestAnimationFrame(draw);
}
```

---
transition: slide-left
---

# Decouple Your Updates From Your Renders

```ts
//setup
const updateTime = 1000 / 60; // 60 updates per second
let lastTime = performance.now();

function update() {
  const time = performance.now();
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  // update your objects
}

function draw() {
  ctx.resetTransform();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // draw a frame

  requestAnimationFrame(() => draw());
}

window.setInterval(update, updateTime);
requestAnimationFrame(() => draw());
```


---
transition: slide-left
---

# 2D Animation Cont...

Rotate a square:
```ts
//setup (once)
const rotationSpeed = 5;
let rotation = 0;
const length = 64;

// update (every frame)
rotation += rotationSpeed * dt;

// draw (every frame)
ctx.beginPath();
ctx.translate(length, length);
ctx.rotate(rotation);
ctx.translate(-length / 2, -length / 2);
ctx.rect(0, 0, length, length);
ctx.stroke();
```

<v-click>
<Demo2DAnimationRotateSquare />
</v-click>

---
transition: slide-left
---

# 2D Animation Cont...

Flash a rectangle:
```ts
// setup (once)
const colorSpeed = 2;
let value = 0;
const padding = 8;
const width = 256;
const height = 64;

// update (every frame)
value += dt * colorSpeed;

// draw (every frame)
ctx.beginPath();
ctx.translate(padding, padding);
ctx.rect(0, 0, width, height);
const brightness = Math.abs(Math.sin(value));
ctx.fillStyle = `hsl(0, 0%, ${brightness * 100}%)`;
ctx.stroke();
ctx.fill();
```

---
transition: slide-left
---

# 2D Animation Demo

<Demo2DAnimationFlashRectangle />

---
transition: slide-left
---

# 2D Animation Cont...

Experience the ultimate in nostalgia:
```ts
// setup (once)
const size = [100, 100];
const position = [0, 0];
const maxPosition = [canvas.width - size[0], canvas.height - size[1]];
const velocity = [10, 10];

// update (every frame)
for (let dimension = 0; dimension < position.length; dimension++) {
  position[dimension] += velocity[dimension] * dt;
  if (position[dimension] > maxPosition[dimension]) {
    position[dimension] = maxPosition[dimension];
    velocity[dimension] = -velocity[dimension];
  } else if (position[dimension] < 0) {
    position[dimension] = 0;
    velocity[dimension] = -velocity[dimension];
  }
}

// draw (every frame)
ctx.drawImage(logo, position[0], position[1], size[0], size[1]);
```

---
transition: slide-left
---

# 2D Animation Cont...

<Demo2DAnimationNostalgia />