import type { FC } from "react";
import { motion } from "framer-motion";
import { ArrowDown, DocumentDownload } from "iconsax-react";
import { Button } from "@/components/ui/Button";
import { downloadResume } from "@/common/utils/resume";

const stats = [
  { value: "5+", label: "Years Experience", color: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20" },
  { value: "27+", label: "Completed Projects", color: "from-amber-500/20 to-amber-600/5 border-amber-500/20" },
  { value: "90+", label: "GitHub Repositories", color: "from-rose-500/20 to-rose-600/5 border-rose-500/20" },
];

export const HeroSection: FC = () => (
  <div className="flex flex-col gap-4 h-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-3xl p-6 md:p-8 lg:p-10 flex-1 flex flex-col justify-center glow-violet"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 w-fit mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-violet-300">Available for projects</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
        <span className="text-white">Transform your </span>
        <span className="text-gradient">creative vision</span>
        <span className="text-white"> into flawless, high-performance code</span>
      </h1>

      <p className="text-gray-400 mt-4 md:mt-6 text-sm md:text-base max-w-lg leading-relaxed">
        Senior Front-End Developer crafting pixel-perfect, performant web experiences with React, Next.js, and TypeScript.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-8">
        <Button size="lg" onClick={downloadResume}>
          <DocumentDownload size={20} variant="Bold" />
          Download Resume
        </Button>
        <a href="#portfolios" className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-400 transition-colors">
          View my work
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </motion.div>

    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          className={`glass rounded-2xl p-4 md:p-5 text-center bg-gradient-to-b ${stat.color} border`}
        >
          <div className="text-2xl md:text-3xl xl:text-4xl font-bold text-white">{stat.value}</div>
          <div className="text-[10px] md:text-xs text-gray-400 mt-1 leading-tight">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default HeroSection;
