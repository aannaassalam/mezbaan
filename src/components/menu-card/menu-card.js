import React, { useState } from "react";
import img from "../../img/menu/item-9.jpg";
import firebase from "firebase";
import toaster from "toasted-notes";

function MenuCard({
  item,
  cart,
  updateUser,
  cartOpen,
  setCartOpen,
  modalOpen,
}) {
  const [count, setCount] = useState(1);

  const addToCart = () => {
    if (
      firebase.auth().currentUser &&
      firebase.auth().currentUser.email !== "admin@mezbaan.com"
    ) {
      console.log("yes", firebase.auth().currentUser);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              cart: [
                ...doc.data().cart,
                {
                  id: item.id,
                  quantity: count,
                },
              ],
            })
            .then(() => {
              toaster.notify(`${item.name} added to cart...`);
              updateUser();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      modalOpen();
    }
  };

  return (
    <div class="media">
      <div class="media-left">
        <a href="#">
          <img class="media-object" src={item.image} alt="img" />
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          <a href="#">{item?.name}</a>
        </h4>
        <span class="mu-menu-price">&#8377;{item?.price}</span>
        {cart.find((c) => c.id === item.id) ? (
          <button
            type="button"
            className="go-to-cart-btn"
            onClick={() => {
              setCartOpen(true);
            }}
          >
            Go to cart
          </button>
        ) : (
          <div style={{ display: "flex", marginTop: 15 }}>
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
                onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : prev))}
              >
                &minus;
              </button>
              <p style={{ margin: 0, fontFamily: "Open Sans, sans-serif" }}>
                {count}
              </p>
              <button
                type="button"
                className="counter-btn"
                onClick={() => setCount((prev) => prev + 1)}
              >
                &#43;
              </button>
            </div>
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={addToCart}
            >
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuCard;
