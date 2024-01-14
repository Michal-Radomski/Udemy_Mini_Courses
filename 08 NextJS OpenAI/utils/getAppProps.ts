import { getSession } from "@auth0/nextjs-auth0";

import clientPromise from "../lib/mongodb";
import { IPost, RootState } from "@/Interfaces";

export const getAppProps = async (ctx: RootState) => {
  const userSession = await getSession(ctx.req, ctx.res);
  const client = await clientPromise;
  const db = client.db("BlogStandard");
  // console.log("db:", db);
  const user = await db.collection("users").findOne({
    auth0Id: userSession!.user.sub,
  });
  // console.log("user:", user);

  if (!user) {
    return {
      availableTokens: 0,
      posts: [],
    };
  }

  const posts: IPost[] = await db
    .collection("posts")
    .find({
      userId: user._id,
    })
    .limit(5)
    .sort({
      created: -1,
    })
    .toArray();

  return {
    availableTokens: user.availableTokens,
    posts: posts.map(({ created, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      created: created.toString(),
      ...rest,
    })),
    postId: ctx.params?.postId || null,
  };
};
