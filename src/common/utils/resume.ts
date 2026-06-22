import axios from "axios";
import download from "downloadjs";
import { RESUME_URL } from "@/common/constants";

export async function downloadResume() {
  const response = await axios.get(RESUME_URL, { responseType: "blob" });
  const content = response.headers["content-type"];
  download(response.data, "Ali-Mortazavi", content);
}
