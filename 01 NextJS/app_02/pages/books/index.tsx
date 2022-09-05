import {NextPage} from "next";
import Link from "next/link";

import {getBooks} from "../../utils/api-utils";

export interface Book {
  name: string;
  id: string;
  description: string;
}

const BookHome: NextPage<{books: Book[]}> = ({books}: {books: Book[]}): JSX.Element => {
  return (
    <>
      <h1>BookHome</h1>
      <u style={{listStyleType: "none"}}>
        {books.map((book) => (
          <li key={book.id}>
            <div>
              <h1>{book.name}</h1>
              <p>{book.description}</p>
              <article>
                <Link href={`/books/${book.id}`}>
                  <a>Go to the book with id: {book.id}</a>
                </Link>
              </article>
            </div>
          </li>
        ))}
      </u>
    </>
  );
};

export default BookHome;

export async function getStaticProps() {
  const books = await getBooks();
  return {
    props: {
      books: books,
    },
    revalidate: 10,
  };
}
