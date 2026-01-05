import React, { createContext, useState, ReactNode } from 'react';

export type OrderItem = {
  orderId: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
  purchasedAt: string;
};

type OrdersContextType = {
  orders: OrderItem[];
  addOrders: (items: OrderItem[]) => void;
  cancelOrder: (orderId: string) => void;
};

export const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  addOrders: () => {},
  cancelOrder: () => {},
});

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const addOrders = (items: OrderItem[]) => {
    setOrders(prev => [...items, ...prev]);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrders, cancelOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
