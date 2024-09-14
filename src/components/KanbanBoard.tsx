import { DndContext } from '@dnd-kit/core';
import Column from './Column';
import useColumn from '@/hooks/useColumn';

function KanbanBoard() {
  const { columns, createColumn, deleteColumn, updateColumn } = useColumn();

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
      <button onClick={createColumn}>Add Column</button>
    </>
  );
}

export default KanbanBoard;
