import CardComponent from "../../../components/cardComponent";
import {ethers} from "ethers";

export const DisplayListedItem = ({
                                    data,
                                    isBuy
                                  }) => {
  return (
    <div className="my-listed__items">
      {
        data.map((val, index) => (
          <>
            {
              index < 7 && (
                <div key={index} className="item">
                  <CardComponent itemTitle={val.name}
                                 itemImg={val.image}
                                 isHidePlaceBid={false}
                                 isBuy={isBuy}
                                 itemPrice={ethers.utils.formatEther(val.totalPrice)} itemDesc={val.description} />
                </div>
              )
            }
          </>
        ))
      }
    </div>
  );
};