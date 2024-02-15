<template>
  <BaseDropdown.Root>
    <BaseDropdown.Trigger>
      <button class="flex items-center gap-2">
        <template v-if="selected === TRANSACTION_TYPE.EXPENSE"> <ExpensesIcon /> </template>

        <template v-else-if="selected === TRANSACTION_TYPE.INCOME"> <IncomeIcon /> </template>

        <template v-else> <TransactionsIcon /> </template>

        <span class="text-sm text-gray-800 tracking-[-0.5px] font-medium">
          <template v-if="selected === TRANSACTION_TYPE.EXPENSE"> Despesas </template>

          <template v-else-if="selected === TRANSACTION_TYPE.INCOME"> Receitas </template>

          <template v-else> Transações </template>
        </span>
        <chevron-down-icon />
      </button>
    </BaseDropdown.Trigger>

    <BaseDropdown.Content class="w-[279px]">
      <BaseDropdown.Item class="gap-2" @select="$emit('select', TRANSACTION_TYPE.INCOME)">
        <IncomeIcon />
        Receita
      </BaseDropdown.Item>

      <BaseDropdown.Item class="gap-2" @select="$emit('select', TRANSACTION_TYPE.EXPENSE)">
        <ExpensesIcon />
        Despesas
      </BaseDropdown.Item>

      <BaseDropdown.Item class="gap-2" @select="$emit('select', undefined)">
        <TransactionsIcon />
        Transações
      </BaseDropdown.Item>
    </BaseDropdown.Content>
  </BaseDropdown.Root>
</template>

<script setup lang="ts">
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown.js'
import ChevronDownIcon from '@/view/components/icons/ChevronDownIcon.vue'
import IncomeIcon from '@/view/components/icons/IncomeOutlineIcon.vue'
import ExpensesIcon from '@/view/components/icons/ExpensesIcon.vue'
import TransactionsIcon from '@/view/components/icons/TransactionsIcon.vue'
import { TRANSACTION_TYPE } from '@/app/config/constants/transaction'

type tEmits = {
  select: [v: TRANSACTION_TYPE | undefined]
}

defineEmits<tEmits>()
defineProps<{
  selected?: TRANSACTION_TYPE | undefined
}>()
</script>

<style scoped></style>
