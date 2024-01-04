<template>
  <BaseDropdown.Root>
    <BaseDropdown.Trigger>
      <button class="flex items-center gap-2">
        <transactions-icon />
        <span class="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
        <chevron-down-icon />
      </button>
    </BaseDropdown.Trigger>

    <BaseDropdown.Content class="w-[279px]">
      <BaseDropdown.Item class="gap-2">
        <IncomeIcon />
        Receita
      </BaseDropdown.Item>

      <BaseDropdown.Item class="gap-2">
        <ExpensesIcon />
        Despesas
      </BaseDropdown.Item>

      <BaseDropdown.Item class="gap-2">
        <TransactionsIcon />
        Transações
      </BaseDropdown.Item>
    </BaseDropdown.Content>
  </BaseDropdown.Root>
</template>

<script setup lang="ts">
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown.js'
import ChevronDownIcon from '@/view/components/icons/ChevronDownIcon.vue'
import TransactionsIcon from '@/view/components/icons/TransactionsIcon.vue'
import IncomeIcon from '@/view/components/icons/IncomeOutlineIcon.vue'
import ExpensesIcon from '@/view/components/icons/ExpensesIcon.vue'
</script>

<style scoped></style>
