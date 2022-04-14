import "./createPage.scss";

import {useState} from "react";
import {ethers} from "ethers";
import {Row, Form, Button, Container, Col} from "react-bootstrap";
import {create as ipfsHttpClient} from "ipfs-http-client";
import {TitleComponent, TitlePage} from "../titleComponent";
import CardComponent from "../cardComponent";
import ExampleImg1 from "../../assets/imgs/liveAuctions/exampleImg1.jpg";
import CreatorImg1 from "../../assets/imgs/liveAuctions/creatorImg1.jpg";
import ToastNoti from "../toastNotiComponent";
import ButtonComponent from "../buttonComponent";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const exampleCard = {
  title: "Hamlet Contemplates Contemplates ",
  img: ExampleImg1,
  itemUrl: "#",
  creatorName: "SalvadorDali",
  creatorAvt: CreatorImg1,
  currentBid: "4.89 ETH",
  countdown: "Jul 21, 2022 18:00:00",
  numberOfLike: 100,
  creatorProfileUrl: "#"
};

const CreatePage = ({
                      marketplace,
                      nft
                    }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [notiMsg, setNotiMsg] = useState({
    title: "",
    content: ""
  });
  
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFileName(file.name);
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        // console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
        setNotiMsg({
          title: "Success",
          content: "Upload file success"
        });
      } catch (error) {
        // console.log("ipfs image upload error: ", error);
        setNotiMsg({
          title: "Error",
          content: `ipfs image upload error: ${error.message}`
        });
      }
    } else {
      setNotiMsg({
        title: "Error",
        content: "Upload file error"
      });
    }
  };
  
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(JSON.stringify({
        image,
        price,
        name,
        description
      }));
      await mintThenList(result);
    } catch (error) {
      setNotiMsg({
        title: "Error",
        content: `ipfs uri upload error: ${error.message}`
      });
    }
  };
  
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nft 
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft 
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };
  
  return (
    <>
      <Container className="create-page" fluid>
        <TitlePage titleText={"Create item"}/>
        <Container fluid={"xxl"}>
          <Row className="create-page__container">
            <Col lg={4} md={12} sm={12} className="create-page__left">
              <p className="create-page__section-title">Preview item</p>
              <div className="create-page__preview-card">
                <CardComponent itemUrl={exampleCard.itemUrl}
                               itemImg={image || exampleCard.img}
                               isHidePlaceBid={false}
                               itemTitle={name || exampleCard.title}
                               itemPrice={price || exampleCard.currentBid}
                               itemUserAvt={exampleCard.creatorAvt}
                               itemUserProfileUrl={exampleCard.creatorProfileUrl}
                               likesOfItem={exampleCard.numberOfLike}
                               itemUserName={exampleCard.creatorName} itemHistoryUrl={"#"}/>
              </div>
            </Col>
            <Col lg={8} md={12} sm={12} className="create-page__right">
              <div className="create-page__upload-img">
                <p className="create-page__section-title">Upload file</p>
                <div className="upload-item__container">
                  <span className="file-name">{fileName ? fileName : "PNG, JPG, GIF, WEBP or MP4. Max 200mb."}</span>
                  <div className="upload-section">
                    <label htmlFor="upload-item__input" className="upload-item__label">Upload file</label>
                    <input type="file" className="upload-item__input" id="upload-item__input" onChange={uploadToIPFS}/>
                  </div>
                </div>
              </div>
              <div className="create-page__file-name">
                <p className="create-page__section-title">Name</p>
                <input type="text"
                       className="create-page__input-field"
                       placeholder="Item name"
                       onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="create-page__file-desc">
                <p className="create-page__section-title">Description</p>
                <textarea className="create-page__input-field"
                          placeholder={`eg. "This is very limited item."`}
                          onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="create-page__file-price">
                <p className="create-page__section-title">Price</p>
                <input type="number"
                       className="create-page__input-field"
                       placeholder="Price in ETH" onChange={(e) => setPrice(e.target.value)}/>
              </div>
              <div className="create-page__file-submit">
                <ButtonComponent btnEvent={createNFT}
                                 btnName={"Create NFT"}
                                 isPrimary={false}
                                 isDisable={!name || !price || !description || !image}/>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <ToastNoti errorMsg={notiMsg.content} titleNoti={notiMsg.title} setErrMsg={setNotiMsg}/>
    </>
  );
};

export default CreatePage;