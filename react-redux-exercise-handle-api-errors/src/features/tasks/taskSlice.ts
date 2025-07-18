import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axiosInstance'
import { Task } from '../../types/task'

interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Task[]>('/tasks')
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch tasks')
  }
})

export const addTask = createAsyncThunk('tasks/addTask', async (title: string, thunkAPI) => {
  try {
    const response = await axios.post<Task>('/tasks', {
      title,
      completed: false,
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add task')
  }
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
  },
})

export default taskSlice.reducer
