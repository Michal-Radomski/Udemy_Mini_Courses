import * as grpc from "@grpc/grpc-js";
import { Collection, Db, MongoClient } from "mongodb";
import "dotenv/config";

import service from "../proto/blog_grpc_pb";
import { serviceImpl } from "./service_impl";

const addr = "0.0.0.0:50051";

// const uri = "mongodb://root:root@localhost:27017/"; //* From Course
const uri = process.env.MONGO_URL as string;
// console.log({ uri });
const mongoClient: MongoClient = new MongoClient(uri, {
  connectTimeoutMS: 1000,
  serverSelectionTimeoutMS: 1000,
});
// global.collection = undefined;
const database: Db = mongoClient.db("blogdb");
export const collection: Collection<Document> = database.collection("blog");

async function cleanup(server: grpc.Server): Promise<void> {
  console.log("Cleanup");

  if (server) {
    await mongoClient.close();
    server.forceShutdown();
  }
}

(async function main(): Promise<void> {
  process.on("SIGINT", () => {
    console.log("Caught interrupt signal");
    cleanup(server);
  });

  await mongoClient.connect();

  const creds: grpc.ServerCredentials = grpc.ServerCredentials.createInsecure();
  const server: grpc.Server = new grpc.Server();
  server.addService(service.BlogServiceService, serviceImpl);
  server.bindAsync(addr, creds, (err, _) => {
    if (err) {
      return cleanup(server);
    }

    server.start();
  });

  console.log("Listening on: " + addr);
})().catch(cleanup);

// main().catch(cleanup);
