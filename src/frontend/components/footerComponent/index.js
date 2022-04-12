import "./footerComponent.scss";

import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Logo from "../../assets/imgs/logo.png";
import * as footerMenu from "../../configs/footerMenuData";
import {RiSendPlaneFill} from "react-icons/ri";

const FooterComponent = () => {
  return (
    <Container className="footer-component" fluid>
      <Row className="footer-container">
        <Col lg={3} md={12} className="footer-logo">
          <img src={Logo} alt=""/>
          <p className="footer-logo__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores
            blanditiis consequatur distinctio doloremque dolorum id illo iste!</p>
        </Col>
        <Col lg={2} md={4} className="footer-my__account">
          <p className="footer-menu__title">My account</p>
          <ul className="footer-menu__container">
            {
              footerMenu.myAccountMenu.map((val) => (
                <li key={val.label}>
                  <a href={val.url}>{val.label}</a>
                </li>
              ))
            }
          </ul>
        </Col>
        <Col lg={2} md={4} className="footer-resources">
          <p className="footer-menu__title">Resources</p>
          <ul className="footer-menu__container">
            {
              footerMenu.resourcesMenu.map((val) => (
                <li key={val.label}>
                  <a href={val.url}>{val.label}</a>
                </li>
              ))
            }
          </ul>
        </Col>
        <Col lg={2} md={4} className="footer-company">
          <p className="footer-menu__title">Company</p>
          <ul className="footer-menu__container">
            {
              footerMenu.companyMenu.map((val) => (
                <li key={val.label}>
                  <a href={val.url}>{val.label}</a>
                </li>
              ))
            }
          </ul>
        </Col>
        <Col lg={3} md={6} className="footer-social">
          <p className="footer-menu__title">Subscribe Us</p>
          <div className="subscribe-input__container">
            <input type="email" placeholder="info@youremail.com" className="subscribe-input__input"/>
            <button className="subscribe-input__btn">
              <RiSendPlaneFill/>
            </button>
          </div>
          <div className="social-menu">
            <ul className="social-menu__container">
              {
                footerMenu.socialMenu.map((val, index) => (
                  <li key={index}>
                    <a href={val.socialUrl}>{val.icon}</a>
                  </li>
                ))
              }
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterComponent;