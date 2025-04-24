import { z } from "zod";

export const ProductTableSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "El titulo debe de tener al menos 3 caracteres",
    })
    .max(100, {
      message: "El titulo debe de tener un máximo de 100 caracteres",
    }),
  price: z.coerce.number().min(0, {
    message: "El precio debe ser mayor o igual a 0",
  }),
  description: z.string().min(3, {
    message: "La descripción debe de tener al menos 3 caracteres",
  }),
  category: z.string().min(3, {
    message: "La categoría debe de tener al menos 3 caracteres",
  }),
});
