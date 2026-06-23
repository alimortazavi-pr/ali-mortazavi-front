import { FC } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  label,
  title,
  highlight,
  description,
  className,
  align = "left",
}) => (
  <div
    className={cn(
      "mb-8 md:mb-10",
      align === "center" && "text-center",
      className
    )}
  >
    <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
      {label}
    </span>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
      {title}{" "}
      {highlight && <span className="text-gradient">{highlight}</span>}
    </h2>
    {description && (
      <p
        className={cn(
          "text-gray-500 mt-3 max-w-xl text-sm md:text-base leading-relaxed",
          align === "center" && "mx-auto"
        )}
      >
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
