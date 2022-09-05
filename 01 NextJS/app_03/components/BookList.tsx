import React from "react";

import {Book} from "../Interfaces";
import BookItem from "./BookItem";

const BookList = (): JSX.Element => {
  const [data, setData] = React.useState<Book[] | undefined>(undefined);

  const sendRequest = () => {
    fetch("http://localhost:3000/api/books/")
      .then((response) => response.json())
      .then((res) => setData(res.message))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <h1>Book List</h1>
      <u style={{listStyleType: "none"}}>
        {data &&
          data.map((item: Book) => (
            <BookItem name={item.name} description={item.description} imageUrl={item.imageUrl} key={item.id} id={item.id} />
          ))}
      </u>
    </>
  );
};

export default BookList;
