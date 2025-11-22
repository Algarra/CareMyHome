import { TranslationT } from ".";

export enum LocationType {
  NATURE = "nature",
  HOUSE = "house",
  FOOD = "food",
  WORK = "work",
  ENTERTAINMENT = "entertainment",
  STORE = "store",
  USER = "user",
  COFEE = "coffee",
  HOST = "host",
}

export const getMapLocationTypes = (t: TranslationT) => [
  {
    label: "test",
    key: LocationType.ENTERTAINMENT,
  },
];
