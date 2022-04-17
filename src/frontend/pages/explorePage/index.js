import "./explorePage.scss";

import React, {useEffect, useState} from "react";
import {Container, Spinner} from "react-bootstrap";
import {TitlePage} from "../../components/titleComponent";
import {ethers} from "ethers";
import CardComponent from "../../components/cardComponent";
import EmptyResultComponent from "../../components/emptyResultComponent";

const ExplorePage = ({
                       marketplace,
                       nft,
                       isNeedConnect
                     }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        });
      }
    }
    setLoading(false);
    setItems(items);
  };
  
  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, {value: item.totalPrice})).wait();
    await loadMarketplaceItems();
  };
  
  useEffect(() => {
    loadMarketplaceItems();
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
                               isBuy={false} btnName={"Buy now"}
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