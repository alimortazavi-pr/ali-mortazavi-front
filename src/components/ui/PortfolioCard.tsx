import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight2 } from "iconsax-react";
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { assetUrl } from "@/common/utils/image";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  portfolio: IPortfolio;
  className?: string;
  featured?: boolean;
}

export const PortfolioCard: FC<PortfolioCardProps> = ({
  portfolio,
  className,
  featured = false,
}) => (
  <Link
    href={`/portfolios/${portfolio.slug}`}
    className={cn(
      "block relative rounded-2xl overflow-hidden group glass-hover border border-white/[0.06]",
      featured ? "min-w-[280px] md:min-w-[320px] h-[300px]" : "h-[340px]",
      className
    )}
  >
    {portfolio.images?.[0] && (
      <Image
        alt={portfolio.title}
        src={assetUrl(portfolio.images[0])}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
    <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/10 transition-colors duration-500" />
    <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
      <ArrowRight2 size={18} className="text-white" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
        {portfolio.title}
      </h3>
      <p className="text-sm text-gray-400 mt-1 line-clamp-2 leading-relaxed">
        {portfolio.description}
      </p>
      {portfolio.skills && (
        <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
          {portfolio.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/20 font-mono"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  </Link>
);

export default PortfolioCard;
