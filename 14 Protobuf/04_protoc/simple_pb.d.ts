// package:
// file: simple.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Simple extends jspb.Message {
  getId(): number;
  setId(value: number): Simple;
  getIsSimple(): boolean;
  setIsSimple(value: boolean): Simple;
  getName(): string;
  setName(value: string): Simple;
  clearSampleListsList(): void;
  getSampleListsList(): Array<number>;
  setSampleListsList(value: Array<number>): Simple;
  addSampleLists(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Simple.AsObject;
  static toObject(includeInstance: boolean, msg: Simple): Simple.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Simple, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Simple;
  static deserializeBinaryFromReader(message: Simple, reader: jspb.BinaryReader): Simple;
}

export namespace Simple {
  export type AsObject = {
    id: number;
    isSimple: boolean;
    name: string;
    sampleListsList: Array<number>;
  };
}
