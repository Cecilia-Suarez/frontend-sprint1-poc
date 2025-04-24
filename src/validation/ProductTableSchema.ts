import { z } from "zod";

export const ProductTableSchema = z.object({
  id: z.number(),
  title: z.string().min(3, "El titulo debe de tener al menos 3 caracteres"),
  price: z.coerce.number().min(3, "El precio debe ser mayor o igual a 0"),
  description: z.string().min(3, "La descripción debe de tener al menos 3 caracteres"),
  category: z.string().min(3, "La categoría debe de tener al menos 3 caracteres"),
});
