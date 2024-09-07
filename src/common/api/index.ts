import axios from "axios";

const api = axios.create({
  baseURL: "https://pbudget.liara.run/v1",
});

export default api;
