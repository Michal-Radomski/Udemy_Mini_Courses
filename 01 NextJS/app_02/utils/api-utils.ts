export async function getBooks() {
  const response = await fetch("https://nextjs-mini-course-default-rtdb.europe-west1.firebasedatabase.app/books.json");
  const data = await response.json();
  return data;
}

export async function getBooksById(id: string) {
  const books = await getBooks();
  // console.log({books});
  const fetchedBook = books.find((book: {id: string}) => book.id === id);
  return fetchedBook;
}
