import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";

//Types
import { aboutMeModalProps } from "@/common/types/layouts.type";

//Tools
import { DocumentDownload } from "iconsax-react";
import axios from "axios";
import download from "downloadjs";

const AboutMeModal: FC<aboutMeModalProps> = ({ isOpen, onOpen, onClose }) => {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={"100%"} maxWidth={"650px"} rounded={"2xl"}>
        <ModalCloseButton />
        <ModalHeader>
          <span className="text-gray-800 dark:text-white xl:text-2xl">
            About Me
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="text-sm text-gray-400 md:text-base xl:text-lg 2xl:text-xl">
            <p className="mb-2">
              I am Ali Mortazavi. I am a front-end specialist and a MERN Stack
              Developer. I started programming when I was 13 years old and I
              have much experience I have finished many projects. I am very
              interested in learning new technologies and I always like to keep
              myself updated I try my best to do my projects in the best
              possible way.
            </p>
            <p>
              My Skills: Html/CSS, JavaScript, ReactJS, NextJS, Redux,
              TailWindCSS, BootStrap, NodeJS, ExpressJS, NestJS, MongoDB,
              PostgreSQL and other UI Components.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="pb-3">
            <Button colorScheme="violet" className="!rounded-full" h={"auto"}>
              <span className="!flex items-center gap-2 !py-2 md:!py-3">
                <span
                  className="text-lg md:text-lg font-black"
                  onClick={downloadMyResume}
                >
                  My Resume
                </span>
                <DocumentDownload
                  size="20"
                  className="text-white"
                  variant="Bold"
                />
              </span>
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AboutMeModal;
