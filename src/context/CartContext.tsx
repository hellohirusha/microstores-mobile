import React, { createContext, useState, ReactNode, useContext } from "react";
import { ProductContext } from "./ProductContext";

type CartItem = {
  id: number;
  storeId: number;
  name: string;
  price: number;
  stock: number;
  image: any;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { decreaseStock, increaseStock } = useContext(ProductContext);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      decreaseStock(item.id, item.quantity); // decrease stock immediately
      if (existing) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const removedItem = prev.find(p => p.id === productId);
      if (removedItem) {
        increaseStock(productId, removedItem.quantity); // restore stock
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const clearCart = () => {
    cart.forEach(item => increaseStock(item.id, item.quantity)); // restore stock for all items
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
