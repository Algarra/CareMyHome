import { CountryCode } from "../components/atoms/countryFlag";

export enum UserColor {
  RED = "red",
  ORANGE = "orange",
  AMBER = "amber",
  YELLOW = "yellow",
  LIME = "lime",
  GREEN = "green",
  EMERALD = "emerald",
  TEAL = "teal",
  CYAN = "cyan",
  SKY = "sky",
  BLUE = "blue",
  INDIGO = "indigo",
  VIOLET = "violet",
  PURPLE = "purple",
  FUCHSIA = "fuchsia",
  PINK = "pink",
  ROSE = "rose",
}

export type User = {
  username: string;
  email: string;
  password?: string;
  loginMethod?: "google";
  description?: string;
  userColor: UserColor;
  extras?: string[];
  countryCode: CountryCode;
  image?: {
    blurHash: string;
    url: string;
  };
  createdAt?: number;
  updatedAt?: number;
};

export type UserCreation = {
  username: string;
  email: string;
  description?: string;
  extras?: string[];
  countryCode: CountryCode;
  image: {
    blurHash: string;
    url: string;
  };
  createdAt?: number;
  updatedAt?: number;
};
