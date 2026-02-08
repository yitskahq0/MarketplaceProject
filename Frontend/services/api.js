import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-marketplace-8hil.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
