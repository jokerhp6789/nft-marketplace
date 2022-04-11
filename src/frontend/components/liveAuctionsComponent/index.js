import "./liveAuctionsComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";
import TitleComponent from "../titleComponent";
import {Slider} from "./components";

const LiveAuctionsComponent = () => {
  return (
    <Container fluid className="live-auctions">
      <Container>
        <TitleComponent titleText={"Live Auctions"} isHasExplore={true} exploreUrl="#"/>
        <Slider/>
      </Container>
    </Container>
  );
};

export default LiveAuctionsComponent;