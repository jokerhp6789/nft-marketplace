import "./buttonComponent.scss";
import React from "react";

const ButtonComponent = ({
                           btnName,
                           btnIcon,
                           btnEvent,
                           isPrimary = true,
                           isDisable = false
                         }) => {
  return (
    <>
      <button disabled={isDisable} className={`btn-container ${btnName && "btn-space"} ${isPrimary && "primary-btn"}`}
              onClick={btnEvent}>{btnIcon} {btnName}</button>
    </>
  );
};

export default ButtonComponent;