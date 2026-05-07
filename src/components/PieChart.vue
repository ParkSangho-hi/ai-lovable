<script setup>
import { ref, watch, onMounted } from 'vue'
const props = defineProps({ data: Object, title: String })
const chartEl = ref(null)
let chart = null

const draw = () => {
  if (!window.google?.visualization || !chartEl.value) return
  const rows = [['카테고리', '금액'], ...Object.entries(props.data)]
  const dataTable = window.google.visualization.arrayToDataTable(rows)
  const options = {
    title: props.title,
    pieHole: 0.45,
    chartArea: { width: '90%', height: '80%' },
    colors: ['#4f46e5','#06b6d4','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#14b8a6','#f97316','#3b82f6'],
    legend: { position: 'right', textStyle: { fontSize: 12 } }
  }
  chart = new window.google.visualization.PieChart(chartEl.value)
  chart.draw(dataTable, options)
}

onMounted(() => {
  window.google.charts.load('current', { packages: ['corechart'] })
  window.google.charts.setOnLoadCallback(draw)
  window.addEventListener('resize', draw)
})
watch(() => props.data, draw, { deep: true })
</script>
<template><div ref="chartEl" style="width:100%;height:340px"></div></template>
