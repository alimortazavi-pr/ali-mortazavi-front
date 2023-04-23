import type { FC } from "react";
import { Button } from "@chakra-ui/react";

//Tools
import { DocumentDownload } from "iconsax-react";
import axios from "axios";
import download from "downloadjs";

export const HeroSection: FC = () => {
  //Functions
  function downloadMyResume() {
    axios({
      url: "https://api.alimortazavi.org/my-resume/Ali-Mortazavi.pdf",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const content = response.headers["content-type"];
        download(response.data, "Ali-Mortazavi", content);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-neutral-900 w-full rounded-3xl p-5 xl:p-9 2xl:p-10">
        <p className="text-gray-100 text-3xl md:text-6xl lg:text-5xl xl:text-7xl 2xl:text-[80px] font-black">
          Convert your design to code with the highest quality
        </p>
        <div className="text-right mt-4">
          <Button colorScheme="violet" className="!rounded-full" h={"auto"}>
            <span className="!flex items-center gap-2 !py-2 md:!py-4">
              <span
                className="text-lg md:text-xl font-black"
                onClick={downloadMyResume}
              >
                My Resume
              </span>
              <DocumentDownload
                size="24"
                className="text-white"
                variant="Bold"
              />
            </span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 xl:flex-auto">
        <div className="col-span-12 md:col-span-4 lg:col-span-6 xl:col-span-4 h-32 md:h-40 lg:h-40 xl:h-full bg-teal-500 flex flex-col items-center justify-center rounded-2xl md:rounded-3xl ">
          <div className="text-gray-100 text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
            <span>2+</span>
          </div>
          <div className="text-sm md:text-lg lg:text-base xl:text-lg xl:mt-2 2xl:text-lg text-gray-100">
            <span>Years Experience</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 lg:col-span-6 xl:col-span-4 h-32 md:h-40 lg:h-40 xl:h-full bg-amber-400 flex flex-col items-center justify-center rounded-2xl md:rounded-3xl ">
          <div className="text-gray-800 text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
            <span>15+</span>
          </div>
          <div className="text-sm md:text-lg lg:text-base xl:text-lg xl:mt-2 2xl:text-lg text-gray-800">
            <span>Completed Fully Project</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 lg:col-span-12 xl:col-span-4 h-32 md:h-40 lg:h-40 xl:h-full bg-rose-400 flex flex-col items-center justify-center rounded-2xl md:rounded-3xl ">
          <div className="text-gray-100 text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
            <span>2K+</span>
          </div>
          <div className="text-sm md:text-lg lg:text-base xl:text-lg xl:mt-2 2xl:text-lg text-gray-100">
            <span>Social Media Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
