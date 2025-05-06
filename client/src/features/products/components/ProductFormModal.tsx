import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { productSchema, ProductSchema } from '@/features/products/validation/productSchema';
import { Product } from '@/features/products/types/product';
import { useCreateProduct } from '@/features/products/hooks/useCreateProduct';
import { useUpdateProduct } from '@/features/products/hooks/useUpdateProduct';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
  mode: 'create' | 'edit';
}

export const ProductFormModal = ({
  open,
  onClose,
  product,
  mode,
}: ProductFormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: yupResolver(productSchema),
  });

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  useEffect(() => {
    if (mode === 'edit' && product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
      });
    } else {
      reset();
    }
  }, [product, mode, reset]);

  const onSubmit = async (data: ProductSchema) => {
    if (mode === 'edit' && product) {
      await updateMutation.mutateAsync({ id: product.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Modifier un produit' : 'Créer un produit'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register('description')} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="price">Prix</Label>
            <Input id="price" type="number" step="0.01" {...register('price')} />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {mode === 'edit' ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
