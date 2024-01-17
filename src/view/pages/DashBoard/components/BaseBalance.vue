<template>
  <span :class="[areVisible && 'blur-md']">
    {{ formatCurrency(balance) }}
  </span>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/app/utils/formatCurrency'
import { inject } from 'vue'
import { type balanceProviderProps } from '../providers/balanceProvider'

type iProps = {
  balance: number
  type?: string
}

const { areVisible } = inject('balanceProvider') as balanceProviderProps

withDefaults(defineProps<iProps>(), {
  type: 'income'
})
</script>
