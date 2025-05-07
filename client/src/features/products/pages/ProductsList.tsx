import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/table/DataTable';
import { ProductFormModal } from '@/features/products/components/ProductFormModal'; 
import { productColumns } from '@/features/products/components/ProductColumns';
import { Product } from '@/features/products/types/product';
import { useDeleteProduct } from '@/features/products/hooks/useDeleteProduct';
import { useGetProducts } from '@/features/products/hooks/useGetProducts';

export const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const deleteProduct = useDeleteProduct();
  const { data, isLoading, error } = useGetProducts();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = (product: Product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleDelete = (productId: string) => {
    deleteProduct.mutate(productId);
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Produits</h1>
        <Button onClick={handleOpenModal}>Ajouter un produit</Button>
      </div>

      <DataTable
        columns={productColumns({ onEdit: handleEdit, onDelete: handleDelete })}
        data={data || []}
        globalFilterPlaceholder="Rechercher un produit..."
      />

      <ProductFormModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
