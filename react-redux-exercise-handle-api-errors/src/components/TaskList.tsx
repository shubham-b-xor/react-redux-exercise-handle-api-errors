import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { fetchTasks } from '../features/tasks/taskSlice'

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  if (loading) return <p>Loading tasks...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
