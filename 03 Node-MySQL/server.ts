import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import mysql from "mysql2";
import cookieParser from "cookie-parser";

import http from "http";
import path from "path";

// Import routes
import pagesRouter from "./routes/pagesRouter";
import authRouter from "./routes/authRouter";

// The server
const app: Express = express();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));

// MySQL DB
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
// console.log({ db });

db.connect((error) => {
  if (error) {
    console.log({ error });
  } else {
    console.log(`MySQL is connected at host: ${db.config.host} on port: ${db.config.port}`);
  }
});

// View engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});

// // Test Route
// app.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>Server is running</h1>");
// });

//Route middleware
app.use("/", pagesRouter);
app.use("/auth", authRouter);

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
