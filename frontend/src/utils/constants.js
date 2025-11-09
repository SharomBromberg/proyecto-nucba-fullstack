export const INITIAL_LIMIT = 8;
export const FREE_SHIPPING_THRESHOLD = 500000;
export const SHIPPING_FEE = 20000;
const envBaseUrl = import.meta.env.VITE_BACKEND_URL;

export const BASE_URL =
  envBaseUrl ?? "https://proyecto-nucba-fullstack-1.onrender.com/" ;