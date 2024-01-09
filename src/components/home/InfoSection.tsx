import type { FC } from "react";
import Image from "next/image";

//Assets
import AliMortazaviImg from "@/assets/images/ali-mortazavi.jpg";
import {
  GitHubSvg,
  InstagramSvg,
  LinkedinSvg,
  MySkillsSvg,
  TelegramSvg,
} from "@/components/layouts/TheSvgs";

export const InfoSection: FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-stretch gap-4 h-full">
      <div className="w-full h-[450px] md:h-auto md:w-6/12">
        <div className="relative h-full w-full">
          <Image
            src={AliMortazaviImg}
            fill
            alt=""
            className="object-cover object-top rounded-3xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-6/12">
        <div className="bg-neutral-900 w-full p-5 md:p-6 flex items-center justify-between rounded-3xl md:rounded-3xl">
          <div className="text-xl md:text-lg xl:text-xl text-gray-400">
            <span>Name:</span>
          </div>
          <div className="text-xl md:text-lg xl:text-xl font-bold text-gray-100">
            <span>Ali Mortazavi</span>
          </div>
        </div>
        <div className="bg-neutral-900 w-full px-5 md:px-6 py-4 md:py-5 rounded-3xl flex flex-col lg:flex-auto">
          <div className="">
            <div className="text-xl md:text-lg xl:text-xl text-gray-400">
              <span>Position:</span>
            </div>
            <div className="text-xl md:text-lg xl:text-xl font-bold text-gray-100 text-right">
              <span>Front-End Developer</span>
            </div>
          </div>
          <div className="mt-8 mb-3 lg:mt-0 lg:mb-0 xl:mt-8 xl:mb-3 flex justify-center items-center flex-auto">
            <MySkillsSvg />
          </div>
        </div>
        <div className="bg-neutral-900 w-full p-2 flex items-center justify-between 2xl:justify-around rounded-[1.7rem]">
          <a href={"https://www.linkedin.com/in/ali-mortazavi"} target="_blank">
            <LinkedinSvg
              className="w-16 h-16 md:w-14 md:h-14 xl:w-[70px] xl:h-[70px] rounded-full text-gray-500 hover:text-[#2867B2] duration-300"
              filled
            />
          </a>
          <a href={"https://github.com/alimortazavi-pr"} target="_blank">
            <GitHubSvg
              className="w-16 h-16 md:w-14 md:h-14 xl:w-[70px] xl:h-[70px] rounded-full text-gray-500 hover:text-white duration-300"
              filled
            />
          </a>
          <a
            href={"https://www.instagram.com/alimortazavi.dev"}
            target="_blank"
          >
            <InstagramSvg
              className="w-16 h-16 md:w-14 md:h-14 xl:w-[70px] xl:h-[70px] rounded-full text-gray-500 hover:text-[#B53798] duration-300"
              filled
            />
          </a>
          <a href={"https://t.me/alimortazavi_dev"} target="_blank">
            <TelegramSvg
              className="w-16 h-16 md:w-14 md:h-14 xl:w-[70px] xl:h-[70px] rounded-full text-gray-500 hover:text-[#00A6DB] duration-300"
              filled
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
