import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Visualizer from "./visualizerSource/Visualizer";
import "./visualizerSource/CSS_Files/all_styles_of_ui.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <React.Fragment>
    <Visualizer />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
