<template>
  <span :class="[areVisible && 'blur-md']">
    {{ formatCurrency(balance) }}
  </span>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/app/utils/formatCurrency'
import { inject } from 'vue'
import { type balanceProviderProps } from '../../providers/balanceProvider'

type iProps = {
  balance: number
}

const { areVisible } = inject('balanceProvider') as balanceProviderProps
defineProps<iProps>()
</script>
