# 2D Context

- The boring one
```ts
const ctx = canvas.getContext("2d");
```

<v-click>

- We can draw text
```ts
ctx.fillStyle = "black";
ctx.font = "48px sans-serif";
ctx.fillText("I am text", 0, 48);
```
</v-click>

<v-click>
<Demo2DDrawText />
</v-click>


---
transition: slide-left
---

# 2D Contex Cont...

- We can draw rectangles
```ts
ctx.beginPath();
ctx.rect(8, 8, 64, 64);
ctx.stroke();
```

<v-click>
<Demo2DDrawRectangle />
</v-click>

---
transition: slide-left
---

# 2D Contex Cont...

- We can draw ellipses
```ts
ctx.beginPath();
ctx.ellipse(40, 168, 32, 32, 0, Math.PI, 360);
ctx.fill();
```
<v-click>
<Demo2DDrawEllipse />
</v-click>

---
transition: slide-left
---

# 2D Context Cont...

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

# 2D Context Cont...


- We can apply transformations
```ts
ctx.beginPath();
ctx.translate(64, 280);
ctx.rotate(Math.PI / 4);
ctx.rect(0, 0, 64, 64);
ctx.stroke();
ctx.resetTransform();
```

---
transition: slide-left
---
# 2D Context Transformations

<Demo2DTransformations />

---
transition: slide-left
---

# 2D Animation

Setup:
```ts
let lastTime = 0;

function draw(time: number) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  ctx.resetTransform();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // draw a frame

  requestAnimationFrame(draw);
}
```


---
transition: slide-left
---

# 2D Animation Cont...

Rotate a square:
```ts
const rotationSpeed = 5;
let rotation = 0;

rotation += rotationSpeed * time

ctx.beginPath();
ctx.translate(64, 64);
ctx.rotate(rotation);
ctx.translate(-32, -32);
ctx.rect(0, 0, 64, 64);
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
// setup
const colorSpeed = 2;
let value = 0;

// draw
value += dt * colorSpeed;

ctx.beginPath();
ctx.translate(8, 8);
ctx.rect(0, 0, 256, 64);
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
const maxPosition = [canvas.width - size[0], canvas.height - size[1]];

for (let dimension = 0; dimension < position.length; dimension++) {
  position[dimension] += velocity[dimension];
  if (position[dimension] > maxPosition[dimension]) {
    position[dimension] = maxPosition[dimension];
    velocity[dimension] = -velocity[dimension];
  } else if (position[dimension] < 0) {
    position[dimension] = 0;
    velocity[dimension] = -velocity[dimension];
  }
}

ctx.drawImage(logo, position[0], position[1], size[0], size[1]);
```

---
transition: slide-left
---

# 2D Animation Cont...

<Demo2DAnimationNostalgia />