import React, { createContext, ReactNode, useState, useContext } from "react";
import { DEMO_PRODUCTS } from "../data/demoProducts";

export type Product = {
  id: number;
  storeId: number;
  name: string;
  price: number;
  stock: number;
  image: any;
};

type ProductContextType = {
  products: Product[];
  decreaseStock: (productId: number, amount: number) => void;
  increaseStock: (productId: number, amount: number) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  decreaseStock: () => {},
  increaseStock: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);

  const decreaseStock = (productId: number, amount: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, stock: Math.max(0, p.stock - amount) }
          : p
      )
    );
  };

  const increaseStock = (productId: number, amount: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, stock: p.stock + amount }
          : p
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, decreaseStock, increaseStock }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
