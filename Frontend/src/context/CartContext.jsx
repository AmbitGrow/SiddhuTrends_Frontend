import React, { createContext, useContext, useState, useEffect } from "react";
import CartService from "../services/CartService";
import { useAuth } from "./AuthContext";
import { normalizeProduct } from "../services/ProductService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    gstAmount: 0,
    deliveryCharge: 0,
    totalAmount: 0,
    itemCount: 0,
    totalQuantity: 0
  });

  const formatCartItems = (items) => {
    return (items || []).map(item => ({
      ...item,
      product: normalizeProduct(item.product)
    }));
  };

  const syncGuestCart = async (localItems) => {
    if (localItems.length === 0) {
      setCartItems([]);
      setTotals({
        subtotal: 0,
        gstAmount: 0,
        deliveryCharge: 0,
        totalAmount: 0,
        itemCount: 0,
        totalQuantity: 0
      });
      return;
    }
    try {
      const res = await CartService.getCartQuote(localItems);
      setCartItems(formatCartItems(res.cart));
      setTotals(res.totals);
      // Sync back to local storage in case quantities were capped by stock limits
      const updatedLocal = (res.cart || []).map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }));
      localStorage.setItem("siddhu_cart", JSON.stringify(updatedLocal));
    } catch (err) {
      console.error("Error syncing guest cart quote:", err);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    const initCart = async () => {
      if (user) {
        try {
          const savedLocal = localStorage.getItem("siddhu_cart");
          const localItems = savedLocal ? JSON.parse(savedLocal) : [];
          
          if (localItems.length > 0) {
            const res = await CartService.mergeCart(localItems);
            setCartItems(formatCartItems(res.cart));
            setTotals(res.totals);
            localStorage.removeItem("siddhu_cart");
          } else {
            const res = await CartService.getCart();
            setCartItems(formatCartItems(res.cart));
            setTotals(res.totals);
          }
        } catch (err) {
          console.error("Error initializing authenticated cart:", err);
        }
      } else {
        const savedLocal = localStorage.getItem("siddhu_cart");
        const localItems = savedLocal ? JSON.parse(savedLocal) : [];
        await syncGuestCart(localItems);
      }
    };

    initCart();
  }, [user, authLoading]);

  const addToCart = async (product, qty = 1) => {
    const productId = product._id || product.id;
    if (!productId) return;

    if (user) {
      try {
        const res = await CartService.addToCart(productId, qty);
        setCartItems(formatCartItems(res.cart));
        setTotals(res.totals);
      } catch (err) {
        console.error("Error adding to authenticated cart:", err);
      }
    } else {
      const savedLocal = localStorage.getItem("siddhu_cart");
      let localItems = savedLocal ? JSON.parse(savedLocal) : [];
      const existing = localItems.find(item => item.productId === productId);
      if (existing) {
        existing.quantity += qty;
      } else {
        localItems.push({ productId, quantity: qty });
      }
      localStorage.setItem("siddhu_cart", JSON.stringify(localItems));
      await syncGuestCart(localItems);
    }
  };

  const updateQuantity = async (productId, qty) => {
    if (user) {
      try {
        const res = await CartService.updateQuantity(productId, qty);
        setCartItems(formatCartItems(res.cart));
        setTotals(res.totals);
      } catch (err) {
        console.error("Error updating authenticated cart quantity:", err);
      }
    } else {
      const savedLocal = localStorage.getItem("siddhu_cart");
      let localItems = savedLocal ? JSON.parse(savedLocal) : [];
      const target = localItems.find(item => item.productId === productId);
      if (target) {
        target.quantity = qty;
        localStorage.setItem("siddhu_cart", JSON.stringify(localItems));
        await syncGuestCart(localItems);
      }
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cartItems.find(i => i.product._id === productId);
    if (!item) return;
    await updateQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = async (productId) => {
    const item = cartItems.find(i => i.product._id === productId);
    if (!item) return;
    const newQty = item.quantity - 1;
    if (newQty < 1) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, newQty);
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const res = await CartService.removeFromCart(productId);
        setCartItems(formatCartItems(res.cart));
        setTotals(res.totals);
      } catch (err) {
        console.error("Error removing from authenticated cart:", err);
      }
    } else {
      const savedLocal = localStorage.getItem("siddhu_cart");
      let localItems = savedLocal ? JSON.parse(savedLocal) : [];
      localItems = localItems.filter(item => item.productId !== productId);
      localStorage.setItem("siddhu_cart", JSON.stringify(localItems));
      await syncGuestCart(localItems);
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const res = await CartService.clearCart();
        setCartItems([]);
        setTotals(res.totals);
      } catch (err) {
        console.error("Error clearing authenticated cart:", err);
      }
    } else {
      localStorage.removeItem("siddhu_cart");
      setCartItems([]);
      setTotals({
        subtotal: 0,
        gstAmount: 0,
        deliveryCharge: 0,
        totalAmount: 0,
        itemCount: 0,
        totalQuantity: 0
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totals,
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
