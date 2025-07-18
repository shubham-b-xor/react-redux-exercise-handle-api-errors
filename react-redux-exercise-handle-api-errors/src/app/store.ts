import { configureStore } from '@reduxjs/toolkit'
import { authMiddleware } from '../middlewares/authMiddleware'
import rootReducer from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
