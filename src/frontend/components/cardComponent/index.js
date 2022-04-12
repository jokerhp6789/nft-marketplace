import "./cardComponent.scss";

import React, {useState} from "react";
import {Badge, CountDown} from "./components";
import ExampleImg from "../../assets/imgs/liveAuctions/exampleImg4.jpeg";
import ButtonComponent from "../buttonComponent";
import {MdShoppingBag} from "react-icons/md";
import {BiRefresh} from "react-icons/bi";

const CardComponent = ({
                         likesOfItem,
                         itemImg,
                         itemTitle,
                         itemUrl,
                         itemCountDown,
                         itemUserAvt,
                         itemUserName,
                         itemUserProfileUrl,
                         itemPrice,
                         itemHistoryUrl,
                         refItem,
                         isHidePlaceBid = true
                       }) => {
  const [isShowPlaceBid, setIsShowPlaceBid] = useState(false);
  return (
    <div ref={refItem} className="card-container"
         onMouseEnter={() => setIsShowPlaceBid(true)}
         onMouseLeave={() => setIsShowPlaceBid(false)}>
      <div className="card-media">
        <div className="card-badge__container">
          <Badge numberOfLike={likesOfItem}/>
        </div>
        <a href="#">
          <img src={itemImg} alt=""/>
        </a>
        {
          (isHidePlaceBid && isShowPlaceBid) && (
            <div className="card-media__place-bid">
              <ButtonComponent btnName="Place Bid" btnIcon={<MdShoppingBag/>}/>
            </div>
          )
        }
        <div className="card-count__down-container">
          <CountDown date={itemCountDown}/>
        </div>
      </div>
      <div className="card-content">
        <div className="card-content__title d-flex">
          <div className="title">
            <a href={itemUrl}>{itemTitle}</a>
          </div>
          <div className="tags">
            <p>BSC</p>
          </div>
        </div>
        <div className="card-content__info">
          <div className="card-content__avt">
            <img src={itemUserAvt} alt=""/>
          </div>
          <div className="card-content__creator">
            <h6 className="title">Creator</h6>
            <a href={itemUserProfileUrl} className="creator-name">{itemUserName}</a>
          </div>
          <div className="card-content__price">
            <h6 className="title">Current Bid</h6>
            <p className="price">{itemPrice}</p>
          </div>
        </div>
      </div>
      {
        !isHidePlaceBid && (
          <div className="card-place__bid">
            <div className="card-place__bid-btn">
              <ButtonComponent btnName="Place Bid" btnIcon={<MdShoppingBag/>}/>
            </div>
            <div className="card-place__bid-history">
              <a href={itemHistoryUrl}>
                <BiRefresh/>
                <span>View History</span>
              </a>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CardComponent;