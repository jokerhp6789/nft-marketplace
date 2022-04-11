import "./cardComponent.scss";

import React, {useState} from "react";
import {Badge, CountDown} from "./components";
import ExampleImg from "../../assets/imgs/exampleImg.jpeg";
import UserAvt from "../../assets/imgs/creatorImg.jpeg";
import ButtonComponent from "../buttonComponent";
import {MdShoppingBag} from "react-icons/md";
import {BiRefresh} from "react-icons/bi";

const CardComponent = ({isHidePlaceBid = true}) => {
  const [isShowPlaceBid, setIsShowPlaceBid] = useState(false);
  return (
    <div className="card-container"
         onMouseEnter={() => setIsShowPlaceBid(true)}
         onMouseLeave={() => setIsShowPlaceBid(false)}>
      <div className="card-media">
        <div className="card-badge__container">
          <Badge numberOfLike={200}/>
        </div>
        <a href="#">
          <img src={ExampleImg} alt=""/>
        </a>
        {
          (isHidePlaceBid && isShowPlaceBid) && (
            <div className="card-media__place-bid">
              <ButtonComponent btnName="Place Bid" btnIcon={<MdShoppingBag/>}/>
            </div>
          )
        }
        <div className="card-count__down-container">
          <CountDown date="Jul 21, 2022 18:00:00"/>
        </div>
      </div>
      <div className="card-content">
        <div className="card-content__title d-flex">
          <div className="title">
            <a href="#">Triumphant Awakening Contemplates</a>
          </div>
          <div className="tags">
            <p>BSC</p>
          </div>
        </div>
        <div className="card-content__info">
          <div className="card-content__avt">
            <img src={UserAvt} alt=""/>
          </div>
          <div className="card-content__creator">
            <h6 className="title">Creator</h6>
            <a href="#" className="creator-name">SalvadorDali</a>
          </div>
          <div className="card-content__price">
            <h6 className="title">Current Bid</h6>
            <p className="price">4.96 ETH</p>
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
              <a href="#">
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