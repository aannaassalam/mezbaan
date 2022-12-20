import React, { useEffect, useState } from "react";
import { CircularProgress, Divider, Modal } from "@material-ui/core";
import firebase from "firebase";
import CheckoutCard from "../checkout-card";
import "./style.css";
import toaster from "toasted-notes";
import indianLists from "indian-states-cities";
import OrderSuccess from "../orderSuccess";

const Checkout = ({ open, onClose, cart, setOrders }) => {
  const [amount, setAmount] = useState(0);
  const [localCart, setLocalCart] = useState([]);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [addres, setAddres] = useState("");
  const [phone, setPhone] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [stateList, setStateList] = useState(indianLists.allStates);
  const [cityList, setCityList] = useState([]);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    setAmount(0);
    setLoading(true);
    var cart_local = [];
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) =>
            setUser({
              ...doc.data(),
              id: doc.id,
            })
          )
          .catch((err) => console.log(err));
      }
    });
    for (let i = 0; i < cart?.length; i++) {
      firebase
        .firestore()
        .collection("menu")
        .doc(cart[i].id)
        .get()
        .then((doc) => {
          cart_local.push({
            ...doc.data(),
            id: doc.id,
            quantity: cart[i].quantity,
          });
          setAmount((prev) => prev + doc.data().price * cart[i].quantity);
        })
        .catch((err) => console.log(err));
    }
    setLocalCart(cart_local);
    setLoading(false);
  }, [cart]);

  useEffect(() => {
    setCityList(indianLists.citiesForState(state));
  }, [state]);

  const changeAddress = (e) => {
    const add = e.target.value.length > 0 ? JSON.parse(e.target.value) : "";
    setAddress(add);
    setName(add.name || "");
    setPhone(add.phone || "");
    setAddres(add.address || "");
    setLandmark(add.landmark || "");
    setState(add.state || "");
    setCity(add.city || "");
    setPincode(add.pincode || "");
  };

  const handleOrder = () => {
    if (
      name.length > 0 &&
      phone.length > 0 &&
      addres.length > 0 &&
      state.length > 0 &&
      city.length > 0 &&
      pincode.length > 0
    ) {
      firebase
        .firestore()
        .collection("orders")
        .add({
          user: user,
          address: address,
          products: localCart,
          subTotal: amount,
          total: amount + 50,
          date: new Date(),
          payment: "Pay on Delivery",
          status: 0,
        })
        .then((res) =>
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              orders: [res.id, ...user.orders],
              cart: [],
            })
            .then(() => {
              setName("");
              setPhone("");
              setAddres("");
              setLandmark("");
              setState("");
              setCity("");
              setPincode("");
              setOrdered(true);
              onClose();
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    } else {
      if (name.length === 0) {
        toaster.notify("Name should not be empty!");
      } else if (phone.length === 0) {
        toaster.notify("Phone should not be empty!");
      } else if (addres.length === 0) {
        toaster.notify("Address should not be empty!");
      } else if (state.length === 0) {
        toaster.notify("State should not be empty!");
      } else if (city.length === 0) {
        toaster.notify("City should not be empty!");
      } else {
        toaster.notify("Pincode should not be empty!");
      }
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-card checkout">
          <div className="modal-header">
            <h4>Checkout</h4>
            <i className="bx bx-x" onClick={onClose}></i>
          </div>
          {loading && (
            <div className="load">
              <CircularProgress color="inherit" />
            </div>
          )}
          {!loading && (
            <div className="modal-body">
              <div className="left" style={{ width: "55%" }}>
                <select
                  value={JSON.stringify(address)}
                  onChange={changeAddress}
                  className="custom-select form-control mb-3 first-select"
                  style={{ width: "fit-content" }}
                >
                  <option value={""}>Custom</option>
                  {user.addresses?.map((address, index) => {
                    return (
                      <option value={JSON.stringify(address)} key={index}>
                        {address.name} {address.phone} {address.address}
                      </option>
                    );
                  })}
                </select>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Address"
                    value={addres}
                    onChange={(e) => setAddres(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Landmark</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="mb-3"
                >
                  <div style={{ width: "49%" }}>
                    <label>State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      style={{
                        padding: "6px 5px",
                        borderRadius: "5px",
                        color: "#333",
                        width: "100%",
                        outline: "none",
                      }}
                    >
                      <option value="">Select</option>
                      {stateList.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                    {/* <input
                      type="text"
                      className="form-control"
                      placeholder="Enter State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    /> */}
                  </div>
                  <div style={{ width: "49%" }}>
                    <label>City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        padding: "6px 5px",
                        borderRadius: "5px",
                        color: "#333",
                        width: "100%",
                        outline: "none",
                      }}
                    >
                      <option value="">Select</option>
                      {cityList.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="mb-3"
                >
                  <div style={{ width: "49%" }}>
                    <label>Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <div style={{ width: "49%" }}>
                    <label>Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="right" style={{ width: "43%" }}>
                <div className="item-body">
                  {localCart.map((item) => {
                    return <CheckoutCard item={item} key={item.id} />;
                  })}
                </div>
                <div className="checkout-footer">
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
                </div>
              </div>
            </div>
          )}
          {!loading && (
            <div className="modal-footer">
              <span>
                NOTE: Currently we are only providing Pay on Delivery...
              </span>
              <button
                type="submit"
                className="btn yellow"
                style={{ marginLeft: "auto" }}
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </Modal>
      <OrderSuccess
        open={ordered}
        onClose={() => setOrdered(false)}
        setOrders={setOrders}
      />
    </>
  );
};

export default Checkout;
