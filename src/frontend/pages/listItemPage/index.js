import "./listItemPage.scss";

import React, {useState, useEffect} from "react";
import {Spinner, Container} from "react-bootstrap";
import {TitleComponent, TitlePage} from "../../components/titleComponent";
import {DisplayListedItem} from "./components";
import EmptyResultComponent from "../../components/emptyResultComponent";

const MyListedPage = ({
                        marketplace,
                        nft,
                        account,
                        isNeedConnect
                      }) => {
  const [loading, setLoading] = useState(true);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          sold: i.sold
        };
        listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
    setLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };
  useEffect(() => {
    loadListedItems();
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
      <Container className="my-listed" fluid>
        <TitlePage titleText="My listed items"/>
        <Container fluid={"xxl"}>
          {
            (listedItems.length > 0 || soldItems.length > 0) ? (
              <>
                <div className="my-listed__container">
                  <TitleComponent titleText="Listed" isHasExplore={true}/>
                  {
                    listedItems.length > 0 ? (
                      <DisplayListedItem data={listedItems} isBuy={false}/>
                    ) : (
                      <EmptyResultComponent/>
                    )
                  }
                </div>
                <div className="my-listed__container">
                  <TitleComponent titleText="Sold" isHasExplore={true}/>
                  {
                    soldItems.length > 0 ? (
                      <DisplayListedItem data={soldItems} isBuy={true}/>
                    ) : (
                      <EmptyResultComponent/>
                    )
                  }
                </div>
              </>
            ) : (
              <EmptyResultComponent/>
            )
          }
        </Container>
      </Container>
    </>
  );
};

export default MyListedPage;