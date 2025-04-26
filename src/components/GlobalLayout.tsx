import type { FC, ReactNode } from "react";
import { StarsBackground } from "./animate-ui/backgrounds/stars";

//Components

//Tools

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <div className="-z-50 h-[100dvh] w-screen fixed left-0 top-0">
    <StarsBackground className="w-full h-full" />
    </div>
    <div className="p-3 md:p-5 max-w-[1700px] mx-auto z-10">
      <div>{children}</div>
    </div>
  </>
);

export default GlobalLayout;
