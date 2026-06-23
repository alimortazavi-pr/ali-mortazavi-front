import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { ArrowLeft, ArrowRight, ExportSquare, BackwardItem } from "iconsax-react";
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { singlePortfolioProps } from "@/common/types/portfolios.type";
import api from "@/common/api";
import NavBar from "@/components/layouts/NavBar";
import SEOHead from "@/components/seo/SEOHead";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { assetUrl } from "@/common/utils/image";
import { withSiteSettings } from "@/lib/withSiteSettings";

const SinglePortfolio: FC<singlePortfolioProps> = ({ portfolio }) => (
  <div>
    <SEOHead
      title={portfolio.title}
      description={portfolio.description?.slice(0, 160)}
      path={`/portfolios/${portfolio.slug}`}
    />
    <NavBar />

    <div className="py-6 md:py-10 space-y-6">
      <Reveal>
        <Link
          href="/portfolios"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-400 transition-colors"
        >
          <ArrowLeft size={16} />
          All Projects
        </Link>
      </Reveal>

      <Reveal delay={0.1}>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          freeMode
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="w-full h-[260px] md:h-[380px] portfolio-detail-swiper rounded-2xl overflow-hidden"
        >
          {portfolio.images?.map((img) => (
            <SwiperSlide key={img} className="rounded-2xl overflow-hidden relative">
              <Image
                src={assetUrl(img)}
                fill
                alt={portfolio.title}
                className="object-cover object-top"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="glass rounded-3xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
                {portfolio.title}
              </h1>
              {portfolio.startDate && (
                <p className="text-sm text-gray-500 mt-2 font-mono">
                  {portfolio.startDate}{portfolio.endDate ? ` — ${portfolio.endDate}` : " — Present"}
                </p>
              )}
            </div>
            <Link href={portfolio.link} target="_blank">
              <Button>
                <ExportSquare size={18} />
                Live Demo
              </Button>
            </Link>
          </div>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap mb-8">
            {portfolio.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-display">
                <BackwardItem size={20} className="text-violet-400" />
                Key Features
              </h2>
              <ul className="space-y-2.5">
                {portfolio.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm md:text-base">
                    <span className="text-violet-400 mt-1 shrink-0">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-4 font-display">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate max-w-[60%]">{portfolio.link}</span>
            <Link
              href={portfolio.link}
              target="_blank"
              className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
            >
              Visit Website
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
);

export async function getStaticPaths() {
  let portfolios: IPortfolio[] = [];
  try {
    const response = await api.get(`/portfolios`);
    portfolios = response.data.portfolios;
  } catch (error: unknown) {
    console.error("Failed to fetch portfolios:", error);
  }
  return {
    paths: portfolios.map((p) => ({ params: { slug: p.slug } })),
    fallback: "blocking",
  };
}

export const getStaticProps = withSiteSettings(async (context) => {
  let portfolio: IPortfolio | null = null;
  try {
    const response = await api.get(`/portfolios/${context.params?.slug}`);
    portfolio = response.data.portfolio;
  } catch (error: unknown) {
    console.error("Failed to fetch portfolio:", error);
  }
  if (!portfolio) return { notFound: true };
  return { props: { portfolio }, revalidate: 30 };
});

export default SinglePortfolio;
