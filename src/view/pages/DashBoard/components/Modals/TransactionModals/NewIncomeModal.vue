<template>
  <base-transaction-modal
    :open-modal="isOpen"
    modal-label="Nova Receita"
    balance-label="Valor da Receita"
    transaction-name-label="Noma da Receita"
    type-label="Categoria"
    payment-label="Receber Com"
    @close="$emit('close')"
  />
</template>

<script lang="ts" setup>
import BaseTransactionModal from './BaseTransactionModal.vue'

defineProps<{
  isOpen: boolean
}>()
</script>

<style lang="scss" scoped></style>
