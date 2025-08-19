import type { FC, ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

//Components
import { StarsBackground } from "./animate-ui/backgrounds/stars";
import ClarityInit from "./layouts/ClarityInit";

//Tools

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <div className="-z-50 h-[100dvh] w-screen fixed left-0 top-0">
      <StarsBackground className="w-full h-full" />
    </div>
    <div className="p-3 md:p-5 max-w-[1700px] mx-auto z-10">
      <div>{children}</div>
    </div>
    <GoogleAnalytics gaId="G-NCCY0WFJ5R" />
    <ClarityInit />
  </>
);

export default GlobalLayout;
