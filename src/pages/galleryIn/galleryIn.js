import React, { Component } from "react";
import "./galleryIn.css";
import firebase from "firebase";
import Slider from "react-slick";
import Loader from "../../components/loader";
// import Loader from "../../components/loader/loader";

export default class GalleryIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      slider: false,
      currentIndex: 0,
      loading: true,
      division: 0,
      width: window.innerWidth,
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
          images: doc.data().images,
          division:
            window.innerWidth <= 680
              ? doc.data().images.length / 3
              : doc.data().images.length / 4,
          loading: false,
        });
      });
    window.onresize = () => {
      this.setState({
        width: window.innerWidth,
        division:
          window.innerWidth <= 680
            ? this.state.images.length / 3
            : this.state.images.length / 4,
      });
    };
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // customPaging: (i) => {
      //   return <img src={this.state.images[i]} alt="" className="imageDots" />;
      // },
    };
    return (
      <div className="galleryIn">
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <div className="heading">
              <h4>Gallery</h4>
            </div>
            <div className="body">
              <div className="column">
                {this.state.images.map(
                  (image, index) =>
                    index < this.state.division && (
                      <div
                        onClick={() => {
                          this.setState(
                            {
                              currentIndex: index,
                              slider: true,
                            },
                            () => this.slider.slickGoTo(this.state.currentIndex)
                          );

                          document.getElementsByTagName(
                            "body"
                          )[0].style.overflow = "hidden";
                        }}
                        key={index}
                      >
                        <img src={image} alt="" />
                      </div>
                    )
                )}
              </div>
              <div className="column">
                {this.state.images.map(
                  (image, index) =>
                    index >= this.state.division &&
                    index < this.state.division * 2 && (
                      <div
                        onClick={() => {
                          this.setState(
                            {
                              currentIndex: index,
                              slider: true,
                            },
                            () => this.slider.slickGoTo(this.state.currentIndex)
                          );

                          document.getElementsByTagName(
                            "body"
                          )[0].style.overflow = "hidden";
                        }}
                        key={index}
                      >
                        <img src={image} alt="" />
                      </div>
                    )
                )}
              </div>
              <div className="column">
                {this.state.images.map(
                  (image, index) =>
                    index >= this.state.division * 2 &&
                    index < this.state.division * 3 && (
                      <div
                        onClick={() => {
                          this.setState(
                            {
                              currentIndex: index,
                              slider: true,
                            },
                            () => this.slider.slickGoTo(this.state.currentIndex)
                          );

                          document.getElementsByTagName(
                            "body"
                          )[0].style.overflow = "hidden";
                        }}
                        key={index}
                      >
                        <img src={image} alt="" />
                      </div>
                    )
                )}
              </div>
              {this.state.width > 680 && (
                <div className="column">
                  {this.state.images.map(
                    (image, index) =>
                      index >= this.state.division * 3 &&
                      index < this.state.division * 4 && (
                        <div
                          onClick={() => {
                            this.setState(
                              {
                                currentIndex: index,
                                slider: true,
                              },
                              () =>
                                this.slider.slickGoTo(this.state.currentIndex)
                            );

                            document.getElementsByTagName(
                              "body"
                            )[0].style.overflow = "hidden";
                          }}
                          key={index}
                        >
                          <img src={image} alt="" />
                        </div>
                      )
                  )}
                </div>
              )}
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
                        (document.getElementsByTagName(
                          "body"
                        )[0].style.overflow = "auto")
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
          </>
        )}
      </div>
    );
  }
}
