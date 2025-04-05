import fs from "fs";
import * as grpc from "@grpc/grpc-js";

const service = require("../proto/greet_grpc_pb");
const serviceImpl = require("./service_impl");

const addr = "0.0.0.0:50051";

function cleanup(server: grpc.Server): void {
  console.log("Cleanup");

  if (server) {
    server.forceShutdown();
  }
}

function main(): void {
  const server: grpc.Server = new grpc.Server({});

  process.on("SIGINT", (): void => {
    console.log("Caught interrupt signal");
    cleanup(server);
  });

  const tls = false;
  let creds;

  if (tls) {
    const rootCert = fs.readFileSync("./ssl/ca.crt");
    const certChain = fs.readFileSync("./ssl/server.crt");
    const privateKey = fs.readFileSync("./ssl/server.pem");

    creds = grpc.ServerCredentials.createSsl(rootCert, [
      {
        cert_chain: certChain,
        private_key: privateKey,
      },
    ]);
  } else {
    creds = grpc.ServerCredentials.createInsecure();
  }

  server.addService(service.GreetServiceService, serviceImpl);
  server.bindAsync(addr, creds, (err, _) => {
    if (err) {
      return cleanup(server);
    }
    server.start();
  });
  console.log("Listening on: " + addr);
}

main();
