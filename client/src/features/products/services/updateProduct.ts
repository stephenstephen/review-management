import apiClient from '@/lib/apiClient';
import { ProductInput } from '@/features/products/types/product';

export async function updateProduct(id: string, data: ProductInput) {
  const response = await apiClient.patch(`/products/${id}`, data);
  return response.data;
}
