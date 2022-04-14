import {Container} from "react-bootstrap";
import {useLayoutEffect, useRef, useState} from "react";
import {useWindowSize} from "../../../shared/helpers";
import UserAvtComponent from "../../userAvtComponent";

export const SliderTopSeller = ({data}) => {
  const sellerItem = useRef(null);
  const sliderRef = useRef(null);
  const currentWindowWidth = useWindowSize();
  
  const CARD_PER_PAGE = (currentWindowWidth < 768 && currentWindowWidth >= 497) ? 3 : currentWindowWidth <= 498 ? 2 : currentWindowWidth > 1070 ? 7 : 5;
  
  const [sliderCurrentWidth, setSliderCurrentWidth] = useState(0);
  
  useLayoutEffect(() => {
    const updateSize = () => {
      setSliderCurrentWidth(sliderRef?.current?.offsetWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <Container className="slider-container" fluid>
      <div ref={sliderRef} className="slider-inner" style={{overflow: "scroll"}}>
        <div className="slider-track" style={{
          width: `(${sellerItem.current?.offsetWidth * data.length})px`,
        }}>
          {
            data.map((val, index) => (
              <div ref={sellerItem} key={index}
                   style={{width: `calc(${sliderCurrentWidth}px / ${CARD_PER_PAGE})`}}>
                <div className="top-seller__item-container">
                  <UserAvtComponent isVerify={val.isVerify} userAvt={val.sellerAvt}/>
                  <div className="seller-info">
                    <a href={val.sellerProfileUrl} className="seller-name">{val.sellerName}</a>
                    <p className="seller-total__price">{val.sellerPriceTotal} ETH</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  );
};