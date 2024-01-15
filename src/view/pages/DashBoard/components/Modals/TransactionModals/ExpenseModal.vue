<template>
  <base-transaction-modal
    :open-modal="isOpen"
    :initial-values="expense"
    type="EXPENSE"
    :modal-label="expense ? 'Editar Despesa' : 'Nova Despesa'"
    balance-label="Valor da Despesa"
    transaction-name-label="Noma da despesa"
    type-label="Categoria"
    payment-label="Pagar Com"
    @submit="handleSubmit"
    @close="$emit('close')"
  />
</template>

<script lang="ts" setup>
import BaseTransactionModal from './BaseTransactionModal.vue'
import type { Transaction } from '@/app/services/TransactionService'
import { useExpenseModalController } from './ExpenseModalController'

const props = defineProps<{ isOpen: boolean; expense?: Transaction }>()
const emit = defineEmits<{ close: [] }>()

const { updateExpense, createExpense } = useExpenseModalController(emit)

const handleSubmit = (values: any) => {
  return props.expense ? updateExpense(props.expense.id, values) : createExpense(values)
}
</script>

<style lang="scss" scoped></style>
