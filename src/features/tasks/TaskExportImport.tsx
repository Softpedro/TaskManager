import React, { useRef } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { toast } from 'react-toastify';

const TaskExportImport: React.FC = () => {
  const { tasks, reorderTasks } = useTaskStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = JSON.stringify(tasks, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedTasks)) {
          reorderTasks(importedTasks.map((task: any) => task.id));
          useTaskStore.setState({ tasks: importedTasks });
          toast.success('Tareas importadas correctamente');
        } else {
          toast.error('Formato de archivo incorrecto');
        }
      } catch (error) {
        console.error('Error al importar:', error);
        toast.error('Error al importar el archivo');
      }
    };

    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex gap-4 my-4">
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Exportar JSON
      </button>

      <button
        onClick={triggerFileInput}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
      >
        Importar JSON
      </button>

      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
};

export default TaskExportImport;
