import axios from "axios";

const publicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add interceptors for logging
publicAxios.interceptors.request.use(
  (config) => {
    console.log("[Public Request]", config);
    return config;
  },
  (error) => Promise.reject(error)
);

export default publicAxios;
