import React from "react";
import img from "../../img/menu/item-9.jpg";

const CheckoutCard = ({ item, order }) => {
  return (
    <div className="checkout-card">
      <img src={item.image} alt="" />
      <div>
        <h4 class="media-heading" style={{ fontSize: 16, marginBottom: 13 }}>
          <a
            href
            style={{
              display: "block",
              width: order ? "fit-content" : 200,
              // whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item?.name}
          </a>
        </h4>
        <div className="price-sec">
          <span
            style={{
              color: "#ffa500",
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "1.5px",
              fontFamily: "Prata, serif",
            }}
          >
            &#8377;{order ? item?.price * item.quantity : item?.price}
          </span>
          <span>Quantity: {item.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
