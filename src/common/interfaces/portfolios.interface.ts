export interface IPortfolio {
  _id: string;
  title: string;
  slug: string;
  description: string;
  link: string;
  features: string[];
  skills: string[];
  images: string[];
  startDate?: string;
  endDate?: string;
  deleted: boolean;
  createdAt: string;
  updatedAt?: string;
}
