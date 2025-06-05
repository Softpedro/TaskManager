import React, { useMemo } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard: React.FC = () => {
  const { tasks } = useTaskStore();

  const statusCounts = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status]++;
        return acc;
      },
      {
        todo: 0,
        'in-progress': 0,
        done: 0,
      } as Record<'todo' | 'in-progress' | 'done', number>
    );
  }, [tasks]);

  const priorityCounts = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.priority]++;
        return acc;
      },
      {
        low: 0,
        medium: 0,
        high: 0,
      } as Record<'low' | 'medium' | 'high', number>
    );
  }, [tasks]);

  const doughnutData = {
    labels: ['Por hacer', 'En progreso', 'Hecho'],
    datasets: [
      {
        data: [
          statusCounts.todo,
          statusCounts['in-progress'],
          statusCounts.done,
        ],
        backgroundColor: ['#fbbf24', '#3b82f6', '#10b981'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Baja', 'Media', 'Alta'],
    datasets: [
      {
        label: 'Cantidad de tareas',
        data: [
          priorityCounts.low,
          priorityCounts.medium,
          priorityCounts.high,
        ],
        backgroundColor: ['#34d399', '#60a5fa', '#f87171'],
      },
    ],
  };

  return (
    <div className="space-y-8 mb-8 dark:text-white">
      <h2 className="text-xl font-bold dark:text-white">Dashboard de Tareas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border rounded shadow bg-white dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg mb-4 font-semibold dark:text-white">
            Estado de tareas
          </h3>
          <Doughnut data={doughnutData} />
        </div>

        <div className="p-4 border rounded shadow bg-white dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg mb-4 font-semibold dark:text-white">
            Prioridad de tareas
          </h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
