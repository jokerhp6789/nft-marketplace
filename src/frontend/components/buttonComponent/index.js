import "./buttonComponent.scss";
import React from "react";

const ButtonComponent = ({
                           btnName,
                           btnIcon,
                           btnEvent,
                           isPrimary
                         }) => {
  return (
    <>
      <button className={`btn-container ${btnName && "btn-space"}`} onClick={btnEvent}>{btnIcon} {btnName}</button>
    </>
  );
};

export default ButtonComponent;