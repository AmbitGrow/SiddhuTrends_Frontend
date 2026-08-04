import API from "./Api";

const CartService = {
  getCart: async () => {
    return API.get("/cart");
  },

  addToCart: async (productId, quantity) => {
    return API.post("/cart/add", { productId, quantity });
  },

  updateQuantity: async (productId, quantity) => {
    return API.patch("/cart/update", { productId, quantity });
  },

  removeFromCart: async (productId) => {
    return API.delete(`/cart/remove/${productId}`);
  },

  clearCart: async () => {
    return API.delete("/cart/clear");
  },

  mergeCart: async (items) => {
    return API.post("/cart/merge", { items });
  },

  getCartQuote: async (items) => {
    return API.post("/cart/quote", { items });
  }
};

export default CartService;
