import { Trash2, Check, Circle } from 'lucide-react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="group flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 transition-colors"
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? (
          <Check className="w-6 h-6 text-green-600" />
        ) : (
          <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
        )}
      </button>

      <span
        className={`flex-1 text-lg ${
          task.completed
            ? 'line-through text-gray-500'
            : 'text-gray-800'
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
