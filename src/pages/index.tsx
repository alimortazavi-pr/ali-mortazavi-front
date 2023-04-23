import Head from "next/head";
import type { FC } from "react";

//Types
import { IPortfolio } from "@/common/interfaces/portfolios.interface";

//Components
import InfoSection from "@/components/home/InfoSection";
import NavBar from "@/components/layouts/NavBar";
import HeroSection from "@/components/home/HeroSection";
import PortfoliosSection from "@/components/home/PortfoliosSection";
import AboutSection from "@/components/home/AboutSection";

//Tools
import api from "@/common/api";
import { theHomeProps } from "@/common/types/layouts.type";

export const TheHome: FC<theHomeProps> = ({ portfolios }) => {
  return (
    <div className="w-full">
      <Head>
        <title>Ali Mortazavi | Home</title>
      </Head>
      <div className="flex flex-col-reverse lg:flex-row lg:items-stretch gap-4">
        <div className="w-full lg:w-6/12 xl:w-6/12">
          <HeroSection />
        </div>
        <div className="w-full lg:w-6/12 xl:w-6/12 flex flex-col">
          <div>
            <NavBar />
          </div>
          <div className="mt-4 flex-auto">
            <InfoSection />
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-stretch gap-4 mt-4">
        <div className="w-full xl:w-7/12">
          <PortfoliosSection portfolios={portfolios} />
        </div>
        <div className="w-full xl:w-5/12">
          <AboutSection />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  let portfolios: IPortfolio[] = [];

  try {
    const response = await api.get(`/portfolios?limit=3`);
    portfolios = response.data.portfolios;
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      portfolios,
    },
    revalidate: 10,
  };
}

export default TheHome;
