import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: "https://6889e36e-f870-4e2c-afc5-d836e5f0c61e.mock.pstmn.io",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});