import { useEffect } from "react";
import { clarity } from "react-microsoft-clarity";

export default function ClarityInit() {
  useEffect(() => {
    clarity.init("sxeli3hlu1");
  }, []);

  return null;
}
