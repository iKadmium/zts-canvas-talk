const colors = [
  [1, 0, 0, 1], // red front face
  [0, 1, 0, 1], // green back face
  [0, 0, 1, 1], // blue left face
  [1, 1, 0, 1], // yellow right face
  [0, 1, 1, 1], // cyan top face
  [1, 0, 1, 1], // magenta bottom face
];

// Repeat the color 6 times, once for each vertex
export const vertexColors = colors.flatMap((face) => face.concat(face, face, face, face, face));
