import { http, HttpResponse } from 'msw'

let isAuthenticated = true
let taskIdCounter = 3

const mockTasks = [
  { id: 1, title: 'Learn Redux', completed: false },
  { id: 2, title: 'Build Task Manager', completed: true },
]

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as { username: string; password: string }

    if (username === 'admin' && password === 'admin') {
      isAuthenticated = true
      return HttpResponse.json({ token: 'abc123' })
    }

    return new HttpResponse('Invalid credentials', { status: 401 })
  }),

  http.post('/api/tasks', async ({ request }) => {
    if (!isAuthenticated) {
      return new HttpResponse('Unauthorized', { status: 401 })
    }

    const { title } = await request.json() as { title: string }

    const newTask = {
      id: taskIdCounter++,
      title,
      completed: false,
    }

    mockTasks.push(newTask)
    return HttpResponse.json(newTask, { status: 201 })
  }),

  http.get('/api/tasks', () => {
    if (!isAuthenticated) {
      return new HttpResponse('Unauthorized', { status: 401 })
    }

    return HttpResponse.json(mockTasks)
  }),

  http.post('/api/logout', () => {
    isAuthenticated = false
    return new HttpResponse(null, { status: 204 })
  }),
]
