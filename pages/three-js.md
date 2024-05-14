# Let's do this in three.js

- Setup
```ts
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
const dimensions = [800, 400];
const camera = new THREE.PerspectiveCamera(45, dimensions[0] / dimensions[1], 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(dimensions[0], dimensions[1]);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.Float32BufferAttribute(allVertices, 3));
geometry.setAttribute("color", new THREE.Float32BufferAttribute(vertexColors, 4));
const material = new THREE.MeshBasicMaterial({ vertexColors: true });
const cube = new THREE.Mesh(geometry, material);
cube.position.z = -10;
cube.rotation.x = Math.PI / 8;
scene.add(cube);
```

---
transition: slide-left
---

# three.js cont...

- Draw function
```ts
let lastTime = 0;

function draw(time: number) {
  const dt = (time - lastTime) / 1000;
  cube.rotation.y += rotationPerSecond * dt;

  renderer.render(scene, camera);
  lastTime = time;
  requestAnimationFrame(draw);
}

draw(0);
```

---
transition: slide-left
---

# Demo

<DemoThreeCube />