import React from "react";
import "./Cartpage.css";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowRight,
  FaTag,
} from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { IoStar } from "react-icons/io5";

function CartPage() {
  const navigate = useNavigate();

  const { cartItems, totals, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="left-side">
          <div className="back-page-btn">
            <div className="back" onClick={() => navigate("/products")}>
              <GoArrowLeft className="back-arrow-icon" />
              <p>Back</p>
            </div>
            <div className="directory">
              <p className="visited">Products</p>
              <span>&gt;&gt;</span>
              <p className="visited">Cart</p>
            </div>
          </div>
          <div className="empty-cart-section">
            <div className="items-section empty-cart">
              <h2>Your cart is empty 🛒</h2>
              <p>Looks like you haven’t added anything yet.</p>
              <button
                className="checkout-main-btn"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="back-page-btn">
        <div className="back" onClick={() => navigate("/products")}>
          <GoArrowLeft className="back-arrow-icon" />
          <p>Back</p>
        </div>
        <div className="directory">
          <p className="visited">Products</p>
          <span>&gt;&gt;</span>
          <p className="visited">Cart</p>
        </div>
      </div>
      <div className="cart-page-wrapper">
        <div className="left-side">
          <div className="items-section">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product._id}>
                <div className="product-img-box">
                  {item.product.images && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  )}
                </div>

                <div className="product-details">
                  <div className="item-header">
                    <p className="item-name">{item.product.name}</p>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>

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

                    <div className="age">
                      <p>
                        <span>Age: </span>
                        {item.product.age}
                      </p>
                    </div>
                  </div>
                  <div className="item-footer">
                    <div className="price-tag">
                      <p className="new-price">
                        ₹
                        {(Number(item.product.price) || 0) *
                          (Number(item.quantity) || 1)}
                      </p>
                      <p className="old-price">
                        ₹{item.product.originalPrice || item.product.price + 200}
                      </p>
                    </div>

                    <div className="quantity-controls">
                      <h2
                        className="icon"
                        onClick={() => decreaseQuantity(item.product._id)}
                      >
                        <FaMinus />
                      </h2>

                      <span>{item.quantity}</span>

                      <h2
                        className="icon"
                        onClick={() => increaseQuantity(item.product._id)}
                      >
                        <FaPlus />
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-card">
          <h2>Order Summary</h2>

          <div className="row">
            <span className="label">Subtotal</span>
            <span className="value bold">₹{totals.subtotal}</span>
          </div>

          <div className="row">
            <span className="label">GST (18%)</span>
            <span className="value bold">₹{Math.round(totals.gstAmount)}</span>
          </div>

          <div className="row">
            <span className="label">Delivery Fee</span>
            <span className="value bold">
              {totals.deliveryCharge === 0 ? "Free" : `₹${totals.deliveryCharge}`}
            </span>
          </div>

          <hr className="divider" />

          <div className="row total-row">
            <span className="total-label">Total</span>
            <span className="value">₹{Math.round(totals.totalAmount)}</span>
          </div>

          <div className="promo-container">
            <div className="input-wrapper">
              <FaTag className="tag-icon" />
              <input
                type="text"
                placeholder="Add promo code"
                className="input-text"
              />
            </div>
            <button className="apply-btn">Apply</button>
          </div>

          <button
            className="checkout-main-btn"
            onClick={() => navigate("/checkout/address")}
          >
            <p>Go to Checkout</p>
            <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
