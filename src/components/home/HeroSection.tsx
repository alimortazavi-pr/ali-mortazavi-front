import { FC } from "react";
import { useSite } from "@/context/SiteContext";
import { useResumeUrl } from "@/context/SiteContext";
import { motion } from "framer-motion";
import { ArrowDown, DocumentDownload, MessageText } from "iconsax-react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@/components/ui/Button";
import { downloadResume } from "@/common/utils/resume";
import RotatingText from "./RotatingText";
import ContactMeModal from "@/components/layouts/ContactMeModal";
import Reveal from "@/components/ui/Reveal";

const accentMap: Record<string, string> = {
  emerald: "from-emerald-500/15 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
  amber: "from-amber-500/15 to-amber-600/5 border-amber-500/20 text-amber-400",
  rose: "from-rose-500/15 to-rose-600/5 border-rose-500/20 text-rose-400",
  violet: "from-violet-500/15 to-violet-600/5 border-violet-500/20 text-violet-400",
};

const codeLines = (name: string, title: string) => [
  { indent: 0, content: <>const <span className="text-violet-400">developer</span> = {"{"}</> },
  { indent: 1, content: <>name: <span className="text-emerald-400">&apos;{name}&apos;</span>,</> },
  { indent: 1, content: <>role: <span className="text-emerald-400">&apos;{title}&apos;</span>,</> },
  { indent: 1, content: <>stack: [<span className="text-amber-300">&apos;React&apos;</span>, <span className="text-amber-300">&apos;Next.js&apos;</span>, <span className="text-amber-300">&apos;TS&apos;</span>],</> },
  { indent: 1, content: <>passion: <span className="text-cyan-400">Infinity</span>,</> },
  { indent: 0, content: <>{"};"}</> },
];

export const HeroSection: FC = () => {
  const site = useSite();
  const resumeUrl = useResumeUrl();
  const contactDisclosure = useDisclosure();
  const { hero, profile, stats } = site;

  return (
    <>
      <section className="min-h-[calc(100vh-120px)] flex flex-col justify-center py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass w-fit mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-gray-300">{hero.badgeText}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.12] tracking-tight text-white">
                <span className="block">
                  {hero.line1}{" "}
                  <span className="text-gradient">{hero.highlight}</span>
                </span>
                <span className="block mt-2 md:mt-3">
                  <span className="inline-flex items-baseline gap-x-2.5 flex-wrap">
                    <span className="text-white">{hero.line2Prefix}</span>
                    <RotatingText words={hero.rotatingWords} />
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gray-400 mt-5 md:mt-6 text-base md:text-lg max-w-xl leading-relaxed">
                {hero.description}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 mt-7 md:mt-8">
                <Button size="lg" className="shine" onClick={contactDisclosure.onOpen}>
                  <MessageText size={20} variant="Bold" />
                  Let&apos;s Talk
                </Button>
                <Button size="lg" variant="secondary" onClick={() => downloadResume(resumeUrl)}>
                  <DocumentDownload size={20} variant="Bold" />
                  Resume
                </Button>
                <a href="#portfolios" className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-400 transition-colors ml-1">
                  View work
                  <ArrowDown size={16} className="animate-bounce" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`glass rounded-xl p-4 text-center bg-gradient-to-b border ${accentMap[stat.accent] ?? accentMap.violet}`}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white font-display">{stat.value}</div>
                    <div className="text-[10px] md:text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2} direction="left">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 via-purple-600/20 to-cyan-600/30 rounded-3xl blur-xl animate-pulse-glow" />
                <div className="relative glass rounded-2xl overflow-hidden glow-ring">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs text-gray-600 ml-2 font-mono">developer.ts</span>
                  </div>
                  <div className="p-5 md:p-6 font-mono text-sm leading-relaxed">
                    {codeLines(profile.name, profile.title).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-gray-400"
                        style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                      >
                        {line.content}
                      </motion.div>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-violet-400 ml-1 align-middle"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <ContactMeModal {...contactDisclosure} />
    </>
  );
};

export default HeroSection;
