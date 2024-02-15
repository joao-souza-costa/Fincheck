<template>
  <base-transaction-modal
    v-if="isOpenTransactionModal.EXPENSE"
    :is-open="isOpenTransactionModal.EXPENSE"
    :labels="expenseLabels"
    :transaction="isOpenTransactionModal?.EDIT_TRANSACTION"
    :loading="updateLoading || queryLoading"
    type="EXPENSE"
    @create="(values) => onCreate({ values, type: 'EXPENSE' })"
    @update="(id, values) => onUpdate({ id, values, type: 'EXPENSE' })"
    @delete="(id) => openDelete(id, 'EXPENSE')"
    @close="toggleTransactionModal('EXPENSE')"
  />

  <base-transaction-modal
    v-if="isOpenTransactionModal.INCOME"
    :is-open="isOpenTransactionModal.INCOME"
    :labels="incomeLabels"
    :transaction="isOpenTransactionModal?.EDIT_TRANSACTION"
    :loading="updateLoading || queryLoading"
    type="INCOME"
    @create="(values) => onCreate({ values, type: 'INCOME' })"
    @update="(id, values) => onUpdate({ id, values, type: 'INCOME' })"
    @delete="(id) => openDelete(id, 'INCOME')"
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
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import BaseTransactionModal from './BaseTransactionModal.vue'
import { useTransactionModalsController } from './TransactionModalsController'
import { ref } from 'vue'

const {
  deleteLoading,
  queryLoading,
  updateLoading,
  isOpenTransactionModal,
  isOpenDeleteModal,
  title,
  openDelete,
  onCreate,
  onUpdate,
  handleDelete,
  toggleDeleteModal,
  toggleTransactionModal
} = useTransactionModalsController()

const incomeLabels = ref({
  title: isOpenTransactionModal?.EDIT_TRANSACTION ? 'Editar Receita' : 'Nova Receita',
  balanceLabel: 'Valor da Receita',
  transactionNameLabel: 'Nome da Receita',
  categoryLabel: 'Categoria',
  paymentTypeLabel: 'Método de pagamento',
  paymentLabel: 'Conta'
})

const expenseLabels = ref({
  title: isOpenTransactionModal?.EDIT_TRANSACTION ? 'Editar Despesa' : 'Nova Despesa',
  balanceLabel: 'Valor da Despesa',
  transactionNameLabel: 'Nome da despesa',
  categoryLabel: 'Categoria',
  paymentTypeLabel: 'Método de pagamento',
  paymentLabel: 'Conta'
})
</script>
