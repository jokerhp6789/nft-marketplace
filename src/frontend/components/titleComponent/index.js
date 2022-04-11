import "./titleComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";

const TitleComponent = ({
                          titleText,
                          isHasExplore,
                          exploreUrl
                        }) => {
  return (
    <Container fluid className="title-container">
      <div className="title-left__side">
        <h2 className="title-text">{titleText}</h2>
      </div>
      {
        isHasExplore && (
          <div className="title-right__side">
            <a href={exploreUrl}>EXPLORE MORE</a>
          </div>
        )
      }
    </Container>
  );
};

export default TitleComponent;