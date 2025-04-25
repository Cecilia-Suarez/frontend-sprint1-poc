import React from "react";
import ModalBase from "./ModalBase";
import ProductAddForm from "./ProductAddForm";
import { z } from "zod";
import { ProductAddTableSchema } from "../../validation/ProductTableSchema";
type ProductFormData = z.infer<typeof ProductAddTableSchema>;

interface ModalAddProductProps {
  onClose: () => void;
  onAddProduct: (newProduct: ProductFormData) => void;
}

const ModalAddProduct: React.FC<ModalAddProductProps> = ({ onClose, onAddProduct }) => {
  const handleSubmit = (data: ProductFormData) => {
    const newProduct = {
      ...data,
      id: Date.now(),
    };
    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg border border-white bg-black p-6">
        <ModalBase title="Agregar producto" onClose={onClose}>
          <ProductAddForm onSubmit={handleSubmit} />
          <div className="flex justify-end gap-2 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </ModalBase>
      </div>
    </div>
  );
};

export default ModalAddProduct;
