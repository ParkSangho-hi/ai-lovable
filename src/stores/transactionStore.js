import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './api'

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // axios로 json-server 연결
  const fetchTransactions = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/transactions')
      transactions.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const addTransaction = async (txn) => {
    const { data } = await api.post('/transactions', txn)
    transactions.value.unshift(data)
  }

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`)
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  const totalIncome = computed(() =>
    transactions.value.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  )
  const totalExpense = computed(() =>
    transactions.value.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  )
  const balance = computed(() => totalIncome.value - totalExpense.value)

  const expenseByCategory = computed(() => {
    const map = {}
    transactions.value.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
    return map
  })

  const monthlyTrend = computed(() => {
    const map = {}
    transactions.value.forEach(t => {
      const m = t.date.slice(0, 7)
      if (!map[m]) map[m] = { income: 0, expense: 0 }
      map[m][t.type] += t.amount
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  })

  return {
    transactions, loading, error,
    fetchTransactions, addTransaction, deleteTransaction,
    totalIncome, totalExpense, balance,
    expenseByCategory, monthlyTrend
  }
})
