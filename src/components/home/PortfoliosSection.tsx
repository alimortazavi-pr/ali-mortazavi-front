import type { FC } from "react";
import Link from "next/link";
import { ArrowRight2 } from "iconsax-react";
import { portfoliosSectionProps } from "@/common/types/portfolios.type";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PortfolioCard from "@/components/ui/PortfolioCard";

export const PortfoliosSection: FC<portfoliosSectionProps> = ({ portfolios }) => (
  <section id="portfolios">
    <Reveal>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
        <SectionHeading
          label="Portfolio"
          title="Featured"
          highlight="Projects"
          description="Hand-picked projects showcasing clean code, modern design, and real-world impact."
          className="mb-0"
        />
        <Link
          href="/portfolios"
          className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors shrink-0 self-start sm:self-auto"
        >
          View all projects
          <ArrowRight2 size={16} />
        </Link>
      </div>
    </Reveal>

    {portfolios.length === 0 ? (
      <div className="glass rounded-2xl p-12 text-center text-gray-500">
        Projects coming soon...
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolios.map((portfolio, i) => (
          <Reveal key={portfolio._id} delay={i * 0.1}>
            <PortfolioCard portfolio={portfolio} className="h-[280px] sm:h-[300px] md:h-[320px]" />
          </Reveal>
        ))}
      </div>
    )}
  </section>
);

export default PortfoliosSection;
