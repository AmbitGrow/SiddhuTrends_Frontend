import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Siddhu Trends</h2>
          <p>
            Carefully chosen toys that bring smiles to kids and peace of mind to
            parents.
          </p>

          <div className="footer-social">
            <div className="social-icon">
              <FaInstagram />
            </div>
            <div className="social-icon">
              <FaFacebookF />
            </div>
            <div className="social-icon">
              <FaTwitter />
            </div>
            <div className="social-icon">
              <FaYoutube />
            </div>
          </div>
        </div>
        <div className="footer-menu">
          <div className="footer-column">
            <p className="menu-title">Information</p>
            <ul>
              <li>
                <Link to="#">Returns & Cancellation</Link>
              </li>
              <li>
                <Link to="#">Refunds</Link>
              </li>
              <li>
                <Link to="#">Shipping Policy</Link>
              </li>
              <li>
                <Link to="#">Disclaimer</Link>
              </li>
              <li>
                <Link to="#">Terms & Condition</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <p className="menu-title">Categories</p>

            <ul>
              <li>
                <Link to="/products?category=car">Car</Link>
              </li>
              <li>
                <Link to="/products?category=wooden">Wooden Toys</Link>
              </li>
              <li>
                <Link to="/products?category=bike">Bike</Link>
              </li>
              <li>
                <Link to="/products?category=preteens">Pre-Teen Toys</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <p className="menu-title">Quick Links</p>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/products">Shop Toys</Link>
              </li>
              <li>
                <Link to="/products">Shop By Age</Link>
              </li>
              <li>
                <Link to="/rewards">Rewards</Link>
              </li>
              <li>
                <Link to="/combo">Combo</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hr"></div>
      <div className="footer-bottom">
        <p>@ 2026 SiddhuTrends. All rights reserved.</p>

        <div className="footer-payments">
          <div className="payment-box"></div>
          <div className="payment-box"></div>
          <div className="payment-box"></div>
          <div className="payment-box"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
