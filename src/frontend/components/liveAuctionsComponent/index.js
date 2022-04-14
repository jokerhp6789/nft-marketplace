import React from "react";
import {Container} from "react-bootstrap";
import {cardData} from "../../configs";
import {SliderLiveAuctions} from "./components";
import {TitleComponent} from "../titleComponent";

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