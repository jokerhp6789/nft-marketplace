import React from "react";

const PrimaryTitleComponent = ({
                                 titleText,
                                 isHasExplore
                               }) => {
  return (
    <div className="title__container">
      <div className="title-left__side">
        <h1 className="title-text">{titleText}</h1>
      </div>
      <div className="title-right__side"></div>
    </div>
  );
};

export default PrimaryTitleComponent;