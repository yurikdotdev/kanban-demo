import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import { generateId } from '../lib/utils';
import { ColumnType } from '../types';
import Column from './Column';
import { Button } from './ui/button';

function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  function createColumn() {
    const newColumn: ColumnType = {
      id: generateId(),
      title: 'New Column',
    };

    setColumns([...columns, newColumn]);

    console.log('column created');
  }

  function deleteColumn(id: string) {
    setColumns(columns.filter((column) => column.id !== id));

    console.log('column deleted');
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

  return (
    <>
      <DndContext>
        <div className="flex gap-4">
          {columns.length
            ? columns.map((column) => {
                return (
                  <Column
                    key={column.id}
                    column={column}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                  />
                );
              })
            : null}
        </div>
      </DndContext>

      <Button onClick={createColumn}>Add Column</Button>
    </>
  );
}

export default KanbanBoard;
