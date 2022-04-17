import "./explorePage.scss";

import React, {useEffect, useState} from "react";
import {Container, Spinner} from "react-bootstrap";
import {TitlePage} from "../../components/titleComponent";
import {ethers} from "ethers";
import CardComponent from "../../components/cardComponent";
import EmptyResultComponent from "../../components/emptyResultComponent";
import {loadMarketplaceItems} from "../../services";

const ExplorePage = ({
                       marketplace,
                       nft,
                       isNeedConnect
                     }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  
  const loadItemFromMarketplace = async () => {
    const response = await loadMarketplaceItems(marketplace, nft);
    setItems(response);
    setLoading(false);
  };
  
  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, {value: item.totalPrice})).wait();
    await loadItemFromMarketplace();
  };
  
  useEffect(() => {
    loadItemFromMarketplace();
  }, []);
  
  return isNeedConnect ? (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh"
    }}>
      <Spinner animation="border" style={{display: "flex"}}/>
      <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
    </div>
  ) : loading ? (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh"
    }}>
      <Spinner animation="border" style={{display: "flex"}}/>
      <p className="mx-3 my-0">Keep calm and wait...</p>
    </div>
  ) : (
    <Container className="explore-page" fluid>
      <TitlePage titleText="Explore"/>
      <Container fluid={"xxl"}>
        <div className="explore-page__container">
          {
            items.length > 0 ? items.map((val, index) => (
              <div key={index} className="item">
                <CardComponent itemTitle={val.name}
                               itemImg={val.image}
                               isHidePlaceBid={false}
                               isBuy={false}
                               itemPrice={ethers.utils.formatEther(val.totalPrice)}
                               itemDesc={val.description}
                               buyItemFunc={() => buyMarketItem(val)} itemId={val.itemId}/>
              </div>
            )) : (
              <EmptyResultComponent/>
            )
          }
        </div>
      </Container>
    </Container>
  );
};

export default ExplorePage;