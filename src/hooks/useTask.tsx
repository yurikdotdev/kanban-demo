import { generateId } from '@/lib/utils';
import { TaskType } from '@/types';
import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

function useTask() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>('TASK_DATA', []);

  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

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
    const updatedTasks = tasks.map((task) =>
      task.id !== taskId ? task : { ...task, content }
    );

    setTasks(updatedTasks);
  }

  function searchTask(query: string) {
    if (!query) {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter((task) =>
      task.content.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredTasks(filtered);
  }

  return {
    tasks: filteredTasks,
    setTasks,
    activeTask,
    setActiveTask,
    createTask,
    deleteTask,
    deleteTasksByColumnId,
    editTask,
    searchTask,
  };
}

export default useTask;
