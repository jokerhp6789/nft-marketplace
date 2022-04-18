import "./todayPickComponent.scss";

import React, {useEffect, useState} from "react";
import {Container, Spinner} from "react-bootstrap";
import ButtonComponent from "../buttonComponent";
import {BiCategoryAlt, BiDollarCircle} from "react-icons/bi";
import {BsBox, BsLightningCharge} from "react-icons/bs";
import {todayPickData} from "../../configs";
import CardComponent from "../cardComponent";
import {TitleComponent} from "../titleComponent";
import {useNavigate} from "react-router";
import {ethers} from "ethers";
import EmptyResultComponent from "../emptyResultComponent";

const TodayPickComponent = ({
                              marketplace,
                              nft
                            }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  // const navigate = useNavigate();
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
  
  return loading ? (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh"
    }}>
      <Spinner animation="border" style={{display: "flex"}}/>
      <p className="mx-3 my-0">Keep calm and wait for viewing Hot Deal...</p>
    </div>
  ) : (
    <Container className="today-pick" fluid>
      <Container fluid={"xxl"}>
        <TitleComponent isHasExplore={false} titleText={"Hot deal"}/>
        {/*<div className="today-pick__sort">*/}
        {/*  <div className="today-pick__sort-item">*/}
        {/*    <ButtonComponent isPrimary={false} btnName="Category" btnIcon={<BiCategoryAlt />} />*/}
        {/*  </div>*/}
        {/*  <div className="today-pick__sort-item">*/}
        {/*    <ButtonComponent isPrimary={false} btnName="Price range" btnIcon={<BiDollarCircle />} />*/}
        {/*  </div>*/}
        {/*  <div className="today-pick__sort-item">*/}
        {/*    <ButtonComponent isPrimary={false} btnName="Sale type" btnIcon={<BsLightningCharge />} />*/}
        {/*  </div>*/}
        {/*  <div className="today-pick__sort-item">*/}
        {/*    <ButtonComponent isPrimary={false} btnName="Blockchain" btnIcon={<BsBox />} />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className={`today-pick__items-container ${items.length === 0 && "mt-0"}`}>
          {
            items.length > 0 ? items.sort((a, b) => ethers.utils.formatEther(a.totalPrice) - ethers.utils.formatEther(b.totalPrice)).map((val, index) => (
              index < 4 && (
                <div key={index} className="item">
                  <CardComponent itemTitle={val.name}
                                 itemImg={val.image}
                                 isHidePlaceBid={false}
                                 isBuy={false} btnName={"Buy now"}
                                 itemPrice={ethers.utils.formatEther(val.totalPrice)}
                                 itemDesc={val.description}
                                 buyItemFunc={() => buyMarketItem(val)} itemId={val.itemId}
                  />
                </div>
              )
            )) : (
              <EmptyResultComponent/>
            )
          }
        </div>
        {/*<div className="today-pick__load-more__btn">*/}
        {/*  <ButtonComponent btnName="Load more" isPrimary={false}/>*/}
        {/*</div>*/}
      </Container>
    </Container>
  );
};

export default TodayPickComponent;