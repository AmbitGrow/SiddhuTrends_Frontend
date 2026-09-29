import React, { useState } from "react";
import "./Header.css";
import logo from "../../../assets/Photos/logo.png";

import { RiShoppingCartLine } from "react-icons/ri";
import { FaPersonWalkingArrowRight, FaRegHeart } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";

import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.length;

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="header-container">
      <div className="header-top-offer">
        Free Delivery on Orders Above ₹499 🚚
      </div>

      <div className="header-desktop">
        <div className="header-left">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
          </div>

          <div className="header-menu">
            <ul>
              <li>
                <NavLink to="/products" className="navlink">
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/combo" className="navlink">
                  Combo
                </NavLink>
              </li>
              <li>
                <NavLink to="/rewards" className="navlink">
                  Rewards
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="navlink">
                  Our Story
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="navlink">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-right">
          <div className={`search ${searchOpen ? "search-active" : ""}`}>
            <LuSearch
              className="search-icon"
              onClick={() => setSearchOpen(true)}
            />

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={() => {
                if (!searchValue) setSearchOpen(false);
              }}
              placeholder="Search"
            />
          </div>

          <div
            className="header-cart-section"
            onClick={() => navigate("/cart")}
          >
            <div className="header-cart">
              <RiShoppingCartLine />
              {cartCount > 0 && <div className="cart-dot"></div>}
            </div>
            <p>
              Cart <span>({cartCount})</span>
            </p>
          </div>

          <div className="wishlist" onClick={() => navigate("/wishlist")}>
            <FaRegHeart />
          </div>

          {!user ? (
            <div className="login" onClick={() => navigate("/login")}>
              <p>Sign In</p>
              <FaPersonWalkingArrowRight className="arrow-icon-login" />
            </div>
          ) : (
            <div
              className="login"
              onClick={() => setProfileOpen(!profileOpen)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <p>{user.name}</p>

              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "0",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    width: "150px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    zIndex: 100,
                  }}
                >
                  <p
                    style={{
                      cursor: "pointer",
                      marginBottom: "8px",
                      color: "black",
                    }}
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                      marginBottom: "8px",
                      color: "black",
                    }}
                    onClick={() => navigate("/orders")}
                  >
                    My Orders
                  </p>
                  <p
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
