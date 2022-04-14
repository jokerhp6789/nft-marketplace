import "./topSellerComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";
import {SliderTopSeller} from "./components";
import {topSellerData} from "../../configs";
import {TitleComponent} from "../titleComponent";

const TopSellerComponent = () => {
  return (
    <Container fluid className="top-seller">
      <Container fluid={"xxl"}>
        <TitleComponent isHasExplore={false} titleText="Top seller"/>
        <SliderTopSeller data={topSellerData}/>
      </Container>
    </Container>
  );
};

export default TopSellerComponent;