<template>
  <NewExpenseModal :is-open="isOpenTransactionModal.EXPENSE" @close="closeTransactionModal" />
  <NewIncomeModal :is-open="isOpenTransactionModal.INCOME" @close="closeTransactionModal" />
</template>

<script setup lang="ts">
import { inject } from 'vue'
import NewExpenseModal from './TransactionModals/NewExpenseModal.vue'
import NewIncomeModal from './TransactionModals/NewIncomeModal.vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../providers/modalsProvider'

const { isOpenTransactionModal, closeTransactionModal } = inject(
  MODALS_PROVIDER
) as modalsProviderProps
</script>
