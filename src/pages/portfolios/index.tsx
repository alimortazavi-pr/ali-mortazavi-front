import Head from "next/head";
import type { FC } from "react";

//Types
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { thePortfoliosProps } from "@/common/types/portfolios.type";

//Components
import NavBar from "@/components/layouts/NavBar";

//Tools
import api from "@/common/api";
import Link from "next/link";
import Image from "next/image";

export const ThePortfolios: FC<thePortfoliosProps> = ({
  portfolios,
  totalPages,
}) => {
  return (
    <div>
      <Head>
        <title>Ali Mortazavi | Portfolios</title>
      </Head>
      <div className="mb-4">
        <NavBar />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {portfolios.map((portfolio) => (
          <Link
            href={`/portfolios/${portfolio.slug}`}
            key={portfolio._id}
            className="col-span-12 md:col-span-6 xl:col-span-4 h-[300px] relative rounded-2xl bg-neutral-900"
          >
            <Image
              alt=""
              src={`https://alimor.liara.run${portfolio.images[0]}`}
              fill
              className="object-contain lg:object-cover object-center rounded-2xl"
            />
            <div className="z-10 duration-300 absolute rounded-2xl bg-neutral-900 bg-opacity-30 w-full h-full flex items-end justify-start p-4">
              <div>
                <div className="text-xl md:text-2xl text-gray-100 font-bold">
                  <span>{portfolio.title}</span>
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  <span>{portfolio.description.slice(0, 200)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  let portfolios: IPortfolio[] = [];
  let totalPages: number = 0;

  try {
    const response = await api.get(`/portfolios`);
    portfolios = response.data.portfolios;
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return {
    props: {
      portfolios,
      totalPages,
    },
    revalidate: 10,
  };
}

export default ThePortfolios;
