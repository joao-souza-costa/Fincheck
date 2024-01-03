<template>
  <base-transaction-modal
    :open-modal="isOpen"
    modal-label="Nova Despesa"
    balance-label="Valor da Despesa"
    transaction-name-label="Noma da despesa"
    type-label="Categoria"
    payment-label="Pagar Com"
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
