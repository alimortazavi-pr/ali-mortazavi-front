import { FC } from "react";
import { useSite } from "@/context/SiteContext";

export const TechMarquee: FC = () => {
  const { techStack } = useSite();
  const items = techStack.length > 0 ? techStack : ["React"];

  return (
    <div className="relative overflow-hidden py-6 border-y border-white/[0.06]">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-6 text-sm font-mono text-gray-500 hover:text-violet-400 transition-colors flex items-center gap-2"
          >
            <span className="text-violet-500/50">▸</span>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
