'use client';

import { useState } from 'react';
import { ProductTable } from '@/features/products/components/ProductTable';
import { ProductFormModal } from '@/features/products/components/ProductFormModal';
import { Product } from '@/features/products/types/product';
import { useDeleteProduct } from '@/features/products/hooks/useDeleteProduct';
import { useGetProducts } from '@/features/products/hooks/useGetProducts';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const { data: products = [], isLoading } = useGetProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCloseModal = () => {
    setEditingProduct(null);
    setModalOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Confirmer la suppression ?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Produits</h1>
        <ProductFormModal
          open={modalOpen}
          onClose={handleCloseModal}
          product={editingProduct}
        />
        {!editingProduct && (
          <Button
            onClick={() => setModalOpen(true)}
          >
            Ajouter un produit
          </Button>
        )}
      </div>

      {isLoading ? (
        <p>Chargement des produits...</p>
      ) : (
        <ProductTable
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
