import React, { useEffect, useRef, useState } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

function PaymentPage() {
  const { address, paymentMethod, setOrderDetails } = useCheckout();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const paymentTriggered = useRef(false);
  const [status, setStatus] = useState("Initializing...");
  const [statusStep, setStatusStep] = useState(0);
  const [isCompletingPayment, setIsCompletingPayment] = useState(false);

  // 🔒 Redirect safety
  useEffect(() => {
    if (!address) navigate("/checkout/address");
    if (!paymentMethod) navigate("/checkout/summary");
    if (cartItems.length === 0 && !isCompletingPayment) navigate("/cart");
  }, [address, paymentMethod, cartItems, navigate, isCompletingPayment]);

  // 🧮 Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  const discount = Math.round(subtotal * 0.2);
  const deliveryCharge = subtotal > 499 ? 0 : 40;
  const totalAmount = Math.max(subtotal - discount + deliveryCharge, 0);

  const amountToPay = paymentMethod === "COD" ? 20 : totalAmount;

  // 🔄 Status animation with steps
  useEffect(() => {
    const steps = [
      { text: "Initializing...", delay: 0 },
      { text: "Verifying payment details...", delay: 800 },
      { text: "Securing connection...", delay: 1600 },
      { text: "Redirecting to Razorpay...", delay: 2400 },
    ];

    const timeouts = steps.map((step) =>
      setTimeout(() => {
        setStatus(step.text);
        setStatusStep(steps.indexOf(step));
      }, step.delay),
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (paymentTriggered.current) return;

    const timer = setTimeout(() => {
      if (!window.Razorpay) {
        alert("Razorpay not loaded");
        return;
      }

      paymentTriggered.current = true;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_S2Z50Ps6YaZsmj",
        amount: amountToPay * 100,
        currency: "INR",
        name: "Siddhu Trends",
        description: "Order Payment",

        handler: function (response) {
          const orderData = {
            orderId: "ST-ORD-" + Date.now(),
            paymentId: response.razorpay_payment_id,
            address,
            cartItems,
            subtotal,
            discount,
            deliveryCharge,
            totalAmount,
            advanceAmount: amountToPay,
            codRemaining: paymentMethod === "COD" ? totalAmount - 20 : 0,
            paymentMethod,
            date: new Date().toLocaleDateString(),
          };

          setIsCompletingPayment(true);
          setOrderDetails(orderData);
          localStorage.setItem("lastOrder", JSON.stringify(orderData));
          clearCart();

          setTimeout(() => {
            navigate("/checkout/confirm", { replace: true });
          }, 50);
        },

        modal: {
          ondismiss: function () {
            setTimeout(() => navigate("/checkout/summary"), 0);
          },
        },

        prefill: {
          name: address?.firstName,
          contact: address?.phone,
        },

        theme: {
          color: "#EE751B",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function () {
        alert("Payment Failed ❌");
        navigate("/checkout/summary");
      });

      rzp.open();
    }, 5000); // ⏱ delay for smooth UX

    return () => clearTimeout(timer);
  }, [amountToPay, address, cartItems, paymentMethod]);

  return (
    <div className="payment-loading-page">
      <div className="payment-page-box">
        <div className="lock-icon-container">
          <div className="lock-icon">🔒</div>
          <div className="lock-pulse"></div>
        </div>

        <h2 className="payment-title">Processing Your Payment</h2>

        <div className="payment-status-container">
          <p className="payment-status">{status}</p>
          <div className="status-dots">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`dot ${i <= statusStep ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </div>

        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Processing</div>
        </div>

        {/* <div className="payment-amount-section">
          <div className="amount-label">Total Amount</div>
          <p className="payment-amount">₹{amountToPay}</p>
          <p className="payment-method">{paymentMethod}</p>
        </div> */}
      </div>

      <div className="particles">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{ "--delay": `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default PaymentPage;
