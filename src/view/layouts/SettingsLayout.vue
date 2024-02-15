<template>
  <div>
    <div>Settings Page</div>
    <button @click="router.push(DASHBOARD)">go to Dashboard</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DASHBOARD } from '@/app/config/constants/route'

const router = useRouter()
</script>

<style scoped></style>
