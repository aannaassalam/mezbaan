import React from "react";

function Reservations() {
  return (
    <section id="mu-reservation">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="mu-reservation-area">
              <div class="mu-title">
                <span class="mu-subtitle">Make A</span>
                <h2>Reservation</h2>
              </div>

              <div class="mu-reservation-content">
                <p>
                  Want to Dine-in? Book a Reservation for a comfortable Dine-in
                  experience
                </p>

                <div class="col-md-6">
                  <div class="mu-reservation-left">
                    <form class="mu-reservation-form">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Full Name"
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Phone Number"
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <select class="form-control">
                              <option value="0">How Many?</option>
                              <option value="1 Person">1 Person</option>
                              <option value="2 People">2 People</option>
                              <option value="3 People">3 People</option>
                              <option value="4 People">4 People</option>
                              <option value="5 People">5 People</option>
                              <option value="6 People">6 People</option>
                              <option value="7 People">7 People</option>
                              <option value="8 People">8 People</option>
                              <option value="9 People">9 People</option>
                              <option value="10 People">10 People</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              id="datepicker"
                              placeholder="Date"
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <textarea
                              class="form-control"
                              cols="30"
                              rows="10"
                              placeholder="Your Message"
                            ></textarea>
                          </div>
                        </div>
                        <button type="submit" class="mu-readmore-btn">
                          Make Reservation
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="col-md-5 col-md-offset-1">
                  <div class="mu-reservation-right">
                    <div class="mu-opening-hour">
                      <h2>Opening Hours</h2>
                      <ul class="list-unstyled">
                        <li>
                          <p>Monday &#8211; Sunday</p>
                          <p>12:00 PM - 11:30 PM</p>
                        </li>
                        {/* <li>
                          <p>Wednesday &amp; Thursday</p>
                          <p>9:00 AM - Midnight</p>
                        </li>
                        <li>
                          <p>Friday &amp; Saturday</p>
                          <p>9:00 AM - Midnight</p>
                        </li>
                        <li>
                          <p>Sunday</p>
                          <p>9:00 AM - 11:00 PM</p>
                        </li> */}
                      </ul>
                    </div>
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

export default Reservations;
