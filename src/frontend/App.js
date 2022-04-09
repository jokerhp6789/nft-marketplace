import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/homeComponent/Home.js";
import Create from "./components/createComponent/Create.js";
import MyListedItems from "./components/listItemComponent/MyListedItems.js";
import MyPurchases from "./components/myPurchases/MyPurchases.js";
import MarketplaceAbi from "./contractsData/Marketplace.json";
import MarketplaceAddress from "./contractsData/Marketplace-address.json";
import NFTAbi from "./contractsData/NFT.json";
import NFTAddress from "./contractsData/NFT-address.json";
import {useState} from "react";
import {ethers} from "ethers";
import {Spinner} from "react-bootstrap";
import HeaderNavigation from "./components/headerNavigation";

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
      <div className="App">
        <>
          <HeaderNavigation web3Handler={web3Handler} account={account}/>
        </>
        <div>
          {
            [...new Array(30)].map(() => (
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt magnam natus perferendis quo
                recusandae reprehenderit sequi? Accusamus amet, aspernatur corporis exercitationem illo ipsam, molestiae
                nam pariatur perspiciatis quibusdam quo rerum ut voluptates. Harum laboriosam quia quos temporibus.
                Aliquam aliquid aut dolor doloremque earum exercitationem impedit ipsam, minima omnis pariatur suscipit
                vitae. Dolor dolores eligendi ex inventore iure, libero nihil, perferendis quibusdam repellendus,
                sapiente sequi ut voluptate. A ab accusamus, adipisci asperiores doloremque doloribus expedita fugit hic
                illo impedit ipsa minima molestiae molestias omnis perspiciatis quibusdam recusandae tempore tenetur
                veritatis voluptates! Impedit nemo nulla porro? Aliquam consequatur culpa necessitatibus provident
                quaerat.</p>
            ))
          }
          {/*{loading ? (*/}
          {/*  <div style={{*/}
          {/*    display: "flex",*/}
          {/*    justifyContent: "center",*/}
          {/*    alignItems: "center",*/}
          {/*    minHeight: "80vh"*/}
          {/*  }}>*/}
          {/*    <Spinner animation="border" style={{display: "flex"}}/>*/}
          {/*    <p className="mx-3 my-0">Awaiting Metamask Connection...</p>*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <Routes>*/}
          {/*    <Route path="/" element={*/}
          {/*      <Home marketplace={marketplace} nft={nft}/>*/}
          {/*    }/>*/}
          {/*    <Route path="/create" element={*/}
          {/*      <Create marketplace={marketplace} nft={nft}/>*/}
          {/*    }/>*/}
          {/*    <Route path="/my-listed-items" element={*/}
          {/*      <MyListedItems marketplace={marketplace} nft={nft} account={account}/>*/}
          {/*    }/>*/}
          {/*    <Route path="/my-purchases" element={*/}
          {/*      <MyPurchases marketplace={marketplace} nft={nft} account={account}/>*/}
          {/*    }/>*/}
          {/*  </Routes>*/}
          {/*)}*/}
        </div>
      </div>
    </BrowserRouter>
  
  );
}

export default App;
