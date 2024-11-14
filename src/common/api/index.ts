import axios from "axios";

const api = axios.create({
  baseURL: "https://api.alimor.ir/v1",
});

export default api;
