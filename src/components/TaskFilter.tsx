import { FilterType } from '../types/task';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    incomplete: number;
  };
}

export function TaskFilter({ currentFilter, onFilterChange, taskCounts }: TaskFilterProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: taskCounts.all },
    { value: 'incomplete', label: 'Active', count: taskCounts.incomplete },
    { value: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
}
