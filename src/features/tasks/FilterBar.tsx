import React, { useState, useEffect } from 'react';
import { useFilterStore } from '../../store/useFilterStore';
import { useDebounce } from '../../hooks/useDebounce';

const FilterBar: React.FC = () => {
  const { setSearch, setStatus, setPriority } = useFilterStore();
  const [localSearch, setLocalSearch] = useState('');
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-6 dark:bg-gray-800 p-4 rounded-lg">
      <input
        type="text"
        placeholder="Buscar por título..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3 dark:bg-gray-700 text-black dark:text-gray-300"
      />

      <select
        onChange={(e) => setStatus(e.target.value as any)}
        className="border p-2 rounded w-full md:w-1/3 dark:bg-gray-700 text-black dark:text-gray-300"
      >
        <option value="all">Todos los estados</option>
        <option value="todo">Por hacer</option>
        <option value="in-progress">En progreso</option>
        <option value="done">Hecho</option>
      </select>

      <select
        onChange={(e) => setPriority(e.target.value as any)}
        className="border p-2 rounded w-full md:w-1/3 dark:bg-gray-700 text-black dark:text-gray-300"
      >
        <option value="all">Todas las prioridades</option>
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
    </div>
  );
};

export default FilterBar;
