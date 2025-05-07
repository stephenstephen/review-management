import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../services/deleteProduct';
import { toast } from 'sonner';

export function useDeleteProduct(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      toast.success('Produit supprimé avec succès');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erreur lors de la suppression du produit");
    },
  });
}
