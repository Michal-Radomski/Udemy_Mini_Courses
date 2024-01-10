import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { PostsProvider } from "../context/postsContext";
config.autoAddCss = false;

import "@/styles/globals.scss";
import "@/styles/globals.css";
import { RootState } from "@/Interfaces";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export default function App({ Component, pageProps }: RootState): JSX.Element {
  const getLayout = Component.getLayout || ((page: JSX.Element) => page);
  return (
    <UserProvider>
      <PostsProvider>
        <main className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
      </PostsProvider>
    </UserProvider>
  );
}
