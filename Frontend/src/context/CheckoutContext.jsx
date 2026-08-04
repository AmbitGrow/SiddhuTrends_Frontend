import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderIntentId, setOrderIntentId] = useState(null);

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        orderDetails,
        setOrderDetails,
        paymentMethod,
        setPaymentMethod,
        orderIntentId,
        setOrderIntentId
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);