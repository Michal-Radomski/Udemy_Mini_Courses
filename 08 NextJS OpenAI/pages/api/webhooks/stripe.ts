import Cors from "micro-cors";
import stripeInit from "stripe";
import verifyStripe from "@webdeveducation/next-verify-stripe";
import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../../lib/mongodb";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new stripeInit(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let event;
    try {
      event = await verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
    } catch (error) {
      console.log("ERROR: ", { error });
    }

    // console.log("event:", event);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const client = await clientPromise;
        const db = client.db("BlogStandard");

        const paymentIntent = event.data.object;
        const auth0Id = paymentIntent.metadata.sub;

        // console.log("AUTH 0 ID: ", paymentIntent);

        await db.collection("users").updateOne(
          { auth0Id },
          {
            $inc: {
              availableTokens: 10,
            },
            $setOnInsert: {
              auth0Id,
            },
          },
          {
            upsert: true,
          }
        );
      }
      default:
        console.log("Event type: ", event.type);
    }
    res.status(200).json({ received: true });
  }
  return null;
};

export default cors(handler as any);
