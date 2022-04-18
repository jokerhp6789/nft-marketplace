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
          <div key={index} className="item">
            <CardComponent itemTitle={val.name} itemId={val.itemId}
                           itemImg={val.image}
                           isHidePlaceBid={false}
                           isBuy={isBuy} btnName={val.sold ? "Sold" : "Buy now"}
                           itemPrice={ethers.utils.formatEther(val.totalPrice)} itemDesc={val.description}/>
          </div>
        ))
      }
    </div>
  );
};