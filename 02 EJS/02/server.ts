import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import http from "http";
import path from "path";
import fs from "fs";

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

// Get access to courses.json
const coursesData = fs.readFileSync("./database/courses.json", {
  encoding: "utf8",
  flag: "r",
});
// console.log({ coursesData }, typeof coursesData);
const courses = JSON.parse(coursesData);
// console.log({ courses }, typeof courses);

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});

// Route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("pages/home", { msg: "Node EJS App", courses: courses });
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
