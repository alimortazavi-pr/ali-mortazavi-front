export const IS_DEV = process.env.NODE_ENV === "development";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (IS_DEV ? "http://localhost:7778/v1" : "https://api.alimor.ir/v1");

export const ASSETS_BASE_URL =
  process.env.NEXT_PUBLIC_ASSETS_URL ||
  (IS_DEV ? "http://localhost:7778" : "https://api.alimor.ir");

export const RESUME_URL = `${ASSETS_BASE_URL}/my-resume/Ali-Mortazavi.pdf`;

export const SITE = {
  name: "Ali Mortazavi",
  title: "Front-End Developer",
  email: "alimortazavi.pr@gmail.com",
  phone: "+989127461218",
  social: {
    linkedin: "https://www.linkedin.com/in/ali-mortazavi",
    github: "https://github.com/alimortazavi-pr",
    telegram: "https://t.me/alimortazavi_dev",
    npm: "https://www.npmjs.com/~alimortazavi",
    instagram: "https://www.instagram.com/alimortazavi.dev",
  },
} as const;
