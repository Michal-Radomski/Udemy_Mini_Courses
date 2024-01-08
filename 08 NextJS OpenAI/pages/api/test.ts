// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Test route
export default function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
  res.status(200).send("<h1 style='color:blue;text-align:center'>API is running</h1>");
}
