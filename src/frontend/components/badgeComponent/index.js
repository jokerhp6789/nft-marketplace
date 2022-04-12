import "./badgeComponent.scss";

import React, {useState} from "react";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

const BadgeComponent = ({numberOfLike}) => {
  const [likeTotal, setLikeTotal] = useState(numberOfLike);
  const [isLiked, setIsLiked] = useState(false);
  const onLikeBtnClick = () => {
    return new Promise((resolve, reject) => {
      setIsLiked(!isLiked);
      resolve(!isLiked);
    }).then((res) => {
      return res ? setLikeTotal(likeTotal + 1) : setLikeTotal(likeTotal - 1);
    });
  };
  return (
    <button className="badge-button__container" onClick={onLikeBtnClick}>
      <div className="badge-button__icon">
        {
          isLiked ? (
            <AiFillHeart className="text-danger"/>
          ) : (
            <AiOutlineHeart/>
          )
        }
      </div>
      <div className="badge-button__number-of__like">
        <span>{likeTotal}</span>
      </div>
    </button>
  );
};

export default BadgeComponent;