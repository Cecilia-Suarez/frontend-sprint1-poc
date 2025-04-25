import React from "react";
import ModalBase from "./ModalBase";
import type { Product } from "../../types/product";
interface ModalDeleteProductProps {
  product: Product;
  onConfirm: () => void;
  onClose: () => void;
}

const ModalDeleteProduct: React.FC<ModalDeleteProductProps> = ({ product, onConfirm, onClose }) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg border border-white bg-black p-6">
        <ModalBase title="Eliminar producto" onClose={onClose}>
          <p className="mb-4">
            ¿Estás seguro que querés eliminar <strong>{product.title}</strong>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </ModalBase>
      </div>
    </div>
  );
};

export default ModalDeleteProduct;
