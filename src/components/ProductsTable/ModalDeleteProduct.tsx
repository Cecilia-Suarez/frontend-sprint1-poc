import React from "react";
import api from "../../api/apiAuthAndProducts";

interface DeleteProductProps {
  product: { id: number; title: string; price: number; description: string; category: string };
  onDelete: (id: number) => void;
  onClose: () => void;
}

const ModalDeleteProduct: React.FC<DeleteProductProps> = ({ product, onDelete, onClose }) => {
  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/products/${product.id}`);
      onDelete(product.id);
      onClose();
    } catch (error) {
      console.error("Error eliminando el producto: ", error);
    }
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg border border-white bg-black p-6">
        <h2 className="mb-4 text-xl font-bold">Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este registro? Esta acción es irreversible.</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2">
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteProduct;
