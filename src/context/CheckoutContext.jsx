import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        orderDetails,
        setOrderDetails,
        paymentMethod,
        setPaymentMethod
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);