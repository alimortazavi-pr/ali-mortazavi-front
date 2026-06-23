import { ISiteSettings } from "@/common/interfaces/site-settings.interface";

export const DEFAULT_SITE_SETTINGS: ISiteSettings = {
  profile: {
    name: "Ali Mortazavi",
    title: "Front-End Developer",
    email: "alimortazavi.pr@gmail.com",
    phone: "+989127461218",
    bio: "Senior Front-End Developer crafting high-performance, beautiful web experiences.",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/ali-mortazavi",
    github: "https://github.com/alimortazavi-pr",
    telegram: "https://t.me/alimortazavi_dev",
    npm: "https://www.npmjs.com/~alimortazavi",
    instagram: "https://www.instagram.com/alimortazavi.dev",
  },
  hero: {
    badgeText: "Available for new projects",
    line1: "I craft",
    highlight: "digital experiences",
    line2Prefix: "powered by",
    rotatingWords: ["React", "Next.js", "TypeScript", "NestJS", "Performance", "UI/UX"],
    description:
      "Senior Front-End Developer turning complex ideas into blazing-fast, pixel-perfect web applications that users love.",
  },
  stats: [
    { value: "5+", label: "Years Experience", accent: "emerald" },
    { value: "27+", label: "Projects Delivered", accent: "amber" },
    { value: "90+", label: "GitHub Repos", accent: "rose" },
    { value: "100%", label: "Client Focus", accent: "violet" },
  ],
  techStack: [
    "React", "Next.js", "TypeScript", "Node.js", "NestJS",
    "MongoDB", "PostgreSQL", "TailwindCSS", "Redux", "GraphQL",
    "Docker", "Git", "Framer Motion", "gRPC", "PWA",
  ],
  expertise: [
    { title: "Web Applications", description: "Scalable SPAs & SSR apps with React, Next.js, and modern architecture patterns.", icon: "code" },
    { title: "Performance Engineering", description: "Core Web Vitals optimization, lazy loading, caching strategies, and bundle analysis.", icon: "zap" },
    { title: "UI/UX Craft", description: "Pixel-perfect interfaces with micro-interactions, accessibility, and responsive design.", icon: "palette" },
    { title: "Full-Stack Solutions", description: "End-to-end delivery with NestJS, MongoDB, REST APIs, and production deployment.", icon: "layers" },
  ],
  experience: [
    { year: "2019", title: "Started the Journey", role: "Self-taught Developer", description: "Began programming at 13, building websites and learning JavaScript fundamentals." },
    { year: "2021", title: "Front-End Specialist", role: "Freelance & Contract", description: "Delivered production apps for clients using React, Redux, and modern CSS frameworks." },
    { year: "2023", title: "MERN Stack Developer", role: "Full-Stack Projects", description: "Built data-heavy platforms, offline-first systems, and performance-critical interfaces." },
    { year: "2025", title: "Senior Front-End Engineer", role: "Open to Opportunities", description: "Crafting high-performance web experiences with TypeScript, Next.js, and NestJS." },
  ],
  seo: {
    defaultDescription: "Senior Front-End Developer specializing in React, Next.js, and TypeScript.",
    siteUrl: "https://alimor.ir",
  },
  cta: {
    title: "Let's build something",
    highlight: "extraordinary",
    description: "Have a project in mind? I'm available for freelance work, collaborations, and full-time opportunities.",
  },
  resumePath: "/my-resume/Ali-Mortazavi.pdf",
  footerTagline: "Senior Front-End Developer crafting high-performance, beautiful web experiences.",
  aboutParagraphs: [
    "I'm Ali Mortazavi, a Front-End Specialist and MERN Stack Developer who enjoys turning complex problems into fast, scalable, and user-friendly web applications.",
    "I've worked on data-heavy platforms, offline-first systems, and performance-critical interfaces — always focusing on clean architecture and real-world usability.",
  ],
  pages: {
    about: {
      label: "About",
      title: "Meet",
      highlight: "Ali",
      description: "Senior Front-End Developer crafting high-performance, beautiful web experiences.",
    },
    contact: {
      label: "Contact",
      title: "Let's",
      highlight: "Connect",
      description: "Have a project in mind or just want to say hi? I'd love to hear from you.",
    },
    portfolios: {
      label: "Portfolio",
      title: "All",
      highlight: "Projects",
      description: "From concept to production-ready applications.",
    },
  },
  contactModal: {
    title: "Get in Touch",
    subtitle: "Let's discuss your next project",
  },
};
