import {Container} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import {useLocation, useParams} from "react-router";

export const TitlePage = ({
                            titleText,
                            paramsName
                          }) => {
  const {pathname} = useLocation();
  const params = useParams();
  return (
    <Container fluid className="title-page__container">
      <h2 className="title-page__text">{titleText}</h2>
      <p className="title-page__breadcrumb">
        <Link to="/" className="title-page__breadcrumb-item">HOME</Link>
        {" / "}
        <Link to={`${pathname.replace(params[`${paramsName}`], "")}`}
              className="title-page__breadcrumb-item">{pathname?.replace(params[`${paramsName}`], "").replaceAll(/[/-]/g, " ").toUpperCase()}</Link>
        {
          Object.keys(params).length !== 0 && (
            <>
              {" / "}
              <Link to={`${pathname}`}
                    className="title-page__breadcrumb-item">{params?.[`${paramsName}`].replaceAll(/[/-]/g, " ").toUpperCase()}</Link>
            </>
          )
        }
      </p>
    </Container>
  );
};