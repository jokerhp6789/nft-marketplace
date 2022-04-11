import "./liveAuctionsComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";
import TitleComponent from "../titleComponent";

const LiveAuctionsComponent = () => {
  return (
    <Container fluid className="live-auctions">
      <TitleComponent titleText={"Live Auctions"} isHasExplore={true} exploreUrl="#"/>
      <Container className="live-auctions__container">
      </Container>
    </Container>
  );
};

export default LiveAuctionsComponent;