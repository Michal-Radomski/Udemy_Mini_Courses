import React from "react";

import "./App.scss";
import Profile from "./PortfolioContainer/Home/Profile";
import Footer from "./PortfolioContainer/Home/Footer/Footer";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Profile />
      <Footer />
    </React.Fragment>
  );
}

export default App;
