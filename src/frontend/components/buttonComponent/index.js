import "./buttonComponent.scss";
import React from "react";

const ButtonComponent = ({
                           btnName,
                           btnIcon,
                           btnEvent,
                           isPrimary = true
                         }) => {
  return (
    <>
      <button className={`btn-container ${btnName && "btn-space"} ${isPrimary && "primary-btn"}`}
              onClick={btnEvent}>{btnIcon} {btnName}</button>
    </>
  );
};

export default ButtonComponent;