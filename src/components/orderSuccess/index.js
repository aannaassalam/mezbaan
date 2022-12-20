import React from "react";
import "./style.css";
import { Modal } from "@material-ui/core";
import success from "../../img/checked.png";

const OrderSuccess = ({ open, onClose, setOrders }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="success-modal text-center">
        <i className="bx bx-x" onClick={onClose}></i>
        <img src={success} alt="" />
        <h3 className="text-center" style={{ margin: "15px 0" }}>
          Order Successful
        </h3>
        <button
          className="btn yellow"
          onClick={() => {
            onClose();
            setOrders(true);
          }}
        >
          Go to Orders
        </button>
        <p>Your order is placed successfully.</p>
        <p>Please check your email for confirmation and other updates.</p>
      </div>
    </Modal>
  );
};

export default OrderSuccess;
