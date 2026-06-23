import type { FC } from "react";

import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import NavBar from "@/components/layouts/NavBar";
import HeroSection from "@/components/home/HeroSection";
import TechMarquee from "@/components/home/TechMarquee";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import PortfoliosSection from "@/components/home/PortfoliosSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import CTASection from "@/components/home/CTASection";
import SEOHead from "@/components/seo/SEOHead";
import api from "@/common/api";
import { theHomeProps } from "@/common/types/layouts.type";
import { withSiteSettings } from "@/lib/withSiteSettings";

export const TheHome: FC<theHomeProps> = ({ portfolios }) => (
  <div className="w-full">
    <SEOHead />
    <NavBar />
    <HeroSection />
    <TechMarquee />
    <div className="space-y-16 md:space-y-24 py-8 md:py-12">
      <ExpertiseSection />
      <PortfoliosSection portfolios={portfolios} />
      <ExperienceSection />
      <CTASection />
    </div>
  </div>
);

export const getStaticProps = withSiteSettings<theHomeProps>(async () => {
  let portfolios: IPortfolio[] = [];
  try {
    const response = await api.get(`/portfolios?limit=3`);
    portfolios = response.data.portfolios;
  } catch (error: unknown) {
    console.error("Failed to fetch portfolios:", error);
  }
  return { props: { portfolios }, revalidate: 30 };
});

export default TheHome;
