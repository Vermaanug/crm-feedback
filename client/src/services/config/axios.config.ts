import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiRequestGlobal = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    timeout: 10000,
  },
});

export const apiRequestForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    timeout: 10000,
  },
});

export default apiRequestGlobal;