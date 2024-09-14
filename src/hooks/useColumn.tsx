import { generateId } from '@/lib/utils';
import { ColumnType } from '@/types';
import { useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';

function useColumn() {
  const [columns, setColumns] = useLocalStorage<ColumnType[]>(
    'COLUMN_DATA',
    []
  );

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

  function createColumn() {
    const newColumn: ColumnType = {
      id: generateId(),
      title: 'New Column',
    };

    setColumns([...columns, newColumn]);
  }

  function deleteColumn(id: string) {
    setColumns(columns.filter((column) => column.id !== id));
  }

  function updateColumn(id: string, title: string) {
    const updatedColumns = columns.map((column) => {
      if (column.id !== id) {
        return column;
      } else {
        return { ...column, title };
      }
    });

    setColumns(updatedColumns);
  }

  return {
    columns,
    setColumns,
    columnsId,
    activeColumn,
    setActiveColumn,
    createColumn,
    deleteColumn,
    updateColumn,
  };
}

export default useColumn;
