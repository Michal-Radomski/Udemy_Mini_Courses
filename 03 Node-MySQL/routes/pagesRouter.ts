import express, { Router, Request, Response } from "express";

const pagesRouter: Router = express.Router();

pagesRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("index", {});
});

pagesRouter.get("/register", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("register");
});

pagesRouter.get("/login", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("login");
});

pagesRouter.get("/profile", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
});

export default pagesRouter;
