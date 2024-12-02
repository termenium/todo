import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import TodoStats from './components/TodoStats'
import './index.css'

export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: Priority
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string, priority: Priority) => {
    setTodos([...todos, { 
      id: crypto.randomUUID(), 
      text, 
      completed: false,
      priority 
    }])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold mb-2 text-center animate-shimmer bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent"
          >
            TaskShade
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-center mb-10 sm:mb-14 text-sm sm:text-base"
          >
            Organize your tasks with style and grace
          </motion.p>
          <TodoStats todos={todos} />
          <TodoInput onAdd={addTodo} />
          <TodoList 
            todos={todos} 
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default App