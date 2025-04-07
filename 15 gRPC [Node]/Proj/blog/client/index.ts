import * as grpc from "@grpc/grpc-js";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

import service from "../proto/blog_grpc_pb";
import { Blog, BlogId } from "../proto/blog_pb";
import { DATA, ERROR, END } from "../../constants";

function createBlog(client: service.BlogServiceClient): Promise<string> {
  console.log("---createBlog was invoked---");
  return new Promise((resolve, reject) => {
    const req: Blog = new Blog().setAuthorId("Clement").setTitle("My First Blog").setContent("Content of the first blog");

    client.createBlog(req, (err, res) => {
      if (err) {
        reject(err);
      }

      console.log(`Blog was created: ${res}`);
      resolve(res.getId());
    });
  });
}

function readBlog(client: service.BlogServiceClient, id: string): Promise<void> {
  console.log("---readBlog was invoked---");

  //* The void type indicates that the promise does not resolve with any meaningful value. Instead, it resolves with undefined.
  return new Promise<void>((resolve, reject) => {
    const req: BlogId = new BlogId().setId(id);

    client.readBlog(req, (err, res) => {
      if (err) {
        reject(err);
      }

      console.log(`Blog was read: ${res}`);
      resolve();
    });
  });
}

function updateBlog(client: service.BlogServiceClient, id: string): Promise<void> {
  console.log("---updateBlog was invoked---");

  //* The void type indicates that the promise does not resolve with any meaningful value. Instead, it resolves with undefined.
  return new Promise<void>((resolve, reject) => {
    const req = new Blog()
      .setId(id)
      .setAuthorId("not Clement")
      .setTitle("My First Blog (edited)")
      .setContent("Content of the first blog, with some awesome additions!");

    client.updateBlog(req, (err, _) => {
      if (err) {
        reject(err);
      }

      console.log("Blog was updated!");
      resolve();
    });
  });
}

function listBlogs(client: service.BlogServiceClient): Promise<void> {
  console.log("---listBlog was invoked---");

  //* The void type indicates that the promise does not resolve with any meaningful value. Instead, it resolves with undefined.
  return new Promise<void>((resolve, reject) => {
    const req = new Empty();

    const call = client.listBlogs(req);

    call.on(DATA, (res) => {
      console.log(res);
    });

    call.on(ERROR, (err) => {
      reject(err);
    });

    call.on(END, () => {
      resolve();
    });
  });
}

function deleteBlog(client: service.BlogServiceClient, id: string): Promise<void> {
  console.log("---deleteBlog was invoked---");

  //* The void type indicates that the promise does not resolve with any meaningful value. Instead, it resolves with undefined.
  return new Promise<void>((resolve, reject) => {
    const req = new BlogId().setId(id);

    client.deleteBlog(req, (err, _) => {
      if (err) {
        reject(err);
      }

      console.log(`Blog was deleted!`);
      resolve();
    });
  });
}

(async function main(): Promise<void> {
  const client: service.BlogServiceClient = new service.BlogServiceClient(
    "0.0.0.0:50051",
    grpc.credentials.createInsecure()
  );

  const id: string = await createBlog(client);
  await readBlog(client, id);
  // await readBlog(client, "aNonExistingId");
  await updateBlog(client, id);
  await listBlogs(client);
  await deleteBlog(client, id);
})();
