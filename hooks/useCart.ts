import { Product } from "@/lib/interfaces";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface CartStore {
  items: Product[];
  addItem: (
    data: Product,
    quantity: number,
    size: string,
    color: string,
    onClick?: () => void,
    hasToast?: boolean,
  ) => void;
  removeItem: (id: string, hasToast?: boolean) => void;
  removeAll: (hasToast?: boolean) => void;
  updateItem: (id: string, quantity: number) => void;
  checkedItem: (id: string, checked: boolean) => void;
  isLoading: boolean;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      isLoading: false,
      addItem: (
        data: Product,
        quantity,
        size,
        color,
        onClick?: () => void,
        hasToast = true,
      ) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === existingItem.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    size: size,
                    color: color,
                    checked: true,
                  }
                : item,
            ),
          });
          if (hasToast || onClick == null)
            return toast.success(
              "Product updated in cart.",
              onClick && {
                action: {
                  label: "Go to cart",
                  onClick: onClick,
                },
              },
            );
        }

        // set({ items: [...get().items, { ...data, quantity: 1 }] });
        set({
          items: [
            { ...data, quantity: quantity, checked: true },
            ...currentItems,
          ],
        });
        if (hasToast || onClick == null)
          return toast.success(
            "Add product success.",
            onClick && {
              action: {
                label: "Go to cart",
                onClick: onClick,
              },
            },
          );
      },
      removeItem: (id: string, hasToast = true) => {
        const currentItems = get().items;
        const tempItems = currentItems.find((item) => item.id === id);
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        if (hasToast)
          toast.success(`Product ${tempItems?.item_name} deleted from cart.`, {
            action: {
              label: tempItems ? "Undo" : "Go to Shop",
              onClick: () => {
                if (tempItems) {
                  set({ items: [...get().items, tempItems] });
                } else {
                  set({ items: [...currentItems] });
                }
              },
            },
          });
      },
      removeAll: (hasToast = true) => {
        const tempItems = get().items;
        set({ items: [] });
        if (hasToast)
          toast.success(`All product deleted from cart.`, {
            action: {
              label: "Undo",
              onClick: () => {
                if (tempItems) {
                  set({ items: [...tempItems] });
                }
              },
            },
            duration: 20000,
          });
      },
      updateItem: (id: string, quantity: number) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
      },
      checkedItem: (id: string, checked: boolean) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === existingItem.id
                ? { ...item, checked: checked }
                : item,
            ),
          });
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, checked: checked } : item,
            ),
          });
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
