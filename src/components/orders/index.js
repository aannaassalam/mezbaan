import React, { useEffect, useState } from "react";
import "./style.css";
import { CircularProgress, Modal } from "@material-ui/core";
import firebase from "firebase";
import img from "../../img/menu/item-9.jpg";
import { Collapse } from "antd";
import "antd/dist/antd.css";
import CheckoutCard from "../checkout-card";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import checkList from "../../img/check-list.png";
import moment from "moment";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage:
      //   "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      backgroundImage: "linear-gradient(136deg, #20bf55 0%, #01baef 74%)",

      // backgroundImage: "linear-gradient(136deg, #00b712 0%, #5aff15 74%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundImage:
      //   "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      backgroundImage: "linear-gradient(136deg, #20bf55 0%, #01baef 74%)",
      // backgroundImage: "linear-gradient(136deg, #00b712 0%, #5aff15 74%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[700],
  // theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    // backgroundImage:
    //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    backgroundColor: "#20bf55",
    backgroundImage: "linear-gradient(136deg, #20bf55 0%, #01baef 74%)",
    // backgroundColor: "#00b712",
    // backgroundImage: "linear-gradient(136deg, #00b712 0%, #5aff15 74%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),

  ...(ownerState.completed && {
    // backgroundImage:
    //   "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    // backgroundColor: "#20bf55",
    backgroundImage: "linear-gradient(136deg, #20bf55 0%, #01baef 74%)",
    // backgroundImage: "linear-gradient(315deg, #00b712 0%, #5aff15 74%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <i className="bx bxs-box" style={{ fontSize: 22 }}></i>,
    2: <i className="bx bxs-bowl-hot" style={{ fontSize: 24 }}></i>,
    3: <i className="bx bx-cycling" style={{ fontSize: 26 }}></i>,
    4: <i className="bx bx-check-circle" style={{ fontSize: 28 }}></i>,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const Orders = ({ open, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              var localOrder = [];
              for (let i = 0; i < doc.data().orders.length; i++) {
                firebase
                  .firestore()
                  .collection("orders")
                  .doc(doc.data().orders[i])
                  .get()
                  .then((doc2) =>
                    localOrder.push({ ...doc2.data(), id: doc2.id })
                  );
              }
              setOrders(localOrder);
            }
            setLoading(false);
          });
      }
    });
  }, []);

  console.log(currentOrder);

  useEffect(() => {
    if (orders.length > 0 && window.screen.width > 990) {
      setCurrentOrder(orders[0]);
    } else {
      setCurrentOrder({});
    }
  }, [orders.length, window.screen.width]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-card order">
        {loading ? (
          <div className="load">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  setCurrentOrder({});
                  setCollapse("");
                }}
              >
                {currentOrder.id && <i className="bx bx-chevron-left"></i>}{" "}
                <span>Orders</span>
              </h4>
              <i className="bx bx-x" onClick={onClose}></i>
            </div>
            <div className="modal-body">
              {orders.length > 0 ? (
                <>
                  <div
                    className={currentOrder.id ? "left" : "left expanded"}
                    style={{ width: "37%" }}
                  >
                    <div className="flex-overflow">
                      {orders.map((order) => {
                        return (
                          <div
                            className={`order-card ${
                              order.id === currentOrder?.id && "selected"
                            }`}
                            onClick={() => setCurrentOrder(order)}
                            key={order.id}
                          >
                            <img
                              src={img}
                              alt=""
                              style={{
                                width: "65px",
                                height: "65px",
                                objectFit: "contain",
                              }}
                            />
                            <div className="order-card-details">
                              <h5>
                                {order.products[0].name.length > 18
                                  ? order.products[0].name.substr(0, 18) +
                                    "... "
                                  : order.products[0].name}{" "}
                                {order.products.length > 1
                                  ? `& ${order.products.length - 1} more`
                                  : null}
                              </h5>
                              <div>
                                <p>
                                  Status:{" "}
                                  <span>
                                    {order.status === -1
                                      ? "Cancelled"
                                      : order.status === 3
                                      ? "Delivered"
                                      : order.status === 2
                                      ? "Out For..."
                                      : order.status === 1
                                      ? "Processing"
                                      : "Ordered"}
                                  </span>
                                </p>
                                <p>
                                  Total: <span>&#8377;{order.total}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className={currentOrder.id ? "right expanded" : "right"}
                    style={{ width: "63%" }}
                  >
                    <Collapse
                      activeKey={collapse}
                      // onClick={() => setCollapse(!collapse)}
                      onChange={() =>
                        collapse === "" ? setCollapse("1") : setCollapse("")
                      }
                    >
                      <Collapse.Panel header="Order Items" key="1">
                        {currentOrder.products?.map((product) => {
                          return (
                            <CheckoutCard
                              item={product}
                              key={product.id}
                              order
                            />
                          );
                        })}
                      </Collapse.Panel>
                    </Collapse>
                    <p className="text-muted">
                      <span style={{ color: "#eee" }}>Order ID</span> -{" "}
                      {currentOrder.id}
                    </p>
                    <div className="order-status">
                      <h5>Status: </h5>
                      <Stepper
                        alternativeLabel
                        activeStep={currentOrder.status}
                        connector={<ColorlibConnector />}
                      >
                        <Step>
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <span>Ordered</span>
                          </StepLabel>
                        </Step>
                        <Step>
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <span>Processing</span>
                          </StepLabel>
                        </Step>
                        <Step>
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <span>Out for Delivery</span>
                          </StepLabel>
                        </Step>
                        <Step>
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <span>Delivered</span>
                          </StepLabel>
                        </Step>
                      </Stepper>
                    </div>
                    <div className="shipping-address">
                      <h5>Shipping Address: </h5>
                      <div>
                        <p>
                          Name: <span>{currentOrder.address?.name}</span>
                        </p>
                        <p>
                          Phone Number:{" "}
                          <span>{currentOrder.address?.phone}</span>
                        </p>
                        <p>
                          Address: <span>{currentOrder.address?.address}</span>
                        </p>
                        {currentOrder.address?.landmark && (
                          <p>
                            Landmark:{" "}
                            <span>{currentOrder.address?.landmark}</span>
                          </p>
                        )}
                        <p>
                          State: <span>{currentOrder.address?.state}</span>
                        </p>
                        <p>
                          City: <span>{currentOrder.address?.city}</span>
                        </p>
                        <p>
                          Pincode: <span>{currentOrder.address?.pincode}</span>
                        </p>
                      </div>
                    </div>
                    <div className="payment">
                      <div>
                        <h5>Payment Method:</h5>
                        <p>
                          <span>{currentOrder.payment}</span>
                        </p>
                      </div>
                      <div>
                        <h5>Date:</h5>
                        <p>
                          {moment(currentOrder.date?.toDate()).format("ll")}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={checkList}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                  <p style={{ margin: "20px 0" }}>
                    Looks like you haven't ordered anything yet!
                  </p>
                  <button
                    className="btn yellow"
                    onClick={() => {
                      onClose();
                      window.location.href = "#mu-restaurant-menu";
                    }}
                  >
                    Go to Menu
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Orders;
