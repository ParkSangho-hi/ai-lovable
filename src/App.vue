<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background:linear-gradient(135deg,#4f46e5,#06b6d4)">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        <i class="fa-solid fa-wallet me-2"></i>My Ledger
      </RouterLink>
      <div class="d-flex gap-3">
        <RouterLink class="nav-link text-white" to="/"><i class="fa-solid fa-chart-pie me-1"></i>대시보드</RouterLink>
        <RouterLink class="nav-link text-white" to="/transactions"><i class="fa-solid fa-list me-1"></i>거래내역</RouterLink>
      </div>
    </div>
  </nav>
  <main class="container py-4">
    <RouterView />
  </main>
</template>
