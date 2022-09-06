import React from "react";
import {Book} from "../Interfaces";

import classes from "../styles/Form.module.scss";

const AddBook = (): JSX.Element => {
  const [inputs, setInputs] = React.useState<Book>({
    name: "",
    description: "",
    imageUrl:
      "https://pixabay.com/get/g990f503cf84dbe71c9faee2430c72f0a9c4ad8be9d8492db0fe09b4e44d4d61c5252017454ca442ea98b9e3605066f1541de11e2ee1513e6b13c81af864abb5c9cf8f27d693c81e3ba0f4d2bf988c27a_640.jpg",
  });
  // console.log({inputs});

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    // Targeting the name field
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    setInputs((values) => ({...values, [name]: value}));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.log({inputs});
    if (!inputs.name || !inputs.description || !inputs.imageUrl) {
      alert("Please enter inputs");
      return null;
    } else {
      sendRequest();
    }
  };

  const sendRequest = () => {
    fetch("/api/books/", {
      method: "POST",
      body: JSON.stringify({
        name: inputs.name,
        description: inputs.description,
        imageUrl: inputs.imageUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log({data}));
  };

  return (
    <div className={classes.container}>
      <form className={classes.formControl} onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input value={inputs.name} type="text" name="name" onChange={handleChange} />
        <label htmlFor="description">Description: </label>
        <input value={inputs.description} type="text" name="description" onChange={handleChange} />
        <label htmlFor="imgUrl">Image URL: </label>
        <input value={inputs.imageUrl} type="text" name="imageUrl" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBook;
