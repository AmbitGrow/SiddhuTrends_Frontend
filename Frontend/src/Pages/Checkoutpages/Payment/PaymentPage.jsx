import React, { useEffect } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import StepProgress from "../StepProgress";
import "./PaymentPage.css";

function PaymentPage() {
  const { address, paymentMethod, setOrderDetails } = useCheckout();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!address) navigate("/checkout/address");
    if (!paymentMethod) navigate("/checkout/summary");
    if (cartItems.length === 0) navigate("/cart");
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  const discount = Math.round(subtotal * 0.2);
  const deliveryCharge = subtotal > 499 ? 0 : 40;
  const totalAmount = Math.max(subtotal - discount + deliveryCharge, 0);

  const amountToPay = paymentMethod === "COD" ? 20 : totalAmount;

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    const options = {
      key: "rzp_test_S2Z50Ps6YaZsmj", // ✅ use only Key ID
      amount: amountToPay * 100,
      currency: "INR",
      name: "Siddhu Trends",
      description: "Test Payment",

      handler: function (response) {
        // Simulated order creation (frontend only)

        const orderData = {
          orderId: "ST-ORD-" + Date.now(),
          paymentId: response.razorpay_payment_id,
          address,
          items: cartItems,
          totalAmount,
          paymentMethod,
          date: new Date().toLocaleDateString(),
        };

        setOrderDetails(orderData);
        localStorage.setItem("lastOrder", JSON.stringify(orderData));

        clearCart();
        navigate("/checkout/confirm");
      },

      modal: {
        ondismiss: function () {
          alert("Payment Cancelled");
        },
      },

      prefill: {
        name: address?.firstName || "Customer",
        contact: address?.phone || "9999999999",
      },

      theme: {
        color: "#EE751B",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      alert("Payment Failed ❌");
    });

    rzp.open();
  };

  return (
    <div className="checkout-wrapper">
      {/* <StepProgress step={3} /> */}

      <div className="payment-card">
        <h3>Confirm Payment</h3>

        <div className="payment-summary">
          <div>
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          <div>
            <span>Amount to Pay Now</span>
            <span>₹{amountToPay}</span>
          </div>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay ₹{amountToPay}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
