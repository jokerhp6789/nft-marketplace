import "./styles/App.scss";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./components/homePage/homePage";
import MyListedItems from "./components/listItemComponent/MyListedItems.js";
import MyPurchases from "./components/myPurchasesComponent/MyPurchases.js";
import MarketplaceAbi from "./contractsData/Marketplace.json";
import MarketplaceAddress from "./contractsData/Marketplace-address.json";
import NFTAbi from "./contractsData/NFT.json";
import NFTAddress from "./contractsData/NFT-address.json";
import {useState} from "react";
import {ethers} from "ethers";
import {Spinner} from "react-bootstrap";
import HeaderNavigation from "./components/headerNavigation";
import CardComponent from "./components/cardComponent";
import FooterComponent from "./components/footerComponent";
import CreatePage from "./components/createPage";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();
    
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });
    
    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    await loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };
  
  return (
    <BrowserRouter>
      <div className="App overflow-hidden">
        <>
          <HeaderNavigation web3Handler={web3Handler} account={account}/>
        </>
        <div>
          {loading ? (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh"
            }}>
              <Spinner animation="border" style={{display: "flex"}}/>
              <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <HomePage marketplace={marketplace} nft={nft}/>
              }/>
              <Route path="/create" element={
                <CreatePage marketplace={marketplace} nft={nft}/>
              }/>
              {/*<Route path="/my-listed-items" element={*/}
              {/*  <MyListedItems marketplace={marketplace} nft={nft} account={account}/>*/}
              {/*}/>*/}
              {/*<Route path="/my-purchases" element={*/}
              {/*  <MyPurchases marketplace={marketplace} nft={nft} account={account}/>*/}
              {/*}/>*/}
            </Routes>
          )}
        </div>
        <>
          <FooterComponent/>
        </>
      </div>
    </BrowserRouter>
  
  );
}

export default App;
