import type {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "books.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());
    console.log({fileData}, {data});
    res.status(200).json({message: data});
  }
}
