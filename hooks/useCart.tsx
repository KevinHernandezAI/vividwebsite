'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '@/lib/types';

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'vivid-cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setItems(JSON.parse(saved) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.productId === item.productId && entry.size === item.size);
      if (existing) {
        return current.map((entry) =>
          entry.productId === item.productId && entry.size === item.size
            ? { ...entry, quantity: entry.quantity + item.quantity }
            : entry
        );
      }
      return [...current, item];
    });
  };

  const removeItem = (productId: string, size: string) => {
    setItems((current) => current.filter((entry) => !(entry.productId === productId && entry.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    setItems((current) =>
      current
        .map((entry) =>
          entry.productId === productId && entry.size === size ? { ...entry, quantity: Math.max(1, quantity) } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
