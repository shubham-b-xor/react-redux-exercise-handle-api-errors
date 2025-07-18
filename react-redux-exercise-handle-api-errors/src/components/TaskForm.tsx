import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import { addTask } from '../features/tasks/taskSlice'
import { Box, TextField, Button } from '@mui/material'

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await dispatch(addTask(title)).unwrap()
      setTitle('')
    } catch (error) {
      console.error('Failed to add task:', error)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <Button variant="contained" color="primary" type="submit" disabled={!title.trim()}>
        Add
      </Button>
    </Box>
  )
}

export default TaskForm
