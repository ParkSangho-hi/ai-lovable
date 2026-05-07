import axios from 'axios'

// json-server 베이스 URL
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

// 응답 인터셉터: 에러 처리
api.interceptors.response.use(
  res => res,
  err => {
    console.error('[API ERROR]', err.message)
    // 401 인증 오류 시 로그아웃 처리
    if (err.response?.status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
