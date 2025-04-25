import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductEditTableSchema } from "../../validation/ProductTableSchema";
import { z } from "zod";

const ProductFormSchema = ProductEditTableSchema;
type ProductFormData = z.infer<typeof ProductFormSchema>;

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
}

const ProductEditForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          {...register("title")}
          placeholder="Ingresa título"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <input
          type="number"
          {...register("price")}
          placeholder="Ingresar precio"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <textarea
          {...register("description")}
          placeholder="Ingresa descripción"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <input
          type="text"
          {...register("category")}
          placeholder="Ingresa categoría"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductEditForm;
