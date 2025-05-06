import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/features/products/services/getProducts';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
