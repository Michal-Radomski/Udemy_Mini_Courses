import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import { RootState } from "@/Interfaces";

export default function TokenTopup(): JSX.Element {
  const handleClick = async () => {
    const result = await fetch("/api/addTokens", {
      method: "POST",
    });
    const json = await result.json();
    console.log("RESULT: ", json);
    window.location.href = json.session.url;
  };

  return (
    <div>
      <h1>this is the token topup</h1>
      <button className="btn" onClick={handleClick}>
        Add tokens
      </button>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page: JSX.Element, pageProps: RootState) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // console.log("ctx:", ctx);
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
