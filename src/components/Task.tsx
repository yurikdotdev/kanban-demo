import { TaskType } from '@/types';
import { useState } from 'react';

interface Props {
  task: TaskType;
  deleteTask: (id: string) => void;
  editTask: (id: string, content: string) => void;
}

function Task(props: Props) {
  const { task, deleteTask, editTask } = props;
  const { id, content } = task;

  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  return (
    <div
      id={id}
      className="flex w-full items-center justify-between bg-gray-100 p-4"
      onClick={toggleEditMode}
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
          className="w-full bg-green-300"
        />
      ) : (
        <p className="text-lg">{content}</p>
      )}
      <button onClick={() => deleteTask(id)}>Delete</button>
    </div>
  );
}

export default Task;
