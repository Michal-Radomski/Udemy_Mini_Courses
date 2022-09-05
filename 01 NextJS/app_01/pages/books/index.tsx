import {NextPage} from "next";
import React from "react";
import Link from "next/link";

import {books} from "../../data/utils";

const BooksHome: NextPage = () => {
  return (
    <React.Fragment>
      <h1>Books Home Page</h1>
      {/* {books.map((book, index) => {
        return (
          <div key={index}>
            <h2>{book.name}</h2>
            <p>{book.description}</p>
          </div>
        );
      })} */}
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            width: 300,
            backgroundColor: "whitesmoke",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "blueviolet",
            border: "1px solid red",
          }}
        >
          <h2>{book.name}</h2>
          <p>{book.description}</p>
          <article style={{border: "1px solid black", padding: 12, background: "#ccc"}}>
            <Link href={`/books/${book.id}`}>
              <a>Details of the book with id: {book.id}</a>
            </Link>
          </article>
        </div>
      ))}
    </React.Fragment>
  );
};

export default BooksHome;
