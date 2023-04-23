import { FC, MouseEvent, useEffect } from "react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

//Components
import AboutMeModal from "./AboutMeModal";
import ContactMeModal from "./ContactMeModal";

//Tools
import {
  Call,
  DocumentText,
  ForwardItem,
  HambergerMenu,
  Home,
  InfoCircle,
} from "iconsax-react";
import axios from "axios";
import download from "downloadjs";

export const NavBar: FC = () => {
  //ChakraUI
  const {
    isOpen: isOpenAboutMe,
    onOpen: onOpenAboutMe,
    onClose: onCloseAboutMe,
  } = useDisclosure();
  const {
    isOpen: isOpenContactMe,
    onOpen: onOpenContactMe,
    onClose: onCloseContactMe,
  } = useDisclosure();

  //States
  const [menuHeight, setMenuHeight] = useState<number>(0);
  const [menuIsOpening, setMenuIsOpening] = useState<boolean>(true);

  //Refs
  const menuRef = useRef<HTMLUListElement>(null);
  const hambegerMenuRef = useRef<HTMLDivElement>(null);

  //Hooks
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hambegerMenuRef.current &&
        !hambegerMenuRef.current.contains(event.target)
      ) {
        toggleMenu();
      }
    }
    if (!menuIsOpening) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [menuRef, menuIsOpening]);

  //Functions
  function downloadMyResume() {
    axios({
      url: "http://localhost:7770/my-resume/Ali-Mortazavi.pdf",
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

  function toggleMenu() {
    let currentHeight = menuRef.current?.clientHeight as number;
    setMenuIsOpening(!menuIsOpening);
    window.clearInterval((window as any).setHeightInterval);
    (window as any).setHeightInterval = setInterval(() => {
      if (menuIsOpening) {
        setMenuHeight(currentHeight + 2);
        currentHeight += 2;
      } else {
        setMenuHeight(currentHeight - 2);
        currentHeight -= 2;
      }
      if (
        (currentHeight >= 270 && menuIsOpening) ||
        (currentHeight <= 0 && !menuIsOpening)
      ) {
        window.clearInterval((window as any).setHeightInterval);
      }
    }, 1);
  }

  return (
    <nav className="w-full bg-neutral-900 rounded-2xl lg:rounded-[1.8rem] relative">
      <div className="flex items-center justify-between p-4 lg:p-6 pr-[13px] lg:pr-[13px]">
        <div className="font-bold text-lg lg:text-xl xl:text-2xl">
          <span className="text-gray-400">Ali</span>
          <span className="text-gray-100">Mortazavi</span>
        </div>
        <div
          className="text-gray-200 hover:bg-gray-600 hover:bg-opacity-30 flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer duration-300"
          onClick={toggleMenu}
          ref={hambegerMenuRef}
        >
          <HambergerMenu size="24" />
        </div>
      </div>
      <ul
        ref={menuRef}
        style={{ maxHeight: `${menuHeight}px` }}
        className={`z-20 w-full lg:w-7/12 xl:w-4/12 lg:absolute border-t py-1 lg:py-3 px-2 lg:px-3 border-gray-700 lg:bg-neutral-900 lg:border lg:border-gray-600 lg:rounded-3xl lg:mt-0 right-7 top-14 overflow-y-hidden ${
          menuHeight <= 0 ? "hidden" : "block"
        }`}
      >
        <li className="w-full">
          <Link
            href={"/"}
            className="flex items-center justify-between my-1 duration-300 py-3 px-2 lg:px-3 hover:bg-gray-600 hover:bg-opacity-30 rounded-xl"
          >
            <div className="text-gray-200 text-sm">
              <span>Home</span>
            </div>
            <div className="text-gray-200">
              <Home size={"18"} />
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href={"/portfolios"}
            className="flex items-center justify-between my-1 duration-300 py-3 px-2 lg:px-3 hover:bg-gray-600 hover:bg-opacity-30 rounded-xl"
          >
            <div className="text-gray-200 text-sm">
              <span>Portfolios</span>
            </div>
            <div className="text-gray-200">
              <ForwardItem size={"18"} />
            </div>
          </Link>
        </li>
        <li className="w-full">
          <span
            className="cursor-pointer flex items-center justify-between my-1 duration-300 py-3 px-2 lg:px-3 hover:bg-gray-600 hover:bg-opacity-30 rounded-xl"
            onClick={downloadMyResume}
          >
            <div className="text-gray-200 text-sm">
              <span>My Resume</span>
            </div>
            <div className="text-gray-200">
              <DocumentText size={"18"} />
            </div>
          </span>
        </li>
        <li className="w-full">
          <span
            className="cursor-pointer flex items-center justify-between my-1 duration-300 py-3 px-2 lg:px-3 hover:bg-gray-600 hover:bg-opacity-30 rounded-xl"
            onClick={onOpenContactMe}
          >
            <div className="text-gray-200 text-sm">
              <span>Contact Me</span>
            </div>
            <div className="text-gray-200">
              <Call size={"18"} />
            </div>
          </span>
        </li>
        <li className="w-full">
          <span
            className="cursor-pointer flex items-center justify-between my-1 duration-300 py-3 px-2 lg:px-3 hover:bg-gray-600 hover:bg-opacity-30 rounded-xl"
            onClick={onOpenAboutMe}
          >
            <div className="text-gray-200 text-sm">
              <span>About Me</span>
            </div>
            <div className="text-gray-200">
              <InfoCircle size={"18"} />
            </div>
          </span>
        </li>
      </ul>
      <AboutMeModal
        isOpen={isOpenAboutMe}
        onClose={onCloseAboutMe}
        onOpen={onOpenAboutMe}
      />
      <ContactMeModal
        isOpen={isOpenContactMe}
        onClose={onCloseContactMe}
        onOpen={onOpenContactMe}
      />
    </nav>
  );
};

export default NavBar;
