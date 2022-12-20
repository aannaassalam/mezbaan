import React from "react";
import AboutUs from "../../components/aboutUs/aboutUs";
import ContactUs from "../../components/contactUs/contactUs";
import Gallery from "../../components/gallery/gallery";
import Home from "../../components/home/home";
import Map from "../../components/map/map";
import MenuCount from "../../components/menu-count/menu-count";
import Menu from "../../components/menu/menu";
import Reservations from "../../components/reservations/reservations";
import Testimonial from "../../components/Testimonial/Testimonial";

function Homepage({ updateUser, cartOpen, setCartOpen, setLoginModal }) {
  return (
    <div>
      <Home />
      <AboutUs />
      <MenuCount />
      <Menu
        updateUser={updateUser}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        modalOpen={setLoginModal}
      />
      <Reservations />
      <Gallery />
      <Testimonial />
      <ContactUs />
      <Map />
    </div>
  );
}

export default Homepage;
