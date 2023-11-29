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
      <base-balance class="text-gray-800 font-medium tracking-[-0.5px] block" :balance="balance" />
      <small class="text-gray-600 text-sm">Saldo atual</small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import baseBalance from '../Base/BaseBalance.vue'
import BankAccountIcon from '@/view/components/icons/BankAccountTypeIcon/BankAccountIcon.vue'

type accountCardProps = {
  color: string
  name: string
  balance: number
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

defineProps<accountCardProps>()
</script>
