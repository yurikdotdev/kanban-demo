import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import { generateId } from '../lib/utils';
import { ColumnType } from '../types';
import { Button } from './ui/button';
import Column from './Column'

function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  function createColumn() {
    const newColumn: ColumnType = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, newColumn]);

    console.log('column created')
  }

  function deleteColumn(id: string) {
    setColumns(columns.filter((column) => column.id !== id));

    console.log('column deleted')
  } 

  return (
    <>
      <DndContext>
        <div className='flex gap-4'>
          {columns.length
            ? columns.map((column) => {
                return (
                  <Column
                    key={column.id}
                    column={column}
                    deleteColumn={deleteColumn}
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
