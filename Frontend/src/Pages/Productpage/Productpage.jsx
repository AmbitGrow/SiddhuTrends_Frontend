import React, { useState, useMemo } from "react";
import "./Productpage.css";
import { GoArrowLeft } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import filterlogo from "../../assets/Photos/filterlogo.png";
import deliverylogo from "../../assets/Photos/delivery.png";
import { BiSort } from "react-icons/bi";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getAllProducts } from "../../services/ProductService";

function Productpage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  /* ---------------- PRODUCT DATA ---------------- */

  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Sort by custom");
  const productsData = getAllProducts();

  const selectOption = (value) => {
    setSortOption(value);
    setOpen(false);
  };
  /* ---------------- STATES ---------------- */

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [availability, setAvailability] = useState("");
  const [discountFilter, setDiscountFilter] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortOption, setSortOption] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  /* ---------------- CLEAR FILTER ---------------- */

  const clearFilters = () => {
    setSelectedAge([]);
    setSelectedCategory([]);
    setAvailability("");
    setDiscountFilter([]);
    setPriceOptions([]);
    setMinPrice(100);
    setMaxPrice(800);
    setSearchTerm("");
    setCurrentPage(1);
  };

  /* ---------------- MULTI SELECT ---------------- */

  const handleMultiSelect = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
    setCurrentPage(1);
  };

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        const matchSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchAge =
          selectedAge.length === 0 || selectedAge.includes(product.age);

        const matchCategory =
          selectedCategory.length === 0 ||
          selectedCategory.includes(product.category);

        const matchAvailability =
          availability === ""
            ? true
            : availability === "in"
              ? product.inStock
              : !product.inStock;

        const matchDiscount =
          discountFilter.length === 0 ||
          discountFilter.some((d) => product.discount >= d);

        const matchRange =
          product.price >= minPrice && product.price <= maxPrice;

        const matchPriceOption =
          priceOptions.length === 0 ||
          (priceOptions.includes("under500") && product.price <= 500) ||
          (priceOptions.includes("over500") && product.price > 500);

        return (
          matchSearch &&
          matchAge &&
          matchCategory &&
          matchAvailability &&
          matchDiscount &&
          matchRange &&
          matchPriceOption
        );
      })
      .sort((a, b) => {
        if (sortOption === "low-high") return a.price - b.price;
        if (sortOption === "high-low") return b.price - a.price;
        return 0;
      });
  }, [
    searchTerm,
    selectedAge,
    selectedCategory,
    availability,
    discountFilter,
    priceOptions,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  /* ---------------- JSX ---------------- */

  return (
    <div className="productpage-container">
      <div className="back-page-btn">
        <div className="back">
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

      <div className="search-btn">
        <LuSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search product"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-section">
        {/* FILTER SECTION */}
        <div className="filter-section">
          <div className="filter-title">
            <img src={filterlogo} alt="filter" />
            <p>Filter</p>
            <button className="clear-btn" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <div className="filter-section-line-type1"></div>

          {/* AGE */}
          <div className="age-filter filter-type">
            <div className="filter-title">
              <p>Age</p>
            </div>
            <div className="checkbox-menu">
              {[
                "0 - 12 months",
                "1 - 3 years",
                "3 - 5 years",
                "5 - 8 years",
                "8 - 12 years",
              ].map((age) => (
                <label key={age} className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedAge.includes(age)}
                    onChange={() =>
                      handleMultiSelect(age, selectedAge, setSelectedAge)
                    }
                  />
                  <span className="checkmark"></span>
                  <p>{age}</p>
                </label>
              ))}
            </div>
          </div>
          <div className="filter-section-line-type2"></div>
          <div className="filter-section-line-type3"></div>

          {/* PRICE OPTIONS */}
          <div className="price-filter filter-type">
            <div className="filter-title">
              <p>Price</p>
            </div>
            <div className="checkbox-menu checkbox-menu-price">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={priceOptions.includes("under500")}
                  onChange={() =>
                    handleMultiSelect("under500", priceOptions, setPriceOptions)
                  }
                />
                <span className="checkmark"></span>
                <p>Under ₹500</p>
              </label>

              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={priceOptions.includes("over500")}
                  onChange={() =>
                    handleMultiSelect("over500", priceOptions, setPriceOptions)
                  }
                />
                <span className="checkmark"></span>
                <p>Over ₹500</p>
              </label>
            </div>
            <div className="price-slider-section">
              <div className="price-display">
                ₹{minPrice} - ₹{maxPrice}
              </div>

              <div className="range-slider">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))
                  }
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))
                  }
                />
                <div className="slider-track"></div>
                <div
                  className="slider-range"
                  style={{
                    left: `${(minPrice / 1000) * 100}%`,
                    right: `${100 - (maxPrice / 1000) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="filter-section-line-type2"></div>
          <div className="filter-section-line-type3"></div>

          {/* DISCOUNT */}
          <div className="discount-filter filter-type">
            <div className="filter-title">
              <p>Discount</p>
            </div>
            <div className="checkbox-menu checkbox-menu-discount">
              {[10, 30].map((d) => (
                <label key={d} className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={discountFilter.includes(d)}
                    onChange={() =>
                      handleMultiSelect(d, discountFilter, setDiscountFilter)
                    }
                  />
                  <span className="checkmark"></span>
                  <p> {d}% or more</p>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section-line-type2"></div>
          <div className="filter-section-line-type3"></div>

          {/* CATEGORY */}
          <div className="product-category-filter filter-type">
            <div className="filter-title">
              <p>Product Category</p>
            </div>
            <div className="checkbox-menu checkbox-menu-product-category">
              {["Car", "Bike", "Educational Toy", "Wooden Toys"].map((cat) => (
                <label key={cat} className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(cat)}
                    onChange={() =>
                      handleMultiSelect(
                        cat,
                        selectedCategory,
                        setSelectedCategory,
                      )
                    }
                  />
                  <span className="checkmark"></span>
                  <p> {cat}</p>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section-line-type2"></div>
          <div className="filter-section-line-type3"></div>

          {/* AVAILABILITY */}
          <div className="availability-filter filter-type">
            <div className="filter-title">
              <p>Availability</p>
            </div>
            <div className="checkbox-menu checkbox-menu-price">
              <label className="custom-checkbox">
                <input
                  type="radio"
                  name="availability"
                  onChange={() => setAvailability("in")}
                />
                <span className="checkmark"></span>
                <p> In Stock</p>
              </label>
              <label className="custom-checkbox">
                <input
                  type="radio"
                  name="availability"
                  onChange={() => setAvailability("out")}
                />
                <span className="checkmark"></span>
                <p> Out of Stock</p>
              </label>
            </div>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="product-list-section">
          <div className="top-bar">
            <p>
              Showing {displayedProducts.length} of {filteredProducts.length}{" "}
              results
            </p>

            <div className="sortbycustom" onClick={() => setOpen(!open)}>
              <BiSort className="sort-icon" />

              <span>
                {sortOption === "low-high"
                  ? "Price: Low to High"
                  : sortOption === "high-low"
                    ? "Price: High to Low"
                    : "Sort by custom"}
              </span>

              {open && (
                <div
                  className="custom-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div onClick={() => selectOption("low-high")}>
                    Price: Low to High
                  </div>
                  <div onClick={() => selectOption("high-low")}>
                    Price: High to Low
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="product-card-container">
            {displayedProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="product-img">
                  {/* ❤️ Wishlist */}
                  <div
                    className="p-wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    <FaHeart
                      className={
                        wishlist.includes(product.id)
                          ? "p-wishlist-icon active"
                          : "p-wishlist-icon"
                      }
                    />
                  </div>
                </div>

                <div className="product-details">
                  <div className="product-name">
                    <p>{product.name}</p>
                  </div>

                  <div className="second-review-age">
                    <div className="review">
                      <div className="review-icon">
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                      </div>
                      <div className="text">
                        <p>({product.reviews} Reviews)</p>
                      </div>
                    </div>

                    <div className="age">
                      <p>
                        <span>Age: </span>
                        {product.age}
                      </p>
                    </div>
                  </div>

                  <div className="price-details">
                    <p className="price">₹{product.price}</p>
                    <p className="strike">₹{product.originalPrice}</p>

                    <span className="discount-badge">-{product.discount}%</span>
                  </div>

                  <div className="delivery">
                    <img src={deliverylogo} alt="delivery" />
                    <p>
                      <span>Estimated delivery : </span> 3 - 5 working days
                    </p>
                  </div>

                  <button
                    className="add-cart-to-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <div className="pagination">
              <button
                className="nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt; Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-btn ${currentPage === i + 1 ? "active-page" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="nav-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productpage;
