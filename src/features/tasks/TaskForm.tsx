import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskStore } from '../../store/useTaskStore';
import { toast } from 'react-toastify';

const taskSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['todo', 'in-progress', 'done']),
});

type TaskFormData = z.infer<typeof taskSchema>;

const TaskForm: React.FC = () => {
  const { addTask } = useTaskStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    addTask({
      ...data,
      description: data.description || '',
    });
    toast.success('Tarea creada exitosamente');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <div>
        <label className="block font-medium dark:text-white">Título</label>
        <input
          {...register('title')}
          className="border p-2 w-full rounded dark:bg-gray-700 text-black dark:text-gray-300"
          type="text"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium dark:text-white">Descripción</label>
        <textarea
          {...register('description')}
          className="border p-2 w-full rounded dark:bg-gray-700 text-black dark:text-gray-300"
        />
      </div>

      <div>
        <label className="block font-medium dark:text-white">Prioridad</label>
        <select
          {...register('priority')}
          className="border p-2 w-full rounded dark:bg-gray-700 text-black dark:text-gray-300"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div>
        <label className="block font-medium dark:text-white">Estado</label>
        <select
          {...register('status')}
          className="border p-2 w-full rounded dark:bg-gray-700 text-black dark:text-gray-300"
        >
          <option value="todo">Por hacer</option>
          <option value="in-progress">En progreso</option>
          <option value="done">Hecho</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Agregar tarea
      </button>
    </form>
  );
};

export default TaskForm;
