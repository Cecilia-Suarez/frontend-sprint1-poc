import React, { useState, useEffect } from "react";
import api from "../../api/apiAuthAndProducts";

interface EditProductProps {
  product: { id: number; title: string; price: number; description: string; category: string };
  onSave: (updatedProduct: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
  }) => void;
  onClose: () => void;
}

const ModalEditProduct: React.FC<EditProductProps> = ({ product, onSave, onClose }) => {
  const [title, settitle] = useState<string>(product.title);
  const [price, setprice] = useState<number>(product.price);
  const [description, setDescription] = useState<string>(product.description);
  const [category, setCategory] = useState<string>(product.category);

  useEffect(() => {
    settitle(product.title);
    setprice(product.price);
    setDescription(product.description);
    setCategory(product.category);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProduct = { id: product.id, title, price: Number(price), description, category };
      await api.put(`/products/${product.id}`, updatedProduct);
      onSave(updatedProduct);
      onClose();
    } catch (error) {
      console.error("Error actualizando el producto: ", error);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg border border-white bg-black p-6">
        <h2 className="mb-4 text-xl font-bold">Editar Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              value={price.toString()}
              onChange={(e) => setprice(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Categoría</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2">
              Cancelar
            </button>
            <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditProduct;
