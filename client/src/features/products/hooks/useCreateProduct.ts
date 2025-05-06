import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/features/products/services/createProduct';
import { ProductInput } from '@/features/products/types/product';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductInput) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
