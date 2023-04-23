import type { FC } from "react";
import TestP from "@/assets/images/test-p.png";
import Image from "next/image";
import Link from "next/link";
import { portfoliosSectionProps } from "@/common/types/portfolios.type";

export const PortfoliosSection: FC<portfoliosSectionProps> = ({
  portfolios,
}) => {
  return (
    <div className="bg-neutral-900 w-full p-5 md:p-6 rounded-3xl h-full">
      <div className="mb-3 xl:mb-4 2xl:mb-5 md:flex items-center justify-between">
        <div className="text-gray-100 text-2xl font-black text-left mb-2 md:mb-0 md:text-3xl 2xl:text-4xl">
          <span>Website Portfolios</span>
        </div>
        <div className="text-gray-400 text-lg text-right md:text-2xl 2xl:text-3xl">
          <Link href={"/portfolios"}>See All</Link>
        </div>
      </div>
      <div className="flex items-center flex-nowrap gap-3 overflow-x-auto w-full">
        {portfolios.map((portfolio) => (
          <Link
            href={`/portfolios/${portfolio.slug}`}
            key={portfolio._id}
            className="min-w-[200px] md:min-w-max md:w-1/3 aspect-square relative rounded-2xl bg-neutral-900 border border-neutral-700"
          >
            <Image
              alt=""
              src={`http://localhost:7770${portfolio.images[0]}`}
              fill
              className="object-contain object-center rounded-2xl"
            />
            <div className="z-10 duration-300 absolute rounded-2xl bg-neutral-900 bg-opacity-30 w-full h-full flex items-end justify-start p-4">
              <div>
                <div className="text-xl text-gray-100 font-bold">
                  <span>{portfolio.title}</span>
                </div>
                <div className="text-sm text-gray-300">
                  <span>{portfolio.description.slice(0, 40)}...</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PortfoliosSection;
