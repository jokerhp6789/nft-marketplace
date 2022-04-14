import "./popularCollectionComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";
import {PopularCollectionCard} from "./components";
import {popularCollectionData} from "../../configs/popularCollectionData";
import {TitleComponent} from "../titleComponent";

const PopularCollectionComponent = () => {
  return (
    <Container className="popular-collection" fluid>
      <Container fluid={"xxl"}>
        <TitleComponent titleText="Popular collection" isHasExplore={true} exploreUrl="#"/>
        <div className="popular-collection__container">
          {
            popularCollectionData.map((val, index) => (
              <div key={index} className="popular-collection__item">
                <PopularCollectionCard userAvt={val.creatorAvt}
                                       isVerify={val.isVerify}
                                       userName={val.creatorName}
                                       numberOfLike={val.numberOfLike}
                                       collectionImg={val.collectionImg}
                                       title={val.collectionTitle}
                                       userProfileUrl={val.creatorProfileUrl} collectionUrl={val.collectionUrl}/>
              </div>
            ))
          }
        </div>
      </Container>
    </Container>
  );
};

export default PopularCollectionComponent;