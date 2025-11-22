import { create } from "zustand";
import { be_service } from "../utils/Fixtures";
import { User } from "../types/user";
import { CurrencyExchanges } from "../types/currencyExchanges";
import type { WithId } from "mongodb";

export const useUserStore = create<{
  user?: WithId<User>;
  userLoading: boolean;
  currencySelected: keyof CurrencyExchanges;
  currenciesExchanges: CurrencyExchanges | undefined;
  getUser: () => void;
  removeUser: () => void;
  setUser: (newUser: WithId<User>) => void;
  setCurrencySelected: (currencySelected: keyof CurrencyExchanges) => void;
  getCurrentExchanges: () => void;
}>((set, get) => ({
  user: undefined,
  currenciesExchanges: undefined,
  currencySelected: "USD",
  userLoading: false,
  setUser: async (newUser) => {
    set({ user: newUser });
  },
  getUser: async () => {
    if (!get().user) {
      set({ userLoading: true });

      const user = await fetch(`/api/me`, {
        credentials: "include",
      })
        .then((resp) => {
          return resp.json();
        })
        .catch(() => {
          return { error: "Internal server error" };
        });
      if (user.error) {
        window.localStorage.removeItem("existingUser");
        set({ user: undefined });
      } else {
        window.localStorage.setItem("existingUser", "true");
        set({ user });
      }
      set({ userLoading: false });
    }
  },
  removeUser: () => {
    set({ userLoading: true });
    set({ user: undefined });
    window.localStorage.removeItem("existingUser");
    set({ userLoading: false });
  },
  setCurrencySelected: (currencySelected) => {
    set({ currencySelected });
  },
  getCurrentExchanges: async () => {
    fetch(`${be_service}/stripe/exchange-data`)
      .then(async (res) => {
        const currenciesExchanges: CurrencyExchanges = await res.json();
        set({ currenciesExchanges });
      })
      .catch(() => {
        set({ currenciesExchanges: undefined });
      });
  },
}));
