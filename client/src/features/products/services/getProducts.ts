import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>('/api/products');
  return response.data;
};

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
