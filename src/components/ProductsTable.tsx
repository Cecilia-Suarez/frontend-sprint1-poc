import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import Loader from "./Loader";
import ModalDeleteProduct from "./ProductsTable/ModalDeleteProduct";
import ModalEditProduct from "./ProductsTable/ModalEditProduct";
import ButtonProductTable from "./ProductsTable/ButtonProductTable";
import ModalAddProduct from "./ProductsTable/ModalAddProduct";
import SeekerProducts from "./SeekerProducts";
import type { Product, ProductFormData } from "../types/product";

const ProductsTable: React.FC = () => {
  const { data, isLoading, isError } = useProducts<Product[]>("products", "/products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [successMessage]);

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const productWithId = { ...newProduct, id: newId };
    setProducts((prevProducts) => [...prevProducts, productWithId]);
    setIsModalOpen(false);
    setSuccessMessage("Producto agregado con éxito!");
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedProduct = (updateProduct: ProductFormData) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updateProduct.id ? updateProduct : p)),
    );
    setEditingProduct(null);
  };

  const handleDelete = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    setIsDeleteModalOpen(false);
    setSuccessMessage("Producto eliminado con éxito!");
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) return <Loader />;
  if (isError || !data || data.length === 0) return <p>No hay datos disponibles.</p>;

  const filteredData = products.filter((product) => {
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-lg font-bold">Productos</h1>
      {successMessage && <div className="mt-4 font-bold text-green-500">{successMessage}</div>}
      <div className="flex items-center gap-8 p-4">
        <SeekerProducts
          onFilter={(term, category) => {
            setSearchTerm(term);
            setSelectedCategory(category);
          }}
        />
        <ButtonProductTable
          actionType="add"
          onAdd={() => {
            setIsModalOpen(true);
          }}
        />
      </div>
      <div className="min-h-[480px] overflow-auto">
        <table className="min-w-full border-y border-gray-200 bg-gray-900">
          <thead className="font-bold">
            <tr>
              <th className="table-th">Id</th>
              <th className="table-th">Título</th>
              <th className="table-th">Precios</th>
              <th className="table-th">Descripción</th>
              <th className="table-th">Categoría</th>
              <th className="table-th"></th>
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
                <td className="table-td space-x-2">
                  <ButtonProductTable
                    product={product}
                    onEdit={handleEditClick}
                    onDelete={() => {
                      openDeleteModal(product);
                    }}
                    actionType="edit"
                  />
                  <ButtonProductTable
                    product={product}
                    onEdit={handleEditClick}
                    onDelete={() => {
                      openDeleteModal(product);
                    }}
                    actionType="delete"
                  />
                </td>
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

      {isModalOpen && (
        <ModalAddProduct
          onClose={() => {
            setIsModalOpen(false);
          }}
          onAddProduct={handleAddProduct}
        />
      )}

      {isEditModalOpen && editingProduct && (
        <ModalEditProduct
          product={editingProduct}
          onSubmit={handleSaveEditedProduct}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && selectedProduct && (
        <ModalDeleteProduct
          product={selectedProduct}
          onConfirm={() => {
            handleDelete(selectedProduct.id);
          }}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductsTable;
