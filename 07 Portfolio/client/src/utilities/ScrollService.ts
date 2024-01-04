import { Subject } from "rxjs";

import { TOTAL_SCREENS } from "./commonUtils";

export default class ScrollService {
  //* SINGLETON CLASS INSTANCE
  static scrollHandler = new ScrollService();

  //* Lets instantiate the subject BROADCASTERS
  static currentScreenBroadcaster = new Subject();
  static currentScreenFadeIn = new Subject();

  //* Let's have a constructor here and add the scroll event to window
  constructor() {
    window.addEventListener("scroll", this.checkCurrentScreenUnderViewport);
  }

  //* SCROLL TO HIRE ME / CONTACT ME SCREEN
  scrollToHireMe = () => {
    const contactMeScreen = document.getElementById("ContactMe");
    if (!contactMeScreen) return;
    contactMeScreen.scrollIntoView({ behavior: "smooth" });
  };

  //* SCROLL TO HOME
  scrollToHome = () => {
    const homeScreen = document.getElementById("Home");
    if (!homeScreen) return;
    homeScreen.scrollIntoView({ behavior: "smooth" });
  };

  //* CHECK IF ELEMENT IS IN VIEW This simply means if the document appears fully on the screen or not
  isElementInView = (elem: HTMLElement, type: string) => {
    const rec = elem.getBoundingClientRect();
    const elementTop = rec.top;
    const elemBottom = rec.bottom;

    //* When the element is Partially Visible
    const partiallyVisible = elementTop < window.innerHeight && elemBottom >= 0;

    //* Completely Visible
    const completelyVisible = elementTop >= 0 && elemBottom <= window.innerHeight;

    switch (type) {
      case "partial":
        return partiallyVisible;

      case "complete":
        return completelyVisible;

      default:
        return false;
    }
  };

  //* CHECK THE SCREEN THATS CURRENTLY UNDER VIEWPORT, which means the screen that is displayed fully
  checkCurrentScreenUnderViewport = (event: {}) => {
    if (!event || Object.keys(event).length < 1) return;

    for (let screen of TOTAL_SCREENS) {
      const screenFromDOM = document.getElementById(screen.screen_name);
      if (!screenFromDOM) continue;

      const fullyVisible = this.isElementInView(screenFromDOM, "complete");
      const partiallyVisible = this.isElementInView(screenFromDOM, "partial");

      if (fullyVisible || partiallyVisible) {
        if (partiallyVisible && !screen.alreadyRendered) {
          //* BROADCAST FADE IN EFFECT
          ScrollService.currentScreenFadeIn.next({
            fadeInScreen: screen.screen_name,
          });
          screen["alreadyRendered"] = true;
          break;
        }

        if (fullyVisible) {
          //* BROADCAST SCREEN NAME
          ScrollService.currentScreenBroadcaster.next({
            screenInView: screen.screen_name,
          });
          break;
        }
      }
    }
  };
}
