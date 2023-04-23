import { IPortfolio } from "../interfaces/portfolios.interface";

export type theHomeProps = {
  portfolios: IPortfolio[];
};

export type aboutMeModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export type contactMeModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
