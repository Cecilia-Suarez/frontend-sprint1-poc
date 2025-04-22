import { useState } from "react";
import useProducts from "../hooks/useProducts";
import Loader from "./Loader";
import SeekerProducts from "./SeekerProducts";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

const ProductsTable = () => {
  const { data, isLoading, isError } = useProducts<Product[]>("products", "/products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  if (isLoading) return <Loader />;
  if (isError || !data || data.length === 0) return <p>No hay datos disponibles.</p>;

  const filteredData = data.filter((product) => {
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-lg font-bold">Productos</h1>
      <SeekerProducts
        onFilter={(term, category) => {
          setSearchTerm(term);
          setSelectedCategory(category);
        }}
      />
      <div className="min-h-[480px] overflow-auto">
        <table className="min-w-full border-y border-gray-200 bg-gray-900">
          <thead className="font-bold">
            <tr>
              <th className="table-th">Id</th>
              <th className="table-th">Titulo</th>
              <th className="table-th">Precios</th>
              <th className="table-th">Descripción</th>
              <th className="table-th">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((product) => (
              <tr key={product.id}>
                <td className="table-td">{product.id}</td>
                <td className="table-td max-w-xs">{product.title}</td>
                <td className="table-td">${product.price}</td>
                <td className="group table-td relative max-w-xs">
                  <div className="line-clamp-3 transition-all duration-300 group-hover:line-clamp-none">
                    {product.description}
                  </div>
                </td>
                <td className="table-td">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <p className="text-gray-500">
            No se encontraron resultados para los criterios de búsqueda.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsTable;
