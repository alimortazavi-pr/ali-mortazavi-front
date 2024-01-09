import type { FC, ReactNode } from "react";

//Components

//Tools

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="p-3 md:p-5 max-w-[1700px] mx-auto">
    <div>{children}</div>
  </div>
);

export default GlobalLayout;
