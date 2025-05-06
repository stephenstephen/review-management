import { ProductInput } from '@/features/products/types/product';
import api from '@/lib/apiClient';

export const createProduct = async (data: ProductInput) => {
  const response = await api.post('/products', data);
  return response.data;
};
