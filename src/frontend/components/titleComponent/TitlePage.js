import {Container} from "react-bootstrap";
import React from "react";

export const TitlePage = ({titleText}) => {
  return (
    <Container fluid className="title-page__container">
      <h2 className="title-page__text">{titleText}</h2>
    </Container>
  );
};