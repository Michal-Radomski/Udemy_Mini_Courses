import React from "react";

import { TOTAL_SCREENS } from "../utilities/commonUtils";

export default function PortfolioContainer(): JSX.Element {
  const mapAllScreens = () => {
    return TOTAL_SCREENS.map((screen) =>
      screen.component ? (
        <screen.component key={screen.screen_name} id={screen.screen_name} />
      ) : (
        <div key={screen.screen_name}></div>
      )
    );
  };

  return (
    <React.Fragment>
      <div className="portfolio-container">{mapAllScreens()}</div>
    </React.Fragment>
  );
}
