import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function NewPost(): JSX.Element {
  return <React.Fragment>NewPost</React.Fragment>;
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
