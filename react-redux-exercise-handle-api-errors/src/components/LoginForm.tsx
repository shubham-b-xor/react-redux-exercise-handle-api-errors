import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Alert, Stack, Paper } from '@mui/material'
import { useAppDispatch } from '../app/hooks'
import { loginSuccess } from '../features/auth/authSlice'
import axios from '../api/axiosInstance'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 320 }}>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <Typography variant="h5" align="center">
              Login
            </Typography>

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              autoFocus
              autoComplete="username"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>

            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}

export default LoginForm
