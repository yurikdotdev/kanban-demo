import useColumn from '@/hooks/useColumn';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import Column from './Column';

function KanbanBoard() {
  const {
    columns,
    setColumns,
    columnsId,
    activeColumn,
    setActiveColumn,
    createColumn,
    deleteColumn,
    updateColumn,
  } = useColumn();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  function onDragStart(event: DragStartEvent) {
    const { active } = event;

    if (active.data.current?.type === 'column') {
      setActiveColumn(active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) {
      return;
    }

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-4">
          <SortableContext items={columnsId}>
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
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn ? (
              <Column
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <button onClick={createColumn}>Add Column</button>
    </>
  );
}

export default KanbanBoard;
