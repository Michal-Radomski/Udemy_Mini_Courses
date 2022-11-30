import express, { Router, Request, Response } from "express";

import { isLoggedIn } from "../controllers/authController";

interface CustomRequest extends Request {
  user?: Object;
  // message?: string //* Custom property;
}

const pagesRouter: Router = express.Router();

pagesRouter.get("/", isLoggedIn, (req: CustomRequest, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("index", {
    user: req.user,
  });
});

pagesRouter.get("/register", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("register", {});
});

pagesRouter.get("/login", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("login", {});
});

pagesRouter.get("/profile", isLoggedIn, (req: CustomRequest, res: Response) => {
  // console.log("req.ip:", req.ip);
  console.log("req.user:", req.user);
  // console.log("req.message:", req.message);
  if (req.user) {
    res.render("profile", {
      user: req.user,
    });
  } else {
    res.redirect("/login");
  }
});

export default pagesRouter;
