import React, { useEffect, useState } from "react";
import "./profile.css";
import { Modal } from "@material-ui/core";
import { AvForm, AvField } from "availity-reactstrap-validation";
import firebase from "firebase";
import { Button } from "reactstrap";
import indianLists from "indian-states-cities";

const Profile = ({ open, onClose, user }) => {
  const [localUser, setLocalUser] = useState(user);
  const [addressModal, setAddressModal] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [chnge, setChnge] = useState(false);
  const [state, setState] = useState("");
  const [stateList, setStateList] = useState(indianLists.allStates);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      onClose();
    }
  }, []);

  useEffect(() => {
    setLocalUser(user);
    setEmail(user.email);
  }, [user, localUser]);

  const addAddress = (e, v) => {
    const addresses = [
      ...user?.addresses,
      {
        name: v.name,
        phone: v.phone,
        address: v.address,
        landmark: v.landmark,
        state: v.state,
        city: v.city,
        pincode: v.pincode,
      },
    ];
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        addresses,
      })
      .then(() => {
        setAddressModal(false);
        // firebase
        //   .firestore()
        //   .collection("users")
        //   .doc(firebase.auth().currentUser.uid)
        //   .get()
        //   .then((doc) => setUser({ ...doc.data(), id: doc.id }))
        //   .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (e, v) => {
    e.preventDefault();
    if (user.email !== email && email.length > 0 && email.includes("@")) {
      firebase
        .auth()
        .currentUser.updateEmail(email)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              name: v.name,
              email: email,
              phoneNumber: v.number,
            })
            .then(() => {})
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        name: v.name,
        phoneNumber: v.number,
      })
      .then(() => {})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCityList(indianLists.citiesForState(state));
  }, [state]);

  const discardChanges = () => {
    setLocalUser({});
  };

  const deleteAddress = (idx) => {
    var addresses = user.addresses;
    addresses.splice(idx, 1);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        addresses,
      })
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(onClose)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-card">
          <div className="modal-header">
            <h4>Profile</h4>
            <i className="bx bx-x" onClick={onClose}></i>
          </div>
          <AvForm
            onValidSubmit={(e, v) => {
              updateUser(e, v);
            }}
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            <div className="modal-body">
              <div className="left">
                <AvField
                  name="name"
                  label="Full Name"
                  value={localUser?.name}
                  placeholder="Enter Name"
                  onChange={() => setChnge(true)}
                  required
                />
                <AvField
                  name="email"
                  label="Email"
                  value={email}
                  placeholder="Enter Email"
                  required
                  onChange={(e) => {
                    setChnge(true);
                    setEmail(e.target.value);
                  }}
                />
                <AvField
                  name="number"
                  label="Phone Number"
                  value={localUser?.phoneNumber}
                  placeholder="Enter Phone Number"
                  onChange={() => setChnge(true)}
                  required
                />
                <h4 style={{ marginTop: 25 }}>Reservations</h4>
                <div>
                  <span>No Current Reservations</span>
                </div>
              </div>
              <div className="right">
                <h4>
                  Addresses
                  <i
                    className="bx bx-plus"
                    onClick={() => setAddressModal(true)}
                  ></i>
                </h4>

                {user.addresses?.map((addre, idx) => {
                  return (
                    <div className="address-card" key={idx}>
                      <main style={{ width: "80%" }}>
                        <div>
                          <span>{addre.name}</span> <span>{addre.phone}</span>
                        </div>
                        <div>
                          {addre.address} {addre.state}, {addre.city} -{" "}
                          {addre.pincode}
                        </div>
                      </main>
                      <i
                        className="bx bxs-trash"
                        onClick={() => deleteAddress(idx)}
                      ></i>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <Button
                type="button"
                className="btn btn-danger"
                style={{ marginRight: "auto" }}
                onClick={handleLogout}
              >
                <i
                  className="bx bx-log-out"
                  style={{ marginRight: 5, verticalAlign: "middle" }}
                ></i>
                Logout
              </Button>
              <button
                type="button"
                onClick={discardChanges}
                className="btn yellow-border"
                style={{ width: "80px" }}
              >
                Discard
              </button>
              <button
                className="btn yellow"
                style={{ width: "80px" }}
                disabled={!chnge}
              >
                Save
              </button>
            </div>
          </AvForm>
        </div>
      </Modal>
      <Modal open={addressModal} onClose={() => setAddressModal(false)}>
        <div className="addressModal">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ marginBottom: "20px" }}>Add Address</h4>
            <i
              className="bx bx-x"
              style={{ cursor: "pointer" }}
              onClick={() => setAddressModal(false)}
            ></i>
          </div>
          <AvForm onValidSubmit={(e, v) => addAddress(e, v)}>
            <AvField
              name="name"
              label="Full Name"
              placeholder="Enter Full Name"
              required
            />
            <AvField
              name="phone"
              label="Phone Number"
              placeholder="Enter Phone Number"
              required
            />
            <AvField
              name="address"
              label="Address"
              placeholder="Enter Address"
              required
            />
            <AvField
              name="landmark"
              label="Landmark"
              placeholder="Enter Landmark"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "inline-block",
                  marginRight: 5,
                  width: "49%",
                }}
              >
                <AvField
                  type="select"
                  name="state"
                  label="State"
                  placeholder="Enter State"
                  required
                  style={{
                    width: "100%",
                    padding: "6px 5px",
                    borderRadius: "5px",
                    color: "#333",
                  }}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select</option>
                  {stateList.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </AvField>
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginRight: 5,
                  width: "49%",
                }}
              >
                <AvField
                  type="select"
                  name="city"
                  label="City"
                  placeholder="Enter City"
                  required
                  style={{
                    width: "100%",
                    padding: "6px 5px",
                    borderRadius: "5px",
                    color: "#333",
                  }}
                >
                  <option value="">Select</option>
                  {cityList.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </AvField>
              </div>
            </div>
            <AvField
              name="pincode"
              label="Pincode"
              placeholder="Enter Pincode"
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15,
              }}
            >
              <Button className="btn btn-primary">Add</Button>
            </div>
          </AvForm>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
