import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight2 } from "iconsax-react";
import { portfoliosSectionProps } from "@/common/types/portfolios.type";
import { assetUrl } from "@/common/utils/image";

export const PortfoliosSection: FC<portfoliosSectionProps> = ({ portfolios }) => (
  <div id="portfolios" className="glass rounded-3xl p-5 md:p-6 h-full flex flex-col">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl md:text-2xl font-bold text-white">
        Featured <span className="text-gradient">Projects</span>
      </h2>
      <Link
        href="/portfolios"
        className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        See all
        <ArrowRight2 size={16} />
      </Link>
    </div>

    <div className="flex items-stretch gap-4 overflow-x-auto pb-2 flex-1 snap-x snap-mandatory">
      {portfolios.map((portfolio, i) => (
        <motion.div
          key={portfolio._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="snap-start"
        >
          <Link
            href={`/portfolios/${portfolio.slug}`}
            className="block min-w-[260px] md:min-w-[300px] h-[280px] relative rounded-2xl overflow-hidden group glass-hover"
          >
            {portfolio.images?.[0] && (
              <Image
                alt={portfolio.title}
                src={assetUrl(portfolio.images[0])}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                {portfolio.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {portfolio.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {portfolio.skills?.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export default PortfoliosSection;
