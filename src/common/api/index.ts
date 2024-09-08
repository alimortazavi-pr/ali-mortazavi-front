import axios from "axios";

const api = axios.create({
  baseURL: "https://alimor.liara.run/v1",
});

export default api;
