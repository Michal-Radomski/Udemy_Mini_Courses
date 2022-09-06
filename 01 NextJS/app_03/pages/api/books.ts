import type {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import path from "path";

import {Book} from "../../Interfaces";

function getData() {
  const filePath = path.join(process.cwd(), "data", "books.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString());
  // console.log({fileData}, {data});
  // console.log(data.length);
  return data;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = getData();
    res.status(200).json({message: data});
  }

  if (req.method === "POST") {
    const {name, description, imageUrl} = req.body;
    const data = getData();
    const filePath = path.join(process.cwd(), "data", "books.json");

    const newBook: Book = {
      name: name,
      description: description,
      imageUrl: imageUrl,
      id: (data.length + 1).toString(),
    };
    data.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(data));

    return res.status(201).json({message: "Book was added", book: newBook});
  }
}
