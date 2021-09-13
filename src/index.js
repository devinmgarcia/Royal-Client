import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import { Royal } from "./components/Royal";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Royal />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);