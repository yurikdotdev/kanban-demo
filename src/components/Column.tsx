import type { ColumnType } from '../types';
import { Button } from './ui/button';

interface Props {
  column: ColumnType;
  deleteColumn: (id: string) => void;
}

function Column(props: Props) {
  const { column, deleteColumn } = props;
  const { id, title } = column;

  return (
    <div
      id={id}
      className="flex h-96 min-h-96 w-80 flex-col overflow-hidden rounded-lg bg-gray-400"
    >
      <div className="item-center flex w-full justify-between bg-green-300 p-4">
        <div>{title}</div>
        <button onClick={() => deleteColumn(id)}>x</button>
      </div>
      <div className="flex flex-grow flex-col justify-between bg-red-200 p-6">
        Content
      </div>
    </div>
  );
}

export default Column;
