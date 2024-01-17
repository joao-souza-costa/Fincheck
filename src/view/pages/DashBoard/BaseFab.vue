<template>
  <div class="fixed right-4 bottom-4">
    <BaseDropdown.Root>
      <BaseDropdown.Trigger>
        <button
          class="text-white bg-teal-900 w-12 h-12 rounded-full flex justify-center items-center outline-none"
        >
          <plus-icon class="w-6 h-6" />
        </button>
      </BaseDropdown.Trigger>

      <BaseDropdown.Content>
        <BaseDropdown.Item class="gap-2" @click="hasAccounts && toggleTransactionModal('EXPENSE')">
          <ExpenseCategory />
          <span :class="[!hasAccounts && 'opacity-50']">Nova Despesa</span>
        </BaseDropdown.Item>

        <BaseDropdown.Item class="gap-2" @click="hasAccounts && toggleTransactionModal('INCOME')">
          <IncomeIcon />
          <span :class="[!hasAccounts && 'opacity-50']"> Nova Receita </span>
        </BaseDropdown.Item>

        <BaseDropdown.Item @click="toggleAccountModal('CREATE')" class="gap-2">
          <BankAccountIcon />
          Nova Conta
        </BaseDropdown.Item>
      </BaseDropdown.Content>
    </BaseDropdown.Root>
  </div>
</template>

<script setup lang="ts">
import BaseDropdown from '@/view/components/Dropdown/BaseDropdown.js'
import BankAccountIcon from '@/view/components/icons/BankAccountIcon.vue'
import ExpenseCategory from '@/view/components/icons/categories/expense/ExpenseCategory'
import PlusIcon from '@/view/components/icons/PlusIcon.vue'
import IncomeIcon from '@/view/components/icons/categories/income/IncomeIcon'
import { computed, inject } from 'vue'
import { MODALS_PROVIDER, type modalsProviderProps } from './providers/modalsProvider'
import { useAccountStore } from '@/app/store/useAccountStore'
const { toggleAccountModal, toggleTransactionModal } = inject(
  MODALS_PROVIDER
) as modalsProviderProps

const accountsStore = useAccountStore()

const hasAccounts = computed(() => {
  return accountsStore.data?.length
})
</script>
