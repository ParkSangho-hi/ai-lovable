<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  errorMsg.value = ''
  if (!email.value || !password.value) {
    errorMsg.value = '이메일과 비밀번호를 모두 입력해주세요.'
    return
  }
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    errorMsg.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-bg d-flex align-items-center justify-content-center min-vh-100">
    <div class="auth-card card shadow-lg p-4 p-md-5">
      <!-- 헤더 -->
      <div class="text-center mb-4">
        <div class="auth-icon mb-3">
          <i class="fa-solid fa-wallet"></i>
        </div>
        <h2 class="fw-bold mb-1">My Ledger</h2>
        <p class="text-muted">계정에 로그인하세요</p>
      </div>

      <!-- 에러 메시지 -->
      <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>{{ errorMsg }}</span>
      </div>

      <!-- 로그인 폼 -->
      <form @submit.prevent="handleLogin">
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

        <div class="mb-4">
          <label class="form-label fw-semibold">비밀번호</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
              <i class="fa-solid fa-lock text-muted"></i>
            </span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control border-start-0 border-end-0 ps-0"
              placeholder="비밀번호를 입력하세요"
              autocomplete="current-password"
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

        <button
          type="submit"
          class="btn btn-primary w-100 py-2 fw-semibold"
          :disabled="loading"
        >
          <span v-if="loading">
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            로그인 중...
          </span>
          <span v-else>
            <i class="fa-solid fa-right-to-bracket me-2"></i>로그인
          </span>
        </button>
      </form>

      <!-- 구분선 -->
      <div class="divider my-4">
        <span class="text-muted small">또는</span>
      </div>

      <!-- 회원가입 링크 -->
      <div class="text-center">
        <span class="text-muted small">계정이 없으신가요?</span>
        <RouterLink to="/register" class="ms-2 fw-semibold text-decoration-none auth-link">
          회원가입
        </RouterLink>
      </div>

      <!-- 테스트 계정 안내 -->
      <div class="mt-4 p-3 bg-light rounded-3 small text-muted">
        <i class="fa-solid fa-circle-info me-1 text-info"></i>
        <strong>테스트 계정:</strong> test@test.com / test1234
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

.input-group-text {
  cursor: default;
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

.form-control:focus,
.input-group-text:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 0.2rem rgba(79, 70, 229, 0.15);
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
