import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../types/task';
import { useTaskStore } from '../../store/useTaskStore';
import { toast } from 'react-toastify';
interface SortableTaskProps {
  task: Task;
}

const SortableTask: React.FC<SortableTaskProps> = ({ task }) => {
  const { deleteTask } = useTaskStore();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
        onClick={() => {
          deleteTask(task.id);
          toast.success('Tarea eliminada exitosamente');
        }}
        className="text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700"
      >
        Eliminar
      </button>
    </div>
  );
};

export default SortableTask;
