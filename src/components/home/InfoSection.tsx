import type { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GitHubSvg,
  InstagramSvg,
  LinkedinSvg,
  MySkillsSvg,
  NpmSvg,
  TelegramSvg,
} from "@/components/layouts/TheSvgs";
import { SITE } from "@/common/constants";

const socialLinks = [
  { href: SITE.social.linkedin, Icon: LinkedinSvg, hoverColor: "hover:text-[#2867B2]" },
  { href: SITE.social.github, Icon: GitHubSvg, hoverColor: "hover:text-white" },
  { href: SITE.social.telegram, Icon: TelegramSvg, hoverColor: "hover:text-[#00A6DB]" },
  { href: SITE.social.npm, Icon: NpmSvg, hoverColor: "hover:text-red-500" },
];

export const InfoSection: FC = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="flex flex-col md:flex-row gap-4 h-full"
  >
    <div className="w-full md:w-5/12">
      <div className="relative h-[400px] md:h-full min-h-[350px] rounded-3xl overflow-hidden glass group">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-purple-600/20 to-cyan-600/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-5xl font-bold text-white shadow-2xl shadow-violet-500/30">
              AM
            </div>
            <p className="mt-4 text-white font-bold text-xl">{SITE.name}</p>
            <p className="text-violet-300 text-sm">{SITE.title}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
      </div>
    </div>

    <div className="flex flex-col gap-3 w-full md:w-7/12">
      <div className="glass rounded-2xl p-5 flex items-center justify-between">
        <span className="text-sm text-gray-500">Name</span>
        <span className="font-semibold text-white">{SITE.name}</span>
      </div>
      <div className="glass rounded-2xl p-5 flex items-center justify-between">
        <span className="text-sm text-gray-500">Position</span>
        <span className="font-semibold text-white">{SITE.title}</span>
      </div>
      <div className="glass rounded-2xl p-5 flex-1 flex items-center justify-center min-h-[120px]">
        <MySkillsSvg />
      </div>
      <div className="glass rounded-2xl p-3 flex items-center justify-around">
        {socialLinks.map(({ href, Icon, hoverColor }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            <Icon
              className={`w-12 h-12 md:w-11 md:h-11 text-gray-500 ${hoverColor} transition-all duration-300 hover:scale-110`}
              filled
            />
          </a>
        ))}
      </div>
    </div>
  </motion.div>
);

export default InfoSection;
