import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}
interface ButtonsProductProps {
  product?: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onAdd?: () => void;
  actionType: "edit" | "delete" | "add";
}

const Button: React.FC<ButtonsProductProps> = ({
  product,
  onEdit,
  onDelete,
  onAdd,
  actionType,
}) => {
  const handleClick = () => {
    if (actionType === "edit" && product) {
      onEdit?.(product);
    } else if (actionType === "delete" && product) {
      onDelete?.(product);
    } else if (actionType === "add" && onAdd) {
      onAdd();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded px-4 py-1 font-semibold text-white shadow ${
        actionType === "edit"
          ? "bg-blue-600"
          : actionType === "delete"
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {actionType === "edit" ? "Editar" : actionType === "delete" ? "Eliminar" : "Agregar"}
    </button>
  );
};

export default Button;
