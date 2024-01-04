import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

import ScrollService from "../../../utilities/ScrollService";
import "./Profile.scss";

const Profile = (): JSX.Element => {
  const [typeEffect] = useTypewriter({
    words: [
      "Enthusiastic Dev 😎",
      "Full Stack Developer 💻",
      "Mern Stack Dev 📱",
      "Cross Platform Dev 🔴",
      "React/React Native 🌐",
    ],
    loop: false,
    typeSpeed: 85,
    deleteSpeed: 40,
    delaySpeed: 1500,
  });

  return (
    <React.Fragment>
      <div className="profile-container">
        <div className="profile-parent">
          <div className="profile-details">
            <div className="colz">
              <div className="colz-icon">
                <a href="https://web.facebook.com">
                  <i className="fa fa-facebook-square" />
                </a>
                <a href="https://www.google.com">
                  <i className="fa fa-google-plus-square" />
                </a>
                <a href="https://www.instagram.com">
                  <i className="fa fa-instagram" />
                </a>
                <a href="https://www.youtube.com">
                  <i className="fa fa-youtube-square" />
                </a>
                <a href="https://twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </div>
            </div>
            <div className="profile-details-name">
              <span className="primary-text">
                Hello, I'M <span className="highlighted-text">Ehiedu</span>
              </span>
            </div>
            <div className="profile-details-role">
              <span className="primary-text">
                <h1>
                  <span style={{ fontWeight: "bold", marginLeft: "0.25rem" }}>{typeEffect}</span>
                  <Cursor cursorStyle="|" cursorColor="deeppink" cursorBlinking={true} />
                </h1>
              </span>
              <span className="profile-role-tagline">
                Knack of building applications with front and back end operations.
              </span>
            </div>

            <div className="profile-options">
              <button className="btn primary-btn" onClick={() => ScrollService.scrollHandler.scrollToHireMe()}>
                Hire Me
              </button>
              <a href="resume.pdf" download="Ehiedu_Ehizcv.pdf">
                <button className="btn highlighted-btn">Get Resume</button>
              </a>
            </div>
          </div>
          <div className="profile-picture">
            <div className="profile-picture-background"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
