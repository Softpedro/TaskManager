import React, { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTaskStore } from '../../store/useTaskStore';
import { useFilterStore } from '../../store/useFilterStore';
import SortableTask from './SortableTask';

const TaskBoard: React.FC = () => {
  const { tasks, reorderTasks } = useTaskStore();
  const { search, status, priority } = useFilterStore();
  console.log(tasks, 'tasks');
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = status === 'all' || task.status === status;
      const matchesPriority = priority === 'all' || task.priority === priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, status, priority]);
  console.log(filteredTasks, 'filteredTasks');
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex((task) => task.id === active.id);
      const newIndex = filteredTasks.findIndex((task) => task.id === over.id);

      const newOrder = arrayMove(
        filteredTasks.map((task) => task.id),
        oldIndex,
        newIndex
      );

      reorderTasks(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-xl mb-2">🎉 No hay tareas</p>
              <p>Agrega una nueva tarea para comenzar</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TaskBoard;
