export interface IProfileSettings {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
}

export interface ISocialSettings {
  linkedin: string;
  github: string;
  telegram: string;
  npm: string;
  instagram: string;
}

export interface IHeroSettings {
  badgeText: string;
  line1: string;
  highlight: string;
  line2Prefix: string;
  rotatingWords: string[];
  description: string;
}

export interface IStatItem {
  value: string;
  label: string;
  accent: string;
}

export interface IExpertiseItem {
  title: string;
  description: string;
  icon: string;
}

export interface IExperienceItem {
  year: string;
  title: string;
  role: string;
  description: string;
}

export interface ISeoSettings {
  defaultDescription: string;
  siteUrl: string;
}

export interface ICtaSettings {
  title: string;
  highlight: string;
  description: string;
}

export interface IPageHeaderSettings {
  label: string;
  title: string;
  highlight: string;
  description: string;
}

export interface IPagesSettings {
  about: IPageHeaderSettings;
  contact: IPageHeaderSettings;
  portfolios: IPageHeaderSettings;
}

export interface IContactModalSettings {
  title: string;
  subtitle: string;
}

export interface ISiteSettings {
  profile: IProfileSettings;
  social: ISocialSettings;
  hero: IHeroSettings;
  stats: IStatItem[];
  techStack: string[];
  expertise: IExpertiseItem[];
  experience: IExperienceItem[];
  seo: ISeoSettings;
  cta: ICtaSettings;
  resumePath: string;
  footerTagline: string;
  aboutParagraphs: string[];
  pages: IPagesSettings;
  contactModal: IContactModalSettings;
}
