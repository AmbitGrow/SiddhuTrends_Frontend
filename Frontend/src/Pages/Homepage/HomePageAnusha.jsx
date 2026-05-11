import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePageAnusha.css";

// ─── placeholder image paths (swap with real assets) ───────────────────────
import baby from "../../assets/Photos/baby.png";
import cheerKids from "../../assets/Photos/cheerKids.png";
import dress1 from "../../assets/Photos/dress1.png";
import giftbox from "../../assets/Photos/gift-box 1.png";
import train from "../../assets/Photos/train.png";
import wheel from "../../assets/Photos/wheels.png";
import bluebaby from "../../assets/Photos/bluebaby.png";
import babyacc from "../../assets/Photos/babyacc.png";
import hands from "../../assets/Photos/hands.png";
import sleepbaby from "../../assets/Photos/sleepbaby.png";
import towelbaby from "../../assets/Photos/towelbaby.png";
import blankets from "../../assets/Photos/blankets.png";

// ─── tiny helpers ───────────────────────────────────────────────────────────
const StarRating = ({ count = 5 }) => (
  <span className="stars">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i}>★</span>
    ))}
  </span>
);

const ProductCard = ({
  name = "LED Police Supercar Toy for Kids Light up 911 Patrol Car",
  price = 259,
  oldPrice = 500,
  discount = 30,
  reviews = 35,
}) => (
  <div className="fav-product-card">
    <div className="fav-image-border">
      <div className="fav-img-box">
        <button className="fav-heart" aria-label="Wishlist">
          ♡
        </button>
      </div>
    </div>
    <h3 className="fav-product-name">{name}</h3>
    <div className="fav-rating">
      <StarRating /> <span>({reviews} Review)</span>
    </div>
    <div className="fav-bottom-row">
      <div className="fav-price-group">
        <span className="fav-price">₹{price}</span>
        <span className="fav-old-price">₹{oldPrice}</span>
        <span className="fav-discount">-{discount}%</span>
      </div>
      <button className="fav-cart-btn">Add to cart</button>
    </div>
  </div>
);

const ComboCard = () => (
  <div className="combo-card">
    <div className="combo-sale">SALE</div>
    <div className="combo-img-box"></div>
    <div className="combo-content">
      <p className="combo-title">
        Duck Sliding Toy Musical Climbing Track (Pack of 3)
      </p>
      <div className="combo-price-row">
        <span className="combo-price">₹259</span>
        <span className="combo-old">₹500</span>
        <span className="combo-save">Save ₹250</span>
      </div>
      <button className="combo-btn">Add Combo to Cart</button>
    </div>
  </div>
);

// ─── Countdown timer ────────────────────────────────────────────────────────
function useCountdown(targetSeconds) {
  const [time, setTime] = useState(targetSeconds);
  useEffect(() => {
    const id = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(time / 86400);
  const h = Math.floor((time % 86400) / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  return [d, h, m, s];
}

// ─── Carousel slides data ────────────────────────────────────────────────────
const SLIDES = [
  {
    key: "yellow",
    title: "Saravanan, still looking for these?",
    sub: "Based on your recent views",
    items: [
      "Soft Cotton Shirts",
      "Soft Cotton Shirts",
      "Soft Cotton Shirts",
      "Soft Cotton Shirts",
    ],
  },
  {
    key: "purple",
    title: "New Arrivals",
    sub: "Fresh picks your little ones will love",
    items: [
      "Woodlen Car Toy",
      "Woodlen Car Toy",
      "Woodlen Car Toy",
      "Woodlen Car Toy",
    ],
  },
  {
    key: "multi",
    title: "Trending Now",
    sub: "Fresh picks your little ones will love",
    items: [
      "Woodlen Car Toy",
      "Woodlen Car Toy",
      "Woodlen Car Toy",
      "Woodlen Car Toy",
    ],
  },
];

// ─── Review cards data ───────────────────────────────────────────────────────
const REVIEWS = [
  {
    text: "The toy quality is really good and exactly as shown. My son was very happy, and delivery was on time. COD option made me feel safe ordering.",
    name: "Ramesh Kumar",
    role: "Father of a 4 year old",
    location: "Coimbatore",
    color: "",
  },
  {
    text: "Good packaging, safe toys, and quick delivery. I will definitely order again for birthdays and festivals.",
    name: "Meera R",
    role: "Mother of two kids",
    location: "Salem",
    color: "",
  },
  {
    text: "I was confused what toy to buy, but the age-based section helped me a lot. My daughter loved the toy and keeps playing with it daily.",
    name: "Meera R",
    role: "Mother of two kids",
    location: "Salem",
    color: "",
  },
  {
    text: "My teddy is so soft, I sleep with it.",
    name: "Nila",
    role: "Age 4",
    location: "",
    color: "green",
    quote: true,
  },
  {
    text: "Good packaging, safe toys, and quick delivery. I will definitely order again for birthdays and festivals.",
    name: "Meera R",
    role: "Mother of two kids",
    location: "Salem",
    color: "",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
export default function Homepage() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const [days, hours, mins, secs] = useCountdown(
    5 * 86400 + 22 * 3600 + 45 * 60 + 14,
  );

  const nextSlide = () => setSlide((p) => (p + 1) % SLIDES.length);
  const prevSlide = () =>
    setSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  const scrollCategories = () =>
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  const activeSlide = SLIDES[slide];

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <h1>
              Bring&nbsp;joy to every
              <br />
              little playtime.
            </h1>
            <p className="hero-subtext">
              Carefully selected toys that inspire learning, creativity, and
              happiness&nbsp;— trusted by parents and loved by kids.
            </p>
            <button className="shop-btn" onClick={() => navigate("/products")}>
              Shop Now
            </button>
          </div>

          <div className="hero-right">
            <div className="trusted-box">
              <div className="trusted-top">
                <div className="avatar-group">
                  <div className="avatar" />
                  <div className="avatar" />
                  <div className="avatar" />
                </div>
                <p className="trusted-title">
                  Trusted by <strong>Happy Parents</strong>
                </p>
              </div>
              <p className="trusted-desc">
                Toys that bring joy, learning, and safe play into everyday
                childhood moments.
              </p>
            </div>
          </div>
        </div>

        <div className="toy-image-wrapper">
          <img src={hands} alt="Kids holding toys" className="toy-image" />
        </div>

        <div className="cloud">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,80 Q180,40 360,80 T720,80 T1080,80 T1440,80 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SHOP BY AGE
      ══════════════════════════════════════════════════ */}
      <section className="sba-section">
        <h2 className="section-title">Shop by Age</h2>

        <div className="sba">
          <div className="sba-card card1">
            <p className="card-p1">0 – 12 MONTHS</p>
            <p className="card-p2">BABY TOYS</p>
            <img src={baby} alt="Baby toys" />
          </div>
          <div className="sba-card card2">
            <p className="card-p1">1 – 2 YEARS</p>
            <p className="card-p2">TODDLERS</p>
          </div>
          <div className="sba-card card3">
            <p className="card-p1">3 – 5 YEARS</p>
            <p className="card-p2">PRE – SCHOOL KIDS</p>
          </div>
          <div className="sba-card card4">
            <p className="card-p1">6 – 8 YEARS</p>
            <p className="card-p2">EARLY SCHOOL KIDS</p>
          </div>
          <div className="sba-card card5">
            <p className="card-p1">9 – 12 YEARS</p>
            <p className="card-p2">PRE – TEENS</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EXPLORE POPULAR CATEGORIES
      ══════════════════════════════════════════════════ */}
      <section className="categories-section">
        <div className="categories-header">
          <p>Explore Popular Categories</p>
          <span className="view-all">View all &rsaquo;</span>
        </div>

        <div className="categories-wrapper">
          <div className="categories-container" ref={scrollRef}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="category-card" key={i}>
                <div className="category-circle" />
                <p>Car</p>
              </div>
            ))}
          </div>
          <button
            className="scroll-btn"
            onClick={scrollCategories}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SHOP FOR BABIES
      ══════════════════════════════════════════════════ */}
      <section className="sfb">
        <p className="sfb-heading">Shop for Babies</p>
        <p className="sfb-content">
          Comfortable clothing and essentials for little ones
        </p>

        <div className="sfb-grid">
          {/* Row 1 */}
          <div className="sfb-grid1">
            <div className="sfb-card1">
              <div className="sfb-card1-content">
                <div className="sfb-card1-text-section">
                  <div>
                    <h2>
                      Baby
                      <br />
                      Dresses
                    </h2>
                    <p className="sfb-card1-subtitle">Everyday Comfort</p>
                  </div>
                  <button className="sfb-card1-btn">Shop Now</button>
                </div>
              </div>
              <div className="sfb-card1-image-section">
                <img src={dress1} alt="Baby Dress" />
              </div>
            </div>

            <div className="sfb-card sfb-card2">
              <div className="sfb-card1-content">
                <div className="sfb-card1-text-section">
                  <div>
                    <h2>
                      Towels &amp;
                      <br />
                      Swaddles
                    </h2>
                    <p className="sfb-card1-subtitle">Warm &amp; Soft</p>
                  </div>
                  <button className="sfb-card1-btn">Explore Now</button>
                </div>
              </div>
              <div className="sfb-card2-image-section">
                <img src={towelbaby} alt="Towels and Swaddles" />
              </div>
            </div>

            <div className="sfb-card sfb-card3">
              <div className="sfb-card1-content">
                <div className="sfb-card1-text-section">
                  <div>
                    <h2>
                      Diapers &amp;
                      <br />
                      Nappies
                    </h2>
                    <p className="sfb-card1-subtitle">All-Day Care</p>
                  </div>
                  <button className="sfb-card1-btn sfb-dark-btn">
                    View Collection
                  </button>
                </div>
              </div>
              <div className="sfb-card3-image-section">
                <img src={sleepbaby} alt="Diapers and Nappies" />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="sfb-grid2">
            <div className="sfb-card sfb-card4">
              <div className="sfb-card1-content">
                <div className="sfb-card1-text-section">
                  <div>
                    <h2>
                      Blankets &amp;
                      <br />
                      Quilts
                    </h2>
                    <p className="sfb-card1-subtitle">Sleep Comfort</p>
                  </div>
                  <button className="sfb-card1-btn sfb-dark-btn">
                    View Collection
                  </button>
                </div>
              </div>
              <div className="sfb-card4-image-section">
                <img src={blankets} alt="Blankets and Quilts" />
              </div>
            </div>

            <div className="sfb-card sfb-card5">
              <div className="sfb-card1-content">
                <div className="sfb-card1-text-section">
                  <div>
                    <h2>
                      Baby
                      <br />
                      Accessories
                    </h2>
                    <p className="sfb-card1-subtitle">Little Helpers</p>
                  </div>
                  <button className="sfb-card1-btn sfb-dark-btn">Shop Now</button>
                </div>
              </div>
              <div className="sfb-card5-image-section">
                <img src={babyacc} alt="Baby Accessories" />
              </div>
            </div>

            <div className="sfb-card6">
              <div className="sfb-card1-content">
                <div className="sfb-card1-text-section">
                  <div>
                    <h2>
                      Caps, Mittens &amp;
                      <br />
                      Booties
                    </h2>
                    <p className="sfb-card1-subtitle">Tiny Essentials</p>
                  </div>
                  <button className="sfb-card1-btn">Explore Now</button>
                </div>
              </div>
              <div className="sfb-card6-image-container">
                <img src={bluebaby} alt="Baby Essentials" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          KIDS' FAVORITES
      ══════════════════════════════════════════════════ */}
      <section className="fav-products-section">
        <div className="fav-header">
          <div className="fav-header-left">
            <h2>Kids&apos; Favorites</h2>
            <p>Loved by kids, trusted by parents — our most loved toys.</p>
          </div>
          <a href="#" className="fav-header-right">
            View all →
          </a>
        </div>

        <div className="fav-products-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SMART COMBO DEALS
      ══════════════════════════════════════════════════ */}
      <section className="combo-section">
        <div className="combo-header">
          <h2 className="combo-heading-main">Smart Combo Deals</h2>
          <p className="combo-heading-sub">More toys, more fun, more savings</p>
        </div>

        <div className="combo-wrapper">
          <ComboCard />
          <ComboCard />
          <ComboCard />
        </div>

        <div className="combo-view-btn-wrap">
          <button className="combo-view-btn">
            <span className="combo-view-text">View All</span>
            <span className="combo-view-arrow">→</span>
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PERSONALIZED CAROUSEL + PROMO GRID
      ══════════════════════════════════════════════════ */}
       <div className="overall-card">
        {/* Carousel */}
        <div className="carousel-main">
          <div className={`carousel-card ${activeSlide.key}`}>
            <div className="carousel-top">
              <div>
                <h2>{activeSlide.title}</h2>
                <p>{activeSlide.sub}</p>
              </div>
              <div className="carousel-dots">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === slide ? "dot-active" : ""}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
 
            <div className="carousel-items">
              {activeSlide.items.map((label, i) => (
                <div className="carousel-product" key={i}>
                  <div className="carousel-product-card">
                    <div className="img-box" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
 
            <div className="carousel-nav">
              <button onClick={prevSlide} className="nav-btn dark" aria-label="Previous">←</button>
              <button onClick={nextSlide} className="nav-btn light" aria-label="Next">→</button>
            </div>
          </div>
        </div>

        {/* Promo Grid */}
        <div className="promo-grid">
          {/* Starting ₹99 */}
          <div className="starting-card">
            <div className="starting-card-top">
              <div className="starting-card-content">
                <p className="starting-card-heading">Starting ₹99</p>
                <p className="starting-card-para">
                  Cars, rattles, puzzles &amp; more
                </p>
              </div>
              <div className="starting-card-sub" />
            </div>
            <div className="starting-card-bottom">
              <div className="starting-card-sub" />
              <div className="starting-card-sub" />
              <div className="starting-card-sub" />
            </div>
          </div>

          {/* Fun Zone – Countdown */}
          <div className="funz-card">
            <div className="funz-content">
              <h2>Fun Zone for Kids</h2>
              <p>on every sunday</p>
            </div>
            <div className="countdown-box">
              {[
                ["Days", days],
                ["Hours", hours],
                ["Minutes", mins],
                ["Seconds", secs],
              ].map(([label, val], i, arr) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="time-block">
                    <span className="time">{String(val).padStart(2, "0")}</span>
                    <span className="cd-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="divider" />}
                </div>
              ))}
            </div>
            <img src={wheel} alt="Spin wheel" className="wheel" />
          </div>

          {/* Rewards & Play — must share the "bottom" grid area */}
          <div className="promo-bottom-row">
            <div className="reward-card">
              <div className="reward-content">
                <h2>Rewards &amp; XP</h2>
                <p>Shop, play &amp; earn exciting rewards</p>
              </div>
              <button className="reward-btn">View Rewards</button>
              <img src={giftbox} alt="Gift" className="reward-gift" />
            </div>

            <div className="play-card">
              <div className="play-content">
                <h2>Play &amp; Earn XP</h2>
                <p>Fun games for kids that reward learning and play</p>
              </div>
              <img src={train} alt="Train toy" className="train-img" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          WATCH & CHOOSE YOUR TOY
      ══════════════════════════════════════════════════ */}
      <section className="watch-section">
        <h2>Watch &amp; Choose Your Toy</h2>
        <div className="watch-scroll">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="watch-card" key={i}>
              <div className="image-box" />
              <button className="play-circle" aria-label="Play video">
                ▶
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════════════════ */}
      <section className="contact-section">
        <div className="contact-left">
          <h2>We&apos;re Here to Help!</h2>
          <p>
            Have questions about toys, orders, or delivery?
            <br />
            Our team is happy to help you anytime.
          </p>

          <div className="contact-cards">
            <div className="contact-card phone">
              <div className="icon-circle orange">📞</div>
              <h4>
                Phone / <span>WhatsApp</span>
              </h4>
              <p>Call or WhatsApp : +91 XXXXXXXXXX</p>
              <small>Available 10 AM – 7 PM</small>
            </div>

            <div className="contact-card email">
              <div className="icon-circle blue">✉️</div>
              <h4>Email</h4>
              <p>Email: support@siddhutrends.in</p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Phone or Email" />
          <textarea placeholder="Message" rows={5} />
          <button className="send-btn">
            <span className="btn-circle" />
            Send Message
            <span className="arrow-circle">↗</span>
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section className="reviews-section">
        <h2 className="reviews-title">Loved by Kids, Trusted by Parents</h2>
        <p className="reviews-sub">
          Real stories from parents and happy little moments from kids who enjoy
          our toys every day.
        </p>

        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className={`review-card ${r.color === "green" ? "review-green" : ""}`}
            >
              <p className="review-text">{r.text}</p>
              <StarRating />
              <div className="review-author">
                <div
                  className={`review-avatar ${r.color === "green" ? "av-green" : ""}`}
                />
                <div>
                  <p className="review-name">
                    {r.quote ? `— ${r.name}` : r.name}
                  </p>
                  <p className="review-role">
                    {r.role}
                    {r.location ? ` · ${r.location}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          JOIN OUR KIDS CLUB
      ══════════════════════════════════════════════════ */}
      <div className="join-card">
        <div className="join-card-fonts">
          <p className="join-card-heading">Join Our Kids Club</p>
          <p className="join-card-quote">
            Get toy updates, play ideas, special offers, and rewards — carefully
            curated for your child's age.
          </p>
          <div className="input-container">
            <input type="text" placeholder="Enter your number" />
            <button>Join Now</button>
          </div>
        </div>
        <div className="join-card-image">
          <img src={cheerKids} alt="Happy kids" />
        </div>
      </div>
    </>
  );
}
