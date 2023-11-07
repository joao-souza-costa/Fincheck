<template>
  <div>dashboard</div>
  <base-button @click="store.signout">sair</base-button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/app/store/useUserProvider'
import BaseButton from '../components/BaseButton.vue'

const store = useUserStore()
</script>

<style scoped></style>
