import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import PrioritySelect from './PrioritySelect'
import type { Priority } from '../App'

interface TodoInputProps {
  onAdd: (text: string, priority: Priority) => void
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text, priority)
      setText('')
      setPriority('medium')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-800/80 backdrop-blur-xl border border-gray-700 rounded-2xl px-5 py-4 
            focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
            transition-all duration-300 placeholder:text-gray-400 text-gray-100"
        />
        <div className="flex gap-3">
          <PrioritySelect value={priority} onChange={setPriority} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-white text-black font-medium w-full sm:w-auto px-6 py-4 sm:px-5 rounded-2xl
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              hover:shadow-lg hover:shadow-white/20 hover:bg-gray-100"
            disabled={!text.trim()}
          >
            <Plus size={24} className="sm:size-5" />
          </motion.button>
        </div>
      </div>
    </motion.form>
  )
}

export default TodoInput