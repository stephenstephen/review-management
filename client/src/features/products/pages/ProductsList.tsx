import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/table/DataTable';
import { ProductFormModal } from '@/features/products/components/ProductFormModal';
import { fetchProducts } from '@/features/products/services/getProducts';
import { productColumns } from '@/features/products/components/ProductColumns';

export const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Produits</h1>
        <Button onClick={handleOpenModal}>Ajouter un produit</Button>
      </div>

      <DataTable
        columns={productColumns}
        data={data ?? []}
        globalFilterPlaceholder="Rechercher un produit..."
      />

      <ProductFormModal mode="create" open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
