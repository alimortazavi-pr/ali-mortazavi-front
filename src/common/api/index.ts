import axios from "axios";
import { API_BASE_URL } from "@/common/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
