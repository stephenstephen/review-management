import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../services/getProducts';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.name}
        className="w-12 h-12 object-cover rounded-md"
      />
    ),
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
    cell: () => (
      <Button size="icon" variant="ghost">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
    enableSorting: false,
  },
];
