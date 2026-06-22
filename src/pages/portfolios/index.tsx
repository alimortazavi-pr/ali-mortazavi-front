import Head from "next/head";
import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { thePortfoliosProps } from "@/common/types/portfolios.type";
import NavBar from "@/components/layouts/NavBar";
import api from "@/common/api";
import { assetUrl } from "@/common/utils/image";
import { SITE } from "@/common/constants";

export const ThePortfolios: FC<thePortfoliosProps> = ({ portfolios }) => (
  <div>
    <Head>
      <title>{SITE.name} | Portfolios</title>
    </Head>
    <NavBar />

    <div className="mt-6 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        My <span className="text-gradient">Projects</span>
      </h1>
      <p className="text-gray-500 mt-2">A collection of web applications I&apos;ve built</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {portfolios.map((portfolio, i) => (
        <motion.div
          key={portfolio._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            href={`/portfolios/${portfolio.slug}`}
            className="block h-[320px] relative rounded-2xl overflow-hidden group glass glass-hover"
          >
            {portfolio.images?.[0] && (
              <Image
                alt={portfolio.title}
                src={assetUrl(portfolio.images[0])}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                {portfolio.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {portfolio.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export async function getStaticProps() {
  let portfolios: IPortfolio[] = [];

  try {
    const response = await api.get(`/portfolios`);
    portfolios = response.data.portfolios;
  } catch (error: unknown) {
    console.error("Failed to fetch portfolios:", error);
  }

  return {
    props: { portfolios, totalPages: 0 },
    revalidate: 10,
  };
}

export default ThePortfolios;
