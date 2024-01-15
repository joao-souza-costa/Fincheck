<template>
  <base-transaction-modal
    :open-modal="isOpen"
    :initial-values="income"
    type="INCOME"
    :modal-label="income ? 'Editar Receita' : 'Nova Receita'"
    balance-label="Valor da Receita"
    transaction-name-label="Noma da Receita"
    type-label="Categoria"
    payment-label="Receber Com"
    @submit="handleSubmit"
    @close="$emit('close')"
  />
</template>

<script lang="ts" setup>
import BaseTransactionModal from './BaseTransactionModal.vue'
import type { Transaction } from '@/app/services/TransactionService'

import { useIncomeModalController } from './IncomeModalController'

const props = defineProps<{ isOpen: boolean; income?: Transaction }>()
const emit = defineEmits<{ close: [] }>()

const { createIncome, updateIncome } = useIncomeModalController(emit)

const handleSubmit = (values: any) => {
  return props.income ? updateIncome(props.income.id, values) : createIncome(values)
}
</script>

<style lang="scss" scoped></style>
