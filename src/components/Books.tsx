import useFetch from "../hooks/useFetch";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import bookCover from "../assets/book.webp";

interface BooksProps {
  id: number;
  title: string;
  author: string;
  published: Date;
}

interface BooksList {
  content: BooksProps[];
}

const Books = () => {
  const { data: books, isLoading, isError, error } = useFetch<BooksList>("books", "/poc/books");

  if (isLoading) return <Loader />;
  if (isError) {
    console.log(error.message);
    return <ErrorMessage />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-10 text-center text-2xl font-bold">Libros</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books?.content.map((book) => (
          <div key={book.id}>
            <img src={bookCover} alt={book.title} className="h-60 w-full object-cover" />
            <div className="mt-2 text-center">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <span className="block text-sm">{book.author}</span>
              <span className="block text-sm text-gray-500">
                {new Date(book.published).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
