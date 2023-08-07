import React, { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

//Types
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { singlePortfolioProps } from "@/common/types/portfolios.type";

//Tools
import api from "@/common/api";
import NavBar from "@/components/layouts/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { ArrowRight, BackwardItem, JavaScript } from "iconsax-react";

const SinglePortfolio: FC<singlePortfolioProps> = ({ portfolio }) => {
  return (
    <div>
      <Head>
        <title>Ali Mortazavi | {portfolio.title}</title>
      </Head>
      <div className="mb-4">
        <NavBar />
      </div>
      <div className="flex flex-col gap-4">
        <div className="lg:hidden">
          <Swiper
            pagination={true}
            spaceBetween={10}
            direction={"vertical"}
            modules={[Pagination]}
            className="w-full h-[250px] md:h-[400px]"
          >
            {portfolio.images?.map((img) => (
              <SwiperSlide key={img} className="rounded-xl relative">
                <Image
                  src={`https://ali-mortazavi.cyclic.app${img}`}
                  fill
                  alt=""
                  className="object-cover rounded-xl object-top"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden lg:block">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="w-full h-[300px] 2xl:h-[400px]"
          >
            {portfolio.images?.map((img) => (
              <SwiperSlide key={img} className="rounded-xl relative">
                <Image
                  src={`https://ali-mortazavi.cyclic.app${img}`}
                  fill
                  alt=""
                  className="object-cover rounded-xl object-top"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full p-5 bg-neutral-900 rounded-xl">
          <div className="text-gray-100 text-2xl md:text-3xl xl:text-4xl font-bold mb-2">
            <span>{portfolio.title}</span>
          </div>
          <div className="text-gray-300 text-base md:text-lg xl:text-xl mb-4">
            <span>{portfolio.description}</span>
          </div>
          <div className="mb-3 md:mb-5">
            <div className="text-gray-100 font-bold text-xl md:text-2xl xl:text-3xl mb-2 flex items-center gap-1">
              <BackwardItem className="w-5 h-5 md:w-6 md:h-6" />
              <span>Features:</span>
            </div>
            <ul className="list-inside list-disc">
              {portfolio.features?.map((feature, i) => (
                <li key={i} className="mb-2 text-gray-300 text-sm md:text-base xl:text-lg">
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div className="text-gray-100 font-bold text-xl md:text-2xl xl:text-3xl mb-2 flex items-center gap-1">
              <JavaScript className="w-5 h-5 md:w-6 md:h-6" />
              <span>Skills:</span>
            </div>
            <ul className="list-inside list-disc flex flex-wrap gap-2">
              {portfolio.skills?.map((skill, i) => (
                <li key={i} className="mb-2 text-gray-300 text-sm md:text-base xl:text-lg">
                  <span className="relative -left-[9px]">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <hr className="my-3 md:my-5" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-gray-200 font-semibold mb-2 text-lg md:text-xl xl:text-2xl">
              <span>{portfolio.link}</span>
            </div>
            <div className="text-lg md:text-xl xl:text-2xl flex items-center gap-1 text-blue-400 place-self-end md:place-self-auto">
              <Link href={portfolio.link}>View Website</Link>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  let portfolios: IPortfolio[] = [];

  try {
    const response = await api.get(`/portfolios`);
    portfolios = response.data.portfolios;
  } catch (error: any) {
    console.log(error.response?.data);
  }

  const paths = portfolios.map((portfolio) => ({
    params: { slug: portfolio.slug },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let portfolio: IPortfolio | object = {};

  try {
    const response = await api.get(`/portfolios/${params?.slug}`);
    portfolio = response.data.portfolio;
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      portfolio,
    },
    revalidate: 10,
  };
};

export default SinglePortfolio;
