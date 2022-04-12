import UserAvtComponent from "../../userAvtComponent";
import BadgeComponent from "../../badgeComponent";

export const PopularCollectionCard = ({
                                        userAvt,
                                        isVerify,
                                        userName,
                                        title,
                                        collectionImg,
                                        userProfileUrl,
                                        collectionUrl,
                                        numberOfLike
                                      }) => {
  return (
    <div className="popular-card">
      <div className="popular-card__header">
        <div className="popular-card__header-info">
          <div className="popular-card__header-avt">
            <UserAvtComponent userAvt={userAvt} isVerify={isVerify}/>
          </div>
          <div className="popular-card__header-title">
            <a href={collectionUrl} className="title">{title}</a>
            <p className="creator-info">
              <span className="creator-title">Created by</span>
              {" "}
              <a href={userProfileUrl} className="creator-name">{userName}</a>
            </p>
          </div>
        </div>
        <div className="popular-card__header-badge">
          <BadgeComponent numberOfLike={numberOfLike}/>
        </div>
      </div>
      <div className="popular-card__body">
        <div className="img-left">
          <img className="img-size" src={collectionImg[0]} alt=""/>
        </div>
        <div className="img-right">
          <div className="img-right__top">
            <img className="img-size" src={collectionImg[1]} alt=""/>
            <img className="img-size" src={collectionImg[2]} alt=""/>
          </div>
          <div className="img-right__bottom">
            <img className="img-size" src={collectionImg[3]} alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
};