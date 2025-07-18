import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './app/store'
import { logout } from './features/auth/authSlice'
import LoginForm from './components/LoginForm'
import TaskList from './components/TaskList'

const App: React.FC = () => {
  const auth: any = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div style={{ padding: '2rem' }}>
      {auth.isAuthenticated ? (
        <>
          <h1>Welcome! You are logged in.</h1>
          <button onClick={handleLogout}>Logout</button>
          <TaskList />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
