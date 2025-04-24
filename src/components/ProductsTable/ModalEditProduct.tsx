import React from "react";
import ModalBase from "./ModalBase";
import ProductForm from "./ProductForm";
import { z } from "zod";
import { ProductTableSchema } from "../../validation/ProductTableSchema";

type NewProductFormData = z.infer<typeof ProductTableSchema>;

interface ModalEditProductProps {
  product: NewProductFormData;
  onSubmit: (data: NewProductFormData) => void;
  onClose: () => void;
}

const ModalEditProduct: React.FC<ModalEditProductProps> = ({ product, onSubmit, onClose }) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg border border-white bg-black p-6">
        <ModalBase title="Editar producto" onClose={onClose}>
          <ProductForm initialData={product} onSubmit={onSubmit} />
          <div className="mt-4 flex justify-end gap-2">
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

export default ModalEditProduct;
