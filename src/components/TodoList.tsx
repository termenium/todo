import { Check, Trash2, Flag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Todo, Priority } from '../App'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const priorityColors: Record<Priority, string> = {
    low: 'text-blue-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  }

  const priorityGlow: Record<Priority, string> = {
    low: 'shadow-blue-500/20',
    medium: 'shadow-yellow-500/20',
    high: 'shadow-red-500/20'
  }

  if (todos.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-400 mt-8 sm:mt-12 py-12 px-4 rounded-2xl border border-gray-700/80 bg-gray-800/80 backdrop-blur-xl"
      >
        <p className="text-lg mb-3 font-medium">No tasks yet</p>
        <p className="text-sm">Add your first task using the input above</p>
      </motion.div>
    )
  }

  return (
    <motion.div layout className="space-y-3">
      <AnimatePresence mode="popLayout">
        {todos.map(todo => (
          <motion.div
            layout
            key={todo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ x: 8 }}
            className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl 
              border backdrop-blur-xl transition-all duration-300
              ${todo.completed 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-gray-800/80 border-gray-700/80 hover:border-gray-600 hover:shadow-lg ' + priorityGlow[todo.priority]
              }`}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onToggle(todo.id)}
              className={`w-6 h-6 sm:w-7 sm:h-7 border-2 rounded-full flex items-center justify-center
                transition-colors duration-300
                ${todo.completed 
                  ? 'bg-white border-white' 
                  : 'border-gray-500 hover:border-gray-300'}`}
            >
              <AnimatePresence mode="wait">
                {todo.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check size={16} className="text-black" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.span
              layout
              className={`flex-1 text-base sm:text-lg transition-all duration-300 break-words
              ${todo.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}
            >
              {todo.text}
            </motion.span>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Flag 
                  size={18} 
                  className={`${priorityColors[todo.priority]} transition-colors duration-300`}
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(todo.id)}
                className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10
                  transition-all duration-300 outline-none
                  sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                aria-label="Delete todo"
              >
                <Trash2 size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TodoList