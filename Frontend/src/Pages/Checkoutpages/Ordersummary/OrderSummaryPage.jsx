import React, { useState, useEffect } from "react";
import "./OrderSummaryPage.css";
import StepProgress from "../StepProgress";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import onlinepaymenticon from "../../../assets/Photos/onlinepayment.png";
import cod from "../../../assets/Photos/cod.png";
import OrderService from "../../../services/OrderService";

function OrderSummaryPage() {
  const { address, setPaymentMethod, setOrderIntentId } = useCheckout();
  const { cartItems, totals } = useCart();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // 🧮 Backend-derived Calculations
  const subtotal = totals.subtotal || 0;
  const gstAmount = totals.gstAmount || 0;
  const deliveryCharge = totals.deliveryCharge || 0;
  const totalAmount = totals.totalAmount || 0;

  const advanceAmount = selectedPayment === "COD" ? 199 : totalAmount;
  const codRemaining = selectedPayment === "COD" ? Math.max(totalAmount - 199, 0) : 0;

  const applyCoupon = () => {
    if (coupon.trim() === "") return;

    if (coupon.toUpperCase() === "SAVE10" || coupon.toUpperCase() === "SAVE30") {
      alert("Coupon Applied! Discount will be calculated during the final checkout stage.");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  const handleConfirm = async () => {
    if (!address) return alert("Address missing");
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    try {
      const deliveryAddress = {
        fullName: `${address.firstName} ${address.lastName}`.trim(),
        phone: address.phone,
        addressLine1: address.addressLine,
        addressLine2: `${address.area} ${address.landmark || ""}`.trim(),
        city: address.city,
        state: address.state,
        pincode: address.pincode
      };

      const res = await OrderService.createOrderIntentFromCart(deliveryAddress);
      setOrderIntentId(res.orderIntentId);
      setPaymentMethod(selectedPayment);
      navigate("/checkout/payment");
    } catch (err) {
      if (err.status === 409 && err.originalError?.response?.data?.existingOrderIntentId) {
        // Reuse existing active intent if one is already in progress
        setOrderIntentId(err.originalError.response.data.existingOrderIntentId);
        setPaymentMethod(selectedPayment);
        navigate("/checkout/payment");
      } else {
        alert(err.message || "Failed to initiate checkout");
      }
    } finally {
      setIsSubmitting(false);
    }
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
              <div key={item.product._id} className="product-row">
                <div className="product-img-div">
                  <div className="cart-product-img" />
                  <div className="quantity-badge">{item.quantity}</div>
                </div>

                <div className="product-info">
                  <p className="product-title">{item.product.name}</p>
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
                        <p>({item.product.reviews} Reviews)</p>
                      </div>
                    </div>
                  </div>
                  <div className="product-age-delivery-date">
                    <div className="age age-date-title">
                      <p>
                        <span>Age: </span>
                        {item.product.age}
                      </p>
                    </div>
                    <div className="delivery-date age-date-title">
                      <p className="delivery-text">
                        <span>Estimated delivery</span> : 3–5 working days
                      </p>
                    </div>
                  </div>

                  <div className="price-row">
                    <p className="price">₹{item.product.price}</p>
                    <p className="strike">
                      ₹{item.product.originalPrice || item.product.price + 200}
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
                <img src={onlinepaymenticon} alt="online payment"></img>
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
                <img src={cod} alt="cash on delivery"></img>
              </div>
              <div>
                <p className="method-title">Cash On Delivery</p>
                <p className="method-option-paragraph">
                  ₹199 advance payment required. Remaining amount payable on
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
            <p>Payment Summary</p>
          </div>
          <div className="payment-summary-card">
            <div className="payment-attribute-row">
              <span className="row-text">Subtotal</span>
              <span className="row-text row-text-value">₹{subtotal}</span>
            </div>

            <div className="payment-attribute-row">
              <span className="row-text">GST (18%)</span>
              <span className="row-text row-text-value">₹{Math.round(gstAmount)}</span>
            </div>

            <div className="payment-attribute-row">
              <span className="row-text">Delivery charge</span>
              <span className="row-text row-text-value">
                {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="payment-summary-hr" />

            <div className="payment-attribute-row total-row">
              <span className="row-text">Total Amount</span>
              <span className="row-text row-text-value">₹{Math.round(totalAmount)}</span>
            </div>

            {selectedPayment === "COD" && (
              <div className="cod-method-all">
                <div className="payment-cod-row">
                  <span className="row-text">Payment Method</span>
                  <div className="payment-method">
                    <img src={cod} alt="cod"></img>
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
          disabled={totalAmount === 0 || isSubmitting}
        >
          <p>
            {isSubmitting
              ? "Processing..."
              : selectedPayment === "COD"
              ? "Confirm Order & Pay ₹199"
              : "Continue to Payment"}
          </p>
        </button>
      </div>
    </div>
  );
}

export default OrderSummaryPage;
