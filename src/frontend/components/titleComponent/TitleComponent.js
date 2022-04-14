import "./titleComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";

export const TitleComponent = ({
                          titleText,
                          isHasExplore,
                          exploreUrl
                        }) => {
  return (
    <Container fluid className="title-component__container">
      <div className="title-component__left-side">
        <h2 className="title-component__text">{titleText}</h2>
      </div>
      {
        isHasExplore && (
          <div className="title-component__right-side">
            <a href={exploreUrl}>EXPLORE MORE</a>
          </div>
        )
      }
    </Container>
  );
};