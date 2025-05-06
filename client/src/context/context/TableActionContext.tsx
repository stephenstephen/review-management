import { createContext, useContext, ReactNode } from 'react';

type TableActionsContextType<T> = {
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  [key: string]: ((item: T) => void) | undefined;
};

const TableActionsContext = createContext<TableActionsContextType<any> | undefined>(undefined);

interface TableActionsProviderProps<T> {
  children: ReactNode;
  actions: TableActionsContextType<T>;
}

function TableActionsProvider<T>({ children, actions }: TableActionsProviderProps<T>) {
  return (
    <TableActionsContext.Provider value={actions}>
      {children}
    </TableActionsContext.Provider>
  );
}

function useTableActions<T>() {
  const context = useContext(TableActionsContext) as TableActionsContextType<T>;
  if (context === undefined) {
    throw new Error('useTableActions must be used within a TableActionsProvider');
  }
  return context;
}

export { TableActionsProvider, useTableActions };