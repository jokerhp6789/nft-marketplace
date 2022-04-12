import "./todayPickComponent.scss";

import React from "react";
import {Container} from "react-bootstrap";
import TitleComponent from "../titleComponent";
import ButtonComponent from "../buttonComponent";
import {BiCategoryAlt, BiDollarCircle} from "react-icons/bi";
import {BsBox, BsLightningCharge} from "react-icons/bs";
import {todayPickData} from "../../configs";
import CardComponent from "../cardComponent";

const TodayPickComponent = () => {
  return (
    <Container className="today-pick" fluid>
      <Container fluid={"xxl"}>
        <TitleComponent isHasExplore={true} titleText={"Today's picks"} exploreUrl="#"/>
        <div className="today-pick__sort">
          <div className="today-pick__sort-item">
            <ButtonComponent isPrimary={false} btnName="Category" btnIcon={<BiCategoryAlt/>}/>
          </div>
          <div className="today-pick__sort-item">
            <ButtonComponent isPrimary={false} btnName="Price range" btnIcon={<BiDollarCircle/>}/>
          </div>
          <div className="today-pick__sort-item">
            <ButtonComponent isPrimary={false} btnName="Sale type" btnIcon={<BsLightningCharge/>}/>
          </div>
          <div className="today-pick__sort-item">
            <ButtonComponent isPrimary={false} btnName="Blockchain" btnIcon={<BsBox/>}/>
          </div>
        </div>
        <div className="today-pick__items-container">
          {
            todayPickData.map((val, index) => (
              <div className="item">
                <CardComponent likesOfItem={val.numberOfLike}
                               itemTitle={val.title}
                               itemUserName={val.ownerName}
                               itemPrice={val.currentBid}
                               itemImg={val.img}
                               itemUrl={val.itemUrl}
                               itemHistoryUrl={val.historyUrl}
                               itemUserProfileUrl={val.ownerProfileUrl}
                               isHidePlaceBid={false}
                               isComing={val.isComing}
                               itemUserAvt={val.ownerAvt}
                               isOwner={true}
                />
              </div>
            ))
          }
        </div>
        <div className="today-pick__load-more__btn">
          <ButtonComponent btnName="Load more" isPrimary={false}/>
        </div>
      </Container>
    </Container>
  );
};

export default TodayPickComponent;