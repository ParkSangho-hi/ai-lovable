<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <!-- 로그인 상태일 때만 네비게이션 표시 -->
  <nav v-if="authStore.isLoggedIn" class="navbar navbar-expand-lg navbar-dark" style="background:linear-gradient(135deg,#4f46e5,#06b6d4)">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <i class="fa-solid fa-wallet me-2"></i>My Ledger
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent">
        <div class="d-flex gap-3 me-auto">
          <RouterLink class="nav-link text-white" to="/">
            <i class="fa-solid fa-chart-pie me-1"></i>대시보드
          </RouterLink>
          <RouterLink class="nav-link text-white" to="/transactions">
            <i class="fa-solid fa-list me-1"></i>거래내역
          </RouterLink>
        </div>

        <!-- 사용자 정보 & 로그아웃 -->
        <div class="d-flex align-items-center gap-3 mt-2 mt-lg-0">
          <div class="d-flex align-items-center gap-2 text-white">
            <div class="user-avatar">
              <i class="fa-solid fa-circle-user"></i>
            </div>
            <span class="small fw-semibold">{{ authStore.user?.name }}님</span>
          </div>
          <button
            class="btn btn-sm btn-logout"
            @click="handleLogout"
          >
            <i class="fa-solid fa-right-from-bracket me-1"></i>로그아웃
          </button>
        </div>
      </div>
    </div>
  </nav>

  <main :class="authStore.isLoggedIn ? 'container py-4' : ''">
    <RouterView />
  </main>
</template>

<style scoped>
.nav-link.router-link-active {
  font-weight: 700;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
}

.user-avatar {
  font-size: 1.5rem;
  line-height: 1;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  transition: background 0.2s;
}
.btn-logout:hover {
  background: rgba(255, 255, 255, 0.28);
  color: white;
}
</style>
