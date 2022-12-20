import React, { useEffect, useState } from "react";
import "./gallery.css";
import img from "../../img/gallery/1.jpg";
import crosshair from "../../img/plus.png";
import firebase from "firebase";
import Slider from "react-slick";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      division: 0,
      loading: true,
      currentIndex: 0,
      slider: false,
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("gallery")
      .doc("q9YBvYXAbCTokIt5IUA1")
      .get()
      .then((doc) => {
        this.setState({
          images: doc.data().images.slice(0, 16),
          division: doc.data().images.slice(0, 16).length / 4,
          loading: false,
        });
      });
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <section id="mu-gallery">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="mu-gallery-area">
                <div class="mu-title">
                  <span class="mu-subtitle">Discover</span>
                  <h2>Our Gallery</h2>
                </div>

                <div class="mu-gallery-content">
                  {/* <!-- Start gallery image --> */}
                  <div class="column">
                    {/* <!-- start single gallery image --> */}
                    {this.state.images?.map(
                      (image, index) =>
                        index < this.state.division && (
                          <div class="mu-single-gallery" key={index}>
                            <div class="mu-single-gallery-item">
                              <figure
                                class="mu-single-gallery-img"
                                onClick={() => {
                                  this.setState(
                                    {
                                      currentIndex: index,
                                      slider: true,
                                    },
                                    () =>
                                      this.slider.slickGoTo(
                                        this.state.currentIndex
                                      )
                                  );

                                  document.getElementsByTagName(
                                    "body"
                                  )[0].style.overflow = "hidden";
                                }}
                              >
                                {/* <a class="mu-imglink" href={image}> */}
                                <img alt="img" src={image} />
                                <div class="mu-single-gallery-info">
                                  <img
                                    class="mu-view-btn"
                                    src={crosshair}
                                    alt="plus icon img"
                                  />
                                </div>
                                {/* </a> */}
                              </figure>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                  <div class="column">
                    {/* <!-- start single gallery image --> */}
                    {this.state.images?.map(
                      (image, index) =>
                        index >= this.state.division &&
                        index < this.state.division * 2 && (
                          <div class="mu-single-gallery" key={index}>
                            <div class="mu-single-gallery-item">
                              <figure
                                class="mu-single-gallery-img"
                                onClick={() => {
                                  this.setState(
                                    {
                                      currentIndex: index,
                                      slider: true,
                                    },
                                    () =>
                                      this.slider.slickGoTo(
                                        this.state.currentIndex
                                      )
                                  );

                                  document.getElementsByTagName(
                                    "body"
                                  )[0].style.overflow = "hidden";
                                }}
                              >
                                {/* <a class="mu-imglink" href={image}> */}
                                <img alt="img" src={image} />
                                <div class="mu-single-gallery-info">
                                  <img
                                    class="mu-view-btn"
                                    src={crosshair}
                                    alt="plus icon img"
                                  />
                                </div>
                                {/* </a> */}
                              </figure>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                  <div class="column">
                    {/* <!-- start single gallery image --> */}
                    {this.state.images?.map(
                      (image, index) =>
                        index >= this.state.division * 2 &&
                        index < this.state.division * 3 && (
                          <div class="mu-single-gallery" key={index}>
                            <div class="mu-single-gallery-item">
                              <figure
                                class="mu-single-gallery-img"
                                onClick={() => {
                                  this.setState(
                                    {
                                      currentIndex: index,
                                      slider: true,
                                    },
                                    () =>
                                      this.slider.slickGoTo(
                                        this.state.currentIndex
                                      )
                                  );

                                  document.getElementsByTagName(
                                    "body"
                                  )[0].style.overflow = "hidden";
                                }}
                              >
                                {/* <a class="mu-imglink" href={image}> */}
                                <img alt="img" src={image} />
                                <div class="mu-single-gallery-info">
                                  <img
                                    class="mu-view-btn"
                                    src={crosshair}
                                    alt="plus icon img"
                                  />
                                </div>
                                {/* </a> */}
                              </figure>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                  <div class="column">
                    {/* <!-- start single gallery image --> */}
                    {this.state.images?.map(
                      (image, index) =>
                        index >= this.state.division * 3 &&
                        index < this.state.division * 4 && (
                          <div class="mu-single-gallery" key={index}>
                            <div class="mu-single-gallery-item">
                              <figure
                                class="mu-single-gallery-img"
                                onClick={() => {
                                  this.setState(
                                    {
                                      currentIndex: index,
                                      slider: true,
                                    },
                                    () =>
                                      this.slider.slickGoTo(
                                        this.state.currentIndex
                                      )
                                  );

                                  document.getElementsByTagName(
                                    "body"
                                  )[0].style.overflow = "hidden";
                                }}
                              >
                                {/* <a class="mu-imglink" href={image}> */}
                                <img alt="img" src={image} />
                                <div class="mu-single-gallery-info">
                                  <img
                                    class="mu-view-btn"
                                    src={crosshair}
                                    alt="plus icon img"
                                  />
                                </div>
                                {/* </a> */}
                              </figure>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
                <button
                  className="mu-readmore-btn"
                  onClick={() => (window.location.href = "/gallery")}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.slider ? (
          <div className="slider">
            <i
              className="fa fa-times"
              onClick={() =>
                this.setState(
                  {
                    slider: false,
                  },
                  () =>
                    (document.getElementsByTagName("body")[0].style.overflow =
                      "auto")
                )
              }
            ></i>
            <Slider ref={(slider) => (this.slider = slider)} {...settings}>
              {this.state.images.map((image, index) => {
                return (
                  <div className="sliderImage" key={index}>
                    <img src={image} alt="" />;
                  </div>
                );
              })}
            </Slider>
          </div>
        ) : null}
      </section>
    );
  }
}
