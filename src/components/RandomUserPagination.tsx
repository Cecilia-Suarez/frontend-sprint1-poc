import { useState } from "react";
import useRandomUser, { ApiResponse } from "../hooks/useRandomUser";

export const RandomUsersPagination = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useRandomUser<ApiResponse>("randomUser", page);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  console.log(data);

  return (
    <>
      <h1>RandomUsersPagination</h1>

      {isLoading ? (
        <p>Cargando usuarios...</p>
      ) : isError ? (
        <p>Hubo un error al cargar los usuarios.</p>
      ) : (
        <ul>
          {data?.results.map((user) => (
            <li key={user.name.last}>
              {user.name.first} {user.name.last} - {user.email}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handlePrev}
        disabled={page === 1 || isFetching}
        className="disabled:opacity-50"
        type="button"
      >
        Anterior
      </button>
      <button
        onClick={handleNext}
        disabled={page === 5 || isFetching}
        className="disabled:opacity-50"
        type="button"
      >
        Siguiente
      </button>
    </>
  );
};
