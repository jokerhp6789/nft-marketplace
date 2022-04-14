import "./bannerComponent.scss";

import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import SubBg from "../../assets/imgs/banner/subBannerBg.png";
import MainBg from "../../assets/imgs/banner/bannerBg.png";
import ButtonComponent from "../buttonComponent";
import {CgFileDocument} from "react-icons/cg";
import {IoIosRocket} from "react-icons/io";
import BgGradient1 from "../../assets/imgs/banner/bg-gradient1.png";
import BgGradient2 from "../../assets/imgs/banner/bg-gradient2.png";
import BgGradient3 from "../../assets/imgs/banner/bg-gradient3.png";
import {useNavigate} from "react-router";

const bgGradient = [BgGradient1, BgGradient2, BgGradient3];

const BannerComponent = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="banner-component">
      <Container fluid={"xxl"}>
        <div className="banner-bg__gradient">
          {
            bgGradient.map((val, index) => (
              <img key={index} src={val} alt="" className={`bg-item__${index}`}/>
            ))
          }
        </div>
        <Row className="banner-container">
          <Col lg={6} md={6} sm={12} className="banner-left__side">
            <h2 className="banner-left__side-heading">Discover, find,</h2>
            <h1 className="banner-left__side-heading gradient-text">
              <span>Sell extraordinary</span>
            </h1>
            <h1 className="banner-left__side-heading">Monster NFTs</h1>
            <p className="banner-left__side-sub__heading">Marketplace for monster character collections non fungible
              token
              NFTs</p>
            <div className="banner-left__btn d-flex justify-content-center align-items-center">
              <ButtonComponent btnName="Explore" btnIcon={<IoIosRocket/>} btnEvent={() => navigate("/explore")}/>
              <ButtonComponent btnName="Create" btnIcon={<CgFileDocument/>} btnEvent={() => navigate("/create")}/>
            </div>
          </Col>
          <Col lg={6} md={6} className="banner-right__side">
            <div className="banner-right__container">
              <img src={SubBg} alt="" className="banner-right__container-sub__bg"/>
              <img src={MainBg} alt="" className="banner-right__container-main__bg"/>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default BannerComponent;