import React from "react";
import img from "../../img/mezban-inner.jpeg";

function AboutUs() {
  return (
    <section id="mu-about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="mu-about-us-area">
              <div class="mu-title">
                <span class="mu-subtitle">Discover</span>
                <h2>ABOUT US</h2>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mu-about-us-left">
                    <img src={img} alt="img" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mu-about-us-right">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aliquam minus aliquid, itaque illum assumenda repellendus
                      dolorem, dolore numquam totam saepe, porro delectus,
                      libero enim odio quo. Explicabo ex sapiente sit eligendi,
                      facere voluptatum! Quia vero rerum sunt porro architecto
                      corrupti eaque corporis eum, enim soluta, perferendis
                      dignissimos, repellendus, beatae laboriosam.
                    </p>
                    <ul>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quia.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quia.
                      </li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Atque similique molestias est quod reprehenderit,
                      quibusdam nam qui, quam magnam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
