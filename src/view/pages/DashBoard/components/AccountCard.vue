<template>
  <div
    class="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
    :style="{ borderColor: color }"
  >
    <div>
      <bank-account-icon :type="type" />
      <span class="text-gray-800 font-medium tracking-[-0.5px] block mt-4"> {{ name }} </span>
    </div>
    <div>
      <span class="text-gray-800 font-medium tracking-[-0.5px] block">
        {{ formatCurrency(balance) }}
      </span>
      <small class="text-gray-600 text-sm">Saldo atual</small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatCurrency } from '@/app/utils/formatCurrency'
import BankAccountIcon from '@/view/components/icons/BankAccountTypeIcon/BankAccountIcon.vue'

interface AccountCardProps {
  color: string
  name: string
  balance: number
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

defineProps<AccountCardProps>()
</script>
