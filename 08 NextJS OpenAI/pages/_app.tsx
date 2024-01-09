import React from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "@/styles/globals.scss";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <React.Fragment>
      <UserProvider>
        <Component {...pageProps} />;
      </UserProvider>
    </React.Fragment>
  );
}
