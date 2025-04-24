export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

export type NewProductFormData = Omit<Product, "id">;
export type ProductFormData = Product;
