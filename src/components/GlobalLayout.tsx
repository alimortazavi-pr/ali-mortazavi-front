import type { FC, ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { StarsBackground } from "./animate-ui/backgrounds/stars";
import ClarityInit from "./layouts/ClarityInit";

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <div className="-z-50 h-[100dvh] w-screen fixed left-0 top-0">
      <StarsBackground className="w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
    </div>
    <div className="relative z-10 p-3 md:p-5 lg:p-6 max-w-[1400px] mx-auto min-h-screen">
      {children}
    </div>
    <GoogleAnalytics gaId="G-NCCY0WFJ5R" />
    <ClarityInit />
  </>
);

export default GlobalLayout;
