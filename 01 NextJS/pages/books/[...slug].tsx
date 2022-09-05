import {NextPage} from "next";
import {useRouter} from "next/router";

const Slug: NextPage = () => {
  const router = useRouter();
  // console.log({router});
  return (
    <h1>
      Slug Page: {router && router.query && router.query.slug && router.query.slug[0]}/{" "}
      {router && router.query && router.query.slug && router.query.slug[1]}
    </h1>
  );
};

export default Slug;
