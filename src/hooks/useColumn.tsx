import { generateId } from '@/lib/utils';
import { ColumnType } from '@/types';
import { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useTask from './useTask';

function useColumn() {
  const [columns, setColumns] = useLocalStorage<ColumnType[]>(
    'COLUMN_DATA',
    []
  );

  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

  const { deleteTasksByColumnId } = useTask();

  function createColumn() {
    const newColumn: ColumnType = {
      id: generateId(),
      title: 'New Column',
    };

    setColumns([...columns, newColumn]);
  }

  function deleteColumn(id: string) {
    deleteTasksByColumnId(id)
    
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
    activeColumn,
    setActiveColumn,
    createColumn,
    deleteColumn,
    updateColumn,
  };
}

export default useColumn;
