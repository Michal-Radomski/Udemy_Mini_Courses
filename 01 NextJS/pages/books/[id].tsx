import {NextPage} from "next";
import {useRouter} from "next/router";

const BookDetail: NextPage = () => {
  const router = useRouter();
  // console.log({router});

  return <h1>Book Detail id: {router.query.id}</h1>;
};

export default BookDetail;
