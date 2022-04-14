import {Container} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

export const TitlePage = ({titleText}) => {
  const {pathname} = useLocation();
  return (
    <Container fluid className="title-page__container">
      <h2 className="title-page__text">{titleText}</h2>
      <p className="title-page__breadcrumb">
        <Link to="/" className="title-page__breadcrumb-item">HOME</Link>
        {" / "}
        <Link to={`${pathname}`}
              className="title-page__breadcrumb-item">{pathname?.replaceAll(/[/-]/g, " ").toUpperCase()}</Link>
      </p>
    </Container>
  );
};