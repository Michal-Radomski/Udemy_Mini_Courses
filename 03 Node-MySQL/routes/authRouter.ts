import express, { Router } from "express";

import { login, logout, register } from "../controllers/authController";

const authRouter: Router = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/logout", logout);

export default authRouter;
