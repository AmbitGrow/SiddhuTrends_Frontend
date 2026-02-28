import React from "react";
import "./Cartpage.css";
import {
  FaTrash,
  FaStar,
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

  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );

  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = subtotal > 499 ? 0 : cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

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
              <p className="visited">Car</p>
              <span>&gt;&gt;</span>
              <p>Battery Car</p>
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
          <p className="visited">Car</p>
          <span>&gt;&gt;</span>
          <p>Battery Car</p>
        </div>
      </div>
      <div className="cart-page-wrapper">
        <div className="left-side">
          <div className="items-section">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="product-img-box">
                  {item.images && (
                    <img
                      src={item.images[0]}
                      alt={item.name}
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
                    <p className="item-name">{item.name}</p>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.id)}
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
                        <p>({item.reviews} Reviews)</p>
                      </div>
                    </div>

                    <div className="age">
                      <p>
                        <span>Age: </span>
                        {item.age}
                      </p>
                    </div>
                  </div>
                  <div className="item-footer">
                    <div className="price-tag">
                      <p className="new-price">
                        ₹
                        {(Number(item.price) || 0) *
                          (Number(item.quantity) || 1)}
                      </p>
                      <p className="old-price">
                        ₹{item.originalPrice || item.price + 200}
                      </p>
                    </div>

                    <div className="quantity-controls">
                      <h2
                        className="icon"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <FaMinus />
                      </h2>

                      <span>{item.quantity}</span>

                      <h2
                        className="icon"
                        onClick={() => increaseQuantity(item.id)}
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
            <span className="value bold">₹{subtotal}</span>
          </div>

          <div className="row red-text">
            <span className="label">Discount (-20%)</span>
            <span className="value">-₹{discount}</span>
          </div>

          <div className="row">
            <span className="label">Delivery Fee</span>
            <span className="value bold">
              {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
            </span>
          </div>

          <hr className="divider" />

          <div className="row total-row">
            <span className="total-label">Total</span>
            <span className="value">₹{total}</span>
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
