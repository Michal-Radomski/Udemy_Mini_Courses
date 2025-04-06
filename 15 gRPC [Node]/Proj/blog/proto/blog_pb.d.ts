// package: blog
// file: blog/proto/blog.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class Blog extends jspb.Message {
  getId(): string;
  setId(value: string): Blog;
  getAuthorId(): string;
  setAuthorId(value: string): Blog;
  getTitle(): string;
  setTitle(value: string): Blog;
  getContent(): string;
  setContent(value: string): Blog;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Blog.AsObject;
  static toObject(includeInstance: boolean, msg: Blog): Blog.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Blog, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Blog;
  static deserializeBinaryFromReader(message: Blog, reader: jspb.BinaryReader): Blog;
}

export namespace Blog {
  export type AsObject = {
    id: string;
    authorId: string;
    title: string;
    content: string;
  };
}

export class BlogId extends jspb.Message {
  getId(): string;
  setId(value: string): BlogId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlogId.AsObject;
  static toObject(includeInstance: boolean, msg: BlogId): BlogId.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: BlogId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlogId;
  static deserializeBinaryFromReader(message: BlogId, reader: jspb.BinaryReader): BlogId;
}

export namespace BlogId {
  export type AsObject = {
    id: string;
  };
}
