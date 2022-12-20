import React, { useEffect, useState } from "react";
import img from "../../img/menu/item-9.jpg";
import firebase from "firebase";
import toaster from "toasted-notes";

function CartCard({
  item,
  incrementQuantity,
  decrementQuantity,
  deleteItem,
}) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    firebase
      .firestore()
      .collection("menu")
      .doc(item.id)
      .get()
      .then((doc) => {
        setProduct({ ...doc.data(), id: doc.id, quantity: item.quantity });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setProduct((prev) => ({ ...prev, quantity: item.quantity }));
  }, [item.quantity]);

  return (
    <div
      class="media"
      style={{
        display: "flex",
        borderBottom: "1px dashed #eee",
        paddingBottom: "10px",
      }}
    >
      <div class="media-left">
        <a href="#">
          <img class="media-object2" src={img} alt="img" />
        </a>
      </div>
      <div class="media-body2">
        <h4 class="media-heading">
          <a
            href
            style={{
              display: "block",
              width: 200,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product?.name}
          </a>
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <span
            style={{
              color: "#ffa500",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1.5px",
            }}
          >
            &#8377;{product?.price}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <button
              type="button"
              className="counter-btn"
              onClick={() => decrementQuantity(product)}
            >
              &minus;
            </button>
            <p
              style={{
                margin: 0,
                fontFamily: "Open Sans, sans-serif",
                color: "#fff",
              }}
            >
              {product.quantity}
            </p>
            <button
              type="button"
              className="counter-btn"
              onClick={() => incrementQuantity(product)}
            >
              &#43;
            </button>
          </div>
          <button
            type="button"
            style={{
              borderRadius: 2,
              backgroundColor: "transparent",
              color: "#f47174",
            }}
            className="counter-btn"
            onClick={() => deleteItem(product)}
          >
            <i className="bx bxs-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
