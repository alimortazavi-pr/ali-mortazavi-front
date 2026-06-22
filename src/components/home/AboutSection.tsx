import type { FC } from "react";
import { downloadResume } from "@/common/utils/resume";

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "NestJS",
  "MongoDB", "PostgreSQL", "TailwindCSS", "Redux", "gRPC",
];

export const AboutSection: FC = () => (
  <div className="glass rounded-3xl p-5 md:p-6 h-full flex flex-col">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl md:text-2xl font-bold text-white">
        About <span className="text-gradient">Me</span>
      </h2>
      <button
        onClick={downloadResume}
        className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        Resume →
      </button>
    </div>

    <div className="text-sm md:text-base text-gray-400 leading-relaxed space-y-3 flex-1">
      <p>
        I&apos;m Ali Mortazavi, a Front-End Specialist and MERN Stack Developer who
        enjoys turning complex problems into fast, scalable, and user-friendly
        web applications.
      </p>
      <p>
        I&apos;ve worked on data-heavy platforms, offline-first systems, and
        performance-critical interfaces — always focusing on clean architecture
        and real-world usability.
      </p>
    </div>

    <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.06]">
      {skills.map((skill) => (
        <span
          key={skill}
          className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-gray-300 border border-white/[0.06] hover:border-violet-500/30 hover:text-violet-300 transition-colors"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default AboutSection;
