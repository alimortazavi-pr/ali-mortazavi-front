import { IPortfolio } from "../interfaces/portfolios.interface";

export type thePortfoliosProps = {
  portfolios: IPortfolio[];
  totalPages: number;
};

export type portfoliosSectionProps = {
  portfolios: IPortfolio[];
};

export type singlePortfolioProps = {
  portfolio: IPortfolio;
};
