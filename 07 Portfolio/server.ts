import path from "path";
import http from "http";

import * as dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";

//* Import route
import contactRouter from "./route/contactRoute";

// The server
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cors());

//Route middleware
app.use("/", contactRouter);

// // Test route
// app.get("/test", (req: express.Request, res: express.Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (_req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
