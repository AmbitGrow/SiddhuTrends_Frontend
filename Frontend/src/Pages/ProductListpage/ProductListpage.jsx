import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./ProductListpage.css";
function ProductListpage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  /* ---------------- PRODUCT DATA ---------------- */

  const productsData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `LED Police Supercar Toy ${i + 1}`,
    subtitle: "Reusable Digital Slate for Kids & Adults",
    price: 99 + i * 10,
    originalPrice: 250 + i * 20,
    images: ["img1", "img2", "img3"],
    description:
      "This LCD writing tablet helps children practice writing and drawing.",
    howToPlay: "Use stylus to write and erase with single click.",
    delivery: "Delivery within 3-5 working days.",
  }));

  const product = productsData.find((item) => item.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  /* ---------------- STATES ---------------- */

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [likesCount, setLikesCount] = useState(1000);
  const [openSection, setOpenSection] = useState(null);

  /* ---------------- FUNCTIONS ---------------- */

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleAccordion = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert("Added to cart");
  };

  const buyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/checkout/address");
  };

  /* ---------------- JSX ---------------- */

  return (
    <div className="product-list-page-container">
      {/* BACK SECTION */}
      <div className="back-page-btn">
        <div className="back" onClick={() => navigate(-1)}>
          <GoArrowLeft className="back-arrow-icon" />
          <p>Back</p>
        </div>
      </div>

      <div className="product-view-section">
        {/* LEFT SIDE */}
        <div className="left-side">
          <div className="product-view">
            <div className="three-product-img">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`img-div ${
                    selectedImage === img ? "active-thumb" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                ></div>
              ))}
            </div>

            <div className="like-share">
              <div className="like-share-btn" onClick={toggleLike}>
                <div className="like-share-icon">
                  <AiOutlineLike />
                </div>
                <p>
                  {liked ? `Liked - ${likesCount}` : `Like - ${likesCount}`}
                </p>
              </div>

              <div className="like-share-btn" onClick={toggleWishlist}>
                <div className="like-share-icon">
                  {wishlist ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>
                <p>Wishlist</p>
              </div>

              <div className="like-share-btn" onClick={handleShare}>
                <div className="like-share-icon">
                  <GoShareAndroid />
                </div>
                <p>Share</p>
              </div>
            </div>
          </div>

          <div className="product-show-section">
            <div className="product-main-img"></div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-side">
          <h2>{product.name}</h2>
          <p className="subtitle">{product.subtitle}</p>

          <div className="price-section">
            <h1>₹{product.price}.00</h1>
            <span className="strike">₹{product.originalPrice}.00</span>
            <span className="discount-badge">{discount}% off</span>
          </div>

          {/* QUANTITY + CART */}
          <div className="cart-section">
            <div className="qty-box">
              <button onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>

            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <button className="buy-now-btn" onClick={buyNow}>
            Buy Now
          </button>

          {/* ACCORDION */}
          <div className="accordion">
            {[
              { key: "desc", title: "Description", value: product.description },
              { key: "how", title: "How to play", value: product.howToPlay },
              {
                key: "delivery",
                title: "Delivery details",
                value: product.delivery,
              },
            ].map((item) => (
              <div className="accordion-item" key={item.key}>
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion(item.key)}
                >
                  {item.title}
                  {openSection === item.key ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>

                {openSection === item.key && (
                  <div className="accordion-content">{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListpage;
