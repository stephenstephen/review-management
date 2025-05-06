export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
