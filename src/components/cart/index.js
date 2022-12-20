import { Divider, Drawer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CartCard from "../cart-card";
import firebase from "firebase";
import Checkout from "../checkout";
import cooking from "../../img/cooking (1).png";

const Cart = ({ cartOpen, setCartOpen, setOrders }) => {
  const [amount, setAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              setCart(doc.data().cart);
            }
          });
      }
    });
  }, []);

  useEffect(() => {
    setAmount(0);
    for (let i = 0; i < cart.length; i++) {
      firebase
        .firestore()
        .collection("menu")
        .doc(cart[i].id)
        .get()
        .then((doc) => {
          setAmount((prev) => prev + doc.data().price * cart[i].quantity);
        })
        .catch((err) => console.log(err));
    }
  }, [cart]);

  const incrementQuantity = (product) => {
    var cart_local = cart.map((item) => {
      if (item.id === product.id) item.quantity = item.quantity + 1;
      return item;
    });
    setCart(cart_local);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        cart: cart_local,
      })
      .then(() => {
        setAmount((prev) => prev + product.price);
      })
      .catch((err) => console.log(err));
  };

  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      var cart_local = cart.map((item) => {
        if (item.id === product.id) item.quantity = item.quantity - 1;
        return item;
      });
      setCart(cart_local);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          cart: cart_local,
        })
        .then(() => {
          setAmount((prev) => prev - product.price);
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteItem = (product) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        var cart_local = doc
          .data()
          .cart.filter((cartItem) => cartItem.id !== product.id);
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            cart: cart_local,
          })
          .then(() => {
            setCart(cart_local);
            setAmount((prev) => prev - product.price * product.quantity);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <div className="cart">
          <div className="title">
            <i
              className="bx bx-chevron-left"
              onClick={() => setCartOpen(false)}
            ></i>
            <i className="bx bxs-cart"></i>
            <h4 style={{ marginBottom: 0, color: "#eee" }}>CART</h4>
          </div>
          {cart.length > 0 ? (
            <>
              <div className="cart-body">
                {cart?.map((item) => (
                  <CartCard
                    item={item}
                    key={item.id}
                    deleteItem={deleteItem}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                  />
                ))}
              </div>
              <div className="cart-footer">
                <div>
                  <span>Sub Total:</span>
                  <span>&#8377;{amount}</span>
                </div>
                <div>
                  <span>Shipping: </span>
                  <span>&#8377;50</span>
                </div>
                <Divider style={{ backgroundColor: "#eee" }} />
                <div>
                  <span>Total: </span>
                  <span>&#8377;{amount + 50}</span>
                </div>
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => (setCheckout(true), setCartOpen(false))}
                >
                  Place Order
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={cooking}
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                  marginTop: "-40px",
                }}
              />
              <h4 style={{ margin: "40px 0 20px" }}>No items in your cart!</h4>
              <button
                className="btn yellow"
                onClick={() => {
                  setCartOpen(false);
                  window.location.href = "#mu-restaurant-menu";
                }}
              >
                Go to Menu
              </button>
            </div>
          )}
        </div>
      </Drawer>
      <Checkout
        open={checkout}
        onClose={() => setCheckout(false)}
        cart={cart}
        setOrders={setOrders}
      />
    </>
  );
};

export default Cart;
