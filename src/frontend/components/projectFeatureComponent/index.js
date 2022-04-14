import "./projectFeature.scss";

import React from "react";
import {Container} from "react-bootstrap";
import {projectFeatureData} from "../../configs";
import {FeatureItem} from "./components";
import {TitleComponent} from "../titleComponent";

const ProjectFeatureComponent = () => {
  return (
    <Container className="project-feature" fluid>
      <Container fluid={"xxl"}>
        <TitleComponent titleText={"Create And Sell Your NFTs"} isHasExplore={false}/>
        <div className="project-feature__container">
          {
            projectFeatureData.map((val, index) => (
              <div key={index} className="project-feature__item">
                <FeatureItem title={val.title}
                             desc={val.desc}
                             featureUrl={val.featureUrl}
                             icon={val.icon}
                             color={val.color}/>
              </div>
            ))
          }
        </div>
      </Container>
    </Container>
  );
};

export default ProjectFeatureComponent;