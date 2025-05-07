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
import { useEffect, useState } from 'react';

import { CreateProductInput, Product } from '../types/product';
import { ProductSchema } from '../validations/productSchema';
import { useCreateProduct } from '../hooks/useCreateProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { productSchema } from '../validations/productSchema';
import apiClient from '@/lib/apiClient';

interface ProductFormModalProps {
  open?: boolean;
  onClose?: () => void;
  product?: Product | null;
}

export function ProductFormModal({
  open: controlledOpen,
  onClose,
  product,
}: ProductFormModalProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = controlledOpen ?? localOpen;
  const isEditing = Boolean(product);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image ?? null);

  const form = useForm<ProductSchema>({
    resolver: yupResolver(productSchema),
    mode: 'onSubmit', // Validate on form submission
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      image: product?.image,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const createMutation = useCreateProduct(() => {
    handleOpenChange(false);
    reset();
  });

  const updateMutation = useUpdateProduct(product?.id ?? '', () => {
    handleOpenChange(false);
    reset();
  });

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('image', product.image || '');
      setImagePreview(product.image || null);
    }
  }, [product, setValue]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose?.();
      setLocalOpen(false);
      reset();
      setImagePreview(null);
    } else if (controlledOpen === undefined) {
      setLocalOpen(true);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(import.meta.env.VITE_API_URL + '/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.url;
      
      // Set image preview and form value
      setImagePreview(URL.createObjectURL(file));
      setValue('image', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Optional: Add user-friendly error notification
    }
  };

  const onSubmit = (data: ProductSchema) => {
    console.log('Form submitted:', data);
    console.log('Form errors:', errors);
    
    // Prevent submission if there are form errors
    if (Object.keys(errors).length > 0) {
      console.error('Form has validation errors');
      return;
    }

    // Ensure image is a string
    const productData: CreateProductInput = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image || '',
    };

    try {
      if (isEditing && product) {
        console.log('Updating product');
        updateMutation.mutate(productData);
      } else {
        console.log('Creating product');
        createMutation.mutate(productData);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Modifier le produit' : 'Créer un produit'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register('description')} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Prix</Label>
              <Input id="price" type="number" step="0.01" {...register('price')} />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  className="w-32 h-32 object-cover mt-2 rounded"
                />
              )}
              {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? 'Mise à jour...'
                  : 'Création...'
                : isEditing
                ? 'Mettre à jour'
                : 'Créer'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
