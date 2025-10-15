import { useState, useMemo } from 'react';
import { ListTodo } from 'lucide-react';
import { TaskInput } from './components/TaskInput';
import { TaskItem } from './components/TaskItem';
import { TaskFilter } from './components/TaskFilter';
import { useTasks } from './hooks/useTasks';
import { FilterType } from './types/task';

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'incomplete':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    incomplete: tasks.filter((t) => !t.completed).length,
  }), [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ListTodo className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              AIBOS To-Do Manager
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your tasks efficiently and stay productive
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <TaskInput onAdd={addTask} />
        </div>

        <div className="mb-6">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
        </div>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg">
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'incomplete'
                  ? 'No active tasks. Great job!'
                  : 'No tasks yet. Add one to get started!'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            {taskCounts.completed} of {taskCounts.all} tasks completed
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
