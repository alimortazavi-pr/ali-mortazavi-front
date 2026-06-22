import { ASSETS_BASE_URL } from "@/common/constants";

export function assetUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${ASSETS_BASE_URL}${path}`;
}
