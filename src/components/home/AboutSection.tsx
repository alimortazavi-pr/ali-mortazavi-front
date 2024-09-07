import type { FC } from "react";

//Tools
import axios from "axios";
import download from 'downloadjs'

export const AboutSection: FC = () => {
  //Functions
  function downloadMyResume() {
    axios({
      url: "https://pbudget.liara.run/my-resume/Ali-Mortazavi.pdf",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const content = response.headers['content-type'];
        download(response.data, 'Ali-Mortazavi', content)
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
          I am Ali Mortazavi. I am a front-end specialist and a MERN Stack
          Developer. I started programming when I was 13 years old and I have
          much experience I have finished many projects. I am very interested in
          learning new technologies and I always like to keep myself updated I
          try my best to do my projects in the best possible way.
        </p>
        <p>
          My Skills: Html/CSS, JavaScript, ReactJS, NextJS, Redux, TailWindCSS,
          BootStrap, NodeJS, ExpressJS, NestJS, MongoDB, PostgreSQL and other UI
          Components.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
