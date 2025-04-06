// package: blog
// file: blog/proto/blog.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as blog_proto_blog_pb from "../../blog/proto/blog_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IBlogServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  createBlog: IBlogServiceService_ICreateBlog;
  readBlog: IBlogServiceService_IReadBlog;
  updateBlog: IBlogServiceService_IUpdateBlog;
  deleteBlog: IBlogServiceService_IDeleteBlog;
  listBlogs: IBlogServiceService_IListBlogs;
}

interface IBlogServiceService_ICreateBlog extends grpc.MethodDefinition<blog_proto_blog_pb.Blog, blog_proto_blog_pb.BlogId> {
  path: "/blog.BlogService/CreateBlog";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<blog_proto_blog_pb.Blog>;
  requestDeserialize: grpc.deserialize<blog_proto_blog_pb.Blog>;
  responseSerialize: grpc.serialize<blog_proto_blog_pb.BlogId>;
  responseDeserialize: grpc.deserialize<blog_proto_blog_pb.BlogId>;
}
interface IBlogServiceService_IReadBlog extends grpc.MethodDefinition<blog_proto_blog_pb.BlogId, blog_proto_blog_pb.Blog> {
  path: "/blog.BlogService/ReadBlog";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<blog_proto_blog_pb.BlogId>;
  requestDeserialize: grpc.deserialize<blog_proto_blog_pb.BlogId>;
  responseSerialize: grpc.serialize<blog_proto_blog_pb.Blog>;
  responseDeserialize: grpc.deserialize<blog_proto_blog_pb.Blog>;
}
interface IBlogServiceService_IUpdateBlog
  extends grpc.MethodDefinition<blog_proto_blog_pb.Blog, google_protobuf_empty_pb.Empty> {
  path: "/blog.BlogService/UpdateBlog";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<blog_proto_blog_pb.Blog>;
  requestDeserialize: grpc.deserialize<blog_proto_blog_pb.Blog>;
  responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
  responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IBlogServiceService_IDeleteBlog
  extends grpc.MethodDefinition<blog_proto_blog_pb.BlogId, google_protobuf_empty_pb.Empty> {
  path: "/blog.BlogService/DeleteBlog";
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<blog_proto_blog_pb.BlogId>;
  requestDeserialize: grpc.deserialize<blog_proto_blog_pb.BlogId>;
  responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
  responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface IBlogServiceService_IListBlogs
  extends grpc.MethodDefinition<google_protobuf_empty_pb.Empty, blog_proto_blog_pb.Blog> {
  path: "/blog.BlogService/ListBlogs";
  requestStream: false;
  responseStream: true;
  requestSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
  requestDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
  responseSerialize: grpc.serialize<blog_proto_blog_pb.Blog>;
  responseDeserialize: grpc.deserialize<blog_proto_blog_pb.Blog>;
}

export const BlogServiceService: IBlogServiceService;

export interface IBlogServiceServer {
  createBlog: grpc.handleUnaryCall<blog_proto_blog_pb.Blog, blog_proto_blog_pb.BlogId>;
  readBlog: grpc.handleUnaryCall<blog_proto_blog_pb.BlogId, blog_proto_blog_pb.Blog>;
  updateBlog: grpc.handleUnaryCall<blog_proto_blog_pb.Blog, google_protobuf_empty_pb.Empty>;
  deleteBlog: grpc.handleUnaryCall<blog_proto_blog_pb.BlogId, google_protobuf_empty_pb.Empty>;
  listBlogs: grpc.handleServerStreamingCall<google_protobuf_empty_pb.Empty, blog_proto_blog_pb.Blog>;
}

export interface IBlogServiceClient {
  createBlog(
    request: blog_proto_blog_pb.Blog,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.BlogId) => void
  ): grpc.ClientUnaryCall;
  createBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.BlogId) => void
  ): grpc.ClientUnaryCall;
  createBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.BlogId) => void
  ): grpc.ClientUnaryCall;
  readBlog(
    request: blog_proto_blog_pb.BlogId,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.Blog) => void
  ): grpc.ClientUnaryCall;
  readBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.Blog) => void
  ): grpc.ClientUnaryCall;
  readBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.Blog) => void
  ): grpc.ClientUnaryCall;
  updateBlog(
    request: blog_proto_blog_pb.Blog,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  updateBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  updateBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  deleteBlog(
    request: blog_proto_blog_pb.BlogId,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  deleteBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  deleteBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  listBlogs(
    request: google_protobuf_empty_pb.Empty,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<blog_proto_blog_pb.Blog>;
  listBlogs(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<blog_proto_blog_pb.Blog>;
}

export class BlogServiceClient extends grpc.Client implements IBlogServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public createBlog(
    request: blog_proto_blog_pb.Blog,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.BlogId) => void
  ): grpc.ClientUnaryCall;
  public createBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.BlogId) => void
  ): grpc.ClientUnaryCall;
  public createBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.BlogId) => void
  ): grpc.ClientUnaryCall;
  public readBlog(
    request: blog_proto_blog_pb.BlogId,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.Blog) => void
  ): grpc.ClientUnaryCall;
  public readBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.Blog) => void
  ): grpc.ClientUnaryCall;
  public readBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: blog_proto_blog_pb.Blog) => void
  ): grpc.ClientUnaryCall;
  public updateBlog(
    request: blog_proto_blog_pb.Blog,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  public updateBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  public updateBlog(
    request: blog_proto_blog_pb.Blog,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  public deleteBlog(
    request: blog_proto_blog_pb.BlogId,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  public deleteBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  public deleteBlog(
    request: blog_proto_blog_pb.BlogId,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void
  ): grpc.ClientUnaryCall;
  public listBlogs(
    request: google_protobuf_empty_pb.Empty,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<blog_proto_blog_pb.Blog>;
  public listBlogs(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<blog_proto_blog_pb.Blog>;
}
