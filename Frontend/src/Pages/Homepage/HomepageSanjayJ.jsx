import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import baby from "../../assets/Photos/baby.png";
import cheerKids from "../../assets/Photos/cheerKids.png";
import dress1 from "../../assets/Photos/dress1.png";
import giftbox from "../../assets/Photos/gift-box 1.png";
import train from "../../assets/Photos/train.png";
import wheel from "../../assets/Photos/wheels.png";
import bluebaby from "../../assets/Photos/bluebaby.png";
import sleepbaby from "../../assets/Photos/sleepbaby.png"; 
import hands from "../../assets/Photos/hands.png";
import "./HomepageSanjayJ.css";

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

    const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  

  return (
    <>
         {/* <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            Bring joy to every <br /> little playtime.
          </h1>

          <p className="hero-subtext">
            Carefully selected toys that inspire learning, creativity, and
            happiness trusted by parents and loved by kids.
          </p>

          <button className="shop-btn">Shop Now</button>
        </div>
        <div className="hero-right">
          <div className="trusted-box">
            <div className="avatar-group">
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
            </div>

            <div>
              <p className="trusted-title">
                Trusted by <strong>Happy Parents</strong>
              </p>
              <p className="trusted-desc">
                Toys that bring joy, learning, and safe play into everyday
                childhood moments.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="toy-image-wrapper">
        <img
          src={hands} 
          alt="Toys"
          className="toy-image"
        />
      </div>
      <div className="cloud">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M0,120 
               Q60,80 120,120 
               T240,120 
               T360,120 
               T480,120 
               T600,120 
               T720,120 
               T840,120 
               T960,120 
               T1080,120 
               T1200,120 
               T1320,120 
               T1440,120 
               L1440,200 
               L0,200 
               Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>  */}





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



   {/* <div className="categories-section">
      <div className="categories-header">
        <p>Explore Popular Categories</p>
        <span className="view-all">View all &gt;</span>
      </div><br/>

      <div className="categories-wrapper">
        <div className="categories-container" ref={scrollRef}>
          {[...Array(10)].map((_, index) => (
            <div className="category-card" key={index}>
              <div className="category-circle"></div>
              <p>Car</p>
            </div>
          ))}
        </div>

        <button className="scroll-btn" onClick={scrollRight}>
          &#8250;
        </button>
      </div>
    </div><br/> 







 <div className="sfb">
  <p className="sfb-heading">Shop for Babies</p>
  <p className="sfb-content">Comfortable clothing and essentials for little ones</p>
  <div className="sfb-grid">
    <div className="sfb-grid1">

  <div class="sfb-card1">
  <div class="sfb-card1-content">
    <div class="sfb-card1-text-section"><div>
      <h2>Baby<br/>Dresses</h2>
      <p class="sfb-card1-subtitle">Everyday Comfort</p></div>
      <button class="sfb-card1-btn">Shop Now</button>
    </div>
    </div>

    <div class="sfb-card1-image-section">
      <img src={dress1} alt="BabyDress"/>
    </div>
  
</div>
    <div className="sfb-card2"></div>
    <div className="sfb-card3"></div>
    </div>
    <div className="sfb-grid2">
    <div className="sfb-card4"></div>
    <div className="sfb-card5"></div>
    <div className="sfb-card6">
      <div className="sfb-card1-content">
        <div className="sfb-card1-text-section">
          <div><h2>
            Caps, Mittens & <br />
            Booties
          </h2>
          <p className="sfb-card1-subtitle">Tiny Essentials</p></div>
          <button className="sfb-card1-btn">Explore Now</button>
        </div>

        <div className="sfb-card6-image-container">
          <img className="bluebaby" src={bluebaby} alt="Baby Essentials" />
        </div>
      </div>
    </div>
    </div>
  </div>
</div>


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


<div className="combo-section">

<div class="combo-header">

  <h2 class="combo-heading-main">Smart Combo Deals</h2>
  <p class="combo-heading-sub">More toys, more fun, more savings</p><br/>

</div>

    <div className='combo-wrapper'>
    <div class="combo-card">

  <div class="combo-sale">SALE</div>

  <div class="combo-img-box"></div>

  <div class="combo-content">

    <p class="combo-title">
      Duck Sliding Toy Musical Climbing Track (Pack of 3)
    </p>

    <div class="combo-price-row">
      <span class="combo-price">₹259</span>
      <span class="combo-old">₹500</span>
      <span class="combo-save">Save ₹250</span>
    </div>

    <button class="combo-btn">Add Combo to Cart</button>

  </div>
</div>
 <div class="combo-card">

  <div class="combo-sale">SALE</div>

  <div class="combo-img-box"></div>

  <div class="combo-content">

    <p class="combo-title">
      Duck Sliding Toy Musical Climbing Track (Pack of 3)
    </p>

    <div class="combo-price-row">
      <span class="combo-price">₹259</span>
      <span class="combo-old">₹500</span>
      <span class="combo-save">Save ₹250</span>
    </div>

    <button class="combo-btn">Add Combo to Cart</button>

  </div>
</div>
 <div class="combo-card">

  <div class="combo-sale">SALE</div>

  <div class="combo-img-box"></div>

  <div class="combo-content">

    <p class="combo-title">
      Duck Sliding Toy Musical Climbing Track (Pack of 3)
    </p>

    <div class="combo-price-row">
      <span class="combo-price">₹259</span>
      <span class="combo-old">₹500</span>
      <span class="combo-save">Save ₹250</span>
    </div>

    <button class="combo-btn">Add Combo to Cart</button>

  </div>
</div>
</div> <br/>

<div class="combo-view-btn-wrap">
  <button class="combo-view-btn">
    <span class="combo-view-text">View All</span>
    <span class="combo-view-arrow">→</span>
  </button>
</div> </div>






<div className="overall-card">
    <div className="carousel-main">
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
   <div className="grid-section">

  <div className="starting-card">
    <div className="starting-card-top">
    <div className="starting-card-content"><p className="starting-card-heading">Starting $99</p>
    <p className="starting-card-para">Cars, rattles, puzzles & more</p>
    </div>
    <div className="starting-card-sub"></div>
    </div><br/>
    <div className="starting-card-bottom">
      <div className="starting-card-sub"></div>
      <div className="starting-card-sub"></div>
      <div className="starting-card-sub"></div>
    </div>
  </div>

  <div className="grid-section-bottom">
    <div className="reward-card">
  <div className="reward-content">
    <h2>Rewards & XP</h2>
    <p>Shop, play & earn exciting rewards</p>
    <button className="reward-btn">View Rewards</button>
  </div>
  <img src={giftbox} alt="gift" className="reward-gift" />
</div>
    <div className="play-card">
  <div className="play-content">
    <h2>Play & Earn XP</h2>
    <p>Fun games for kids that reward learning and play</p>
    </div>
    <img src={train} alt="train" className="train" />
    </div>
  </div>

  <div className="funz-card">
    <div className="reward-content">
    <h2>Rewards & XP</h2>
    <p>Shop, play & earn exciting rewards</p>
  </div>
    <div class="countdown-box">
  <div class="time-block">
    <span class="time">5</span>
    <span class="label">Days</span>
  </div>

  <div class="divider"></div>

  <div class="time-block">
    <span class="time">22</span>
    <span class="label">Hours</span>
  </div>

  <div class="divider"></div>

  <div class="time-block">
    <span class="time">45</span>
    <span class="label">Minutes</span>
  </div>

  <div class="divider"></div>

  <div class="time-block">
    <span class="time">14</span>
    <span class="label">Seconds</span>
  </div>
</div>
<img src={wheel} alt="wheel" className="wheel" />
  </div>

</div>
</div><br/>




<section className="watch-section">

      <h2>Watch & Choose Your Toy</h2>

      <div className="watch-scroll">

        {[...Array(6)].map((_, i) => (
          <div className="watch-card" key={i}>

            <div className="image-box"></div>

            <div className="play-circle"></div>

          </div>
        ))}

      </div>

    </section>





    <section className="contact-section">

      <div className="contact-left">
        <h2>We’re Here to Help!</h2>
        <p>
          Have questions about toys, orders, or delivery?
          <br />
          Our team is happy to help you anytime.
        </p>

        <div className="contact-cards">

          <div className="contact-card phone">
            <div className="icon-circle orange">📞</div>
            <h4>Phone / <span>WhatsApp</span></h4>
            <p>Call or WhatsApp : +91 XXXXXXXXXX</p>
            <small>Available 10 AM – 7 PM</small>
          </div>

          <div className="contact-card email">
            <div className="icon-circle blue">📞</div>
            <h4>Email</h4>
            <p>Email: support@siddhutrends.in</p>
          </div>

        </div>
      </div>

      <div className="contact-right">

        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Phone or Email" />
        <textarea placeholder="Message"></textarea>

        <button className="send-btn">
          <span className="btn-circle"></span>
          Send Message
          <span className="arrow-circle">↗</span>
        </button>

      </div>

    </section>





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
      </div> */}
      </>
  );
}

export default Homepage;