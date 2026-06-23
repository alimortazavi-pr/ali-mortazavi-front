import axios from "axios";
import download from "downloadjs";

export async function downloadResume(resumeUrl: string) {
  const response = await axios.get(resumeUrl, { responseType: "blob" });
  const content = response.headers["content-type"];
  download(response.data, "Ali-Mortazavi", content);
}
