import { FC } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useSite } from "@/context/SiteContext";

export const ExperienceSection: FC = () => {
  const { experience } = useSite();

  return (
    <section id="experience" className="min-w-0">
      <Reveal>
        <SectionHeading
          label="Career"
          title="My"
          highlight="Journey"
          description="From self-taught teenager to senior front-end engineer — a path built on curiosity and craft."
        />
      </Reveal>

      {/* Mobile timeline */}
      <div className="md:hidden relative pl-1">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-purple-500/20 to-transparent" />
        <div className="space-y-5">
          {experience.map((item, i) => (
            <Reveal key={`mobile-${item.year}-${i}`} delay={i * 0.08}>
              <div className="relative pl-9">
                <div className="absolute left-0 top-5 w-[9px] h-[9px] rounded-full bg-violet-500 border-[3px] border-[#0a0a0f] z-10" />
                <div className="glass rounded-2xl p-4 glass-hover min-w-0">
                  <span className="text-xs font-bold text-violet-400">{item.year}</span>
                  <h3 className="text-base font-bold text-white mt-1 break-words">{item.title}</h3>
                  <p className="text-sm text-violet-400/80 mt-0.5">{item.role}</p>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Desktop timeline */}
      <div className="hidden md:block relative">
        <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-purple-500/20 to-transparent" />
        <div className="space-y-8">
          {experience.map((item, i) => (
            <Reveal key={`desktop-${item.year}-${i}`} delay={i * 0.1}>
              <div className={`relative flex gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-1/2 flex items-start ${i % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"}`}>
                  <span className="text-2xl font-bold text-gradient">{item.year}</span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500 border-4 border-[#0a0a0f] z-10 mt-1" />
                <div className={`w-1/2 ${i % 2 === 0 ? "pl-8" : "pr-8 text-right"}`}>
                  <div className="glass rounded-2xl p-5 md:p-6 glass-hover text-left">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-violet-400/80 mt-0.5">{item.role}</p>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
