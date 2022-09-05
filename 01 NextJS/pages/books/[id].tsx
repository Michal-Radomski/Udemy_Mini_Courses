import {NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";

import {fetchBookFromID} from "../../data/utils";

const BookDetails: NextPage = () => {
  const {query} = useRouter();
  const bookId = query.id;
  const book = fetchBookFromID(bookId as string);
  // console.log({book});

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <h1>Book Details id: {query.id}</h1>
      <div
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
        <h2>Name of the book: {book?.name}</h2>
        <p>Book description: {book?.description}</p>
      </div>
    </React.Fragment>
  );
};

export default BookDetails;
