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

  useEffect(() => {
    if (!orderDetails) {
      const saved = localStorage.getItem("lastOrder");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    }
  }, [orderDetails]);

  if (!order) return <p className="no-order">No Order Found</p>;

  // Compute subtotal from items selling prices
  const items = order.items || [];
  const subtotal = order.subtotal !== undefined ? order.subtotal : items.reduce((acc, item) => acc + (item.totalSelling || (item.sellingPrice * item.quantity)), 0);
  const gstAmount = order.gstAmount || 0;
  const totalAmount = order.finalAmount || order.totalAmount || 0;
  const deliveryCharge = order.deliveryCharge !== undefined ? order.deliveryCharge : Math.max(totalAmount - subtotal - gstAmount, 0);

  const paidAmount = order.paidAmount || 0;
  const amountDue = order.amountDue || 0;
  const orderId = order.orderNumber || "N/A";
  const firstFirstName = order.deliveryAddress?.fullName?.split(" ")[0] || "Customer";

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId).catch(() => {});
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const formattedDate = order.confirmedAt 
    ? new Date(order.confirmedAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' });

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
          <p className="c-t-thanku">Thank you, {firstFirstName}!</p>
          <p className="c-t-msg">Your order has been placed successfully.</p>
          <p className="xp-badge">You Earned {order.xpEarned || 0} XP Points!</p>
        </div>
      </div>
      <div className="order-id-date">
        <div className="order-id">
          <p>
            <span>Order ID :</span> {orderId}
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
          <span>Order Date :</span> {formattedDate}
        </p>
      </div>

      {items.map((item, idx) => (
        <div key={item.productId || idx} className="product-card-order">
          <div className="product-row-order">
            <div className="product-thumb" />

            <div className="product-info">
              <div className="product-name">
                <p>{item.productName}</p>
              </div>
              <div className="product-meta-row">
                <div className="product-meta-item">
                  Quantity : <span>{item.quantity}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="product-price">
            <p>₹{item.sellingPrice}</p>
          </div>
        </div>
      ))}

      <div className="delivery-details-sec">
        <div className="attribute-title">
          <p>Delivery Details</p>
        </div>
        <div className="delivery-details-box">
          <div className="delivery-details-row">
            <div className="row-icon">
              <img src={deliveryicon} alt="Delivery"></img>
            </div>
            <p>
              <span>Address -</span> {order.deliveryAddress?.addressLine1}{" "}
              {order.deliveryAddress?.addressLine2 ? `, ${order.deliveryAddress.addressLine2}` : ""},{" "}
              {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}
            </p>
          </div>
          <div
            className="delivery-details-row"
            style={{ alignItems: "center" }}
          >
            <div className="row-icon">
              <img src={profileicon} alt="Profile"></img>
            </div>
            <p>
              <span>{order.deliveryAddress?.fullName} - </span>{order.deliveryAddress?.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="payment-summary-box">
        <div className="attribute-title">
          <p>Payment Details</p>
        </div>
        <div className="payment-summary-card">
          <div className="payment-attribute-row">
            <span className="row-text">Subtotal</span>
            <span className="row-text row-text-value">₹{Math.round(subtotal)}</span>
          </div>

          <div className="payment-attribute-row">
            <span className="row-text">GST (18%)</span>
            <span className="row-text row-text-value">₹{Math.round(gstAmount)}</span>
          </div>

          <div className="payment-attribute-row">
            <span className="row-text">Delivery charge</span>
            <span className="row-text row-text-value">
              {deliveryCharge === 0 ? "Free" : `₹${Math.round(deliveryCharge)}`}
            </span>
          </div>

          <div className="payment-summary-hr" />

          <div className="payment-attribute-row total-row">
            <span className="row-text" style={{color:"black"}}>Total Amount</span>
            <span className="row-text row-text-value" style={{color:"black"}}>₹{Math.round(totalAmount)}</span>
          </div>

          <div className="cod-method-all">
            <div className="payment-cod-row">
              <span className="row-text">Payment Method</span>
              <div className="payment-method">
                {order.orderType === "PARTIAL_COD" && <img src={cod} alt="COD"></img>}
                <span className="row-text row-text-value" style={{fontWeight:"400"}}>
                  {order.orderType === "PARTIAL_COD" ? "Cash On Delivery (Partial)" : "Online Payment"}
                </span>
              </div>
            </div>

            {order.orderType === "PARTIAL_COD" && (
              <>
                <div className="payment-cod-row">
                  <span className="row-text">Paid Advance</span>
                  <span className="row-text row-text-value">₹{Math.round(paidAmount)}</span>
                </div>
                <div className="payment-cod-row">
                  <span className="row-text">Pay on Delivery</span>
                  <span className="row-text row-text-value">₹{Math.round(amountDue)}</span>
                </div>
              </>
            )}

            <div className="payment-cod-row" style={{justifyContent:"center" ,gap:"15px", marginTop:"15px"}}>
              <img src={download} className="download-icon" style={{width:"25px"}} alt="Download"></img>
              <span className="row-text" style={{color:"black",letterSpacing:".5px"}}>Download Invoice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;
