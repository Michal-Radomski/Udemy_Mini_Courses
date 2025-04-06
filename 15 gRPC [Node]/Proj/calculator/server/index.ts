import * as grpc from "@grpc/grpc-js";

import { serviceImpl } from "./service_impl";
const service = require("../proto/calculator_grpc_pb");

const addr = "0.0.0.0:50051";

async function cleanup(server: grpc.Server): Promise<void> {
  console.log("Cleanup");

  if (server) {
    server.forceShutdown();
  }
}

(function main(): void {
  const server = new grpc.Server();

  process.on("SIGINT", () => {
    console.log("Caught interrupt signal");
    cleanup(server);
  });

  const creds: grpc.ServerCredentials = grpc.ServerCredentials.createInsecure();

  server.addService(service.CalculatorServiceService, serviceImpl);
  server.bindAsync(addr, creds, (err, _) => {
    if (err) {
      return cleanup(server);
    }

    server.start();
  });

  console.log("Listening on: " + addr);
})();
