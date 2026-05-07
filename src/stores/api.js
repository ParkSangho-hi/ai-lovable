import axios from 'axios'

// json-server 베이스 URL
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  res => res,
  err => {
    console.error('[API ERROR]', err.message)
    return Promise.reject(err)
  }
)

export default api
