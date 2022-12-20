import axios from "axios";
import React, { useState } from "react";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [errmsg, setErrmsg] = useState("");

  // const submit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("https://mailer-anas.herokuapp.com/mailer.php", {
  //       name,
  //       email,
  //       subject,
  //       message,
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => {
  //       console.log(err.request);
  //       console.log(err.response);
  //     });
  // };

  return (
    <section id="mu-contact">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="mu-contact-area">
              <div class="mu-title">
                <span class="mu-subtitle">Get In Touch</span>
                <h2>Contact Us</h2>
              </div>

              <div class="mu-contact-content">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mu-contact-left">
                      {/* <!-- Email message div --> */}
                      <div id="form-messages"></div>
                      {/* <!-- Start contact form --> */}
                      <form
                        id="ajax-contact"
                        // onSubmit={submit}
                        class="mu-contact-form"
                      >
                        <div class="form-group">
                          <label for="name">Your Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Email address</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="subject">Subject</label>
                          <input
                            type="text"
                            class="form-control"
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="message">Message</label>
                          <textarea
                            class="form-control"
                            id="message"
                            name="message"
                            cols="30"
                            rows="10"
                            placeholder="Type Your Message"
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <button type="submit" class="mu-send-btn">
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="mu-contact-right">
                      <div class="mu-contact-widget">
                        <h3>Restaurant Address</h3>
                        {/* <p>
                          Fatehgunj main road. Near 7 Seas Mall. Opposite to Tea
                          Post. Vadodara:- 390002
                        </p> */}
                        <address>
                          <p>
                            <i class="fa fa-phone"></i>+91 73595 01418
                          </p>
                          <p>
                            <i class="fa fa-envelope-o"></i>
                            mezbanbiryani1@gmail.com
                          </p>
                          <p>
                            <i class="fa fa-map-marker"></i>Jayesh Colony,
                            Fatehgunj main road. Near 7 Seas Mall. Opposite to
                            Tea Post. Vadodara:- 390002
                          </p>
                        </address>
                      </div>
                      <div class="mu-contact-widget">
                        <h3>Open Hours</h3>
                        <address>
                          <p>
                            <span>Monday - Sunday</span> 12.00 PM to 11:30 PM
                          </p>
                          {/* <p>
                            <span>Saturday</span> 9.00 am to 10 pm
                          </p>
                          <p>
                            <span>Sunday</span> 10.00 am to 12 pm
                          </p> */}
                        </address>
                      </div>
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

export default ContactUs;
