export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}
