import type { FC } from "react";

//Tools
import axios from "axios";
import download from "downloadjs";

export const AboutSection: FC = () => {
  //Functions
  function downloadMyResume() {
    axios({
      url: "https://alimor.liara.run/my-resume/Ali-Mortazavi.pdf",
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
    <div className="bg-neutral-900 w-full p-5 md:p-6 rounded-3xl h-full">
      <div className="mb-3 xl:mb-4 2xl:mb-5 flex items-center justify-between">
        <div className="text-gray-100 text-2xl font-black md:text-3xl 2xl:text-4xl">
          <span>About</span>
        </div>
        <div className="text-gray-400 text-lg md:text-2xl 2xl:text-3xl cursor-pointer">
          <span onClick={downloadMyResume}>Resume</span>
        </div>
      </div>
      <div className="text-sm text-gray-400 md:text-base xl:text-lg 2xl:text-2xl">
        <p className="mb-2">
          My name is Ali Mortazavi, and I am a Front-End Specialist and MERN
          Stack Developer. I began programming at the age of 13, and since then,
          I have gained extensive experience, completing numerous projects
          across different fields. I am passionate about learning new
          technologies and continuously updating my skills. I always strive to
          deliver the highest quality in every project I undertake.
        </p>
        <p>
          My Skills: Html/CSS, JavaScript, ReactJS, NextJS, Redux, TailWindCSS,
          BootStrap, NodeJS, ExpressJS, NestJS, MongoDB, PostgreSQL, gRPC and other UI
          Components.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
