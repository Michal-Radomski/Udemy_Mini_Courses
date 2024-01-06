import express, { Router, Request, Response } from "express";
import nodemailer from "nodemailer";

const contactRouter: Router = express.Router();

contactRouter.post("/contact", (req: Request, res: Response) => {
  const data = req.body;

  if (data.name.length === 0 || data.email.length === 0 || data.message.length === 0) {
    return res.json({ msg: "Please Fill All The Fields!" });
  }

  const smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: data.email,
    to: "ehizeextech@gmail.com",
    subject: `message from ${data.name}`,
    html: `
            <h3>Information<h3/>
            <ul>
            <li>Name: ${data.name}<li/>
            <li>Email: ${data.email}<li/>
            </ul>
            <h3>Message</h3>
            <p>${data.message}<p/>
            `,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    try {
      res.status(200).json({ msg: "Thank You For Contacting Ehizeex." });
    } catch (error) {
      if (error) return res.status(500).json({ msg: "There is server error" });
    }
  });
});

export default contactRouter;
