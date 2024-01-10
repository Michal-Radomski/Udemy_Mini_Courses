import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

import { AppLayout } from "../../components/AppLayout";
import { getAppProps } from "../../utils/getAppProps";

export default function NewPost(): JSX.Element {
  const router = useRouter();
  const [topic, setTopic] = React.useState<string>("");
  const [keywords, setKeywords] = React.useState<string>("");
  const [generating, setGenerating] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch(`/api/generatePost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ topic, keywords }),
      });
      const json = await response.json();
      console.log("RESULT: ", json);
      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (error) {
      console.log({ error });
      setGenerating(false);
    }
  };

  return (
    <div className="h-full overflow-hidden">
      {!!generating && (
        <div className="text-green-500 flex h-full animate-pulse w-full flex-col justify-center items-center">
          <FontAwesomeIcon icon={faBrain} className="text-8xl" />
          <h6>Generating...</h6>
        </div>
      )}
      {!generating && (
        <div className="w-full h-full flex flex-col overflow-auto">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200"
          >
            <div>
              <label>
                <strong>Generate a blog post on the topic of:</strong>
              </label>
              <textarea
                className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                maxLength={80}
              />
            </div>
            <div>
              <label>
                <strong>Targeting the following keywords:</strong>
              </label>
              <textarea
                className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
                value={keywords}
                onChange={(event) => setKeywords(event.target.value)}
                maxLength={80}
              />
              <small className="block mb-2">Separate keywords with a comma</small>
            </div>
            <button type="submit" className="btn" disabled={!topic.trim() || !keywords.trim()}>
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page: JSX.Element, pageProps: RootState): React.JSX.Element {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);

    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }

    return {
      props,
    };
  },
});
