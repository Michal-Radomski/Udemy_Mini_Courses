import {NextPage} from "next";

import {Book} from "./index";
import {getBooks, getBooksById} from "../../utils/api-utils";

const BookDetails: NextPage<{book: Book}> = ({book}: {book: Book}): JSX.Element => {
  // console.log({book});
  return (
    <div>
      <h1>Book Details</h1>
      <h2>{book.name}</h2>
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetails;

//* Server-Side Rendering
export async function getServerSideProps({params}: {params: {id: string}}) {
  // console.log({params});
  const book = await getBooksById(params.id);
  return {
    props: {
      book: book,
    },
  };
}

//* Static Site Generation
// export async function getStaticProps({params}: {params: {id: string}}) {
//   // console.log({params});
//   const book = await getBooksById(params.id);
//   return {
//     props: {
//       book: book,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const books = await getBooks();
//   const paths = books.map((book: Book) => ({params: {id: book.id}}));
//   // console.log({paths});
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }
