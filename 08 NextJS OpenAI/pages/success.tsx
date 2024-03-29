import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import { RootState } from "@/Interfaces";

export default function Success(): JSX.Element {
  return (
    <div>
      <h1>Thank you for your purchase!</h1>
    </div>
  );
}

Success.getLayout = function getLayout(page: JSX.Element, pageProps: RootState) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
