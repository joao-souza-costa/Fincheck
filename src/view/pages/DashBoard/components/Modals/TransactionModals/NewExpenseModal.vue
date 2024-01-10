<template>
  <base-transaction-modal
    :open-modal="isOpen"
    type="EXPENSE"
    modal-label="Nova Despesa"
    balance-label="Valor da Despesa"
    transaction-name-label="Noma da despesa"
    type-label="Categoria"
    payment-label="Pagar Com"
    @submit="onSubmit"
    @close="$emit('close')"
  />
</template>

<script lang="ts" setup>
import { useTransactionsStore } from '@/app/store/useTransactionStore'
import BaseTransactionModal from './BaseTransactionModal.vue'
import { toast } from '@/app/utils/toast'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()
const transactionsStore = useTransactionsStore()

async function onSubmit(values: any) {
  return transactionsStore
    .createTransaction({ ...values, type: 'EXPENSE' })
    .then(() => toast.success('Despesa criada com sucesso'))
    .then(() => emit('close'))
    .catch((e) => {
      toast.error('Erro durante a criação da Despesa')
    })
}
</script>

<style lang="scss" scoped></style>
