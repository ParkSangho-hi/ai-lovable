<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMsg = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const handleRegister = async () => {
  errorMsg.value = ''

  if (!name.value || !email.value || !password.value || !passwordConfirm.value) {
    errorMsg.value = '모든 항목을 입력해주세요.'
    return
  }
  if (name.value.trim().length < 2) {
    errorMsg.value = '이름은 2글자 이상 입력해주세요.'
    return
  }
  if (password.value.length < 6) {
    errorMsg.value = '비밀번호는 6자 이상이어야 합니다.'
    return
  }
  if (password.value !== passwordConfirm.value) {
    errorMsg.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  loading.value = true
  try {
    await authStore.register({ name: name.value.trim(), email: email.value, password: password.value })
    router.push('/')
  } catch (e) {
    errorMsg.value = e.message
  } finally {
    loading.value = false
  }
}

// 비밀번호 강도 계산
const passwordStrength = computed(() => {
  const pw = password.value
  if (!pw) return { level: 0, label: '', color: '' }
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 1) return { level: 1, label: '매우 약함', color: 'bg-danger' }
  if (score === 2) return { level: 2, label: '약함', color: 'bg-warning' }
  if (score === 3) return { level: 3, label: '보통', color: 'bg-info' }
  if (score === 4) return { level: 4, label: '강함', color: 'bg-success' }
  return { level: 5, label: '매우 강함', color: 'bg-success' }
})

import { computed } from 'vue'
</script>

<template>
  <div class="auth-bg d-flex align-items-center justify-content-center min-vh-100">
    <div class="auth-card card shadow-lg p-4 p-md-5">
      <!-- 헤더 -->
      <div class="text-center mb-4">
        <div class="auth-icon mb-3">
          <i class="fa-solid fa-user-plus"></i>
        </div>
        <h2 class="fw-bold mb-1">회원가입</h2>
        <p class="text-muted">My Ledger에 오신 것을 환영합니다</p>
      </div>

      <!-- 에러 메시지 -->
      <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>{{ errorMsg }}</span>
      </div>

      <!-- 회원가입 폼 -->
      <form @submit.prevent="handleRegister">
        <!-- 이름 -->
        <div class="mb-3">
          <label class="form-label fw-semibold">이름</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
              <i class="fa-solid fa-user text-muted"></i>
            </span>
            <input
              v-model="name"
              type="text"
              class="form-control border-start-0 ps-0"
              placeholder="홍길동"
              autocomplete="name"
            />
          </div>
        </div>

        <!-- 이메일 -->
        <div class="mb-3">
          <label class="form-label fw-semibold">이메일</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
              <i class="fa-solid fa-envelope text-muted"></i>
            </span>
            <input
              v-model="email"
              type="email"
              class="form-control border-start-0 ps-0"
              placeholder="example@email.com"
              autocomplete="email"
            />
          </div>
        </div>

        <!-- 비밀번호 -->
        <div class="mb-2">
          <label class="form-label fw-semibold">비밀번호</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
              <i class="fa-solid fa-lock text-muted"></i>
            </span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control border-start-0 border-end-0 ps-0"
              placeholder="6자 이상 입력하세요"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="input-group-text bg-light border-start-0"
              @click="showPassword = !showPassword"
              tabindex="-1"
            >
              <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-muted"></i>
            </button>
          </div>
        </div>

        <!-- 비밀번호 강도 표시 -->
        <div v-if="password" class="mb-3">
          <div class="d-flex gap-1 mb-1">
            <div
              v-for="i in 5"
              :key="i"
              class="strength-bar rounded"
              :class="i <= passwordStrength.level ? passwordStrength.color : 'bg-secondary bg-opacity-25'"
            ></div>
          </div>
          <small class="text-muted">비밀번호 강도: <span :class="`text-${passwordStrength.color.replace('bg-','')}`">{{ passwordStrength.label }}</span></small>
        </div>

        <!-- 비밀번호 확인 -->
        <div class="mb-4">
          <label class="form-label fw-semibold">비밀번호 확인</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
              <i class="fa-solid fa-shield-halved text-muted"></i>
            </span>
            <input
              v-model="passwordConfirm"
              :type="showPasswordConfirm ? 'text' : 'password'"
              class="form-control border-start-0 border-end-0 ps-0"
              :class="{
                'is-valid': passwordConfirm && password === passwordConfirm,
                'is-invalid': passwordConfirm && password !== passwordConfirm
              }"
              placeholder="비밀번호를 다시 입력하세요"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="input-group-text bg-light border-start-0"
              @click="showPasswordConfirm = !showPasswordConfirm"
              tabindex="-1"
            >
              <i :class="showPasswordConfirm ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-muted"></i>
            </button>
          </div>
          <div v-if="passwordConfirm && password !== passwordConfirm" class="invalid-feedback d-block">
            비밀번호가 일치하지 않습니다.
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100 py-2 fw-semibold"
          :disabled="loading"
        >
          <span v-if="loading">
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            처리 중...
          </span>
          <span v-else>
            <i class="fa-solid fa-user-plus me-2"></i>가입하기
          </span>
        </button>
      </form>

      <!-- 구분선 -->
      <div class="divider my-4">
        <span class="text-muted small">또는</span>
      </div>

      <!-- 로그인 링크 -->
      <div class="text-center">
        <span class="text-muted small">이미 계정이 있으신가요?</span>
        <RouterLink to="/login" class="ms-2 fw-semibold text-decoration-none auth-link">
          로그인
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-bg {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  min-height: 100vh;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  border-radius: 1.25rem;
  border: none;
}

.auth-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.75rem;
  color: white;
}

.strength-bar {
  height: 5px;
  flex: 1;
  transition: background-color 0.3s;
}

.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.auth-link {
  color: #4f46e5;
}
.auth-link:hover {
  color: #06b6d4;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  border: none;
  border-radius: 0.5rem;
  transition: opacity 0.2s;
}
.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
