import "./liveAuctionsComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";
import TitleComponent from "../titleComponent";
import {SliderSwiper} from "./components";
import {cardData} from "../../configs";

const LiveAuctionsComponent = () => {
  return (
    <Container fluid className="live-auctions">
      <Container fluid={"xxl"}>
        <TitleComponent titleText={"Live Auctions"} isHasExplore={true} exploreUrl="#"/>
        <SliderSwiper data={cardData}/>
      </Container>
    </Container>
  );
};

export default LiveAuctionsComponent;