<template>
  <ExpenseModal
    :expense="isOpenTransactionModal?.EDIT_TRANSACTION"
    :is-open="isOpenTransactionModal.EXPENSE"
    @close="toggleTransactionModal('EXPENSE')"
  />

  <IncomeModal
    v-if="isOpenTransactionModal.INCOME"
    :income="isOpenTransactionModal?.EDIT_TRANSACTION"
    :is-open="isOpenTransactionModal.INCOME"
    @delete="(id) => openDelete(id, 'receita')"
    @close="toggleTransactionModal('INCOME')"
  />

  <confirm-delete-modal
    v-if="isOpenDeleteModal"
    :title="title"
    :is-loading="deleteLoading || queryLoading"
    @confirm="handleDelete"
    @cancel="toggleDeleteModal"
    @close="toggleDeleteModal"
  />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import ExpenseModal from './TransactionModals/ExpenseModal.vue'
import IncomeModal from './TransactionModals/IncomeModal.vue'
import { MODALS_PROVIDER, type modalsProviderProps } from '../../providers/modalsProvider'
import { useTransactionModalsController } from './TransactionModals/TransactionModalsController'

const { onDelete, deleteLoading, queryLoading } = useTransactionModalsController(() => {})

const { isOpenTransactionModal, toggleTransactionModal, isOpenDeleteModal, toggleDeleteModal } =
  inject(MODALS_PROVIDER) as modalsProviderProps

const transactionId = ref<string>('')
const title = ref<string>('')

const openDelete = async (id: string, type: string) => {
  title.value = `Tem certeza que deseja excluir esta ${type}`
  transactionId.value = id
  toggleDeleteModal()
}

const handleDelete = () => {
  onDelete(transactionId.value).then(() => toggleDeleteModal())
}
</script>
