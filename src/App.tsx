import React, { useEffect } from 'react';
import TaskForm from './features/tasks/TaskForm';
import TaskBoard from './features/tasks/TaskBoard';
import FilterBar from './features/tasks/FilterBar';
import ThemeToggle from './features/theme/ThemeToggle';
import Dashboard from './features/dashboard/Dashboard';
import { useThemeStore } from './store/useThemeStore';
import { ToastContainer } from 'react-toastify';
import TaskExportImport from './features/tasks/TaskExportImport';

const App: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center dark:text-white">
          Task Manager
        </h1>
        <ThemeToggle />
      </div>

      <Dashboard />
      <TaskExportImport />
      <FilterBar />
      <TaskForm />
      <TaskBoard />

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
