import React, { useEffect, useRef, useState } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import "./PaymentPage.css";

function PaymentPage() {
  const { address, paymentMethod, setOrderDetails, orderIntentId } = useCheckout();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const paymentTriggered = useRef(false);
  const [status, setStatus] = useState("Initializing payment...");
  const [statusStep, setStatusStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // 🔒 Redirect safety
  useEffect(() => {
    if (!address) {
      navigate("/checkout/address");
      return;
    }
    if (!paymentMethod) {
      navigate("/checkout/summary");
      return;
    }
    if (!orderIntentId) {
      navigate("/checkout/summary");
      return;
    }
  }, [address, paymentMethod, orderIntentId, navigate]);

  // Poll for the created Order document in MongoDB
  const pollForOrder = async (targetOrderIntentId) => {
    const maxAttempts = 15;
    const delayMs = 600;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const orders = await OrderService.getMyOrders();
        const matchedOrder = orders.find(o => o.orderIntentId === targetOrderIntentId);
        if (matchedOrder) {
          return matchedOrder;
        }
      } catch (err) {
        console.error("Error polling for order:", err);
      }
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    throw new Error("Order was not found. Please check My Orders page.");
  };

  useEffect(() => {
    if (paymentTriggered.current || !orderIntentId || !paymentMethod) return;
    paymentTriggered.current = true;

    const startPaymentFlow = async () => {
      try {
        setStatus("Initiating transaction...");
        setStatusStep(1);

        const paymentType = paymentMethod === "COD" ? "PARTIAL_COD" : "ONLINE";
        const initRes = await OrderService.initiatePayment(orderIntentId, paymentType);

        setStatus("Opening payment gateway...");
        setStatusStep(2);

        if (!window.Razorpay) {
          throw new Error("Razorpay SDK failed to load. Please check your network connection.");
        }

        const handleCancel = async () => {
          try {
            await OrderService.cancelOrderIntent(orderIntentId);
            console.log("Order intent cancelled successfully");
          } catch (err) {
            console.error("Failed to cancel order intent:", err);
          }
          navigate("/checkout/summary");
        };

        const options = {
          key: initRes.key,
          amount: Math.round(initRes.amount * 100), // Amount is in INR, Razorpay expects paise
          currency: initRes.currency,
          name: "Siddhu Trends",
          description: paymentMethod === "COD" ? "COD Advance Payment" : "Order Payment",
          order_id: initRes.razorpayOrderId,

          handler: async function (response) {
            try {
              setStatus("Verifying payment...");
              setStatusStep(3);

              await OrderService.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });

              setStatus("Generating order...");
              const finalOrder = await pollForOrder(orderIntentId);

              // Update client cart state
              clearCart();

              // Save order details to context & local storage for ConfirmPage
              setOrderDetails(finalOrder);
              localStorage.setItem("lastOrder", JSON.stringify(finalOrder));

              navigate("/checkout/confirm", { replace: true });
            } catch (verifyErr) {
              console.error("Payment verification failed:", verifyErr);
              alert(verifyErr.message || "Payment verification failed ❌");
              navigate("/checkout/summary");
            }
          },

          modal: {
            ondismiss: function () {
              alert("Payment cancelled ⚠️");
              handleCancel();
            },
          },

          prefill: {
            name: `${address?.firstName || ""} ${address?.lastName || ""}`.trim(),
            contact: address?.phone,
          },

          theme: {
            color: "#EE751B",
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (resp) {
          console.error("Razorpay payment failed:", resp.error);
          alert(`Payment Failed ❌: ${resp.error.description}`);
          handleCancel();
        });

        rzp.open();
      } catch (err) {
        console.error("Failed to start payment:", err);
        setErrorMessage(err.message || "Failed to initiate payment");
      }
    };

    startPaymentFlow();
  }, [orderIntentId, paymentMethod, address, navigate, clearCart, setOrderDetails]);

  return (
    <div className="payment-loading-page">
      <div className="payment-page-box">
        <div className="lock-icon-container">
          <div className="lock-icon">🔒</div>
          <div className="lock-pulse"></div>
        </div>

        <h2 className="payment-title">Processing Your Payment</h2>

        {errorMessage ? (
          <div className="payment-error-container">
            <p className="payment-error-text">{errorMessage}</p>
            <button className="primary-btn" onClick={() => navigate("/checkout/summary")}>
              Return to Summary
            </button>
          </div>
        ) : (
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
        )}

        {!errorMessage && (
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text">Processing</div>
          </div>
        )}
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
