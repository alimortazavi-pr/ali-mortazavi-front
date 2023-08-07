import axios from "axios";

const api = axios.create({
  baseURL: "https://ali-mortazavi.cyclic.app/v1",
});

export default api;
