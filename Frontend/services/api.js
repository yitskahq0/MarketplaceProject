import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-url-mu/api"
});

export default api;
