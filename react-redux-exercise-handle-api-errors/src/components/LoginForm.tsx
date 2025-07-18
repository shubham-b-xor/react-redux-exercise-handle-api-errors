import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import { loginSuccess } from '../features/auth/authSlice'
import axios from '../api/axiosInstance'

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/login', { username, password })
      dispatch(loginSuccess(response.data.token))
      setError(null)
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default LoginForm
