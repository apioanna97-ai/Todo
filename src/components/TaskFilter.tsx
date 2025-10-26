import { FilterType } from '../types/task';
import { ListTodo, Clock, CheckCircle2, Search } from 'lucide-react';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    incomplete: number;
  };
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function TaskFilter({
  currentFilter,
  onFilterChange,
  taskCounts,
  searchTerm,
  onSearchChange
}: TaskFilterProps) {
  const filters: { value: FilterType; label: string; count: number; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', count: taskCounts.all, icon: <ListTodo className="w-4 h-4" /> },
    { value: 'incomplete', label: 'Active', count: taskCounts.incomplete, icon: <Clock className="w-4 h-4" /> },
    { value: 'completed', label: 'Completed', count: taskCounts.completed, icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-blue-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-[1.02] ${
                currentFilter === filter.value
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {filter.icon}
              <span className="hidden sm:inline">{filter.label}</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
