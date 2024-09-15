import { generateId } from '@/lib/utils';
import { TaskType } from '@/types';
import useLocalStorage from './useLocalStorage';

function useTask() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>('TASK_DATA', []);

  function createTask(columnId: string) {
    const newTask: TaskType = {
      id: generateId(),
      columnId: columnId,
      content: `${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
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
    createTask,
    deleteTask,
    editTask,
  };
}

export default useTask;
