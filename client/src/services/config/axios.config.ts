import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

console.log("BASE_URL:", BASE_URL);

const apiRequestGlobal = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const apiRequestForm = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default apiRequestGlobal;