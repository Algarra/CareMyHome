import { create } from "zustand";

type CartItem = {
  product: { _id?: string };
  units: number;
}; // Replace with the actual type of your cart items

export const useCartStore = create<{
  clickBlock: boolean;
  productPrices: { [id: string]: number };
  items: CartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  updateItemPersons: (persons: number, itemIndex: number) => void;
  addProduct: (item: CartItem) => void;
  removeItemByIndex: (itemIndex: number) => void;
  setItemsFromLocalStorage: (items: CartItem[]) => void;
  setClickBlock: (block: boolean) => void;
}>((set, get) => ({
  clickBlock: false,
  productPrices: {},
  items: [],
  open: false,
  setClickBlock: (clickBlock: boolean) => set({ clickBlock }),
  setOpen: (open) => set({ open }),
  addProduct: (item) => {
    const newItems = [...get().items];
    let itemReplaced = false;
    let newMapedItems = newItems.map((existingItem) => {
      if (
        existingItem.product._id?.toString() === item.product._id?.toString()
      ) {
        itemReplaced = true;
        return item;
      } else {
        return existingItem;
      }
    });
    if (!itemReplaced) newMapedItems = [...newMapedItems, { ...item }];
    set({ items: newMapedItems });
    localStorage.setItem("CART_ITEMS", JSON.stringify(newMapedItems));
  },
  updateItemPersons: (persons, index) => {
    const newItems = get().items.map((item, mapIndex) => {
      if (index === mapIndex) {
        return { ...item, persons };
      } else return item;
    });
    set({ items: newItems });
    localStorage.setItem("CART_ITEMS", JSON.stringify(newItems));
  },
  removeItemByIndex: (itemIndex) => {
    const newItems = [...get().items];
    newItems.splice(itemIndex, itemIndex + 1);
    set({ items: newItems });
    localStorage.setItem("CART_ITEMS", JSON.stringify(newItems));
  },
  setItemsFromLocalStorage: (items) => {
    set({ items: [...items] });
  },
}));
