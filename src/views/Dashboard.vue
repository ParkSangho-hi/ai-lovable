<template>
  <section class="w-100" style="max-width: 1180px">
    <div class="card card-soft p-4 mb-4">
      <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <div>
          <h2 class="fw-bold mb-1">{{ authStore.userName }}님의 가계부 대시보드</h2>
          <p class="text-secondary mb-0">Pinia에서 Axios로 json-server의 transactions를 CRUD 처리합니다.</p>
        </div>
        <div class="d-flex gap-2">
          <RouterLink to="/profile" class="btn btn-outline-primary rounded-3 px-4">프로필 보기</RouterLink>
          <button class="btn btn-outline-secondary rounded-3 px-4" @click="logout">로그아웃</button>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <StatCard title="이번 달 지출" icon="💰" :value="store.formatCurrency(store.totalExpense)" tone-class="bg-orange-50 border border-warning-subtle" />
      </div>
      <div class="col-md-4">
        <StatCard title="이번 달 수입" icon="💵" :value="store.formatCurrency(store.totalIncome)" tone-class="bg-blue-50 border border-primary-subtle" value-class="text-primary" />
      </div>
      <div class="col-md-4">
        <StatCard title="잔액" icon="🏦" :value="store.formatCurrency(store.balance)" tone-class="bg-green-50 border border-success-subtle" :value-class="store.balance >= 0 ? 'text-success' : 'text-danger'" />
      </div>
    </div>

    <div class="card card-soft p-2 mb-4">
      <div class="nav nav-pills nav-fill gap-2">
        <button v-for="tab in tabs" :key="tab.key" class="nav-link rounded-3 py-3 fw-bold" :class="activeTab === tab.key ? 'active bg-primary' : 'text-secondary'" @click="activeTab = tab.key">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <FinanceChart v-if="activeTab === 'overview'" />
    <TransactionForm v-else-if="activeTab === 'add'" @saved="activeTab = 'list'" />
    <TransactionList v-else />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountBookStore } from '@/stores/accountBookStore.js'
import { useAuthStore } from '@/stores/authStore.js'
import StatCard from '@/components/StatCard.vue'
import FinanceChart from '@/components/FinanceChart.vue'
import TransactionForm from '@/components/TransactionForm.vue'
import TransactionList from '@/components/TransactionList.vue'

const router = useRouter()
const store = useAccountBookStore()
const authStore = useAuthStore()
const activeTab = ref('overview')
const tabs = [
  { key: 'overview', label: '📊 분석' },
  { key: 'add', label: '➕ 내역 추가' },
  { key: 'list', label: '📝 전체 내역' }
]

onMounted(async () => {
  await authStore.fetchProfile()
  await store.fetchTransactions()
})

function logout() {
  authStore.logout()
  store.transactions = []
  router.push('/login')
}
</script>
