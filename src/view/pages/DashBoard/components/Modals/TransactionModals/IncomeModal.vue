<template>
  <base-transaction-modal
    :open-modal="isOpen"
    :initial-values="income"
    type="INCOME"
    :modal-label="income ? 'Editar Receita' : 'Nova Receita'"
    balance-label="Valor da Receita"
    transaction-name-label="Nome da Receita"
    category-label="Categoria"
    payment-label="Conta"
    payment-type-label="Método de pagamento"
    @submit="handleSubmit"
    @close="$emit('close')"
  >
    <template #right-action>
      <trash-icon
        v-if="income"
        role="button"
        class="w-6 h-6 text-red-800"
        @click="handleDeleteModal(income.id)"
      />
    </template>

    <base-button type="submit" :is-loading="updateLoading || queryLoading"> Salvar </base-button>
  </base-transaction-modal>

  <confirm-delete-modal
    v-if="isOpenDeleteModal"
    title="Tem certeza que deseja excluir esta receita"
    :is-loading="deleteLoading || queryLoading"
    @confirm="onDelete"
    @cancel="isOpenDeleteModal = false"
    @close="isOpenDeleteModal = false"
  />
</template>

<script lang="ts" setup>
import TrashIcon from '@/view/components/icons/TrashIcon.vue'
import BaseTransactionModal from './BaseTransactionModal.vue'
import type { Transaction } from '@/app/services/TransactionService'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import BaseButton from '@/view/components/BaseButton.vue'

import { useTransactionModalsController } from './TransactionModalsController'

const props = defineProps<{ isOpen: boolean; income?: Transaction }>()
const emit = defineEmits<{ close: [] }>()

const {
  handleDeleteModal,
  onUpdate,
  onCreate,
  onDelete,
  isOpenDeleteModal,
  deleteLoading,
  queryLoading,
  updateLoading
} = useTransactionModalsController(emit, 'INCOME')

const handleSubmit = (values: any) => {
  return props.income ? onUpdate(props.income.id, values) : onCreate(values)
}
</script>

<style lang="scss" scoped></style>
