import "./itemDetail.scss";

import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {loadMarketplaceItems} from "../../services";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {TitlePage} from "../../components/titleComponent";
import {ethers} from "ethers";
import ButtonComponent from "../../components/buttonComponent";
import {MdShoppingBag} from "react-icons/md";

const ItemDetailPage = ({
                          marketplace,
                          nft,
                          isNeedConnect
                        }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  
  useEffect(() => {
    (async () => {
      const response = await loadMarketplaceItems(marketplace, nft, params.itemId);
      setItem(response);
      setLoading(false);
    })();
  }, [marketplace, nft, params.itemId]);
  
  console.log(item);
  
  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, {value: item.totalPrice})).wait();
    navigate("/my-purchases");
  };
  
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
    <Container className="item-detail__page" fluid>
      <TitlePage titleText={item?.[0]?.name} paramsName={"itemId"}/>
      <Container fluid={"xxl"}>
        <Row className="item-detail__page__container">
          <Col lg={6} md={6} sm={12} className="item-detail__page-left">
            <img src={item?.[0]?.image} alt=""/>
          </Col>
          <Col lg={6} md={6} sm={12} className="item-detail__page-right">
            <h5 className="title">"{item?.[0]?.name}"</h5>
            <p className="description">{item?.[0]?.description}</p>
            <div className="current-price">
              <p className="current-price__title">
                Current price
              </p>
              <p className="current-price__detail">{ethers.utils.formatEther(item?.[0]?.totalPrice)} ETH</p>
            </div>
            <div className="buy-now">
              <ButtonComponent btnEvent={() => buyMarketItem(item?.[0])}
                               btnName={item?.[0]?.sold ? "Sold" : "Buy now"} isDisable={item?.[0]?.sold}
                               btnIcon={<MdShoppingBag/>}/>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ItemDetailPage;