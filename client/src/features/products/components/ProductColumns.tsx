import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../types/product';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Trash, Pencil } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDeleteDialog } from '@/components/common/ConfirmDeleteDialog';
import { useDeleteProduct } from '@/features/products/hooks/useDeleteProduct';

export function productColumns({
  onEdit,
  onDelete,
}: {
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}): ColumnDef<Product>[] {
  return [
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => {

        console.log('XXXXXXXXXXXXXXXXX');
        console.log(row.original.image);

        row.original.image ? (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-12 h-12 object-cover rounded-md"
          />

        ) : (
          <span className="text-muted-foreground">-</span>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nom <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Prix (€)',
      cell: ({ getValue }) => `€ ${Number(getValue()).toFixed(2)}`,
    },
    {
      accessorKey: 'averageRating',
      header: 'Note Moyenne',
      cell: ({ getValue }) => {
        const rating = getValue() as number;
        return rating ? `${rating.toFixed(1)} ★` : '–';
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Créé le',
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const product = row.original;
        const [open, setOpen] = useState(false);
        const isLoading = onDelete === undefined;
        const { mutate } = useDeleteProduct();

        const handleDelete = () => {
          mutate(product.id as string, {
            onSuccess: () => setOpen(false),
          });
        };

        return (
          <div className="flex items-center gap-2">
            {onEdit && (
              <Button size="icon" variant="ghost" onClick={() => onEdit(product)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <>
                <Button size="icon" variant="ghost" onClick={() => onDelete(product.id as string)}>
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
                <ConfirmDeleteDialog
                  open={open}
                  onCancel={() => setOpen(false)}
                  onConfirm={handleDelete}
                  loading={isLoading}
                  title={`Supprimer « ${product.name} » ?`}
                />
              </>
            )}
          </div>
        );
      },
      enableSorting: false,
    },
  ];
}
