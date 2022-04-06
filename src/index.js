import {render} from "react-dom";
import App from "./frontend/App";
import * as serviceWorker from "./serviceWorker";
import "aos/dist/aos.css";
import "./frontend/styles/reset.scss";
import AOS from "aos";

AOS.init();

const rootElement = document.getElementById("root");
render(<App/>, rootElement);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();