import "./homePage.scss";

import {Container, Spinner} from "react-bootstrap";
import BannerComponent from "../../components/bannerComponent";
import LiveAuctionsComponent from "../../components/liveAuctionsComponent";
import TopSellerComponent from "../../components/topSellerComponent";
import TodayPickComponent from "../../components/todayPickComponent";
import PopularCollectionComponent from "../../components/popularCollectionComponent";
import ProjectFeatureComponent from "../../components/projectFeatureComponent";
import React from "react";

const HomePage = ({
                    marketplace,
                    nft,
                    isNeedConnect
                  }) => {
  return isNeedConnect ? (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh"
    }}>
      <Spinner animation="border" style={{display: "flex"}}/>
      <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
    </div>
  ) : (
    <>
      <Container fluid className="home-component">
        <BannerComponent/>
        {/*<LiveAuctionsComponent/>*/}
        {/*<TopSellerComponent/>*/}
        
        {/*hot deal*/}
        <TodayPickComponent marketplace={marketplace} nft={nft} isNeedConnect={isNeedConnect}/>
        
        {/*<PopularCollectionComponent/>*/}
        <ProjectFeatureComponent/>
      </Container>
    </>
  );
};
export default HomePage;