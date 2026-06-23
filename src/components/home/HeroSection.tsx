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
      <section className="md:min-h-[calc(100vh-120px)] flex flex-col justify-center pt-2 pb-4 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-w-0">
          <div className="lg:col-span-7 min-w-0 order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass w-fit mb-5 md:mb-6">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-gray-300">{hero.badgeText}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-[1.75rem] leading-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold tracking-tight text-white text-balance break-words">
                <span className="block">
                  {hero.line1}{" "}
                  <span className="text-gradient">{hero.highlight}</span>
                </span>
                <span className="block mt-2 md:mt-3">
                  <span className="text-white">{hero.line2Prefix}</span>{" "}
                  <RotatingText words={hero.rotatingWords} />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gray-400 mt-4 md:mt-6 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                {hero.description}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-6 md:mt-8">
                <Button size="lg" className="shine w-full sm:w-auto" onClick={contactDisclosure.onOpen}>
                  <MessageText size={20} variant="Bold" />
                  Let&apos;s Talk
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => downloadResume(resumeUrl)}>
                  <DocumentDownload size={20} variant="Bold" />
                  Resume
                </Button>
                <a
                  href="#portfolios"
                  className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 hover:text-violet-400 transition-colors py-2 sm:py-0 sm:ml-1"
                >
                  View work
                  <ArrowDown size={16} className="animate-bounce" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-8 md:mt-10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`glass rounded-xl p-3 sm:p-4 text-center bg-gradient-to-b border min-h-[72px] flex flex-col justify-center ${accentMap[stat.accent] ?? accentMap.violet}`}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-display">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 min-w-0 order-2">
            <Reveal delay={0.2} direction="left">
              <div className="relative overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 via-purple-600/20 to-cyan-600/30 rounded-3xl blur-xl animate-pulse-glow" />
                <div className="relative glass rounded-2xl overflow-hidden glow-ring">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shrink-0" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80 shrink-0" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0" />
                    <span className="text-xs text-gray-600 ml-2 font-mono truncate">developer.ts</span>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                    {codeLines(profile.name, profile.title).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="text-gray-400 whitespace-nowrap sm:whitespace-normal"
                        style={{ paddingLeft: `${line.indent * 1.25}rem` }}
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
