import React, { useState, useEffect } from "react";
import "./OrderSummaryPage.css";
import StepProgress from "../StepProgress";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

function OrderSummaryPage() {
  const { address, setPaymentMethod } = useCheckout();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [discountPercent, setDiscountPercent] = useState(20);

  // 🔒 Redirect if no address
  useEffect(() => {
    if (!address) {
      navigate("/checkout/address");
    }
  }, [address, navigate]);

  // 🔒 Redirect if cart empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // 🧮 Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const discount = Math.round((subtotal * discountPercent) / 100);
  const deliveryCharge = subtotal > 499 ? 0 : 40;

  const totalAmount = Math.max(
    subtotal - discount + deliveryCharge,
    0
  );

  const advanceAmount =
    selectedPayment === "COD" ? 20 : totalAmount;

  const codRemaining =
    selectedPayment === "COD"
      ? totalAmount - 20
      : 0;

  const applyCoupon = () => {
    if (coupon.trim() === "") return;

    if (coupon.toUpperCase() === "SAVE10") {
      setDiscountPercent(10);
      alert("Coupon Applied: 10% Discount");
    } else if (coupon.toUpperCase() === "SAVE30") {
      setDiscountPercent(30);
      alert("Coupon Applied: 30% Discount");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  const handleConfirm = () => {
    if (!address) return alert("Address missing");
    if (cartItems.length === 0) return;

    setPaymentMethod(selectedPayment);

    // ✅ Go to Payment Page (NOT confirm)
    navigate("/checkout/payment");
  };

  return (
    <div className="checkout-wrapper">
      {/* <StepProgress step={2} /> */}

      <div className="summary-section">
        {/* ADDRESS */}
        <div className="deliver-header">
          <h3>Delivering to</h3>
          <button onClick={() => navigate("/checkout/address")}>
            Change
          </button>
        </div>

        <div className="address-box">
          <p className="name">
            {address?.firstName}{" "}
            <span className="home-tag">Home</span>
          </p>
          <p>{address?.addressLine}</p>
          <p>
            {address?.city}, {address?.state} -{" "}
            {address?.pincode}
          </p>
          <p>{address?.phone}</p>
        </div>

        {/* PRODUCT SUMMARY */}
        <h3>Order Summary</h3>

        <div className="product-summary-card">
          {cartItems.map((item) => (
            <div key={item.id} className="product-row">
              <div className="product-img" />

              <div className="product-info">
                <div className="quantity-badge">
                  {item.quantity}
                </div>

                <p className="product-title">
                  {item.name}
                </p>

                <div className="price-row">
                  <span className="price">
                    ₹{item.price}
                  </span>
                  <span className="strike">
                    ₹{item.originalPrice ||
                      item.price + 200}
                  </span>
                </div>

                <p className="delivery-text">
                  🚚 Estimated delivery :
                  3–5 working days
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* COUPON */}
        <h4>Have a coupon ?</h4>
        <div className="coupon-section">
          <input
            placeholder="Add coupon code"
            value={coupon}
            onChange={(e) =>
              setCoupon(e.target.value)
            }
          />
          <button onClick={applyCoupon}>
            Apply
          </button>
        </div>

        {/* PAYMENT METHOD */}
        <h4>Payment Method</h4>

        <div
          className={`payment-option ${
            selectedPayment === "ONLINE"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setSelectedPayment("ONLINE")
          }
        >
          <div>
            <p>Online Payment</p>
            <span>
              Pay securely using UPI / Cards
            </span>
          </div>
        </div>

        <div
          className={`payment-option ${
            selectedPayment === "COD"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setSelectedPayment("COD")
          }
        >
          <div>
            <p>Cash On Delivery</p>
            <span>
              ₹20 advance payment required.
            </span>
          </div>
        </div>

        {/* PAYMENT SUMMARY */}
        <h4>Payment Summary</h4>

        <div className="payment-summary-card">
          <div className="row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="row red">
            <span>
              Discount (-{discountPercent}%)
            </span>
            <span>-₹{discount}</span>
          </div>

          <div className="row">
            <span>Delivery charge</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="divider" />

          <div className="total-row">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          {selectedPayment === "COD" && (
            <>
              <div className="row">
                <span>
                  Pay Now (Advance)
                </span>
                <span>
                  ₹{advanceAmount}
                </span>
              </div>

              <div className="row">
                <span>
                  Pay on Delivery (COD)
                </span>
                <span>
                  ₹{codRemaining}
                </span>
              </div>
            </>
          )}
        </div>

        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={totalAmount === 0}
        >
          Continue to Payment →
        </button>
      </div>
    </div>

    // <div>

    // </div>
  );
}

export default OrderSummaryPage;