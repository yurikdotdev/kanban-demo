import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { ColumnType } from '../types';

interface Props {
  column: ColumnType;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
}

function Column(props: Props) {
  const { column, deleteColumn, updateColumn } = props;
  const { id, title } = column;

  const [editMode, setEditMode] = useState(false);

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
        className="flex h-96 min-h-96 w-80 flex-col overflow-hidden rounded-lg border-dashed border-2 border-gray-300 bg-gray-400 opacity-50"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-96 min-h-96 w-80 flex-col overflow-hidden rounded-lg bg-gray-400"
    >
      <div
        className="item-center flex w-full justify-between bg-green-300 p-4"
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
            className="w-full bg-green-300"
          />
        ) : (
          <>{title}</>
        )}
        <button onClick={() => deleteColumn(id)}>x</button>
      </div>
      <div className="flex flex-grow flex-col justify-between bg-red-200 p-6">
        Content
      </div>
    </div>
  );
}

export default Column;
