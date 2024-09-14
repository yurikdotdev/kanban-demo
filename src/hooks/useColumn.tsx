import { generateId } from '@/lib/utils';
import useLocalStorage from './useLocalStorage';
import { ColumnType } from '@/types';

function useColumn() {
  const [columns, setColumns] = useLocalStorage<ColumnType[]>(
    'COLUMN_DATA',
    []
  );

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
    createColumn,
    deleteColumn,
    updateColumn,
  };
}

export default useColumn;
