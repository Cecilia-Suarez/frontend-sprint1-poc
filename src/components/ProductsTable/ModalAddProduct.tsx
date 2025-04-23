import React, { useState } from "react";
import api from "../../api/apiAuthAndProducts";
import { AxiosResponse } from "axios";
interface AddProductProps {
  onSave: (newProduct: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
  }) => void;
  onClose: () => void;
}

const ModalAddProduct: React.FC<AddProductProps> = ({ onSave, onClose }) => {
  const [title, settitle] = useState<string>("");
  const [price, setprice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = { title, price, description, category };
      const response: AxiosResponse<Product> = await api.post(`/products`, newProduct);
      if (response.status === 200) {
        onSave(response.data);
        onClose();
        console.log("Producto agregado con éxito:", response.data);
      } else {
        console.error("Error en la respuesta de la API:", response);
      }
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
      setError("No se pudo agregar el producto. Intentalo más tarde.");
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg border border-white bg-black p-6">
        <h2 className="mb-4 text-xl font-bold">Agregar Registro</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              placeholder="Ingresar Nombre del Título"
              value={title}
              onChange={(e) => {settitle(e.target.value)}}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              placeholder="Ingresa el valor del producto"
              value={price.toString()}
              onChange={(e) => {setprice(Number(e.target.value))}}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              value={description}
              placeholder="Ingresar descripción del producto"
              onChange={(e) => {setDescription(e.target.value)}}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Categoría</label>
            <input
              type="text"
              placeholder="Ingresar la categoría del producto"
              value={category}
              onChange={(e) => {setCategory(e.target.value)}}
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

export default ModalAddProduct;
