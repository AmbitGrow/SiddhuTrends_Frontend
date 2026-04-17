import React, { useState, useEffect } from "react";
import "./OrderSummaryPage.css";
import StepProgress from "../StepProgress";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import onlinepaymenticon from "../../../assets/Photos/onlinepayment.png";
import cod from "../../../assets/Photos/cod.png";
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
    0,
  );

  const discount = Math.round((subtotal * discountPercent) / 100);
  const deliveryCharge = subtotal > 499 ? 0 : 40;

  const totalAmount = Math.max(subtotal - discount + deliveryCharge, 0);

  const advanceAmount = selectedPayment === "COD" ? 20 : totalAmount;

  const codRemaining = selectedPayment === "COD" ? totalAmount - 20 : 0;

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

    navigate("/checkout/payment");
  };

  return (
    <div className="order-summary-page">
      <div className="summary-section">
        <div className="deliver-header attribute-title">
          <p>Delivering to</p>
          <button onClick={() => navigate("/checkout/address")}>Change</button>
        </div>

        <div className="address-box">
          <div className="name">
            <p>{address?.firstName}</p>
            <span className="name-tag">Home</span>
          </div>
          <p className="address-line">
            {address?.addressLine} {address?.city} , {address?.state} -{" "}
            {address?.pincode}
          </p>
          <p className="phone-number">{address?.phone}</p>
        </div>

        <div className="order-summary-box">
          <div className="attribute-title">
            <p>Order Summary</p>
          </div>
          <div className="product-summary-card">
            {cartItems.map((item) => (
              <div key={item.id} className="product-row">
                <div className="product-img-div">
                  <div className="cart-product-img" />
                  <div className="quantity-badge">{item.quantity}</div>
                </div>

                <div className="product-info">
                  <p className="product-title">{item.name}</p>
                  <div className="review-age">
                    <div className="review">
                      <div className="review-icon">
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                      </div>
                      <div className="text">
                        <p>({item.reviews} Reviews)</p>
                      </div>
                    </div>
                  </div>
                  <div className="product-age-delivery-date">
                    <div className="age age-date-title">
                      <p>
                        <span>Age: </span>
                        {item.age}
                      </p>
                    </div>
                    <div className="delivery-date age-date-title">
                      <p className="delivery-text">
                        <span>Estimated delivery</span> : 3–5 working days
                      </p>
                    </div>
                  </div>

                  <div className="price-row">
                    <p className="price">₹{item.price}</p>
                    <p className="strike">
                      ₹{item.originalPrice || item.price + 200}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="coupon-box">
          <div className="attribute-title">
            <p>Have a coupon ?</p>
          </div>
          <div className="coupon-section">
            <input
              placeholder="Add coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>
        </div>

        <div className="payment-method-box">
          <div className="attribute-title">
            <p>Payment Method</p>
          </div>
          <div className="payment-method-option">
            <div
              className={`payment-option ${
                selectedPayment === "ONLINE" ? "active" : ""
              }`}
              onClick={() => setSelectedPayment("ONLINE")}
            >
              <div className="option-icon">
                <img src={onlinepaymenticon}></img>
              </div>
              <div>
                <p className="method-title">Online Payment</p>
                <p className="method-option-paragraph">
                  Pay securely using UPI / Cards
                </p>
                <p className="method-xp-point">Get upto 400XP points</p>
              </div>
              <div className="payment-select-active">
                <p>Select</p>
              </div>
            </div>

            <div
              className={`payment-option ${
                selectedPayment === "COD" ? "active" : ""
              }`}
              onClick={() => setSelectedPayment("COD")}
            >
              <div className="option-icon">
                <img src={cod}></img>
              </div>
              <div>
                <p className="method-title">Cash On Delivery</p>
                <p className="method-option-paragraph">
                  ₹20 advance payment required. Remaining amount payable on
                  delivery
                </p>
              </div>
              <div className="payment-select-active">
                <p>Select</p>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-summary-box">
          <div className="attribute-title">
            <p>Payment Method</p>
          </div>
          <div className="payment-summary-card">
            <div className="payment-attribute-row">
              <span className="row-text">Subtotal</span>
              <span className="row-text row-text-value">₹{subtotal}</span>
            </div>

            <div className="payment-attribute-row row-red">
              <span className="row-text">Discount (-{discountPercent}%)</span>
              <span className="row-text row-text-value">-₹{discount}</span>
            </div>

            <div className="payment-attribute-row">
              <span className="row-text">Delivery charge</span>
              <span className="row-text row-text-value">₹{deliveryCharge}</span>
            </div>

            <div className="payment-summary-hr" />

            <div className="payment-attribute-row total-row">
              <span className="row-text">Total Amount</span>
              <span className="row-text row-text-value">₹{totalAmount}</span>
            </div>

            {selectedPayment === "COD" && (
              <div className="cod-method-all">
                <div className="payment-cod-row">
                  <span className="row-text">Payment Method</span>
                  <div className="payment-method">
                    <img src={cod}></img>
                    <span className="row-text row-text-value">
                      Cash On Delivery
                    </span>
                  </div>
                </div>
                <div className="payment-cod-row">
                  <span className="row-text">Pay Now (Advance)</span>
                  <span className="row-text row-text-value">
                    ₹{advanceAmount}
                  </span>
                </div>

                <div className="payment-cod-row">
                  <span className="row-text">Pay on Delivery (COD)</span>
                  <span className="row-text row-text-value">
                    ₹{codRemaining}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={totalAmount === 0}
        >
          <p>{selectedPayment === "COD"
            ? "Confirm Order & Pay 20"
            : "Continue to Payment"}</p>
        </button>
      </div>
    </div>
  );
}

export default OrderSummaryPage;




