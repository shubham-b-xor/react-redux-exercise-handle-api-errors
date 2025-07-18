import { Middleware } from '@reduxjs/toolkit'
import { logout } from '../features/auth/authSlice'

export const authMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type.endsWith('/rejected') && action.payload?.status === 401) {
    store.dispatch(logout())
  }

  return next(action)
}
