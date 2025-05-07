import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../services/createProduct';
import { toast } from 'sonner';
import { CreateProductInput } from '@/features/products/types/product';

export function useCreateProduct(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductInput) => createProduct(data),
    onSuccess: () => {
      toast.success('Produit créé avec succès');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erreur lors de la création du produit");
    },
  });
}
