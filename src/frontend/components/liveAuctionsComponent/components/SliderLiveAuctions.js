import React, {useLayoutEffect, useRef, useState} from "react";
import {Container} from "react-bootstrap";
import {useWindowSize} from "../../../shared/helpers";
import CardComponent from "../../cardComponent";

export const SliderLiveAuctions = ({
                                     data
                                   }) => {
  const cardRef = useRef(null);
  const sliderRef = useRef(null);
  const currentWindowWidth = useWindowSize();
  const SPACE_BETWEEN_CARD = 12;
  const CARD_PER_PAGE = (currentWindowWidth === 768 && currentWindowWidth < 1024) ? 2 : currentWindowWidth < 768 ? 1 : currentWindowWidth >= 1300 ? 4 : 3;
  
  const [trackTranslateY, setTrackTranslateY] = useState(0);
  const [sliderStepSelected, setSliderStepSelected] = useState(0);
  const [sliderCurrentWidth, setSliderCurrentWidth] = useState(0);
  
  useLayoutEffect(() => {
    const updateSize = () => {
      setSliderCurrentWidth(sliderRef?.current?.offsetWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  const onMoveNextCard = (index) => {
    const SPACE_BETWEEN_CARD_CHANGE = 18;
    const WIDTH_CHANGE_PER_CARD = (sliderCurrentWidth / CARD_PER_PAGE - SPACE_BETWEEN_CARD) + SPACE_BETWEEN_CARD_CHANGE;
    setTrackTranslateY(index < 2 ? WIDTH_CHANGE_PER_CARD * index : (WIDTH_CHANGE_PER_CARD * index - ((index - 1) * 6)));
    setSliderStepSelected(index);
  };
  return (
    <Container className="slider-container" fluid>
      <div ref={sliderRef} className="slider-inner">
        <div className="slider-track"
             style={{
               width: `(${cardRef.current?.offsetWidth * data.length})px`,
               transform: `translateX(-${trackTranslateY}px)`
             }}>
          {
            data.map((val, index) => (
              // <>
              //   {
              //     index < 7 && (
              <div key={index}
                   className="item"
                   style={{width: `calc(${sliderCurrentWidth}px / ${CARD_PER_PAGE} - ${SPACE_BETWEEN_CARD}px)`}}
              >
                <CardComponent itemUserProfileUrl={val.creatorProfileUrl}
                               itemUrl={val.itemUrl}
                               itemHistoryUrl={val.historyUrl}
                               itemImg={val.img}
                               itemPrice={val.currentBid}
                               itemUserAvt={val.creatorAvt}
                               itemUserName={val.creatorName}
                               itemTitle={val.title}
                               likesOfItem={val.numberOfLike}
                               itemCountDown={val.countdown} isHidePlaceBid={false}/>
              </div>
              //     )
              //   }
              // </>
            ))
          }
        </div>
      </div>
      <div className="slider-direction">
        {
          data.map((val, index) => (
            <>
              {
                (currentWindowWidth >= 1300 ? index < 4 : index < 5) && (
                  <div key={val.title}
                       className={`slider-direction__step ${index === sliderStepSelected && "slider-direction__active"}`}>
                    <div className="slider-direction__step-item" onClick={() => onMoveNextCard(index)}/>
                  </div>
                )
              }
            </>
          ))
        }
      </div>
    </Container>
  );
};