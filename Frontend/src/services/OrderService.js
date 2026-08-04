import API from "./Api";

const OrderService = {
  createOrderIntentFromCart: async (deliveryAddress) => {
    return API.post("/orders/from-cart", { deliveryAddress });
  },

  initiatePayment: async (orderIntentId, paymentType) => {
    return API.post(`/payments/orders/${orderIntentId}/pay`, { paymentType });
  },

  verifyPayment: async (payload) => {
    return API.post("/payments/verify", payload);
  },

  getMyOrders: async () => {
    return API.get("/orders");
  },

  getOrderById: async (orderId) => {
    return API.get(`/orders/${orderId}`);
  },

  cancelOrderIntent: async (orderIntentId) => {
    return API.post(`/orders/intents/${orderIntentId}/cancel`);
  }
};

export default OrderService;
