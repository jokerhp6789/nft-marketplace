import "./emptyResultComponent.scss";

import React from "react";

const EmptyResultComponent = () => {
  return (
    <div className="empty-result__container d-flex justify-content-center align-items-center">
      <p className="text">Sorry, We Couldn’t Find Any Results For This Search.</p>
    </div>
  );
};

export default EmptyResultComponent;