import { TaskType } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  task: TaskType;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, content: string) => void;
}

function Task(props: Props) {
  const { task, deleteTask, editTask } = props;
  const { id, content } = task;

  const [editMode, setEditMode] = useState<boolean>(false);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

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
      type: 'task',
      task,
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
        className="border-grey-400 flex h-20 w-full items-center justify-between border-2 border-dashed bg-gray-300 p-4 opacity-20"
      ></div>
    );
  }

  return (
    <div
      id={id}
      className="group relative flex h-20 w-full items-center justify-between bg-gray-100 p-4"
      onClick={toggleEditMode}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {editMode ? (
        <textarea
          value={content}
          onChange={(e) => editTask(id, e.target.value)}
          autoFocus
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode();
            }
          }}
          className="w-full bg-gray-100 outline-none"
        />
      ) : (
        <p>{content}</p>
      )}
      <Trash2Icon
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(id);
        }}
        className="absolute right-5 top-1/2 -translate-y-1/2 transform text-sm text-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        Delete
      </Trash2Icon>
    </div>
  );
}

export default Task;
