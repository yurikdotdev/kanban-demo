export type ColumnType = {
  id: string;
  title: string;
};

export type TaskType = {
  id: string;
  columnId: string | number;
  content: string;
};
