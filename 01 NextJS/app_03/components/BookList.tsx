import React from "react";

import {Book} from "../Interfaces";
import BookItem from "./BookItem";
import classes from "../styles/Books.module.scss";

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
      <h1 style={{textAlign: "center"}}>Book List</h1>
      <ul className={classes.listContainer}>
        {data &&
          data.map((item: Book) => (
            <BookItem name={item.name} description={item.description} imageUrl={item.imageUrl} key={item.id} id={item.id} />
          ))}
      </ul>
    </>
  );
};

export default BookList;
