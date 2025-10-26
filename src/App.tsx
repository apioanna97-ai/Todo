import { useState, useMemo } from 'react';
import {
  ListTodo,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  TrendingUp
} from 'lucide-react';
import { TaskInput } from './components/TaskInput';
import { TaskItem } from './components/TaskItem';
import { TaskFilter } from './components/TaskFilter';
import { useTasks } from './hooks/useTasks';
import { FilterType } from './types/task';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    switch (filter) {
      case 'completed':
        filtered = tasks.filter((task) => task.completed);
        break;
      case 'incomplete':
        filtered = tasks.filter((task) => !task.completed);
        break;
      default:
        filtered = tasks;
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, filter, searchTerm]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    incomplete: tasks.filter((t) => !t.completed).length,
  }), [tasks]);

  const completionRate = tasks.length > 0
    ? Math.round((taskCounts.completed / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <ListTodo className="w-12 h-12 text-blue-600" />
                <Sparkles className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                AIBOS TODO
              </h1>
            </div>
            <p className="text-gray-600 text-lg font-medium">
              Your Intelligent Task Manager
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-blue-100 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-semibold">Pending</span>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600">{taskCounts.incomplete}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-green-100 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-semibold">Completed</span>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">{taskCounts.completed}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-purple-100 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-semibold">Total</span>
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600">{taskCounts.all}</div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 border-2 border-orange-100 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-semibold">Progress</span>
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600">{completionRate}%</div>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-blue-100">
          <TaskInput onAdd={addTask} />
        </div>

        {/* Filter & Search Section */}
        <div className="mb-6">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-200">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <ListTodo className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {searchTerm ? 'No tasks found' : 'No tasks yet'}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? 'Try adjusting your search terms'
                      : filter === 'completed'
                      ? 'Complete some tasks to see them here'
                      : filter === 'incomplete'
                      ? 'All tasks completed! Great job!'
                      : 'Add your first task to get started!'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-blue-100">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-700">
                {taskCounts.completed} of {taskCounts.all} tasks completed
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
