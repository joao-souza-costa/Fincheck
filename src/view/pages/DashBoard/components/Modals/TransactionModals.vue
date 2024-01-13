<template>
  <ExpenseModal
    :expense="isOpenTransactionModal?.EDIT_TRANSACTION"
    :is-open="isOpenTransactionModal.EXPENSE"
    @close="toggleTransactionModal('EXPENSE')"
  />
  <IncomeModal
    :income="isOpenTransactionModal?.EDIT_TRANSACTION"
    :is-open="isOpenTransactionModal.INCOME"
    @close="toggleTransactionModal('INCOME')"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import ExpenseModal from './TransactionModals/ExpenseModal.vue'
import IncomeModal from './TransactionModals/IncomeModal.vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../providers/modalsProvider'

const { isOpenTransactionModal, toggleTransactionModal } = inject(
  MODALS_PROVIDER
) as modalsProviderProps
</script>
