import { FC, ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

interface PageHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({
  label,
  title,
  highlight,
  description,
  children,
}) => (
  <Reveal>
    <div className="py-6 md:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 min-w-0">
      <div className="min-w-0">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-2 sm:mb-3">
          {label}
        </span>
        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight text-balance break-words">
          {title}{" "}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>
        {description && (
          <p className="text-gray-500 mt-2 sm:mt-3 max-w-xl text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  </Reveal>
);

export default PageHeader;
