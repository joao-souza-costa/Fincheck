<template>
  <NewExpenseModal
    :is-open="isOpenTransactionModal.EXPENSE"
    @close="toggleTransactionModal('EXPENSE')"
  />
  <NewIncomeModal
    :is-open="isOpenTransactionModal.INCOME"
    @close="toggleTransactionModal('INCOME')"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import NewExpenseModal from './TransactionModals/NewExpenseModal.vue'
import NewIncomeModal from './TransactionModals/NewIncomeModal.vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../providers/modalsProvider'

const { isOpenTransactionModal, toggleTransactionModal } = inject(
  MODALS_PROVIDER
) as modalsProviderProps
</script>
