import React from "react";
import {Container} from "react-bootstrap";
import TitleComponent from "../titleComponent";
import {cardData} from "../../configs";
import {SliderLiveAuctions} from "./components";

const LiveAuctionsComponent = () => {
  return (
    <Container fluid className="live-auctions">
      <Container fluid={"xxl"}>
        <TitleComponent titleText={"Live Auctions"} isHasExplore={true} exploreUrl="#"/>
        <SliderLiveAuctions data={cardData}/>
      </Container>
    </Container>
  );
};

export default LiveAuctionsComponent;