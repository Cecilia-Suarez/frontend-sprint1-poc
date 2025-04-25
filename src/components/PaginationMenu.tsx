interface PaginationMenuProps {
  page: number;
  isFetching: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}
const PaginationMenu = ({ page, isFetching, handleNext, handlePrev }: PaginationMenuProps) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <button
        onClick={handlePrev}
        disabled={page === 0 || isFetching}
        className="disabled:opacity-80"
        type="button"
      >
        Anterior
      </button>

      <p>{page + 1}</p>

      <button
        onClick={handleNext}
        disabled={page === 1 || isFetching}
        className="disabled:opacity-50"
        type="button"
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationMenu;
