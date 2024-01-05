import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  //* React-owl-carousel is outdated!
  // <React.StrictMode>
  <React.Fragment>
    <App />
  </React.Fragment>

  // </React.StrictMode>
);
