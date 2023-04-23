import axios from "axios";

const api = axios.create({
  baseURL: "https://api.alimortazavi.org/v1",
});

export default api;
