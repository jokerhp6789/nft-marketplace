import "./myPurchasesPage.scss";

import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import {Spinner, Container} from "react-bootstrap";
import {TitlePage} from "../../components/titleComponent";
import CardComponent from "../../components/cardComponent";
import EmptyResultComponent from "../../components/emptyResultComponent";

const MyPurchasesPage = ({
                           marketplace,
                           nft,
                           account,
                           isNeedConnect
                         }) => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace.filters.Bought(null, null, null, null, null, account);
    const results = await marketplace.queryFilter(filter);
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args;
      // get uri url from nft contract
      const uri = await nft.tokenURI(i.tokenId);
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri);
      const metadata = await response.json();
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId);
      // define listed item object
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      };
      return purchasedItem;
    }));
    setLoading(false);
    setPurchases(purchases);
  };
  useEffect(() => {
    loadPurchasedItems();
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
    <>
      <Container className="my-purchases" fluid>
        <TitlePage titleText={"My purchases"}/>
        <Container fluid={"xxl"}>
          <div className="my-purchases__container">
            {
              purchases.length > 0 ?
                purchases.map((val, index) => (
                  <div key={index} className="my-purchases__item">
                    <CardComponent itemTitle={val.name} itemId={val.itemId}
                                   itemImg={val.image}
                                   isHidePlaceBid={false}
                                   isBuy={true} btnName={"Bought"}
                                   itemPrice={ethers.utils.formatEther(val.totalPrice)} itemDesc={val.description}/>
                  </div>
                )) : (
                  <div style={{width: "100%"}}>
                    <EmptyResultComponent/>
                  </div>
                )
            }
          </div>
        </Container>
      </Container>
    </>
  );
};

export default MyPurchasesPage;