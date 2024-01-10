import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      user: { sub },
    } = (await getSession(req, res)) as any;
    const client = await clientPromise;
    const db = client.db("BlogStandard");
    const userProfile = await db.collection("users").findOne({
      auth0Id: sub,
    });

    const { postId } = req.body;

    await db.collection("posts").deleteOne({
      userId: userProfile._id,
      _id: new ObjectId(postId),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("ERROR TRYING TO DELETE A POST: ", { error });
  }
  return;
});
