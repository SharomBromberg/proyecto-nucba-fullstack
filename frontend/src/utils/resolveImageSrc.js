import { BASE_URL } from "./constants";

export const resolveImageSrc = (img) => {
  if (!img) {
    return "/assets/product-pictures/placeholder.png";
  }

  if (/^https?:\/\//i.test(img)) {
    return img;
  }

  const normalizedBase = BASE_URL.endsWith("/")
    ? BASE_URL.slice(0, -1)
    : BASE_URL;

  const normalizedPath = img.startsWith("/") ? img : `/${img}`;

  return `${normalizedBase}${normalizedPath}`;
};
