import type { FC, ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { StarsBackground } from "./animate-ui/backgrounds/stars";
import ClarityInit from "./layouts/ClarityInit";
import ScrollProgress from "./layouts/ScrollProgress";
import Footer from "./layouts/Footer";

const GlobalLayout: FC<{ children: ReactNode; showFooter?: boolean }> = ({
  children,
  showFooter = true,
}) => (
  <>
    <ScrollProgress />
    <div className="-z-50 h-[100dvh] w-screen fixed left-0 top-0 overflow-hidden">
      <StarsBackground className="w-full h-full" starColor="rgba(139, 92, 246, 0.6)" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/8 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] rounded-full bg-purple-600/5 blur-[80px]" />
    </div>
    <div className="relative z-10 p-3 md:p-5 lg:p-6 max-w-[1280px] mx-auto min-h-screen flex flex-col">
      <div className="flex-1">{children}</div>
      {showFooter && <Footer />}
    </div>
    <GoogleAnalytics gaId="G-NCCY0WFJ5R" />
    <ClarityInit />
  </>
);

export default GlobalLayout;
