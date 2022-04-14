import "./homePage.scss";

import {Container} from "react-bootstrap";
import BannerComponent from "../../components/bannerComponent";
import LiveAuctionsComponent from "../../components/liveAuctionsComponent";
import TopSellerComponent from "../../components/topSellerComponent";
import TodayPickComponent from "../../components/todayPickComponent";
import PopularCollectionComponent from "../../components/popularCollectionComponent";
import ProjectFeatureComponent from "../../components/projectFeatureComponent";

const HomePage = () => {
  return (
    <>
      <Container fluid className="home-component">
        <BannerComponent/>
        {/*<LiveAuctionsComponent/>*/}
        {/*<TopSellerComponent/>*/}
        {/*<TodayPickComponent/>*/}
        {/*<PopularCollectionComponent/>*/}
        <ProjectFeatureComponent/>
      </Container>
    </>
  );
};
export default HomePage;