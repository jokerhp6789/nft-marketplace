import "./cardComponent.scss";

import React, {useState} from "react";
import {Badge, CountDown} from "./components";
import ButtonComponent from "../buttonComponent";
import {MdShoppingBag} from "react-icons/md";
import {BiRefresh} from "react-icons/bi";
import BadgeCompent from "../badgeComponent";
import {useNavigate} from "react-router";

const CardComponent = ({
                         itemId,
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
                         itemDesc,
                         buyItemFunc,
                         btnName,
                         isBuy = false,
                         isOwner = false,
                         isComing = false,
                         isHidePlaceBid = true
                       }) => {
  const navigate = useNavigate();
  const [isShowPlaceBid, setIsShowPlaceBid] = useState(false);
  return (
    <div className="card-container"
         onMouseEnter={() => setIsShowPlaceBid(true)}
         onMouseLeave={() => setIsShowPlaceBid(false)}>
      <div className="card-media">
        {
          likesOfItem && (
            <div className="card-badge__container">
              <BadgeCompent numberOfLike={likesOfItem}/>
            </div>
          )
        }
        {
          isComing && (
            <div className="card-badge__container card-coming__badge">
              <p>Coming soon</p>
            </div>
          )
        }
        <p onClick={() => {
          itemId && navigate(`/explore/${itemId}`);
        }}>
          <img src={itemImg} alt=""/>
        </p>
        {/*{*/}
        {/*  (isHidePlaceBid && isShowPlaceBid) && (*/}
        {/*    <div className="card-media__place-bid">*/}
        {/*      <ButtonComponent btnName={isBuy ? "Bought" : "Buy now"}*/}
        {/*                       btnIcon={<MdShoppingBag/>}*/}
        {/*                       isDisable={isBuy}*/}
        {/*                       btnEvent={() => buyItemFunc}/>*/}
        {/*    </div>*/}
        {/*  )*/}
        {/*}*/}
        {
          itemCountDown && (
            <div className="card-count__down-container">
              <CountDown date={itemCountDown}/>
            </div>
          )
        }
      </div>
      <div className="card-content">
        <div className="card-content__title d-flex">
          <div className="title">
            <p onClick={() => {
              itemId && navigate(`/explore/${itemId}`);
            }}>"{itemTitle}"</p>
            {
              itemDesc && <span className="description">{itemDesc}</span>
            }
          </div>
          {/*<div className="tags">*/}
          {/*  <p>BSC</p>*/}
          {/*</div>*/}
        </div>
        <div className="card-content__info">
          {/*<div className="card-content__avt">*/}
          {/*  <img src={itemUserAvt} alt=""/>*/}
          {/*</div>*/}
          {/*<div className="card-content__creator">*/}
          {/*  <h6 className="title">{isOwner ? "Owned By" : "Creator"}</h6>*/}
          {/*  <a href={itemUserProfileUrl} className="creator-name">{itemUserName}</a>*/}
          {/*</div>*/}
          <div className="card-content__price">
            <h6 className="title">Current Price</h6>
            <p className="price">{itemPrice} ETH</p>
          </div>
          {
            (!itemHistoryUrl && !isHidePlaceBid && !isComing) && (
              <div className="card-place__bid-btn">
                <ButtonComponent btnName={btnName}
                                 btnIcon={<MdShoppingBag/>}
                                 isDisable={isBuy || !buyItemFunc} btnEvent={buyItemFunc}/>
              </div>
            )
          }
        </div>
      </div>
      {
        (!isHidePlaceBid && !isComing && itemHistoryUrl) && (
          <div className="card-place__bid">
            <div className="card-place__bid-btn">
              <ButtonComponent btnName="Buy now" btnIcon={<MdShoppingBag/>}/>
            </div>
            {
              itemHistoryUrl && (
                <div className="card-place__bid-history">
                  <a href={itemHistoryUrl}>
                    <BiRefresh/>
                    <span>View History</span>
                  </a>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default CardComponent;