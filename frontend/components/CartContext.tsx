import React, { createContext, ReactNode, useContext, useState } from "react";

interface Caipirinha {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  caipirinha: Caipirinha;
  quantity: number;
}

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (caipirinha: Caipirinha, quantity: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalValue: () => number;
}

const CartContext = createContext<CartContextData | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (caipirinha: Caipirinha, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.caipirinha.id === caipirinha.id
      );

      if (existingItemIndex >= 0) {
        // Se já existe, atualiza a quantidade
        const newCart = [...prevItems];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        };
        return newCart;
      } else {
        // Se não existe, adiciona novo item
        return [...prevItems, { caipirinha, quantity }];
      }
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }

    const newCart = [...cartItems];
    newCart[index].quantity = quantity;
    setCartItems(newCart);
  };

  const removeFromCart = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalValue = () => {
    return cartItems.reduce(
      (total, item) => total + item.caipirinha.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
