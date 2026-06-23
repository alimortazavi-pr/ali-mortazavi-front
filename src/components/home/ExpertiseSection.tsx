import { FC } from "react";
import { Code, Layers, Palette, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useSite } from "@/context/SiteContext";
import { cn } from "@/lib/utils";

const icons = { code: Code, zap: Zap, palette: Palette, layers: Layers };
const accents = [
  "hover:border-violet-500/30 group-hover:shadow-violet-500/10",
  "hover:border-cyan-500/30 group-hover:shadow-cyan-500/10",
  "hover:border-amber-500/30 group-hover:shadow-amber-500/10",
  "hover:border-rose-500/30 group-hover:shadow-rose-500/10",
];

export const ExpertiseSection: FC = () => {
  const { expertise } = useSite();

  return (
    <section id="expertise" className="min-w-0">
      <Reveal>
        <SectionHeading
          label="What I Do"
          title="Expertise &"
          highlight="Capabilities"
          description="End-to-end development focused on performance, aesthetics, and maintainable architecture."
        />
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {expertise.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons] ?? Code;
          return (
            <Reveal key={`${item.title}-${i}`} delay={i * 0.1}>
              <div className={cn("group glass rounded-2xl p-5 sm:p-6 md:p-7 h-full transition-all duration-500 hover:bg-white/[0.05] hover:shadow-2xl min-w-0", accents[i % accents.length])}>
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default ExpertiseSection;
