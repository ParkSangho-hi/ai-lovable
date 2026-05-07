<template>
  <div class="row g-4">
    <div class="col-lg-6">
      <div class="card card-soft p-4 h-100">
        <h3 class="h4 fw-bold mb-4">수입/지출 요약</h3>
        <div class="d-flex align-items-end gap-4" style="height:260px">
          <div class="flex-fill text-center">
            <div class="rounded-top bg-primary mx-auto" :style="incomeStyle"></div>
            <strong class="d-block mt-2">수입</strong>
            <small class="text-secondary">{{ store.formatCurrency(store.totalIncome) }}</small>
          </div>
          <div class="flex-fill text-center">
            <div class="rounded-top bg-warning mx-auto" :style="expenseStyle"></div>
            <strong class="d-block mt-2">지출</strong>
            <small class="text-secondary">{{ store.formatCurrency(store.totalExpense) }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="card card-soft p-4 h-100">
        <h3 class="h4 fw-bold mb-4">카테고리별 지출</h3>
        <div v-if="store.expenseByCategory.length === 0" class="text-center text-secondary py-5">지출 데이터가 없습니다.</div>
        <div v-else class="vstack gap-3">
          <div v-for="item in store.expenseByCategory" :key="item.category">
            <div class="d-flex justify-content-between mb-1">
              <strong>{{ item.category }}</strong>
              <span>{{ store.formatCurrency(item.amount) }}</span>
            </div>
            <div class="progress" style="height:14px">
              <div class="progress-bar bg-warning" :style="{ width: categoryPercent(item.amount) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAccountBookStore } from '@/stores/accountBookStore.js'

const store = useAccountBookStore()
const maxAmount = computed(() => Math.max(store.totalIncome, store.totalExpense, 1))
const incomeStyle = computed(() => ({ width: '72px', height: `${Math.max(24, (store.totalIncome / maxAmount.value) * 220)}px` }))
const expenseStyle = computed(() => ({ width: '72px', height: `${Math.max(24, (store.totalExpense / maxAmount.value) * 220)}px` }))

function categoryPercent(amount) {
  return Math.round((amount / Math.max(store.totalExpense, 1)) * 100)
}
</script>
