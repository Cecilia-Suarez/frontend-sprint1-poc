const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-5 flex justify-center gap-2">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          disabled={page === currentPage}
          onClick={() => {
            onPageChange(page);
          }}
          className={`rounded border px-4 py-2 ${
            page === currentPage
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-gray-100 text-black hover:bg-gray-200"
          } ${page === currentPage ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
