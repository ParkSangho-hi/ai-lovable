<script setup>
import { ref, watch, onMounted } from 'vue'
const props = defineProps({ data: Array })
const chartEl = ref(null)

const draw = () => {
  if (!window.google?.visualization || !chartEl.value) return
  const rows = [['월','수입','지출'], ...props.data.map(([m, v]) => [m, v.income, v.expense])]
  const dataTable = window.google.visualization.arrayToDataTable(rows)
  const options = {
    title: '월별 수입/지출 추이',
    chartArea: { width: '85%', height: '70%' },
    colors: ['#10b981','#ef4444'],
    legend: { position: 'top' },
    curveType: 'function',
    vAxis: { format: 'short' }
  }
  new window.google.visualization.AreaChart(chartEl.value).draw(dataTable, options)
}

onMounted(() => {
  window.google.charts.load('current', { packages: ['corechart'] })
  window.google.charts.setOnLoadCallback(draw)
  window.addEventListener('resize', draw)
})
watch(() => props.data, draw, { deep: true })
</script>
<template><div ref="chartEl" style="width:100%;height:340px"></div></template>
