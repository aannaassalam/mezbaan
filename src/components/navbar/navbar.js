import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "./navbar.css";
import firebase from "firebase";
// import { AvField, AvForm } from "availity-reactstrap-validation";
import { Modal, TextField, Drawer, Divider } from "@material-ui/core";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import CartCard from "../cart-card";
import Profile from "../profile/profile";
import Cart from "../cart";
import Orders from "../orders";
import Loader from "../loader";
// import "../../css/bootstrap.css";

const Navbar = forwardRef(
  ({ updateUser, user, setUser, cartOpen, setCartOpen }, ref) => {
    const [modal, setModal] = useState(false);
    const [login, setLogin] = useState(true);
    const [loginUser, setLoginUser] = useState({
      loading: true,
      signing: false,
      err: "",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profile, setProfile] = useState(false);
    const [orders, setOrders] = useState(false);

    useImperativeHandle(ref, () => ({
      ModalOpen() {
        setModal(true);
      },
    }));

    useEffect(() => {
      if (loginUser.err) {
        toaster.notify(loginUser.err, {
          duration: 150000,
        });
        setLoginUser({
          ...loginUser,
          err: "",
        });
      }
    }, [loginUser.err]);

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          updateUser();
        } else {
          setUser({});
        }
        setLoginUser({
          ...loginUser,
          loading: false,
        });
      });
    }, []);

    // const updateUser = () => {
    //   firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(user.uid)
    //     .get()
    //     .then((doc) => {
    //       setUser({
    //         ...doc.data(),
    //         id: doc.id,
    //       });
    //       // forceUpdate();
    //     })
    //     .catch((err) => console.log(err));
    // };

    const handleSignUp = () => {
      setLoginUser({
        ...loginUser,
        signing: true,
      });
      firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((snap) => {
          if (snap.size === 0) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((res) => {
                res.user.updateProfile({
                  displayName: name,
                });
                firebase
                  .firestore()
                  .collection("users")
                  .doc(res.user.uid)
                  .set({
                    email: email,
                    name: name,
                    date: new Date(),
                    phoneNumber: "",
                    cart: [],
                    orders: [],
                    addresses: [],
                  })
                  .then(() => {
                    setLoginUser((prev) => ({
                      ...prev,
                      signing: false,
                    }));
                    setModal(false);
                  })
                  .catch((err) => {
                    console.log(err.response);
                    setLoginUser((prev) => ({
                      ...prev,
                      signing: false,
                    }));
                  });
              });
          } else {
            // toaster.notify("doesnt");
            setLoginUser({
              ...loginUser,
              err: "User with this email already exits!",
            });
          }
        });
    };

    const handleLogin = () => {
      setLoginUser({
        ...loginUser,
        signing: true,
      });
      firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((snap) => {
          if (snap.size > 0) {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then((res) => {
                firebase
                  .firestore()
                  .collection("user")
                  .doc(res.user.uid)
                  .get()
                  .then((doc) => {
                    setModal(false);
                    setLoginUser((prev) => ({
                      ...prev,
                      signing: false,
                    }));
                  })
                  .catch((err) => {
                    console.log(err.response);
                    setLoginUser((prev) => ({
                      ...prev,
                      signing: false,
                    }));
                  });
              });
          } else {
            setLoginUser({
              ...loginUser,
              err: "User with this email doesn't exists!",
            });
          }
        });
    };

    return (
      <header id="mu-header">
        <Loader loading={loginUser.loading} />
        <nav className="navbar navbar-default mu-main-navbar" role="navigation">
          <div className="container" style={{ flexWrap: "nowrap" }}>
            <div className="navbar-header">
              {/* <!-- FOR MOBILE VIEW COLLAPSED BUTTON --> */}
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              {/* <!-- LOGO -->        */}

              {/* <!--  Text based logo  --> */}
              <a className="navbar-brand" href="/">
                Mez<span className="orange">ban</span>
              </a>

              {/* <!--  Image based logo  --> */}
              {/* <!-- <a class="navbar-brand" href="index.html"><img src="assets/img/logo.png" alt="Logo img"></a>  --> */}
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul
                id="top-menu"
                className="nav navbar-nav navbar-right mu-main-nav"
              >
                <li>
                  <a href="/">HOME</a>
                </li>
                <li>
                  <a href="#mu-about-us">ABOUT US</a>
                </li>
                <li>
                  <a href="#mu-restaurant-menu">MENU</a>
                </li>
                <li>
                  <a href="#mu-reservation">RESERVATION</a>
                </li>
                <li>
                  <a href="#mu-gallery">GALLERY</a>
                </li>
                <li>
                  <a href="#mu-contact">CONTACT</a>
                </li>
                {user.email ? (
                  <>
                    <li>
                      <a href role="button" onClick={() => setOrders(true)}>
                        ORDERS
                      </a>
                    </li>
                    <li>
                      <a href role="button" onClick={() => setCartOpen(true)}>
                        CART
                      </a>
                    </li>
                    <li>
                      <a href role="button" onClick={() => setProfile(true)}>
                        PROFILE
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a href role="button" onClick={() => setModal(true)}>
                      LOGIN
                    </a>
                  </li>
                )}
              </ul>
            </div>
            {/* <!--/.nav-collapse --> */}
          </div>
        </nav>
        <Cart
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          setOrders={setOrders}
        />
        <Orders open={orders} onClose={() => setOrders(false)} />
        <Profile open={profile} onClose={() => setProfile(false)} user={user} />
        <Modal open={modal} onClose={() => setModal(false)}>
          <div className="modal">
            <i
              className="bx bx-x"
              style={{
                fontSize: "25px",
                position: "absolute",
                right: "15px",
                top: "15px",
              }}
              onClick={() => setModal(false)}
            ></i>
            <h4
              className="navbar-brand"
              style={{
                color: "#fff",
                fontWeight: "700",
                margin: 0,
                padding: 0,
                textAlign: "center",
                height: "auto",
                fontSize: "35px",
                marginBottom: "40px",
                marginTop: "10px",
              }}
            >
              Mez<span className="orange">ban</span>
            </h4>
            {login ? (
              <>
                {/* <p>Welcome Back,</p> */}
                {/* <AvForm onValidSubmit={handleLogin}>
                <AvField
                  name="email"
                  label="Email"
                  className="form-control mb-2 form-font"
                  placeholder="Enter Email"
                  type="email"
                  required
                />
                <AvField
                  name="password"
                  label="Password"
                  className="form-control mb-1 form-font"
                  placeholder="Enter Email"
                  type="password"
                  required
                /> */}
                <TextField
                  variant="outlined"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="mb-2"
                  style={{ marginBottom: "15px" }}
                  type="email"
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="mb-1"
                  style={{ marginBottom: "15px" }}
                  type="password"
                  required
                  fullWidth
                  size="small"
                />

                <p
                  className="text-right mb-3x font-sm"
                  style={{ cursor: "pointer" }}
                >
                  Forgot Password?
                </p>
                <button
                  type="button"
                  className="btn login-btn"
                  onClick={handleLogin}
                  disabled={loginUser.signing}
                >
                  Login
                </button>
                <p
                  style={{
                    margin: "auto 0 0",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  New to Mezban?{" "}
                  <span
                    style={{ color: "#ffa500", cursor: "pointer" }}
                    onClick={() => setLogin(false)}
                  >
                    Sign Up
                  </span>
                </p>
                {/* </AvForm> */}
              </>
            ) : (
              <>
                {/* <p>Become a Mezban Member,</p> */}
                {/* <AvForm onValidSubmit={handleSignUp}>
                <AvField
                  name="name"
                  label="Full Name"
                  className="form-control mb-1 form-font"
                    placeholder="Enter Full Name"
                    value={email}
                onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  required
                />
                <AvField
                  name="email"
                  label="Email"
                  className="form-control mb-1 form-font"
                  placeholder="Enter Email"
                  type="email"
                  required
                />
                <AvField
                  name="password"
                  label="Password"
                  className="form-control mb-3x form-font"
                  placeholder="Enter Email"
                  type="password"
                  required
                /> */}
                {/* <p
                className="text-right mb-3x font-sm"
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </p> */}
                <TextField
                  variant="outlined"
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Full Name"
                  className="mb-2"
                  style={{ marginBottom: "15px" }}
                  type="text"
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  variant="outlined"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="mb-2"
                  style={{ marginBottom: "15px" }}
                  type="email"
                  required
                  fullWidth
                  size="small"
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="mb-1"
                  style={{ marginBottom: "15px" }}
                  type="password"
                  required
                  fullWidth
                  size="small"
                />
                <button
                  type="button"
                  className="btn login-btn"
                  onClick={handleSignUp}
                  disabled={loginUser.signing}
                >
                  Sign Up
                </button>

                <p
                  style={{
                    margin: "auto 0 0",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Already a Member?{" "}
                  <span
                    style={{ color: "#ffa500", cursor: "pointer" }}
                    onClick={() => setLogin(true)}
                  >
                    Log in
                  </span>
                </p>
                {/* </AvForm> */}
              </>
            )}
          </div>
        </Modal>
      </header>
    );
  }
);

export default Navbar;
