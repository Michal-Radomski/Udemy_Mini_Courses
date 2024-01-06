import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTypewriter, Cursor } from "react-simple-typewriter";

import imgBack from "../../assets/images/mailz.jpeg";
import load1 from "../../assets/images/load2.gif";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./ContactMe.scss";
import Footer from "../Home/Footer/Footer";

//Todo: fix - non stop rendering!
export default function ContactMe(props: { id: string }): JSX.Element {
  const [typeEffect] = useTypewriter({
    words: ["Get In Touch 📧"],
    loop: false,
    typeSpeed: 85,
    deleteSpeed: 40,
    delaySpeed: 1500,
  });

  let fadeInScreenHandler = (screen: { fadeInScreen: string }) => {
    if (screen.fadeInScreen !== props.id) return;
    Animations.animations.fadeInScreen(props.id);
  };

  ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler as any);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [banner, setBanner] = React.useState<string>("");
  const [bool, setBool] = React.useState<boolean>(false);
  // console.log({ name });

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data = {
        name,
        email,
        message,
      };
      setBool(true);
      const res = await axios.post(`/contact`, data);
      if (name.length === 0 || email.length === 0 || message.length === 0) {
        setBanner(res.data.msg);
        toast.error(res.data.msg);
        setBool(false);
      } else if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
        setBool(false);

        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container fade-in" id={props.id || ""}>
      <ScreenHeading subHeading={"Lets Keep In Touch"} title={"Contact Me"} />
      <div className="central-form">
        <div className="col">
          <h2 className="title">
            <span style={{ fontWeight: "bold", marginLeft: "0.25rem" }}>{typeEffect}</span>
            <Cursor cursorStyle="|" cursorColor="deeppink" cursorBlinking={true} />
          </h2>{" "}
          <a href="https://web.facebook.com/?_rdc=1&_rdr">
            <i className="fa fa-facebook-square" />
          </a>
          <a href="https://www.google.com">
            <i className="fa fa-google-plus-square" />
          </a>
          <a href="https://www.instagram.com/instructor_ehizeex/">
            <i className="fa fa-instagram" />
          </a>
          <a href="https://www.youtube.com/channel/UCSSr5ZDFbilpZ592_ycoAwA">
            <i className="fa fa-youtube-square" />
          </a>
          <a href="https://twitter.com/Ehiedu_baba">
            <i className="fa fa-twitter" />
          </a>
        </div>
        <div className="back-form">
          <div className="img-back">
            <h4>Send Your Email Here!</h4>
            <img src={imgBack} alt="" />
          </div>
          <form onSubmit={submitForm}>
            <p>{banner}</p>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleName} value={name} />

            <label htmlFor="email">Email</label>
            <input type="email" onChange={handleEmail} value={email} />

            <label htmlFor="message">Message</label>
            <textarea onChange={handleMessage} value={message} />

            <div className="send-btn">
              <button type="submit">
                send
                <i className="fa fa-paper-plane" />
                {bool ? (
                  <b className="load">
                    <img src={load1} alt="" />
                  </b>
                ) : (
                  ""
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
