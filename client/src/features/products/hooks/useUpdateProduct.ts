import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../services/updateProduct';
import { toast } from 'sonner';
import { UpdateProductInput } from '@/features/products/types/product';

export function useUpdateProduct(productId: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductInput) => updateProduct(productId, data),
    onSuccess: () => {    
      toast.success('Produit modifié avec succès');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erreur lors de la modification du produit");
    },
  });
}
