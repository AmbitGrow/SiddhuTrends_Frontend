import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baby from "../../assets/Photos/baby.png";
import cheerKids from "../../assets/Photos/cheerKids.png";
import "./Homepage.css";

function Homepage() {
const navigate = useNavigate();
const [count, setCount] = useState(0)


  const [activeCard, setActiveCard] = useState(0);

  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % 3);
  };

  const prevCard = () => {
    setActiveCard((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <>
  <div className="sba">
        <div className="card1">
          <p className="card-p1">0 - 12 MONTHS</p>
          <p className="card-p2 ">BABY TOYS</p>
          <img src={baby} alt="Baby"/>
        </div>
        <div className="card2">
          <p className="card-p1">1 - 2 YEARS</p>
          <p className="card-p2">TODDLERS</p>
        </div>
        <div className="card3">
          <p className="card-p1">3 - 5 YEARS</p>
          <p className="card-p2">PRE - SCHOOL KIDS</p>
        </div>
        <div className="card4">
          <p className="card-p1">6 - 8 YEARS</p>
          <p className="card-p2">EARLY SCHOOL KIDS</p>
        </div>
        <div className="card5">
          <p className="card-p1">9 - 12 YEARS</p>
          <p className="card-p2">PRE - TEENS</p>
        </div>
      </div>

<br/>

<div class="fav-products-section">
<div class="fav-header">

  <div class="fav-header-left">
    <h2>Kids’ Favorites</h2><br/>
    <p>Loved by kids, trusted by parents our most loved toys.</p>
  </div>

  <div class="fav-header-right">
    <a href="#">View all →</a>
  </div>
</div>
<br/><br/>
  <div class="fav-products-grid">
    <div class="fav-product-card">
      <div class="fav-image-border">
      <div class="fav-img-box">
        <div class="fav-heart">♡</div>
        </div>
      </div>
      <br/>

      <h3 class="fav-product-name">
        LED Police Supercar Toy for Kids Light up 911 Patrol Car
      </h3>

      <div class="fav-rating">
        ⭐ ⭐ ⭐ ⭐ ⭐ <span>(35 Review)</span>
      </div>

      <div class="fav-bottom-row">
        <div class="fav-price-group">
          <span class="fav-price">₹259</span>
          <span class="fav-old-price">₹500</span>
          <span class="fav-discount">-30%</span>
        </div>

        <button class="fav-cart-btn">Add to cart</button>
      </div>
    </div>


    <div class="fav-product-card"><div class="fav-image-border"><div class="fav-img-box"><div class="fav-heart">♡</div></div></div><br/><h3 class="fav-product-name">LED Police Supercar Toy for Kids Light up 911 Patrol Car</h3><div class="fav-rating">⭐ ⭐ ⭐ ⭐ ⭐ <span>(35 Review)</span></div><div class="fav-bottom-row"><div class="fav-price-group"><span class="fav-price">₹259</span><span class="fav-old-price">₹500</span><span class="fav-discount">-30%</span></div><button class="fav-cart-btn">Add to cart</button></div></div>

    <div class="fav-product-card"><div class="fav-image-border"><div class="fav-img-box"><div class="fav-heart">♡</div></div></div><br/><h3 class="fav-product-name">LED Police Supercar Toy for Kids Light up 911 Patrol Car</h3><div class="fav-rating">⭐ ⭐ ⭐ ⭐ ⭐ <span>(35 Review)</span></div><div class="fav-bottom-row"><div class="fav-price-group"><span class="fav-price">₹259</span><span class="fav-old-price">₹500</span><span class="fav-discount">-30%</span></div><button class="fav-cart-btn">Add to cart</button></div></div>

    <div class="fav-product-card"><div class="fav-image-border"><div class="fav-img-box"><div class="fav-heart">♡</div></div></div><br/><h3 class="fav-product-name">LED Police Supercar Toy for Kids Light up 911 Patrol Car</h3><div class="fav-rating">⭐ ⭐ ⭐ ⭐ ⭐ <span>(35 Review)</span></div><div class="fav-bottom-row"><div class="fav-price-group"><span class="fav-price">₹259</span><span class="fav-old-price">₹500</span><span class="fav-discount">-30%</span></div><button class="fav-cart-btn">Add to cart</button></div></div>

    <div class="fav-product-card"><div class="fav-image-border"><div class="fav-img-box"><div class="fav-heart">♡</div></div></div><br/><h3 class="fav-product-name">LED Police Supercar Toy for Kids Light up 911 Patrol Car</h3><div class="fav-rating">⭐ ⭐ ⭐ ⭐ ⭐ <span>(35 Review)</span></div><div class="fav-bottom-row"><div class="fav-price-group"><span class="fav-price">₹259</span><span class="fav-old-price">₹500</span><span class="fav-discount">-30%</span></div><button class="fav-cart-btn">Add to cart</button></div></div>

    <div class="fav-product-card"><div class="fav-image-border"><div class="fav-img-box"><div class="fav-heart">♡</div></div></div><br/><h3 class="fav-product-name">LED Police Supercar Toy for Kids Light up 911 Patrol Car</h3><div class="fav-rating">⭐ ⭐ ⭐ ⭐ ⭐ <span>(35 Review)</span></div><div class="fav-bottom-row"><div class="fav-price-group"><span class="fav-price">₹259</span><span class="fav-old-price">₹500</span><span class="fav-discount">-30%</span></div><button class="fav-cart-btn">Add to cart</button></div></div>

  </div>

</div>



    <div className="carousel-main">

      {/* ================= YELLOW CARD ================= */}
      {activeCard === 0 && (
        <div className="carousel-card yellow">

          <div className="carousel-top">
            <div>
              <h2>Saravanan, still looking for these ?</h2>
              <p>Based on your recent views</p>
            </div>
            <div className="dots">•••</div>
          </div>

          <div className="carousel-items">
            {[1, 2, 3, 4].map((item) => (
              <div className="carousel-product" key={item}>
                <div className="img-box"></div>
                <span>Soft Cotton Shirts</span>
              </div>
            ))}
          </div>

          <div className="carousel-nav">
            <button onClick={prevCard} className="nav-btn dark">←</button>
            <button onClick={nextCard} className="nav-btn light">→</button>
          </div>

        </div>
      )}

      {/* ================= PURPLE CARD ================= */}
      {activeCard === 1 && (
        <div className="carousel-card purple">

          <div className="carousel-top">
            <div>
              <h2>New Arrivals</h2>
              <p>Fresh picks your little ones will love</p>
            </div>
            <div className="dots">•••</div>
          </div>

          <div className="carousel-items">
            {[1, 2, 3, 4].map((item) => (
              <div className="carousel-product" key={item}>
                <div className="img-box"></div>
                <span>Wooden Car Toy</span>
              </div>
            ))}
          </div>

          <div className="carousel-nav">
            <button onClick={prevCard} className="nav-btn dark">←</button>
            <button onClick={nextCard} className="nav-btn light">→</button>
          </div>

        </div>
      )}

      {/* ================= MULTICOLOR CARD ================= */}
      {activeCard === 2 && (
        <div className="carousel-card multi">

          <div className="carousel-top">
            <div>
              <h2>Trending</h2>
              <p>Fresh picks your little ones will love</p>
            </div>
            <div className="dots">•••</div>
          </div>

          <div className="carousel-items">
            {[1, 2, 3, 4].map((item) => (
              <div className="carousel-product" key={item}>
                <div className="img-box"></div>
                <span>Wooden Car Toy</span>
              </div>
            ))}
          </div>

          <div className="carousel-nav">
            <button onClick={prevCard} className="nav-btn dark">←</button>
            <button onClick={nextCard} className="nav-btn light">→</button>
          </div>

        </div>
      )}

    </div>





    <div className='join-card'>
    <div className='join-card-fonts'>
      <p className="join-card-heading">Join Our Kids Club</p>
      <p className='join-card-quote'>Get toy updates, play ideas, special offers, and rewards carefully curated for your child's age.</p>
      <div className='input-container'>
        <input type="text" placeholder='Enter your number'></input>
        <button>Join Now</button>
      </div>
    </div>
    <div className='join-card-image'>
      <img src={cheerKids} alt="hi" />
    </div>
      </div>
      </>
  );
}

export default Homepage;