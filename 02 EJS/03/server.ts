import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import http from "http";
import path from "path";

import { courses, saleNotice } from "./data/data";

// Import routes
//* Empty

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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});

// Routes
app.get("/courses", (_req: Request, res: Response) => {
  res.render("pages/courses", {
    courses: courses,
    limitedDescription: "Limited description - courses",
  });
});

app.get("/about", (_req: Request, res: Response) => {
  res.render("pages/about", {
    saleNotice: saleNotice,
    limitedDescription: "Limited description - about",
  });
});

app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("pages/index", {
    msg: "Node EJS App",
    courses: courses,
    limitedDescription: "Limited time only",
    // saleNotice: saleNotice, //* Condition in header partial
  });
});

//Route middleware
//* Empty

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
