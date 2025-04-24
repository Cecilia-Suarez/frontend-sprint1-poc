import { useState } from "react";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import useFetch from "@/hooks/useFetch";

interface UserList {
  id: number;
  email: string;
  name: string;
  lastName: string;
  role: string;
}

const UserList = () => {
  const { data, isLoading, isError } = useFetch<UserList[]>("users", "/users/getAllUsers");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  if (isLoading) return <Loader />;
  if (isError || !data || data.length === 0) return <p>No hay datos disponibles.</p>;

  const filteredData = data.filter((music) =>
    music.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-bold">Músicos</h1>
      <input
        type="text"
        placeholder="Buscar músicos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 w-80 rounded border border-gray-300 p-2"
      />
      <div className="min-h-[480px]">
        {filteredData.length === 0 ? (
          <p className="text-gray-500">No hay resultados para "{searchTerm}".</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-8 border-y border-gray-200 bg-gray-900 p-4 font-bold">
              <div>ID</div>
              <div>Nombre</div>
              <div>Apellido</div>
              <div>Email</div>
              <div>Rol</div>
            </div>
            {paginatedData.map((music) => (
              <div
                key={music.id}
                className="grid grid-cols-3 gap-8 border-b border-gray-200 bg-gray-900 p-4"
              >
                <div>{music.id}</div>
                <div>{music.name}</div>
                <div>{music.lastName}</div>
                <div>{music.email}</div>
                <div>{music.role}</div>
              </div>
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
