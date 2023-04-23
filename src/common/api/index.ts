import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7770/v1",
});

export default api;
