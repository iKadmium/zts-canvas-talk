// 3d points
const vertices = [
  [-1, 1, -1], // front top left, 0
  [1, 1, -1], // front top right, 1
  [1, -1, -1], // front bottom right, 2
  [-1, -1, -1], // front bottom left, 3

  [-1, 1, 1], // back top left, 4
  [1, 1, 1], // back top right, 5
  [1, -1, 1], // back bottom right, 6
  [-1, -1, 1], // back bottom left, 7
];

const triangles = [
  [0, 1, 2], // front top left
  [0, 2, 3], // front bottom right

  [4, 6, 5], // back top left
  [4, 7, 6], // back bottom right

  [4, 0, 3], // left front top
  [4, 3, 7], // left back bottom

  [2, 1, 5], // right front top
  [2, 5, 6], // right back bottom

  [0, 4, 1], // top front left
  [1, 4, 5], // top back right

  [3, 2, 6], // bottom front left
  [6, 7, 3], // bottom back right
];

const allTriangles = triangles.flatMap((x) => x);
export const allVertices = allTriangles.map((index) => vertices[index]).flatMap((x) => x);
