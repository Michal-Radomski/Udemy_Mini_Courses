import fs from "fs";
import * as grpc from "@grpc/grpc-js";
// console.log("grpc:", grpc);

const { GreetRequest } = require("../proto/greet_pb");
const { GreetServiceClient } = require("../proto/greet_grpc_pb");
const { DATA } = require("../../constants");
// console.log("GreetServiceClient:", GreetServiceClient);

// eslint-disable-next-line no-unused-vars
function doGreet(client: any) {
  console.log("doGreet was invoked");
  const req = new GreetRequest().setFirstName("Clement");
  // console.log("req:", req);

  client.greet(req, (err: Error, res: any) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Greet: ${res.getResult()}`);
  });
}

// eslint-disable-next-line no-unused-vars
// function doGreetManyTimes(client: any) {
//   console.log("doGreetManyTimes was invoked");
//   const req = new GreetRequest().setFirstName("Clement");
//   const call = client.greetManyTimes(req);

//   call.on(DATA, (res: any) => {
//     console.log(`GreetManyTimes: ${res.getResult()}`);
//   });
// }

// eslint-disable-next-line no-unused-vars
// function doLongGreet(client: any) {
//   console.log("doLongGreet was invoked");
//   const names = ["Clement", "Marie", "Test"];
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

// eslint-disable-next-line no-unused-vars
// function doGreetEveryone(client: any) {
//   console.log("doGreetEveryone was invoked");
//   const names = ["Clement", "Marie", "Test"];
//   const call = client.greetEveryone();

//   call.on(DATA, (res: any) => {
//     console.log(`GreetEveryone: ${res.getResult()}`);
//   });

//   names
//     .map((name) => {
//       return new GreetRequest().setFirstName(name);
//     })
//     .forEach((req) => call.write(req));

//   call.end();
// }

// eslint-disable-next-line no-unused-vars
// function doGreetWithDeadline(client: any, ms: number) {
//   console.log("doGreetWithDeadline was invoked");
//   const req = new GreetRequest().setFirstName("Clement");

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

function main(): void {
  const tls = false;
  let creds;

  if (tls) {
    const rootCert = fs.readFileSync("./ssl/ca.crt");

    creds = grpc.ChannelCredentials.createSsl(rootCert);
  } else {
    creds = grpc.ChannelCredentials.createInsecure();
    // console.log("creds:", creds);
  }

  const client = new GreetServiceClient("localhost:50051", creds);
  // console.log("client:", client);

  doGreet(client);
  // doGreetManyTimes(client);
  // doLongGreet(client);
  // doGreetEveryone(client);
  // doGreetWithDeadline(client, 5000);
  // doGreetWithDeadline(client, 1000);
  // client.close();
}

main();
