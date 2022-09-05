import React from "react";

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
  return (
    <li>
      <img src={imageUrl} alt={name} width={100} height="auto" />
      <h3>{name}</h3>
      <p>id: {id}</p>
      <p>{description}</p>
    </li>
  );
};

export default BookItem;
