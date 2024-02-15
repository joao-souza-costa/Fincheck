<template>
  <base-modal
    class="min-h-[600px] transition-all duration-700"
    :title="income ? 'Editar Receita' : 'Nova Receita'"
    :open="isOpen"
    @update:open="tabs[currentTab].closeFn"
  >
    <template #right-action>
      <trash-icon
        v-if="income"
        role="button"
        class="w-6 h-6 text-red-800"
        @click="$emit('delete', income.id)"
      />
    </template>

    <Transition :name="transition" mode="out-in">
      <component
        :is="tabs[currentTab].component"
        :initial-values="income"
        :category="category"
        :is-loading="updateLoading || queryLoading"
        v-bind="baseTransactionFormProps"
        @submit="tabs[currentTab].submitFn"
        @open-categories="setCategories"
      />
    </Transition>
  </base-modal>
</template>

<script lang="ts" setup>
import TrashIcon from '@/view/components/icons/TrashIcon.vue'
import TransactionForm from '../../Forms/TransactionForm.vue'
import type { Transaction } from '@/app/services/TransactionService'
import CategoriesList from '../CategoryModals/CategoriesList.vue'
import BaseModal from '@/view/components/BaseModal.vue'
import { useTransactionModalsController } from './TransactionModalsController'
import { ref } from 'vue'
import type { categoriesResponse } from '@/app/services/CategoriesService'

interface iTabs {
  component: any
  closeFn: Function
  submitFn: Function
}
const props = defineProps<{ isOpen: boolean; income?: Transaction }>()
const emit = defineEmits<{ close: []; delete: [id: string] }>()
const category = ref<categoriesResponse | undefined>(props.income?.category)

const { onUpdate, onCreate, queryLoading, updateLoading } = useTransactionModalsController(
  emit,
  'INCOME'
)

const currentTab = ref('TransactionForm')
const transition = ref('go')

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
  currentTab.value = 'TransactionForm'
}

const tabs: {
  [key: string]: iTabs
} = {
  TransactionForm: {
    component: TransactionForm,
    closeFn: () => emit('close'),
    submitFn: (values: any) => (props.income ? onUpdate(props.income.id, values) : onCreate(values))
  },
  CategoriesList: {
    component: CategoriesList,
    closeFn: setForm,
    submitFn: (chosenCategory: categoriesResponse) => {
      setForm()
      category.value = chosenCategory
    }
  }
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
