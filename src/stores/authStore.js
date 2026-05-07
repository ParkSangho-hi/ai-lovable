import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  const isLoggedIn = computed(() => !!user.value)

  // 로그인
  const login = async (email, password) => {
    const { data } = await api.get('/users', { params: { email, password } })
    if (data.length === 0) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
    const loggedUser = data[0]
    // 간단한 토큰 시뮬레이션 (실제 환경에서는 서버에서 JWT 발급)
    const fakeToken = btoa(`${loggedUser.id}:${loggedUser.email}:${Date.now()}`)
    user.value = { id: loggedUser.id, name: loggedUser.name, email: loggedUser.email }
    token.value = fakeToken
    localStorage.setItem('user', JSON.stringify(user.value))
    localStorage.setItem('token', fakeToken)
    return user.value
  }

  // 회원가입
  const register = async ({ name, email, password }) => {
    // 이메일 중복 확인
    const { data: existing } = await api.get('/users', { params: { email } })
    if (existing.length > 0) {
      throw new Error('이미 사용 중인 이메일입니다.')
    }
    const { data: newUser } = await api.post('/users', { name, email, password })
    const fakeToken = btoa(`${newUser.id}:${newUser.email}:${Date.now()}`)
    user.value = { id: newUser.id, name: newUser.name, email: newUser.email }
    token.value = fakeToken
    localStorage.setItem('user', JSON.stringify(user.value))
    localStorage.setItem('token', fakeToken)
    return user.value
  }

  // 로그아웃
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { user, token, isLoggedIn, login, register, logout }
})
