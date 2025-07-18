import axios from 'axios'
import { store } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { RootState } from '../app/store'

const axiosInstance = axios.create({
  baseURL: '/api',
})

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState() as RootState
  const token = state.auth.token

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
