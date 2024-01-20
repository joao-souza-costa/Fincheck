<template>
  <base-transaction-modal
    :open-modal="isOpen"
    :initial-values="expense"
    type="EXPENSE"
    :modal-label="expense ? 'Editar Despesa' : 'Nova Despesa'"
    balance-label="Valor da Despesa"
    transaction-name-label="Noma da despesa"
    category-label="Categoria"
    payment-type-label="Método de pagamento"
    payment-label="Pagar Com"
    @submit="handleSubmit"
    @close="$emit('close')"
  >
    <template #right-action>
      <trash-icon
        v-if="expense"
        role="button"
        class="w-6 h-6 text-red-800"
        @click="handleDeleteModal(expense.id)"
      />
    </template>

    <base-button type="submit" :is-loading="updateLoading || queryLoading"> Salvar </base-button>
  </base-transaction-modal>

  <confirm-delete-modal
    v-if="isOpenDeleteModal"
    title="Tem certeza que deseja excluir esta despesa"
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
import { useTransactionModalsController } from './TransactionModalsController'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import BaseButton from '@/view/components/BaseButton.vue'

const props = defineProps<{ isOpen: boolean; expense?: Transaction }>()
const emit = defineEmits<{ close: [] }>()

const {
  onUpdate,
  onCreate,
  onDelete,
  handleDeleteModal,
  isOpenDeleteModal,
  deleteLoading,
  queryLoading,
  updateLoading
} = useTransactionModalsController(emit, 'EXPENSE')

const handleSubmit = (values: any) => {
  return props.expense ? onUpdate(props.expense.id, values) : onCreate(values)
}
</script>

<style lang="scss" scoped></style>
