import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '@/features/products/services/updateProduct';
import { ProductInput } from '@/features/products/types/product';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInput }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
