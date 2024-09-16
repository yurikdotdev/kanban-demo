import { generateId } from '@/lib/utils';
import { TaskType } from '@/types';
import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

function useTask() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>('TASK_DATA', []);

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  function createTask(columnId: string) {
    const newTask: TaskType = {
      id: generateId(),
      columnId,
      content: `${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function deleteTasksByColumnId(columnId: string) {
    setTasks(tasks.filter((task) => task.columnId !== columnId));
  }

  function editTask(id: string, content: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      } else {
        return { ...task, content };
      }
    });

    setTasks(updatedTasks);
  }

  return {
    tasks,
    setTasks,
    activeTask,
    setActiveTask,
    createTask,
    deleteTask,
    deleteTasksByColumnId,
    editTask,
  };
}

export default useTask;
