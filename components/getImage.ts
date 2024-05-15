export const getImage = (filename: string) =>
  new Promise<HTMLImageElement>((resolve) => {
    const img = document.createElement("img");
    img.addEventListener("load", () => {
      resolve(img);
    });
    const base = window.location.hostname === "localhost" ? "/images" : "images";
    img.src = `${base}/${filename}`;
  });
