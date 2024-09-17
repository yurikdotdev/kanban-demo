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
      columnId: columnId,
      content: 'New Task',
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function deleteTasksByColumnId(columnId: string) {
    setTasks(tasks.filter((task) => task.columnId !== columnId));
  }

  function editTask(taskId: string, content: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) {
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
