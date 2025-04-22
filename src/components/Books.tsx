import useFetch from "../hooks/useFetch";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

interface BooksProps {
  id: number;
  title: string;
  author: string;
  published: Date;
}

const Books = () => {
  const { data: books, isLoading, isError, error } = useFetch<BooksProps[]>("books", "/poc/books/");

  if (isLoading) return <Loader />;
  if (isError) {
    console.log(error.message);
    return <ErrorMessage />;
  }

  return (
    <div className="flex flex-col gap-2">
      <h2>Libros</h2>
      {books?.map((book) => (
        <div key={book.id} className="rounded border p-2">
          <img src="../assets/book.webp" alt={book.title} />
          <div>
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <span className="block text-sm">{book.author}</span>
            <span className="block text-sm text-gray-500">
              {new Date(book.published).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
