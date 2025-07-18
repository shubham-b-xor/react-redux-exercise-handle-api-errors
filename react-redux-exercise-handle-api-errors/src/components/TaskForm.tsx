import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import { addTask } from '../features/tasks/taskSlice'

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    dispatch(addTask(title))
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm
