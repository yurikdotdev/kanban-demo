import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { ColumnType, TaskType } from '../types';
import Task from './Task';
import { Button } from './ui/button';

interface Props {
  column: ColumnType;
  deleteColumn: (columnId: string) => void;
  updateColumn: (columnId: string, title: string) => void;

  tasks: TaskType[];
  createTask: (columnId: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, content: string) => void;
}

function Column(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,

    tasks,
    createTask,
    deleteTask,
    editTask,
  } = props;

  const { id, title } = column;

  const [editMode, setEditMode] = useState<boolean>(false);

  const taskId = tasks.map((task) => task.id);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'column',
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex min-h-96 w-80 flex-col overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-400 opacity-10"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex min-h-96 w-80 flex-col overflow-hidden rounded-lg border-2 border-dashed"
    >
      <div
        className="item-center flex w-full justify-between bg-slate-100 p-4"
        onClick={() => setEditMode(true)}
        {...attributes}
        {...listeners}
      >
        {editMode ? (
          <input
            value={title}
            onChange={(e) => updateColumn(id, e.target.value)}
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') {
                return;
              } else {
                setEditMode(false);
              }
            }}
            className="w-full"
          />
        ) : (
          <h1 className="text-large font-mono font-semibold">{title}</h1>
        )}
        <button onClick={() => deleteColumn(id)}>x</button>
      </div>

      <div className="flex flex-grow flex-col justify-between gap-4 p-2">
        <div className="flex flex-col gap-2">
          <SortableContext items={taskId}>
            {tasks.length ? (
              tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                );
              })
            ) : (
              <div className="p-12 text-center">No Tasks</div>
            )}
          </SortableContext>
        </div>
      </div>
      <Button onClick={() => createTask(id)}>Add Task</Button>
    </div>
  );
}

export default Column;
