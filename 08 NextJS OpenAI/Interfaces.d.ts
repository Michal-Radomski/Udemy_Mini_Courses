declare module "@webdeveducation/next-verify-stripe";

import type { AppProps } from "next/app";

type RootState = ReturnType<typeof store.getState> | AppProps;
type AppDispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;
type Action = typeof store.action;

interface IPost {
  topic: string;
  _id: string;
  created: string;
  userId: string;
}
