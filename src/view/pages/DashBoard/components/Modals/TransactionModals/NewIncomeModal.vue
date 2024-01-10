<template>
  <base-transaction-modal
    type="INCOME"
    :open-modal="isOpen"
    modal-label="Nova Receita"
    balance-label="Valor da Receita"
    transaction-name-label="Noma da Receita"
    type-label="Categoria"
    payment-label="Receber Com"
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
    .createTransaction({ ...values, type: 'INCOME' })
    .then(() => toast.success('Receita criada com sucesso'))
    .then(() => emit('close'))
    .catch((e) => {
      toast.error('Erro durante a criação da Receita')
    })
}
</script>

<style lang="scss" scoped></style>
