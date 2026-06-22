import Head from "next/head";
import type { FC } from "react";

import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import InfoSection from "@/components/home/InfoSection";
import NavBar from "@/components/layouts/NavBar";
import HeroSection from "@/components/home/HeroSection";
import PortfoliosSection from "@/components/home/PortfoliosSection";
import AboutSection from "@/components/home/AboutSection";
import api from "@/common/api";
import { theHomeProps } from "@/common/types/layouts.type";
import { SITE } from "@/common/constants";

export const TheHome: FC<theHomeProps> = ({ portfolios }) => (
  <div className="w-full space-y-4">
    <Head>
      <title>{SITE.name} | {SITE.title}</title>
      <meta name="description" content="Senior Front-End Developer specializing in React, Next.js, and TypeScript. Building high-performance web applications." />
    </Head>

    <NavBar />

    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-1/2">
        <HeroSection />
      </div>
      <div className="w-full lg:w-1/2">
        <InfoSection />
      </div>
    </div>

    <div className="flex flex-col xl:flex-row gap-4">
      <div className="w-full xl:w-7/12">
        <PortfoliosSection portfolios={portfolios} />
      </div>
      <div className="w-full xl:w-5/12">
        <AboutSection />
      </div>
    </div>
  </div>
);

export async function getStaticProps() {
  let portfolios: IPortfolio[] = [];

  try {
    const response = await api.get(`/portfolios?limit=3`);
    portfolios = response.data.portfolios;
  } catch (error: unknown) {
    console.error("Failed to fetch portfolios:", error);
  }

  return {
    props: { portfolios },
    revalidate: 10,
  };
}

export default TheHome;
