import { useState } from "react";

interface SeekerProductsProps {
  onFilter: (searchTerm: string, category: string) => void;
}

const SeekerProducts = ({ onFilter }: SeekerProductsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleFilter = () => {
    onFilter(searchTerm, category);
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="rounded border border-gray-300 bg-gray-900 p-2"
      />
      <label htmlFor="category" className="self-center">
        Categoría:
      </label>
      <select
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className="rounded border border-gray-300 bg-gray-900 p-2"
      >
        <option value="">Todas las categorías</option>
        <option value="men's clothing">men's clothing</option>
        <option value="jewelery">jewelery</option>
        <option value="pop">electronics</option>
        <option value="clásica">electronics</option>
      </select>
      <button type="submit" onClick={handleFilter} className="rounded bg-blue-700 p-2 text-white">
        Filtrar
      </button>
    </div>
  );
};

export default SeekerProducts;
