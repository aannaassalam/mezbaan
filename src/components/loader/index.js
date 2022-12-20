import React, { useEffect } from "react";
import spinner from "../../img/spinner.svg";

const Loader = ({ loading }) => {
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <div className={`loader ${!loading && "loaded"}`}>
      <img src={spinner} alt="" />
    </div>
  );
};

export default Loader;
