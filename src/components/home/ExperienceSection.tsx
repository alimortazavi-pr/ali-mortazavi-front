import { FC } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useSite } from "@/context/SiteContext";

export const ExperienceSection: FC = () => {
  const { experience } = useSite();

  return (
    <section id="experience" className="py-4">
      <Reveal>
        <SectionHeading
          label="Career"
          title="My"
          highlight="Journey"
          description="From self-taught teenager to senior front-end engineer — a path built on curiosity and craft."
        />
      </Reveal>
      <div className="relative">
        <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-purple-500/20 to-transparent" />
        <div className="space-y-8">
          {experience.map((item, i) => (
            <Reveal key={`${item.year}-${i}`} delay={i * 0.1}>
              <div className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="md:w-1/2 md:text-right flex items-start gap-4 md:gap-0 md:justify-end">
                  <div className="md:hidden w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0 z-10">
                    <span className="text-xs font-bold text-violet-300">{item.year}</span>
                  </div>
                  <div className={`hidden md:block ${i % 2 === 0 ? "pr-8" : "pl-8 md:text-left"}`}>
                    <span className="text-2xl font-bold text-gradient">{item.year}</span>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500 border-4 border-[#0a0a0f] z-10 mt-1" />
                <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                  <div className="glass rounded-2xl p-5 md:p-6 glass-hover">
                    <span className="md:hidden text-xs font-semibold text-violet-400 mb-1 block">{item.year}</span>
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
