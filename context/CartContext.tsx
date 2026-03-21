/// CartContext.tsx

"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartSubTotal: number;
  cartTaxes: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(p => p._id === product._id);
      if (existing) {
        return prev.map(p =>
          p._id === product._id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(p => p._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(p => (p._id === id ? { ...p, quantity } : p)));
  };

  const cartSubTotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const cartTaxes = cartSubTotal * 0.1;
  const cartTotal = cartSubTotal + cartTaxes;

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartSubTotal, cartTaxes, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartStore() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartStore must be used within a CartProvider");
  return context;
}