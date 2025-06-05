import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';

const TaskList: React.FC = () => {
  const { tasks, deleteTask } = useTaskStore();

  return (
    <div className="space-y-4">
      {tasks.length === 0 && (
        <p className="text-gray-500 dark:text-gray-300">
          No hay tareas por el momento.
        </p>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 border rounded shadow flex justify-between items-center bg-white dark:bg-gray-800"
        >
          <div>
            <h3 className="font-bold text-lg dark:text-white">{task.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {task.description}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">
              Status: {task.status}
            </p>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
