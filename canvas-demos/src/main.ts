interface Slides {
  [key: string]: {
    name: string;
    href?: string;
  };
}

const slides = {
  canvas: {
    name: "Canvas",
  },
  context2dText: {
    name: "2D Context (Text)",
  },
  context2dRectangle: {
    name: "2D Context (Rectangle)",
  },
  context2dEllipse: {
    name: "2D Context (Ellipse)",
  },
  context2dAbstractShapes: {
    name: "2D Context (Abstract Shapes)",
  },
  context2dTransformations: {
    name: "2D Context (Transformations)",
  },
  animation2dRotateSquare: {
    name: "2D Animation (Rotate Square)",
  },
  animation2dFlashRectangle: {
    name: "2D Animation (Flash Rectangle)",
  },
  animation2dNostalgia: {
    name: "2D Animation (Nostalgia)",
  },
  webgl: {
    name: "WebGL",
  },
  webgl2: {
    name: "WebGL 2",
  },
  three: {
    name: "Three.js",
  },
  webgpu: {
    name: "WebGPU",
  },
  computeShaders: {
    name: "Compute Shaders",
  },
} satisfies Slides;

type SlideIndex = keyof typeof slides;

function getLink(key: SlideIndex): HTMLAnchorElement {
  const anchor = document.createElement("a");
  const href = key;
  anchor.href = `/demos/${href}/index.html`;
  anchor.textContent = slides[key].name;
  return anchor;
}

function getIndexLink(): HTMLAnchorElement {
  const anchor = document.createElement("a");
  anchor.href = "/";
  anchor.textContent = "Back to index";
  return anchor;
}

function liWrap(element: HTMLElement): HTMLLIElement {
  const li = document.createElement("li");
  li.appendChild(element);
  return li;
}

export function addNavigation(key: SlideIndex) {
  const container = document.createElement("ul");
  const slideKeys = Object.keys(slides) as SlideIndex[];
  const index = slideKeys.indexOf(key);
  if (index > 0) {
    container.appendChild(liWrap(getLink(slideKeys[index - 1])));
  }

  container.appendChild(liWrap(getIndexLink()));

  if (index < slideKeys.length - 1) {
    container.appendChild(liWrap(getLink(slideKeys[index + 1])));
  }

  document.body.appendChild(container);

  const currentSlide = slides[slideKeys[index]];
  document.title = currentSlide.name;
  const heading = document.querySelector("h1");
  if (heading) {
    heading.textContent = currentSlide.name;
  }
}

export function createMainIndex() {
  const container = document.createElement("ul");
  const slideKeys = Object.keys(slides) as SlideIndex[];
  for (const slideKey of slideKeys) {
    container.appendChild(liWrap(getLink(slideKey)));
  }

  document.body.appendChild(container);
}
