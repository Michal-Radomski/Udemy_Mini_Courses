import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TOTAL_SCREENS, GET_SCREEN_INDEX } from "../../../utilities/commonUtils";
import ScrollService from "../../../utilities/ScrollService";
import "./Header.scss";

export default function Header(): JSX.Element {
  const [selectedScreen, setSelectedScreen] = React.useState<number>(0);
  const [showHeaderOptions, setShowHeaderOptions] = React.useState<boolean>(false);

  const updateCurrentScreen = (currentScreen: any) => {
    console.log({ currentScreen });
    if (!currentScreen || !currentScreen.screenInView) return;

    const screenIndex = GET_SCREEN_INDEX(currentScreen.screenInView);
    if (screenIndex < 0) return;
  };
  const currentScreenSubscription = ScrollService.currentScreenBroadcaster.subscribe(updateCurrentScreen);

  const getHeaderOptions = () => {
    return TOTAL_SCREENS.map((Screen, i) => (
      <div key={Screen.screen_name} className={getHeaderOptionsClasses(i)} onClick={() => switchScreen(i, Screen)}>
        <span>{Screen.screen_name}</span>
      </div>
    ));
  };

  const getHeaderOptionsClasses = (index: number) => {
    let classes = "header-option ";
    if (index < TOTAL_SCREENS.length - 1) classes += "header-option-separator ";

    if (selectedScreen === index) classes += "selected-header-option ";

    return classes;
  };

  const switchScreen = (index: number, screen: ScreenI) => {
    const screenComponent = document.getElementById(screen.screen_name);
    if (!screenComponent) return;

    screenComponent.scrollIntoView({ behavior: "smooth" });
    setSelectedScreen(index);
    setShowHeaderOptions(false);
  };

  React.useEffect(() => {
    return () => {
      currentScreenSubscription.unsubscribe();
    };
  }, [currentScreenSubscription]);

  return (
    <div className="header-container" onClick={() => setShowHeaderOptions(!showHeaderOptions)}>
      <div className="header-parent">
        <div className="header-hamburger" onClick={() => setShowHeaderOptions(!showHeaderOptions)}>
          <FontAwesomeIcon className="header-hamburger-bars" icon={faBars} />
        </div>
        <div className="header-logo">
          <span>HELLO~</span>
        </div>
        <div className={showHeaderOptions ? "header-options show-hamburger-options" : "header-options"}>
          {getHeaderOptions()}
        </div>
      </div>
    </div>
  );
}
