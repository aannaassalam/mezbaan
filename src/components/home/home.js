import React from "react";
import img from "../../img/slider/7.jpg";
import img2 from "../../img/slider/9.jpg";
import img3 from "../../img/slider/8.jpg";

function Home() {
  return (
    <section id="mu-slider">
      <div class="mu-slider-area">
        {/* <!-- Top slider --> */}
        <div class="mu-top-slider">
          {/* <!-- Top slider single slide --> */}
          <div class="mu-top-slider-single">
            <img src={img} alt="img" />
            {/* <!-- Top slider content --> */}
            <div class="mu-top-slider-content">
              <span class="mu-slider-small-title">Welcome</span>
              <h2 class="mu-slider-title">To The Mezban</h2>
              <p>Relish the Delicacy of Kolkata</p>
              <a
                href="#mu-reservation"
                class="mu-readmore-btn mu-reservation-btn"
              >
                BOOK A TABLE
              </a>
            </div>
            {/* <!-- / Top slider content --> */}
          </div>
          {/* <!-- / Top slider single slide -->     */}

          {/* <!-- Top slider single slide --> */}
          <div class="mu-top-slider-single">
            <img src={img2} alt="img" />
            {/* <!-- Top slider content --> */}
            <div class="mu-top-slider-content">
              <span class="mu-slider-small-title">The Elegant</span>
              <h2 class="mu-slider-title">Mughlai Restaurant</h2>
              <p>A Kolkata Flavoured Resturant</p>
              <a
                href="#mu-reservation"
                class="mu-readmore-btn mu-reservation-btn"
              >
                BOOK A TABLE
              </a>
            </div>
            {/* <!-- / Top slider content --> */}
          </div>
          {/* <!-- / Top slider single slide -->  */}

          {/* <!-- Top slider single slide --> */}
          <div class="mu-top-slider-single">
            <img src={img3} alt="img" />
            {/* <!-- Top slider content --> */}
            <div class="mu-top-slider-content">
              <span class="mu-slider-small-title">Delicious</span>
              <h2 class="mu-slider-title">Spicy Masalas</h2>
              <p>Flavours directly from the streets of Kolkata</p>
              <a
                href="#mu-reservation"
                class="mu-readmore-btn mu-reservation-btn"
              >
                BOOK A TABLE
              </a>
            </div>
            {/* <!-- / Top slider content --> */}
          </div>
          {/* <!-- / Top slider single slide -->    */}
        </div>
      </div>
    </section>
  );
}

export default Home;
