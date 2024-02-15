
import type { categoriesResponse } from '@/app/services/CategoriesService'
import TransactionForm from '../../Forms/TransactionForm/TransactionForm.vue'
import CategoriesList from '../CategoryModals/CategoriesList.vue'
import { ref } from 'vue'
import type { Transaction } from '@/app/services/TransactionService'

interface iTabs {
  component: any
  closeFn: Function
  submitFn: Function
}

export type tProps = {
  isOpen: boolean
  transaction?: Transaction
  loading: boolean
  type: 'INCOME' | 'EXPENSE'
  labels: {
    title: string
    balanceLabel: string
    transactionNameLabel: string
    categoryLabel: string
    paymentLabel: string
    paymentTypeLabel: string
  }
}

export function useBaseTransactionModalController(props: tProps, emit: Function) {
  const category = ref<categoriesResponse | undefined>(props.transaction?.category)

  const currentTab = ref('TransactionForm')
  const transition = ref('go')

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
      submitFn: (values: any) =>
        props.transaction ? emit('update', props.transaction.id, values) : emit('create', values)
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
  return {
    category,
    currentTab,
    tabs,
    transition,
    setCategories
  }
}