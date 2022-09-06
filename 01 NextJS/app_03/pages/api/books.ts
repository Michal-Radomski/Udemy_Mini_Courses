//* V2 => MongoDB
import type {NextApiRequest, NextApiResponse} from "next";
import {MongoClient} from "mongodb";

import {Book} from "../../Interfaces";

const MongoDB_url = process.env.MONGO_DB_URL;
// console.log({MongoDB_url});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await MongoClient.connect(MongoDB_url as string);

  // Create DB
  const db = client.db("books");

  if (req.method === "GET") {
    let books;
    try {
      books = await db.collection("books").find().sort({name: 1}).toArray();
    } catch (error) {
      console.log({error});
      return error;
    }
    // console.log({books});
    if (!books) {
      return res.status(500).json({message: "Internal Server Error"});
    }
    res.status(200).json({message: books});
  }

  if (req.method === "POST") {
    const {name, description, imageUrl} = req.body;
    if (!name || name.trim() === "" || !description || description.trim() === "" || !imageUrl || imageUrl.trim() === "") {
      return res.status(422).json({message: "Invalid Data"});
    }
    const newBook: Book = {
      name: name,
      description: description,
      imageUrl: imageUrl,
    };

    try {
      await db.collection("books").insertOne(newBook);
      return res.status(201).json({message: "Book was added", book: newBook});
    } catch (error) {
      console.log({error});
    }
  }
}

export default handler;

//* V1 -> local file
// import type {NextApiRequest, NextApiResponse} from "next";
// import fs from "fs";
// import path from "path";

// import {Book} from "../../Interfaces";

// function getData() {
//   const filePath = path.join(process.cwd(), "data", "books.json");
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData.toString());
//   // console.log({fileData}, {data});
//   // console.log(data.length);
//   return data;
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const data = getData();
//     res.status(200).json({message: data});
//   }

//   if (req.method === "POST") {
//     const {name, description, imageUrl} = req.body;
//     const data = getData();
//     const filePath = path.join(process.cwd(), "data", "books.json");

//     const newBook: Book = {
//       name: name,
//       description: description,
//       imageUrl: imageUrl,
//       id: (data.length + 1).toString(),
//     };
//     data.push(newBook);
//     fs.writeFileSync(filePath, JSON.stringify(data));

//     return res.status(201).json({message: "Book was added", book: newBook});
//   }
// }
