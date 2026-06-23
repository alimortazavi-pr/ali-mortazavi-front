import api from "@/common/api";
import { ISiteSettings } from "@/common/interfaces/site-settings.interface";
import { DEFAULT_SITE_SETTINGS } from "@/common/data/default-site-settings";

export function mergeSettings(partial: Partial<ISiteSettings>): ISiteSettings {
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...partial,
    profile: { ...DEFAULT_SITE_SETTINGS.profile, ...partial.profile },
    social: { ...DEFAULT_SITE_SETTINGS.social, ...partial.social },
    hero: { ...DEFAULT_SITE_SETTINGS.hero, ...partial.hero },
    seo: { ...DEFAULT_SITE_SETTINGS.seo, ...partial.seo },
    cta: { ...DEFAULT_SITE_SETTINGS.cta, ...partial.cta },
    pages: {
      about: { ...DEFAULT_SITE_SETTINGS.pages.about, ...partial.pages?.about },
      contact: { ...DEFAULT_SITE_SETTINGS.pages.contact, ...partial.pages?.contact },
      portfolios: { ...DEFAULT_SITE_SETTINGS.pages.portfolios, ...partial.pages?.portfolios },
    },
    contactModal: { ...DEFAULT_SITE_SETTINGS.contactModal, ...partial.contactModal },
    stats: partial.stats ?? DEFAULT_SITE_SETTINGS.stats,
    techStack: partial.techStack ?? DEFAULT_SITE_SETTINGS.techStack,
    expertise: partial.expertise ?? DEFAULT_SITE_SETTINGS.expertise,
    experience: partial.experience ?? DEFAULT_SITE_SETTINGS.experience,
    aboutParagraphs: partial.aboutParagraphs ?? DEFAULT_SITE_SETTINGS.aboutParagraphs,
    resumePath: partial.resumePath ?? DEFAULT_SITE_SETTINGS.resumePath,
    footerTagline: partial.footerTagline ?? DEFAULT_SITE_SETTINGS.footerTagline,
  };
}

export async function fetchSiteSettings(): Promise<ISiteSettings> {
  try {
    const { data } = await api.get("/site-settings");
    return mergeSettings(data.settings as Partial<ISiteSettings>);
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
