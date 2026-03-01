import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load from localStorage first
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("siddhu_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("siddhu_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const safeProduct = {
      ...product,
      price: Number(product.price) || 0,
      originalPrice: Number(product.originalPrice) || 0,
      quantity: Number(product.quantity) || 1,
    };

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === safeProduct.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === safeProduct.id
            ? { ...item, quantity: item.quantity + safeProduct.quantity }
            : item,
        );
      }

      return [...prev, safeProduct];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

 const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
  );
};

  // ================= CLEAR CART =================

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("siddhu_cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
