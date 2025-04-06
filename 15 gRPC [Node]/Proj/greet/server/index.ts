import fs from "fs";
import * as grpc from "@grpc/grpc-js";

const service = require("../proto/greet_grpc_pb");
const serviceImpl = require("./service_impl");

const addr = "0.0.0.0:50051"; //* Listen on all available network interfaces on the machine.

function cleanup(server: grpc.Server): void {
  console.log("Cleanup");

  if (server) {
    server.forceShutdown();
  }
}

(function main(): void {
  const server: grpc.Server = new grpc.Server({});

  process.on("SIGINT", (): void => {
    console.log("Caught interrupt signal");
    cleanup(server);
  });

  const tls = true;
  let creds;

  if (tls) {
    const rootCert: Buffer<ArrayBufferLike> = fs.readFileSync("./ssl/ca.crt");
    const certChain: Buffer<ArrayBufferLike> = fs.readFileSync("./ssl/server.crt");
    const privateKey: Buffer<ArrayBufferLike> = fs.readFileSync("./ssl/server.pem");

    creds = grpc.ServerCredentials.createSsl(rootCert, [
      {
        cert_chain: certChain,
        private_key: privateKey,
      },
    ]);
    // console.log("creds:", creds);
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
})();
