import React, { useEffect, useState } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import "./ConfirmPage.css";
import deliveryicon from "../../../assets/Photos/deliveryicon.png";
import profileicon from "../../../assets/Photos/profileblack.png";
import cod from "../../../assets/Photos/cod.png";
import download from '../../../assets/Photos/downloadicon.png'
function ConfirmPage() {
  const { orderDetails } = useCheckout();
  const [order, setOrder] = useState(orderDetails);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(orderId).catch(() => {});
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 2000);
  };
  useEffect(() => {
    if (!orderDetails) {
      const saved = localStorage.getItem("lastOrder");
      if (saved) setOrder(JSON.parse(saved));
    }
  }, []);
  if (!order) return <p>No Order Found</p>;
  const subtotal = order.subtotal || 0;
  const discount = order.discount || 0;
  const discountPercent = order.discountPercent || 0;
  const deliveryCharge = order.deliveryCharge || 0;
  const totalAmount = order.totalAmount || 0;
  const advanceAmount = order.advanceAmount || 0;
  const codRemaining = order.codRemaining || 0;

  const orderId = "ST-ORD-24891";
  return (
    <div className="checkout-page">
      <div className="check-circle">
        <div className="check-ring">
          <svg
            className="check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="check-title">
          <p className="c-t-thanku">Thank you, Saravanan!</p>
          <p className="c-t-msg">Your order has been placed successfully.</p>
          <p className="xp-badge">You Earned 25 XP Points!</p>
        </div>
      </div>
      <div className="order-id-date">
        <div className="order-id">
          <p>
            <span>Order ID :</span> ST-ORD-24891
          </p>
          <button
            className="copy-btn"
            onClick={handleCopy}
            title="Copy order ID"
          >
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1e8c1e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
        <p className="order-date">
          <span>Order Date :</span> 21 Feb 2026
        </p>
      </div>

      <div className="product-card-order">
        <div className="product-row-order">
          <div className="product-thumb" />

          <div className="product-info">
            <div className="product-name">
              <p>LED Police Supercar Toy for Kids Light up 911 Patrol Car</p>
            </div>
            <div className="product-meta-row">
              <div className="product-meta-item">
                Age : <span>6–12 months</span>
              </div>
              <div className="product-meta-item">
                Quantity : <span>1</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-price">
          <p>₹500</p>
        </div>
      </div>

      <div className="delivery-details-sec">
        <div className="attribute-title">
          <p>Delivery Details</p>
        </div>
        <div className="delivery-details-box">
          <div className="delivery-details-row">
            <div className="row-icon">
              <img src={deliveryicon}></img>
            </div>
            <p>
              <span>Home -</span> 45 /4 / 1, Bharathiyar 5th Street , Gethalaiya
              Theate , Sankarankovil, TamilNadu - 627756
            </p>
          </div>
          <div
            className="delivery-details-row"
            style={{ alignItems: "center" }}
          >
            <div className="row-icon">
              <img src={profileicon}></img>
            </div>
            <p>
              <span>Saravanan - </span>7598238098
            </p>
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
            <span className="row-text"  style={{color:"black"}}>Total Amount</span>
            <span className="row-text row-text-value"  style={{color:"black"}}>₹{totalAmount}</span>
          </div>

          <div className="cod-method-all">
            <div className="payment-cod-row">
              <span className="row-text">Payment Method</span>
              <div className="payment-method">
                <img src={cod}></img>
                <span className="row-text row-text-value" style={{fontWeight:"400"}}>
                  Cash On Delivery
                </span>
              </div>
            </div>
            <div className="payment-cod-row" style={{justifyContent:"center" ,gap:"15px"}}>
              <img src={download} className="download-icon" style={{width:"25px"}}></img>
              <span className="row-text" style={{color:"black",letterSpacing:".5px"}}>Download Invoice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;
