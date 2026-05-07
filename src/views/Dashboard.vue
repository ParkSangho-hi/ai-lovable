<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '../stores/transactionStore'
import StatCard from '../components/StatCard.vue'
import PieChart from '../components/PieChart.vue'
import TrendChart from '../components/TrendChart.vue'

const store = useTransactionStore()
const { transactions, loading, error, totalIncome, totalExpense, balance, expenseByCategory, monthlyTrend } = storeToRefs(store)

onMounted(() => store.fetchTransactions())

const fmt = (n) => '₩' + n.toLocaleString('ko-KR')
const recent = computed(() => transactions.value.slice(0, 5))
</script>

<template>
  <div v-if="loading" class="text-center py-5"><div class="spinner-border text-primary"></div></div>
  <div v-else-if="error" class="alert alert-danger">
    <i class="fa-solid fa-triangle-exclamation me-2"></i>{{ error }} — json-server 실행 확인 (npm run server)
  </div>
  <template v-else>
    <h2 class="mb-4"><i class="fa-solid fa-gauge-high me-2 text-primary"></i>대시보드</h2>

    <div class="row g-3 mb-4">
      <div class="col-md-3 col-6"><StatCard title="총 수입" :value="fmt(totalIncome)" icon="fa-solid fa-arrow-trend-up" variant="income"/></div>
      <div class="col-md-3 col-6"><StatCard title="총 지출" :value="fmt(totalExpense)" icon="fa-solid fa-arrow-trend-down" variant="expense"/></div>
      <div class="col-md-3 col-6"><StatCard title="잔액" :value="fmt(balance)" icon="fa-solid fa-piggy-bank" variant="balance"/></div>
      <div class="col-md-3 col-6"><StatCard title="거래 건수" :value="transactions.length + '건'" icon="fa-solid fa-receipt" variant="count"/></div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-lg-7"><div class="card chart-card p-3"><TrendChart :data="monthlyTrend"/></div></div>
      <div class="col-lg-5"><div class="card chart-card p-3"><PieChart :data="expenseByCategory" title="카테고리별 지출"/></div></div>
    </div>

    <div class="card chart-card">
      <div class="card-header bg-white border-0 pt-3"><h5 class="mb-0"><i class="fa-solid fa-clock-rotate-left me-2"></i>최근 거래</h5></div>
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light"><tr><th>날짜</th><th>구분</th><th>카테고리</th><th>내용</th><th class="text-end">금액</th></tr></thead>
          <tbody>
            <tr v-for="t in recent" :key="t.id" class="txn-row">
              <td>{{ t.date }}</td>
              <td><span class="badge" :class="t.type==='income'?'bg-success':'bg-danger'">{{ t.type==='income'?'수입':'지출' }}</span></td>
              <td><span class="badge cat-badge">{{ t.category }}</span></td>
              <td>{{ t.description }}</td>
              <td class="text-end" :class="t.type==='income'?'amount-income':'amount-expense'">
                {{ t.type==='income'?'+':'-' }}{{ fmt(t.amount) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
</template>
