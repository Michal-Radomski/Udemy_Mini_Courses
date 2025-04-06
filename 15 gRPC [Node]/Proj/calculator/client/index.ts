import * as grpc from "@grpc/grpc-js";

import { DATA } from "../../constants";
const service = require("../proto/calculator_grpc_pb");
const { SumRequest } = require("../proto/sum_pb");
const { PrimeRequest } = require("../proto/primes_pb");
const { AvgRequest } = require("../proto/avg_pb");
const { MaxRequest } = require("../proto/max_pb");
const { SqrtRequest } = require("../proto/sqrt_pb");

interface Response {
  getResult: () => void;
}

function doSum(client: any): void {
  console.log("doSum was invoked");
  const req = new SumRequest().setFirstNumber(1).setSecondNumber(1);

  client.sum(req, (err: Error, res: Response) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Sum: ${res.getResult()}`);
  });
}

function doPrimes(client: any): void {
  console.log("doPrimes was invoked");
  const req = new PrimeRequest();

  req.setNumber(12390392840);
  const call = client.primes(req);

  call.on(DATA, (res: Response) => {
    console.log(`Primes: ${res.getResult()}`);
  });
}

function doAvg(client: any): void {
  console.log("doAvg was invoked");
  const numbers = [...Array(11).keys()].slice(1);
  const call = client.avg((err: Error, res: Response) => {
    if (err) {
      return console.error(err);
    }

    console.log(`Avg: ${res.getResult()}`);
  });

  numbers
    .map((number) => {
      return new AvgRequest().setNumber(number);
    })
    .forEach((req) => call.write(req));

  call.end();
}

function doMax(client: any): void {
  console.log("doMax was invoked");
  const numbers = [4, 7, 2, 19, 4, 6, 32];
  const call = client.max();

  call.on(DATA, (res: Response) => {
    console.log(`Max: ${res.getResult()}`);
  });

  numbers
    .map((number) => {
      return new MaxRequest().setNumber(number);
    })
    .forEach((req) => call.write(req));

  call.end();
}

function doSqrt(client: any, n: number): void {
  console.log("doSqrt was invoked");
  const req = new SqrtRequest();

  req.setNumber(n);
  client.sqrt(req, (err: Error, res: Response) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Sqrt: ${res.getResult()}`);
  });
}

(function main(): void {
  const client = new service.CalculatorServiceClient("0.0.0.0:50051", grpc.credentials.createInsecure()) as any;

  doSum(client);
  doPrimes(client);
  doAvg(client);
  doMax(client);
  doSqrt(client, 25);
  // doSqrt(client, -1);
  // client.close();
})();
