import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { ArrowRight, BackwardItem, ExportSquare, JavaScript } from "iconsax-react";
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { singlePortfolioProps } from "@/common/types/portfolios.type";
import api from "@/common/api";
import NavBar from "@/components/layouts/NavBar";
import { assetUrl } from "@/common/utils/image";
import { SITE } from "@/common/constants";

const SinglePortfolio: FC<singlePortfolioProps> = ({ portfolio }) => (
  <div>
    <Head>
      <title>{SITE.name} | {portfolio.title}</title>
    </Head>
    <NavBar />

    <div className="mt-6 flex flex-col gap-5">
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        freeMode
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="w-full h-[250px] md:h-[350px] portfolio-swiper"
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

      <div className="glass rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
          {portfolio.title}
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap mb-6">
          {portfolio.description}
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <BackwardItem size={20} className="text-violet-400" />
            Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {portfolio.features?.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-400 text-sm md:text-base">
                <span className="text-violet-400 mt-1.5">▸</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <JavaScript size={20} className="text-violet-400" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {portfolio.skills?.map((skill, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-gray-500 text-sm truncate">{portfolio.link}</span>
          <Link
            href={portfolio.link}
            target="_blank"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            <ExportSquare size={18} />
            View Live Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let portfolio: IPortfolio | null = null;
  try {
    const response = await api.get(`/portfolios/${params?.slug}`);
    portfolio = response.data.portfolio;
  } catch (error: unknown) {
    console.error("Failed to fetch portfolio:", error);
  }
  if (!portfolio) return { notFound: true };
  return { props: { portfolio }, revalidate: 10 };
};

export default SinglePortfolio;
