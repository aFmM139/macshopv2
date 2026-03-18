import React, { createContext, useContext, useState } from "react";
import { CartItem } from "@/components/Pasarela/CartSummary";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  setItems: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  setItems: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === newItem.id);
      if (exists) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, newItem];
    });
  };

  return (
    <CartContext.Provider value={{ items, addItem, setItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);