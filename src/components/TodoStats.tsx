import { CheckCircle2, CircleDashed, Flag } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Todo } from '../App'

interface TodoStatsProps {
  todos: Todo[]
}

function TodoStats({ todos }: TodoStatsProps) {
  const completed = todos.filter(todo => todo.completed).length
  const total = todos.length
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)
  const highPriority = todos.filter(todo => todo.priority === 'high' && !todo.completed).length

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
    >
      <motion.div
        variants={item}
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-gray-800/80 border border-gray-700/80 rounded-2xl p-4 backdrop-blur-xl transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-900/20"
      >
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <CircleDashed size={18} />
          <span className="text-sm font-medium">Total Tasks</span>
        </div>
        <motion.p
          key={total}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-semibold text-white"
        >
          {total}
        </motion.p>
      </motion.div>
      
      <motion.div
        variants={item}
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-gray-800/80 border border-gray-700/80 rounded-2xl p-4 backdrop-blur-xl transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-900/20"
      >
        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">Completion Rate</span>
        </div>
        <motion.p
          key={completionRate}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-semibold text-white"
        >
          {completionRate}%
        </motion.p>
      </motion.div>
      
      <motion.div
        variants={item}
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-gray-800/80 border border-gray-700/80 rounded-2xl p-4 backdrop-blur-xl transition-shadow duration-300 hover:shadow-lg hover:shadow-red-900/20"
      >
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <Flag size={18} />
          <span className="text-sm font-medium">High Priority</span>
        </div>
        <motion.p
          key={highPriority}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-semibold text-white"
        >
          {highPriority}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default TodoStats