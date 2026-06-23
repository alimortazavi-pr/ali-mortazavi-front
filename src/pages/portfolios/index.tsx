import type { FC } from "react";
import Link from "next/link";
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { thePortfoliosProps } from "@/common/types/portfolios.type";
import NavBar from "@/components/layouts/NavBar";
import SEOHead from "@/components/seo/SEOHead";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import PortfolioCard from "@/components/ui/PortfolioCard";
import { Button } from "@/components/ui/Button";
import { useSite } from "@/context/SiteContext";
import api from "@/common/api";
import { withSiteSettings } from "@/lib/withSiteSettings";

export const ThePortfolios: FC<thePortfoliosProps> = ({ portfolios }) => {
  const { pages } = useSite();
  const description = `${portfolios.length} projects — ${pages.portfolios.description}`;

  return (
  <div>
    <SEOHead
      title="Projects"
      description={description}
      path="/portfolios"
    />
    <NavBar />

    <PageHeader
      label={pages.portfolios.label}
      title={pages.portfolios.title}
      highlight={pages.portfolios.highlight}
      description={description}
    />

    {portfolios.length === 0 ? (
      <div className="glass rounded-3xl p-16 text-center mb-12">
        <p className="text-gray-500 mb-4">No projects yet.</p>
        <Link href="/">
          <Button variant="secondary">← Back to home</Button>
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-12">
        {portfolios.map((portfolio, i) => (
          <Reveal key={portfolio._id} delay={i * 0.05}>
            <PortfolioCard portfolio={portfolio} />
          </Reveal>
        ))}
      </div>
    )}
  </div>
  );
};

export const getStaticProps = withSiteSettings<thePortfoliosProps>(async () => {
  let portfolios: IPortfolio[] = [];
  try {
    const response = await api.get(`/portfolios`);
    portfolios = response.data.portfolios;
  } catch (error: unknown) {
    console.error("Failed to fetch portfolios:", error);
  }
  return { props: { portfolios, totalPages: 0 }, revalidate: 30 };
});

export default ThePortfolios;
