import React, { useEffect, useState } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Collapse,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchTasks } from '../features/tasks/taskSlice'
import { RootState } from '../app/store'
import { Task } from '../types/task'
import TaskForm from './TaskForm'

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { tasks, loading, error } = useAppSelector((state: RootState) => state.tasks)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const toggleForm = () => {
    setShowForm((prev) => !prev)
  }

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
        {error}
      </Alert>
    )

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, bgcolor: 'background.paper' }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Your Tasks
      </Typography>

      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Button variant="contained" onClick={toggleForm}>
          {showForm ? 'Cancel' : 'Add Task'}
        </Button>
      </Box>

      <Collapse in={showForm} unmountOnExit>
        <TaskForm />
      </Collapse>

      <List>
        {tasks.map((task: Task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={task.completed ? '✅ Completed' : '❌ Not completed'}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default TaskList
