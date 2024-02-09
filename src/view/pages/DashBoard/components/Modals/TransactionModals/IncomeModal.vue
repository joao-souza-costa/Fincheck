<template>
  <base-modal
    class="min-h-[600px]"
    :title="income ? 'Editar Receita' : 'Nova Receita'"
    :open="isOpen"
    @update:open="$emit('close')"
  >
    <Transition :name="transition" mode="out-in">
      <component
        :is="tabs[currentTab]"
        :initial-values="income"
        :is-loading="updateLoading || queryLoading"
        v-bind="baseTransactionFormProps"
        @submit="handleSubmit"
        @open-categories="setCategories"
        @close-categories="setForm"
      />
    </Transition>
  </base-modal>

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
import BaseTransactionForm from './BaseTransactionForm.vue'
import type { Transaction } from '@/app/services/TransactionService'
import ConfirmDeleteModal from '@/view/components/ConfirmDeleteModal.vue'
import CategoriesList from '../CategoryModals/CategoriesList.vue'
import BaseModal from '@/view/components/BaseModal.vue'
import { useTransactionModalsController } from './TransactionModalsController'
import { ref } from 'vue'

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

const currentTab = ref('BaseTransactionForm')
const transition = ref('go')
const tabs: { [key: string]: any } = {
  BaseTransactionForm,
  CategoriesList
}

const baseTransactionFormProps = ref({
  type: 'INCOME',
  balanceLabel: 'Valor da Receita',
  transactionNameLabel: 'Nome da Receita',
  categoryLabel: 'Categoria',
  paymentLabel: 'Conta',
  paymentTypeLabel: 'Método de pagamento'
})

const setCategories = () => {
  transition.value = 'go'
  currentTab.value = 'CategoriesList'
}

const setForm = () => {
  transition.value = 'back'
  currentTab.value = 'BaseTransactionForm'
}
</script>

<style scoped>
.go-enter-active,
.go-leave-active {
  transition: all 0.25s ease-out;
}

.go-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.go-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.back-enter-active,
.back-leave-active {
  transition: all 0.25s ease-out;
}

.back-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.back-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
