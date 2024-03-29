import React from "react";

import Profile from "./Profile/Profile";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Home.scss";

export default function Home(props: { id?: string }) {
  return (
    <React.Fragment>
      <div className="home-container" id={props.id || ""}>
        <Header />
        <Profile />
        <Footer />
      </div>
    </React.Fragment>
  );
}
