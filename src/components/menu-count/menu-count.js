import React from "react";

export default function MenuCount() {
  return (
    <section id="mu-counter">
      <div className="counter-background"></div>
      <div class="mu-counter-overlay">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="mu-counter-area">
                <ul class="mu-counter-nav">
                  <li class="col-md-3 col-sm-3 col-xs-12">
                    <div class="mu-single-counter">
                      <span>Fresh</span>
                      <h3>
                        <span class="counter-value" data-count="50">
                          0
                        </span>
                        <sup>+</sup>
                      </h3>
                      <p>Starter Items</p>
                    </div>
                  </li>

                  <li class="col-md-3 col-sm-3 col-xs-12">
                    <div class="mu-single-counter">
                      <span>Main Course</span>
                      <h3>
                        <span class="counter-value" data-count="20">
                          0
                        </span>
                        <sup>+</sup>
                      </h3>
                      <p>Lunch Items</p>
                    </div>
                  </li>

                  <li class="col-md-3 col-sm-3 col-xs-12">
                    <div class="mu-single-counter">
                      <span>Dessert</span>
                      <h3>
                        <span class="counter-value" data-count="10">
                          0
                        </span>
                        <sup>+</sup>
                      </h3>
                      <p>Dessert Items</p>
                    </div>
                  </li>

                  <li class="col-md-3 col-sm-3 col-xs-12">
                    <div class="mu-single-counter">
                      <span>Satisfied</span>
                      <h3>
                        <span class="counter-value" data-count="1560">
                          0
                        </span>
                        <sup>+</sup>
                      </h3>
                      <p>Customers</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
