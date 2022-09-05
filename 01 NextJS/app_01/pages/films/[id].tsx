import {NextPage} from "next";
import {useRouter} from "next/router";

const FilmDetail: NextPage = () => {
  const router = useRouter();
  // console.log({router});

  return <h1>Film Detail id: {router.query.id}</h1>;
};

export default FilmDetail;
