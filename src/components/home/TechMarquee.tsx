import { FC } from "react";
import { useSite } from "@/context/SiteContext";

export const TechMarquee: FC = () => {
  const { techStack } = useSite();
  const items = techStack.length > 0 ? techStack : ["React"];

  return (
    <div className="relative overflow-hidden py-5 md:py-6 border-y border-white/[0.06] -mx-4 sm:-mx-5 md:mx-0">
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 md:w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 md:w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="mx-4 sm:mx-6 text-xs sm:text-sm font-mono text-gray-500 flex items-center gap-2"
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
