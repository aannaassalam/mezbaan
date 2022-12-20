import React from "react";

function Footer() {
  return (
    <footer id="mu-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="mu-footer-area">
              <div class="mu-footer-social">
                <a href="#">
                  <span class="fa fa-facebook"></span>
                </a>
                <a href="#">
                  <span class="fa fa-instagram"></span>
                </a>
              </div>
              <div class="mu-footer-copyright">
                <p>
                  &copy; Copyright{" "}
                  <a rel="nofollow" href="http://theoryDev.com">
                    TheoryDev
                  </a>
                  . All right reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
