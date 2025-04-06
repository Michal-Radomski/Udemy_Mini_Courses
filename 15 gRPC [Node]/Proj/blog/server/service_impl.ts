import * as grpc from "@grpc/grpc-js";
import { ObjectId, OptionalId } from "mongodb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import { Blog, BlogId } from "../proto/blog_pb";
import { collection } from "./index";

interface DocI {
  _id?: ObjectId;
  author_id: string;
  title: string;
  content: string;
}

interface Response {
  deletedCount: number;
  matchedCount: number;
  acknowledged: any;
}

interface Call {
  destroy(arg0: { code: grpc.status; message: string }): void;
  end(): void;
  write(blog: Blog): boolean | void;
  request: Blog;
}

function blogToDocument(blog: Blog): DocI {
  return {
    author_id: blog.getAuthorId(),
    title: blog.getTitle(),
    content: blog.getContent(),
  };
}

function documentToBlog(doc: DocI): Blog {
  return new Blog().setId(doc._id!.toString()).setAuthorId(doc.author_id).setTitle(doc.title).setContent(doc.content);
}

const internal = (err: Error, callback: Function): void =>
  callback({
    code: grpc.status.INTERNAL,
    message: err.toString(),
  });

function checkOID(id: string, callback: Function): ObjectId | undefined {
  try {
    return new ObjectId(id);
  } catch (err) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Invalid OID",
    });
  }
}

function checkNotAcknowledged(res: Response, callback: Function): void {
  if (!res.acknowledged) {
    callback({
      code: grpc.status.INTERNAL,
      message: `Operation wasn\'t acknowledged`,
    });
  }
}

function checkNotFound(res: Response, callback: Function): void {
  if (!res || res.matchedCount == 0 || res.deletedCount == 0) {
    callback({
      code: grpc.status.NOT_FOUND,
      message: "Could not find blog",
    });
  }
}

export const serviceImpl = {
  createBlog: async (call: Call, callback: Function): Promise<void> => {
    const data = blogToDocument(call.request);

    await collection
      .insertOne(data as unknown as OptionalId<Document>)
      .then((res) => {
        checkNotAcknowledged(res as any, callback);
        const id = res.insertedId.toString();
        const blogId = new BlogId().setId(id);

        callback(null, blogId);
      })
      .catch((err) => internal(err, callback));
  },

  readBlog: async (call: Call, callback: Function): Promise<void> => {
    const oid = checkOID(call.request.getId(), callback);

    await collection
      .findOne({ _id: oid })
      .then((res) => {
        checkNotFound(res as any, callback);
        callback(null, documentToBlog(res as any));
      })
      .catch((err) => internal(err, callback));
  },

  updateBlog: async (call: Call, callback: Function): Promise<void> => {
    const oid = checkOID(call.request.getId(), callback);

    await collection
      .updateOne({ _id: oid }, { $set: blogToDocument(call.request) })
      .then((res) => {
        checkNotFound(res as any, callback);
        checkNotAcknowledged(res as any, callback);
        callback(null, new Empty());
      })
      .catch((err) => internal(err, callback));
  },

  listBlogs: async (call: Call, _: Function): Promise<void> =>
    await collection
      .find()
      .map((doc) => documentToBlog(doc as any))
      .forEach((blog) => call.write(blog))
      .then(() => call.end())
      .catch((err) =>
        call.destroy({
          code: grpc.status.INTERNAL,
          message: "A message",
        })
      ),

  deleteBlog: async (call: Call, callback: Function): Promise<void> => {
    const oid = checkOID(call.request.getId(), callback) as ObjectId;

    await collection
      .deleteOne({ _id: oid })
      .then((res) => {
        checkNotFound(res as any, callback);
        checkNotAcknowledged(res as any, callback);
        callback(null, new Empty());
      })
      .catch((err) => internal(err, callback));
  },
} as unknown as grpc.UntypedServiceImplementation;
