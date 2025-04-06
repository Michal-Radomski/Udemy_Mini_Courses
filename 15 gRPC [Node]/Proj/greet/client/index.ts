import fs from "fs";
import * as grpc from "@grpc/grpc-js";

// console.log("grpc:", grpc);

const { GreetRequest } = require("../proto/greet_pb");
const { GreetServiceClient } = require("../proto/greet_grpc_pb");
import { DATA } from "../../constants";
// console.log("GreetServiceClient:", GreetServiceClient);

// function doGreet(client: any): void {
//   console.log("doGreet was invoked");
//   const req = new GreetRequest().setFirstName("TestName");
//   // console.log("req:", req);

//   client.greet(req, (err: Error, res: any) => {
//     if (err) {
//       return console.log(err);
//     }

//     console.log(`Greet: ${res.getResult()}`);
//   });
// }

// function doGreetManyTimes(client: any): void {
//   console.log("doGreetManyTimes was invoked");
//   const req = new GreetRequest().setFirstName("TestName");
//   const call = client.greetManyTimes(req);
//   // console.log("call:", call);

//   call.on(DATA, (res: any) => {
//     console.log(`GreetManyTimes: ${res.getResult()}`);
//   });
// }

// function doLongGreet(client: any): void {
//   console.log("doLongGreet was invoked");
//   const names = ["TestName", "TestName2", "TestName3"];
//   const call = client.longGreet((err: Error, res: any) => {
//     if (err) {
//       return console.error(err);
//     }

//     console.log(`LongGreet: ${res.getResult()}`);
//   });

//   names
//     .map((name) => {
//       return new GreetRequest().setFirstName(name);
//     })
//     .forEach((req) => call.write(req));

//   call.end();
// }

function doGreetEveryone(client: any): void {
  console.log("doGreetEveryone was invoked");
  const names = ["TestName", "Marie", "Test"];
  const call = client.greetEveryone();

  call.on(DATA, (res: any) => {
    console.log(`GreetEveryone: ${res.getResult()}`);
  });

  names
    .map((name) => {
      return new GreetRequest().setFirstName(name);
    })
    .forEach((req) => call.write(req));

  call.end();
}

// function doGreetWithDeadline(client: any, ms: number): void {
//   console.log("doGreetWithDeadline was invoked");
//   const req = new GreetRequest().setFirstName("TestName");

//   client.greetWithDeadline(
//     req,
//     {
//       deadline: new Date(Date.now() + ms),
//     },
//     (err: Error, res: any) => {
//       if (err) {
//         return console.log(err);
//       }

//       console.log(`GreetWithDeadline: ${res.getResult()}`);
//     }
//   );
// }

(function main(): void {
  const tls = true;
  let creds;

  if (tls) {
    const rootCert: Buffer<ArrayBufferLike> = fs.readFileSync("./ssl/ca.crt");

    creds = grpc.ChannelCredentials.createSsl(rootCert);
    // console.log("creds:", creds);
  } else {
    creds = grpc.ChannelCredentials.createInsecure();
    // console.log("creds:", creds);
  }

  const client = new GreetServiceClient("localhost:50051", creds);
  // console.log("client:", client);

  // doGreet(client);
  // doGreetManyTimes(client);
  // doLongGreet(client);
  doGreetEveryone(client);
  // doGreetWithDeadline(client, 5000);
  // doGreetWithDeadline(client, 1000);
  // client.close();
})();
