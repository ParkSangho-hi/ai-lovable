<script setup>
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '../stores/transactionStore'

const store = useTransactionStore()
const { transactions } = storeToRefs(store)
const filter = ref('all')
const search = ref('')

onMounted(() => { if (!transactions.value.length) store.fetchTransactions() })

const filtered = computed(() => transactions.value.filter(t => {
  if (filter.value !== 'all' && t.type !== filter.value) return false
  if (search.value && !t.description.includes(search.value) && !t.category.includes(search.value)) return false
  return true
}))

const fmt = (n) => '₩' + n.toLocaleString('ko-KR')
const remove = (id) => { if (confirm('삭제하시겠습니까?')) store.deleteTransaction(id) }
</script>

<template>
  <h2 class="mb-4"><i class="fa-solid fa-list me-2 text-primary"></i>거래 내역</h2>
  <div class="card chart-card p-3 mb-3">
    <div class="row g-2">
      <div class="col-md-8">
        <div class="input-group">
          <span class="input-group-text bg-white"><i class="fa-solid fa-magnifying-glass"></i></span>
          <input v-model="search" class="form-control" placeholder="카테고리/설명 검색"/>
        </div>
      </div>
      <div class="col-md-4">
        <select v-model="filter" class="form-select">
          <option value="all">전체</option>
          <option value="income">수입만</option>
          <option value="expense">지출만</option>
        </select>
      </div>
    </div>
  </div>

  <div class="card chart-card">
    <div class="table-responsive">
      <table class="table align-middle mb-0">
        <thead class="table-light"><tr><th>날짜</th><th>구분</th><th>카테고리</th><th>내용</th><th class="text-end">금액</th><th></th></tr></thead>
        <tbody>
          <tr v-for="t in filtered" :key="t.id" class="txn-row">
            <td>{{ t.date }}</td>
            <td><span class="badge" :class="t.type==='income'?'bg-success':'bg-danger'">{{ t.type==='income'?'수입':'지출' }}</span></td>
            <td><span class="badge cat-badge">{{ t.category }}</span></td>
            <td>{{ t.description }}</td>
            <td class="text-end" :class="t.type==='income'?'amount-income':'amount-expense'">
              {{ t.type==='income'?'+':'-' }}{{ fmt(t.amount) }}
            </td>
            <td><button class="btn btn-sm btn-outline-danger" @click="remove(t.id)"><i class="fa-solid fa-trash"></i></button></td>
          </tr>
          <tr v-if="!filtered.length"><td colspan="6" class="text-center text-muted py-4">결과가 없습니다.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
