<script setup>
defineProps({ title: String, value: String, icon: String, variant: String })
</script>
<template>
  <div class="card stat-card p-3 h-100">
    <div class="d-flex align-items-center gap-3">
      <div class="stat-icon" :class="`bg-${variant}`"><i :class="icon"></i></div>
      <div>
        <div class="text-muted small">{{ title }}</div>
        <div class="fs-4 fw-bold">{{ value }}</div>
      </div>
    </div>
  </div>
</template>
