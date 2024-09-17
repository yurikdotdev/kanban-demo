import useColumn from '@/hooks/useColumn';
import useTask from '@/hooks/useTask';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import Column from './Column';
import Task from './Task';
import { Button } from './ui/button';

function KanbanBoard() {
  const {
    columns,
    setColumns,
    activeColumn,
    setActiveColumn,
    createColumn,
    deleteColumn,
    updateColumn,
  } = useColumn();

  const {
    tasks,
    setTasks,
    activeTask,
    setActiveTask,
    createTask,
    deleteTask,
    editTask,
    searchTask,
  } = useTask();

  const columnsId = columns.map((column) => column.id);

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

    if (active.data.current?.type === 'task') {
      setActiveTask(active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

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

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) {
      return;
    }

    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';

    if (!isActiveTask) {
      return;
    }

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        const updatedTasks = [...tasks];
        updatedTasks[activeIndex] = {
          ...updatedTasks[activeIndex],
          columnId: updatedTasks[overIndex].columnId,
        };

        return arrayMove(updatedTasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === 'column';

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        const updatedTasks = [...tasks];

        updatedTasks[activeIndex] = {
          ...updatedTasks[activeIndex],
          columnId: overId,
        };

        return arrayMove(updatedTasks, activeIndex, activeIndex);
      });
    }
  }

  function filteredTask(columnId: string) {
    return tasks.filter((task) => task.columnId === columnId);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex w-full items-center justify-evenly dark:text-white">
          <div>
            <h1 className="text-3xl font-bold">Kanban</h1>
            <p>Simple Kanban Demo</p>
          </div>
          <input
            type="text"
            className="h-fit w-72 rounded-lg bg-gray-100 p-2 text-center outline-none dark:bg-gray-300"
            placeholder="Search task"
            onChange={(e) => searchTask(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchTask(e.currentTarget.value);
              }
            }}
          />
        </div>
        <div className="flex gap-4">
          <SortableContext items={columnsId}>
            {columns.length ? (
              columns.map((column) => {
                return (
                  <Column
                    key={column.id}
                    column={column}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    tasks={filteredTask(column.id)}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                );
              })
            ) : (
              <p className="mx-auto text-center text-2xl">
                There's nothing here.
              </p>
            )}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn ? (
              <Column
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                tasks={filteredTask(activeColumn.id)}
                createTask={createTask}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ) : null}
            {activeTask ? (
              <Task
                task={activeTask}
                deleteTask={deleteTask}
                editTask={editTask}
              ></Task>
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <Button onClick={createColumn}>Add Column</Button>
    </>
  );
}

export default KanbanBoard;
