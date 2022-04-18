import "./styles/App.scss";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import MarketplaceAbi from "./contractsData/Marketplace.json";
import MarketplaceAddress from "./contractsData/Marketplace-address.json";
import NFTAbi from "./contractsData/NFT.json";
import NFTAddress from "./contractsData/NFT-address.json";
import {useState} from "react";
import {ethers} from "ethers";
import HeaderNavigation from "./components/headerNavigation";
import FooterComponent from "./components/footerComponent";
import CreatePage from "./pages/createPage";
import MyPurchasesPage from "./pages/myPurchasesPage";
import MyListedPage from "./pages/listItemPage";
import ExplorePage from "./pages/explorePage";
import ItemDetailPage from "./pages/itemDetailPage";

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
          <Routes>
            <Route path="/" element={
              <HomePage nft={nft} marketplace={marketplace} isNeedConnect={loading}/>
            }/>
            <Route path="/explore" element={
              <ExplorePage marketplace={marketplace} nft={nft} isNeedConnect={loading}/>
            }/>
            <Route path="/create" element={
              <CreatePage marketplace={marketplace} nft={nft} isNeedConnect={loading}/>
            }/>
            <Route path="/my-listed-items" element={
              <MyListedPage marketplace={marketplace} nft={nft} account={account} isNeedConnect={loading}/>
            }/>
            <Route path="/my-purchases" element={
              <MyPurchasesPage marketplace={marketplace} nft={nft} account={account} isNeedConnect={loading}/>
            }/>
            <Route path="/explore/:itemId"
                   element={<ItemDetailPage marketplace={marketplace} nft={nft} isNeedConnect={loading}/>}/>
          </Routes>
        </div>
        <>
          <FooterComponent/>
        </>
      </div>
    </BrowserRouter>
  );
}

export default App;
