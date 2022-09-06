import React from "react";

import classes from "../styles/Books.module.scss";

const BookItem = ({
  name,
  description,
  imageUrl,
  id,
}: {
  name: string;
  description: string;
  imageUrl: string;
  id: string;
}): JSX.Element => {
  // console.log({classes});
  return (
    <li className={classes.listItem}>
      <img src={imageUrl} alt={name} width={200} height="auto" />
      <h3>{name}</h3>
      <p>id: {id}</p>
      <p>{description}</p>
    </li>
  );
};

export default BookItem;
