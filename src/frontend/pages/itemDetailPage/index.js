import "./itemDetail.scss";

import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {loadMarketplaceItems} from "../../services";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {TitlePage} from "../../components/titleComponent";

const ItemDetailPage = ({
                          marketplace,
                          nft,
                          isNeedConnect
                        }) => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  
  useEffect(() => {
    (async () => {
      const response = await loadMarketplaceItems(marketplace, nft, params.itemId);
      setItem(response);
      setLoading(false);
    })();
  }, [marketplace, nft, params.itemId]);
  
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
          <Col className="item-detail__page-left">
            <img src={item?.[0]?.image} alt=""/>
          </Col>
          <Col className="item-detail__page-right">
            <h5 className="title">"{item?.[0]?.name}"</h5>
            <p className="description">{item?.[0]?.description}</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ItemDetailPage;