<template>
  <header class="bg-white shadow-sm border-bottom">
    <nav class="container navbar navbar-expand-lg py-3">
      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-3">
        <span class="d-inline-flex align-items-center justify-content-center bg-primary text-white fw-bold rounded-3" style="width:44px;height:44px">KB</span>
        <span>
          <span class="d-block fw-bold text-dark">국민은행</span>
          <small class="text-secondary">Vue3 + json-server 가계부</small>
        </span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNav" class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav align-items-lg-center gap-lg-2">
          <li class="nav-item"><RouterLink to="/" class="nav-link">홈</RouterLink></li>
          <template v-if="authStore.isLoggedIn">
            <li class="nav-item"><RouterLink to="/dashboard" class="nav-link">대시보드</RouterLink></li>
            <li class="nav-item"><RouterLink to="/profile" class="nav-link">프로필</RouterLink></li>
            <li class="nav-item"><button class="btn btn-outline-secondary rounded-3 px-4" @click="logout">로그아웃</button></li>
          </template>
          <template v-else>
            <li class="nav-item"><RouterLink to="/login" class="nav-link">로그인</RouterLink></li>
            <li class="nav-item"><RouterLink to="/signup" class="btn btn-kb rounded-3 px-4">회원가입</RouterLink></li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import { useAccountBookStore } from '@/stores/accountBookStore.js'

const router = useRouter()
const authStore = useAuthStore()
const accountBookStore = useAccountBookStore()

function logout() {
  authStore.logout()
  accountBookStore.transactions = []
  router.push('/login')
}
</script>
