import React, { useEffect, useState } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import StepProgress from "../StepProgress";
import "./ConfirmPage.css";

function ConfirmPage() {
  const { orderDetails } = useCheckout();
  const [order, setOrder] = useState(orderDetails);

  useEffect(() => {
    if (!orderDetails) {
      const saved = localStorage.getItem("lastOrder");
      if (saved) setOrder(JSON.parse(saved));
    }
  }, []);

  if (!order) return <p>No Order Found</p>;

  return (
    <div className="checkout-wrapper">
      {/* <StepProgress step={4} /> */}

      <div className="confirm-card">
        <div className="success-icon">✓</div>
        <h2>Thank you, {order.address.firstName}!</h2>
        <p>Your order has been placed successfully.</p>

        <div className="order-info">
          <p>Order ID: {order.orderId}</p>
          <p>Date: {order.date}</p>
          <p>Payment ID: {order.paymentId}</p>
          <p>Total Paid: ₹{order.totalAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;