import { Flag } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Priority } from '../App'

interface PrioritySelectProps {
  value: Priority
  onChange: (priority: Priority) => void
}

function PrioritySelect({ value, onChange }: PrioritySelectProps) {
  const priorities: Priority[] = ['low', 'medium', 'high']
  
  const priorityColors = {
    low: 'text-blue-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  }

  return (
    <div className="relative flex-1 sm:flex-none">
      <motion.select
        whileFocus={{ scale: 1.01 }}
        value={value}
        onChange={(e) => onChange(e.target.value as Priority)}
        className="w-full appearance-none bg-gray-800/80 backdrop-blur-xl border border-gray-700 rounded-2xl px-5 py-4
          focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
          transition-all duration-300 pr-12 text-gray-100"
      >
        {priorities.map((priority) => (
          <option key={priority} value={priority} className="bg-gray-800">
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </option>
        ))}
      </motion.select>
      <motion.div
        animate={{ rotate: value === 'high' ? 360 : 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Flag 
          size={18} 
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${priorityColors[value]}`} 
        />
      </motion.div>
    </div>
  )
}

export default PrioritySelect