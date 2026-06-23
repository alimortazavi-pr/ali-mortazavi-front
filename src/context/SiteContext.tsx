import { createContext, useContext, FC, ReactNode } from "react";
import { ISiteSettings } from "@/common/interfaces/site-settings.interface";
import { DEFAULT_SITE_SETTINGS } from "@/common/data/default-site-settings";
import { ASSETS_BASE_URL } from "@/common/constants";

const SiteContext = createContext<ISiteSettings>(DEFAULT_SITE_SETTINGS);

export const SiteProvider: FC<{
  settings?: ISiteSettings;
  children: ReactNode;
}> = ({ settings, children }) => (
  <SiteContext.Provider value={settings ?? DEFAULT_SITE_SETTINGS}>
    {children}
  </SiteContext.Provider>
);

export function useSite() {
  return useContext(SiteContext);
}

export function useResumeUrl() {
  const site = useSite();
  return `${ASSETS_BASE_URL}${site.resumePath}`;
}

export default SiteContext;
