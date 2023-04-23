import type { FC, ReactNode } from "react";

//Components

//Tools

const GlobalLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="p-3 md:p-5">
    <div>{children}</div>
  </div>
);

export default GlobalLayout;
