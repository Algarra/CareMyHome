import { Currency } from "@/app/types/currencyExchanges";

export type Order = {
  client: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
  };
  amount: number;
  currency: Currency;
  date: number;
  confirmationDate: number | undefined;
  itemsList: {
    dates?: {
      startDate: Date | null;
      endDate: Date | null;
    };
    units?: number;
    persons?: number;
    productId: string;
  }[];
};

export type OrderPaymentApprovedDTO = {
  token: string;
};
